import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const GATEWAY = 'https://connector-gateway.lovable.dev/firecrawl/v2';
const SOURCE_URLS = ['https://bkdiocese.org/events/', 'https://bkdiocese.org/'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!LOVABLE_API_KEY || !FIRECRAWL_API_KEY) {
      return json({ error: 'Refresh is not configured' }, 500);
    }

    let year = new Date().getFullYear();
    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      const parsed = Number(body?.year);
      if (Number.isInteger(parsed) && parsed >= 2020 && parsed <= 2100) year = parsed;
    }

    // 1. Scrape the diocese website
    const pages: string[] = [];
    for (const url of SOURCE_URLS) {
      const res = await fetch(`${GATEWAY}/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': FIRECRAWL_API_KEY,
        },
        body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
      });
      if (!res.ok) {
        const details = await res.text();
        console.error(`Firecrawl failed [${res.status}]: ${details}`);
        continue;
      }
      const data = await res.json();
      const md = data?.markdown ?? data?.data?.markdown;
      if (md) pages.push(`Source: ${url}\n\n${String(md).slice(0, 20000)}`);
    }

    if (pages.length === 0) {
      return json({ error: 'Could not read bkdiocese.org right now. Please try again later.' }, 502);
    }

    // 2. Extract structured events with AI
    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content:
              `Extract diocesan activities/events for the year ${year} from the provided website content. ` +
              `Only include events you can date. Return JSON only.`,
          },
          { role: 'user', content: pages.join('\n\n---\n\n') },
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'save_events',
              description: 'Save the extracted diocese events',
              parameters: {
                type: 'object',
                properties: {
                  events: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        month: { type: 'string', enum: MONTHS },
                        day: { type: 'string', description: 'Day of month, e.g. "14"' },
                        title: { type: 'string' },
                        category: {
                          type: 'string',
                          description: 'One of Mass, Youth, Seminar, Retreat, Education, Community, Pilgrimage, Mission, Prayer, Music, Event',
                        },
                      },
                      required: ['month', 'day', 'title', 'category'],
                      additionalProperties: false,
                    },
                  },
                },
                required: ['events'],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'save_events' } },
      }),
    });

    if (!aiRes.ok) {
      const details = await aiRes.text();
      console.error(`AI extraction failed [${aiRes.status}]: ${details}`);
      if (aiRes.status === 429) return json({ error: 'Rate limit reached, please try again shortly.' }, 429);
      if (aiRes.status === 402) return json({ error: 'AI credits exhausted.' }, 402);
      return json({ error: 'Could not read the activities from the website.', details }, 502);
    }

    const aiData = await aiRes.json();
    const args = aiData?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    let events: Array<{ month: string; day: string; title: string; category: string }> = [];
    try {
      events = JSON.parse(args ?? '{}')?.events ?? [];
    } catch (_e) {
      events = [];
    }

    events = events.filter(
      (e) => e && MONTHS.includes(e.month) && String(e.title).trim().length > 1,
    );

    if (events.length === 0) {
      return json({ updated: 0, message: `No ${year} activities were published on bkdiocese.org.` });
    }

    // 3. Replace stored events for that year
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error: delError } = await supabase.from('diocese_events').delete().eq('year', year);
    if (delError) throw delError;

    const { error: insError } = await supabase.from('diocese_events').insert(
      events.map((e) => ({
        year,
        month: e.month,
        day: String(e.day).replace(/\D/g, '').slice(0, 2) || '1',
        title: String(e.title).slice(0, 200),
        category: String(e.category || 'Event').slice(0, 40),
        source_url: 'https://bkdiocese.org',
      })),
    );
    if (insError) throw insError;

    return json({ updated: events.length, year });
  } catch (error) {
    console.error('refresh-activities error:', error);
    return json({ error: error instanceof Error ? error.message : 'Unexpected error' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
