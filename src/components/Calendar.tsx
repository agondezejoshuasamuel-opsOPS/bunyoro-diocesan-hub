import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, RefreshCw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type EventItem = { date: string; title: string; type: string };
type MonthEvents = { month: string; events: EventItem[] };


const calendars: Record<string, MonthEvents[]> = {
  "2025": [
    { month: "January", events: [
      { date: "1", title: "New Year Thanksgiving Service", type: "Mass" },
      { date: "19", title: "Diocesan Youth Convention", type: "Youth" },
    ]},
    { month: "February", events: [
      { date: "9", title: "Mothers' Union Sunday", type: "Community" },
      { date: "16", title: "Marriage Enrichment Seminar", type: "Seminar" },
    ]},
    { month: "March", events: [
      { date: "5", title: "Ash Wednesday Service", type: "Mass" },
      { date: "22", title: "Lenten Diocesan Retreat", type: "Retreat" },
    ]},
    { month: "April", events: [
      { date: "13", title: "Palm Sunday Procession", type: "Mass" },
      { date: "18", title: "Good Friday Service", type: "Mass" },
      { date: "20", title: "Easter Sunday Celebration", type: "Mass" },
    ]},
    { month: "May", events: [
      { date: "4", title: "Diocesan Music Festival", type: "Music" },
      { date: "25", title: "Confirmation Sunday", type: "Mass" },
    ]},
    { month: "June", events: [
      { date: "3", title: "Uganda Martyrs Day Pilgrimage", type: "Pilgrimage" },
      { date: "8", title: "Pentecost Sunday", type: "Mass" },
      { date: "29", title: "Feast of Saints Peter and Paul", type: "Mass" },
    ]},
    { month: "July", events: [
      { date: "12", title: "Diocesan Youth Camp", type: "Youth" },
      { date: "26", title: "Clergy Fellowship Retreat", type: "Retreat" },
    ]},
    { month: "August", events: [
      { date: "10", title: "Children's Ministry Sunday", type: "Community" },
      { date: "24", title: "Bible Study Conference", type: "Education" },
    ]},
    { month: "September", events: [
      { date: "7", title: "Catechist Training Workshop", type: "Education" },
      { date: "21", title: "Diocesan Mission Sunday", type: "Mission" },
    ]},
    { month: "October", events: [
      { date: "5", title: "Harvest Thanksgiving Service", type: "Community" },
      { date: "19", title: "Rosary & Prayer Marathon", type: "Prayer" },
    ]},
    { month: "November", events: [
      { date: "1", title: "All Saints Day", type: "Mass" },
      { date: "23", title: "Christ the King Sunday", type: "Mass" },
    ]},
    { month: "December", events: [
      { date: "7", title: "Advent Season Begins", type: "Mass" },
      { date: "24", title: "Christmas Eve Midnight Mass", type: "Mass" },
      { date: "25", title: "Christmas Day Service", type: "Mass" },
      { date: "31", title: "New Year's Eve Thanksgiving", type: "Mass" },
    ]},
  ],
  "2026": [
    { month: "January", events: [
      { date: "1", title: "New Year Mass", type: "Mass" },
      { date: "18", title: "Diocesan Youth Convention", type: "Youth" },
    ]},
    { month: "February", events: [
      { date: "14", title: "Marriage Preparation Seminar", type: "Seminar" },
      { date: "18", title: "Ash Wednesday Service", type: "Mass" },
    ]},
    { month: "March", events: [
      { date: "15", title: "Lenten Diocesan Retreat", type: "Retreat" },
      { date: "29", title: "Palm Sunday Celebration", type: "Mass" },
    ]},
    { month: "April", events: [
      { date: "3", title: "Good Friday Service", type: "Mass" },
      { date: "5", title: "Easter Sunday", type: "Mass" },
      { date: "26", title: "Diocesan Music Festival", type: "Music" },
    ]},
    { month: "May", events: [
      { date: "10", title: "Mothers' Union Sunday", type: "Community" },
      { date: "24", title: "Pentecost Sunday", type: "Mass" },
    ]},
    { month: "June", events: [
      { date: "3", title: "Uganda Martyrs Day Pilgrimage", type: "Pilgrimage" },
      { date: "21", title: "Confirmation Sunday", type: "Mass" },
      { date: "29", title: "Feast of Saints Peter and Paul", type: "Mass" },
    ]},
    { month: "July", events: [
      { date: "11", title: "Diocesan Youth Camp", type: "Youth" },
      { date: "19", title: "Community Outreach Programme", type: "Community" },
      { date: "26", title: "Clergy Fellowship Retreat", type: "Retreat" },
    ]},
    { month: "August", events: [
      { date: "6", title: "Transfiguration Celebration", type: "Mass" },
      { date: "23", title: "Bible Study Conference", type: "Education" },
    ]},
    { month: "September", events: [
      { date: "6", title: "Catechist Training Workshop", type: "Education" },
      { date: "14", title: "Exaltation of the Holy Cross", type: "Mass" },
      { date: "27", title: "Diocesan Mission Sunday", type: "Mission" },
    ]},
    { month: "October", events: [
      { date: "4", title: "Harvest Thanksgiving Service", type: "Community" },
      { date: "18", title: "Rosary & Prayer Marathon", type: "Prayer" },
    ]},
    { month: "November", events: [
      { date: "1", title: "All Saints Day", type: "Mass" },
      { date: "2", title: "All Souls Day", type: "Mass" },
      { date: "22", title: "Christ the King Celebration", type: "Mass" },
    ]},
    { month: "December", events: [
      { date: "6", title: "Advent Season Begins", type: "Mass" },
      { date: "24", title: "Christmas Eve Midnight Mass", type: "Mass" },
      { date: "25", title: "Christmas Day Service", type: "Mass" },
      { date: "31", title: "New Year's Eve Thanksgiving", type: "Mass" },
    ]},
  ],
  "2027": [
    { month: "January", events: [
      { date: "1", title: "New Year Thanksgiving Service", type: "Mass" },
      { date: "17", title: "Diocesan Youth Convention", type: "Youth" },
    ]},
    { month: "February", events: [
      { date: "10", title: "Ash Wednesday Service", type: "Mass" },
      { date: "21", title: "Marriage Enrichment Seminar", type: "Seminar" },
    ]},
    { month: "March", events: [
      { date: "14", title: "Lenten Diocesan Retreat", type: "Retreat" },
      { date: "21", title: "Palm Sunday Celebration", type: "Mass" },
    ]},
    { month: "April", events: [
      { date: "26", title: "Diocesan Music Festival", type: "Music" },
      { date: "25", title: "Confirmation Sunday", type: "Mass" },
    ]},
    { month: "May", events: [
      { date: "9", title: "Mothers' Union Sunday", type: "Community" },
      { date: "16", title: "Pentecost Sunday", type: "Mass" },
    ]},
    { month: "June", events: [
      { date: "3", title: "Uganda Martyrs Day Pilgrimage", type: "Pilgrimage" },
      { date: "29", title: "Feast of Saints Peter and Paul", type: "Mass" },
    ]},
    { month: "July", events: [
      { date: "10", title: "Diocesan Youth Camp", type: "Youth" },
      { date: "24", title: "Community Outreach Programme", type: "Community" },
    ]},
    { month: "August", events: [
      { date: "8", title: "Children's Ministry Sunday", type: "Community" },
      { date: "22", title: "Bible Study Conference", type: "Education" },
    ]},
    { month: "September", events: [
      { date: "5", title: "Catechist Training Workshop", type: "Education" },
      { date: "26", title: "Diocesan Mission Sunday", type: "Mission" },
    ]},
    { month: "October", events: [
      { date: "3", title: "Harvest Thanksgiving Service", type: "Community" },
      { date: "17", title: "Rosary & Prayer Marathon", type: "Prayer" },
    ]},
    { month: "November", events: [
      { date: "1", title: "All Saints Day", type: "Mass" },
      { date: "21", title: "Christ the King Celebration", type: "Mass" },
    ]},
    { month: "December", events: [
      { date: "5", title: "Advent Season Begins", type: "Mass" },
      { date: "24", title: "Christmas Eve Midnight Mass", type: "Mass" },
      { date: "25", title: "Christmas Day Service", type: "Mass" },
      { date: "31", title: "New Year's Eve Thanksgiving", type: "Mass" },
    ]},
  ],
};

