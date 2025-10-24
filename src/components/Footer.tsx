import { Church, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-accent/20 rounded-full">
              <Church className="w-8 h-8 text-accent" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">Bunyoro Kitara Diocese</h3>
          <p className="text-primary-foreground/80 mb-6">
            Hoima City, Uganda
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span>for the community</span>
          </div>
          
          <p className="mt-4 text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Bunyoro Kitara Diocese. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
