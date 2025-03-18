
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Mail, Linkedin, Phone, MapPin, Calendar } from "lucide-react";

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-gradient-to-b from-blue-950 to-slate-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-400/20 rounded-full filter blur-3xl animate-float animate-delay-200"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="inline-block animate-fade-in bg-primary/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              Business Analyst Portfolio
            </p>
            
            <h1 className="animate-slide-in-bottom text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
              <span className="block mb-2">Đặng Mc Cormick Shane</span>
              <span className="text-blue-300">Business Analyst</span>
            </h1>
            
            <p className="animate-slide-in-bottom animate-delay-200 text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
              A goal-driven individual with a solid grounding in Business Development, looking forward to embracing the challenges of a Business Analyst position.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white mb-8 animate-slide-in-bottom animate-delay-200">
              <div className="flex flex-col items-center lg:items-start gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <Phone className="h-5 w-5 text-blue-300" />
                <span className="text-sm">0978493317</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <Mail className="h-5 w-5 text-blue-300" />
                <span className="text-sm">shane.mccormick0212@gmail.com</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <MapPin className="h-5 w-5 text-blue-300" />
                <span className="text-sm">Ho Chi Minh City</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <Calendar className="h-5 w-5 text-blue-300" />
                <span className="text-sm">02/12/1999</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-slide-in-bottom animate-delay-300">
              <Button size="lg" className="gap-2 h-12 bg-blue-600 hover:bg-blue-700">
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 h-12 bg-white/10 hover:bg-white/20 border-white/40 text-white" asChild>
                <a 
                  href="https://drive.google.com/file/d/1cbCabG0ZvB0pEpNAXGG6UuHbKm8db8db/view?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <FileText className="h-4 w-4" />
                  <span>View CV</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 text-white hover:bg-white/10" asChild>
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
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img 
                src="/lovable-uploads/2d98b137-01dc-4463-a4d0-79d372619823.png"
                alt="Shane Đặng"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
          <a 
            href="#about" 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm shadow-md hover:bg-white/20 transition-all"
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