const YEARS = Object.keys(calendars);

const Calendar = () => {
  const [year, setYear] = useState<string>("2026");
  const events = calendars[year];

  const getEventColor = (type: string) => {
    const colors: Record<string, string> = {
      Mass: "bg-primary text-primary-foreground",
      Youth: "bg-accent text-accent-foreground",
      Seminar: "bg-secondary text-secondary-foreground",
      Retreat: "bg-muted text-muted-foreground",
      Education: "bg-primary/80 text-primary-foreground",
      Community: "bg-accent/80 text-accent-foreground",
      Pilgrimage: "bg-primary/60 text-primary-foreground",
      Mission: "bg-accent/60 text-accent-foreground",
      Prayer: "bg-secondary/80 text-secondary-foreground",
      Music: "bg-accent/70 text-accent-foreground",
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <section id="calendar" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-accent/10 rounded-full">
              <CalendarDays className="w-10 h-10 text-accent" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {year} Activities Calendar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us throughout the year for worship, learning, and community service
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-4" />
        </div>

        <div className="flex justify-center mb-10">
          <Tabs value={year} onValueChange={setYear}>
            <TabsList>
              {YEARS.map((y) => (
                <TabsTrigger key={y} value={y} className="px-6">
                  {y}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((monthData, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl text-center text-foreground">
                  {monthData.month}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {monthData.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="flex gap-3 items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-accent">{event.date}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">{event.title}</p>
                        <Badge className={getEventColor(event.type)} variant="secondary">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
