CREATE TABLE public.diocese_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  month TEXT NOT NULL,
  day TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Event',
  source_url TEXT,
  refreshed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.diocese_events TO anon;
GRANT SELECT ON public.diocese_events TO authenticated;
GRANT ALL ON public.diocese_events TO service_role;

ALTER TABLE public.diocese_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view diocese events"
ON public.diocese_events FOR SELECT
TO anon, authenticated
USING (true);

CREATE INDEX idx_diocese_events_year ON public.diocese_events (year);