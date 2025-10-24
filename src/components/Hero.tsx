import { Button } from "@/components/ui/button";
import { Church } from "lucide-react";
import heroImage from "@/assets/hero-church.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="p-4 bg-accent/20 rounded-full backdrop-blur-sm">
            <Church className="w-16 h-16 text-accent" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground animate-fade-in-up">
          Bunyoro Kitara Diocese
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-primary-foreground/95 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Building Faith, Serving Community
        </p>
        
        <p className="text-lg mb-8 text-primary-foreground/90 animate-fade-in-up animation-delay-300">
          Headquarters: Hoima City, Uganda
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Button 
            size="lg" 
            variant="hero"
            onClick={() => scrollToSection('calendar')}
          >
            View Calendar
          </Button>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => scrollToSection('contact')}
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
