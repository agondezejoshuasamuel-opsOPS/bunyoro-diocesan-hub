import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen } from "lucide-react";
import communityImage from "@/assets/community.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Faith & Worship",
      description: "Nurturing spiritual growth through prayer, sacraments, and community worship"
    },
    {
      icon: Users,
      title: "Community Service",
      description: "Serving our communities with compassion and dedication"
    },
    {
      icon: BookOpen,
      title: "Education & Growth",
      description: "Empowering through faith formation and continuous learning"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            About Our Diocese
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              Welcome to Bunyoro Kitara Diocese
            </h3>
            <p className="text-lg mb-4 text-muted-foreground leading-relaxed">
              The Bunyoro Kitara Diocese, headquartered in Hoima City, serves as a beacon of faith and hope 
              for our community. We are committed to spreading the Gospel, nurturing spiritual growth, and 
              serving our people with love and dedication.
            </p>
            <p className="text-lg mb-4 text-muted-foreground leading-relaxed">
              Our diocese encompasses a vibrant community of believers who gather to worship, learn, and 
              support one another. Through various ministries and programs, we strive to make a positive 
              impact in the lives of individuals and families.
            </p>
          </div>
          
          <div className="order-1 md:order-2">
            <img 
              src={communityImage} 
              alt="Community gathering" 
              className="rounded-2xl shadow-[var(--shadow-elegant)] w-full h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
