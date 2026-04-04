import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

const Calendar = () => {
  const events = [
    {
      month: "January",
      events: [
        { date: "1", title: "New Year Mass", type: "Mass" },
        { date: "15", title: "Youth Ministry Kick-off", type: "Youth" }
      ]
    },
    {
      month: "February",
      events: [
        { date: "14", title: "Marriage Preparation Seminar", type: "Seminar" },
        { date: "22", title: "Ash Wednesday Service", type: "Mass" }
      ]
    },
    {
      month: "March",
      events: [
        { date: "10", title: "Lenten Retreat", type: "Retreat" },
        { date: "29", title: "Palm Sunday Celebration", type: "Mass" }
      ]
    },
    {
      month: "April",
      events: [
        { date: "2", title: "Good Friday Service", type: "Mass" },
        { date: "4", title: "Easter Sunday", type: "Mass" },
        { date: "7", title: "Music Competitions", type: "Music" }
      ]
    },
    {
      month: "May",
      events: [
        { date: "1", title: "May Day Celebration", type: "Community" },
        { date: "12", title: "Mother's Day Service", type: "Mass" },
        { date: "25", title: "Pentecost Sunday", type: "Mass" }
      ]
    },
    {
      month: "June",
      events: [
        { date: "3", title: "Martyr's Day", type: "Mass" },
        { date: "16", title: "Father's Day Service", type: "Mass" },
        { date: "29", title: "Feast of Saints Peter and Paul", type: "Mass" }
      ]
    },
    {
      month: "July",
      events: [
        { date: "7", title: "Youth Camp", type: "Youth" },
        { date: "15", title: "Community Outreach Program", type: "Community" },
        { date: "28", title: "Diocesan Pilgrimage", type: "Pilgrimage" }
      ]
    },
    {
      month: "August",
      events: [
        { date: "6", title: "Transfiguration Celebration", type: "Mass" },
        { date: "15", title: "Assumption of Mary", type: "Mass" },
        { date: "25", title: "Bible Study Marathon", type: "Education" }
      ]
    },
    {
      month: "September",
      events: [
        { date: "8", title: "Catechist Training Workshop", type: "Education" },
        { date: "14", title: "Exaltation of the Holy Cross", type: "Mass" },
        { date: "29", title: "Feast of the Archangels", type: "Mass" }
      ]
    },
    {
      month: "October",
      events: [
        { date: "1", title: "Mission Month Opening", type: "Mission" },
        { date: "15", title: "Rosary Marathon", type: "Prayer" },
        { date: "31", title: "Reformation Day Service", type: "Mass" }
      ]
    },
    {
      month: "November",
      events: [
        { date: "1", title: "All Saints Day", type: "Mass" },
        { date: "2", title: "All Souls Day", type: "Mass" },
        { date: "20", title: "Christ the King Celebration", type: "Mass" }
      ]
    },
    {
      month: "December",
      events: [
        { date: "1", title: "Advent Season Begins", type: "Mass" },
        { date: "8", title: "Immaculate Conception", type: "Mass" },
        { date: "24", title: "Christmas Eve Midnight Mass", type: "Mass" },
        { date: "25", title: "Christmas Day Service", type: "Mass" },
        { date: "31", title: "New Year's Eve Thanksgiving", type: "Mass" }
      ]
    }
  ];

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
      Prayer: "bg-secondary/80 text-secondary-foreground"
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <section id="calendar" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-accent/10 rounded-full">
              <CalendarDays className="w-10 h-10 text-accent" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            2025 Activities Calendar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us throughout the year for worship, learning, and community service
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-4" />
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
