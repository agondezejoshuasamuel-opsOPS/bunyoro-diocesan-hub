import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Bunyoro Kitara Diocese", "Hoima City", "Uganda"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+256 766 637 800", "Office Hours: Mon-Fri #HAPPY EASTER TO EVERYONE."]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["....................", "................."]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday", "8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM"]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to serve you. Reach out to us for any inquiries or support
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">{item.title}</h4>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground mb-1">
                    {detail}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border shadow-[var(--shadow-elegant)] overflow-hidden">
          <CardContent className="p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63765.89474847447!2d31.333333!3d1.433333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1762c5a5e3b3a5a5%3A0x5e5e5e5e5e5e5e5e!2sHoima%2C%20Uganda!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Diocese Location"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
