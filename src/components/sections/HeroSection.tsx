
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-400/20 rounded-full filter blur-3xl animate-float animate-delay-200"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-block animate-fade-in bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
            Business Analyst Portfolio
          </p>
          
          <h1 className="animate-slide-in-bottom text-4xl md:text-6xl font-bold mb-6">
            <span className="block">Đặng Mc Cormick Shane</span>
            <span className="gradient-text">Business Analyst</span>
          </h1>
          
          <p className="animate-slide-in-bottom animate-delay-200 text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            A goal-driven individual with a solid grounding in Business Development, looking forward to embracing the challenges of a Business Analyst position.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-in-bottom animate-delay-300">
            <Button size="lg" className="gap-2 h-12">
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 h-12" asChild>
              <a 
                href="https://drive.google.com/file/d/1cbCabG0ZvB0pEpNAXGG6UuHbKm8db8db/view?usp=sharing" 
                target="_blank" 
                rel="noreferrer"
              >
                <FileText className="h-4 w-4" />
                <span>View CV</span>
              </a>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
          <a 
            href="#about" 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background shadow-md hover:shadow-lg transition-all"
            aria-label="Scroll down"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown className="text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
