
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Mail, Linkedin, Phone, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10 py-16">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div>
              <Badge variant="outline" className="mb-4 animate-fade-in bg-accent/10 backdrop-blur-sm border-accent/20 text-accent px-4 py-1.5">
                Business Analyst Portfolio
              </Badge>
              <div className="animate-slide-in-bottom">
                <p className="text-muted-foreground mb-2">Hello, I'm</p>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                  <span className="block text-white">Đặng Mc Cormick</span>
                  <span className="text-accent mt-1 block">Shane</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                  A goal-driven individual with a solid grounding in Business Development, looking forward to embracing the challenges of a Business Analyst position.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-in-bottom animate-delay-200">
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-card border border-border">
                <Phone className="h-5 w-5 text-accent mb-1" />
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="text-sm font-medium">0978493317</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-card border border-border">
                <Mail className="h-5 w-5 text-accent mb-1" />
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">shane.mccormick0212@gmail.com</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-card border border-border">
                <MapPin className="h-5 w-5 text-accent mb-1" />
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm font-medium">Ho Chi Minh City</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-card border border-border">
                <Calendar className="h-5 w-5 text-accent mb-1" />
                <span className="text-sm text-muted-foreground">Birthday</span>
                <span className="text-sm font-medium">02/12/1999</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4 animate-slide-in-bottom animate-delay-300">
              <Button size="lg" className="gap-2 h-12 bg-accent text-black hover:bg-accent/90 font-medium rounded-md">
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 h-12 bg-card/50 hover:bg-card border-border text-white rounded-md" asChild>
                <a 
                  href="https://drive.google.com/file/d/1cbCabG0ZvB0pEpNAXGG6UuHbKm8db8db/view?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <FileText className="h-4 w-4" />
                  <span>View CV</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 text-white hover:bg-card border-border rounded-md" asChild>
                <a 
                  href="https://www.linkedin.com/in/shane-%C4%91%E1%BA%B7ng-a9183712b/" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-1 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/2d98b137-01dc-4463-a4d0-79d372619823.png"
                  alt="Shane Đặng"
                  className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover rounded-full border-2 border-accent/50"
                />
              </div>
              <div className="absolute -right-4 top-10 bg-card p-3 rounded-lg border border-border">
                <div className="stat-number text-2xl">300+</div>
                <div className="stat-label">Hours of Analysis</div>
              </div>
              <div className="absolute -left-4 bottom-10 bg-card p-3 rounded-lg border border-border">
                <div className="stat-number text-2xl">90%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a 
            href="#about" 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card backdrop-blur-sm shadow-md hover:bg-card/80 transition-all border border-border"
            aria-label="Scroll down"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown className="text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
