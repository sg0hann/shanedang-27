
import { Database, LineChart, PieChart, Presentation } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-blue-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
              <img 
                src="/lovable-uploads/2d98b137-01dc-4463-a4d0-79d372619823.png"
                alt="Shane Đặng"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/30 rounded-full filter blur-xl animate-pulse"></div>
          </div>
          
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About Me</h2>
            <div className="space-y-4">
              <p className="text-white/90">
                I am a goal-driven individual with a solid grounding in Business Development, looking forward to embracing the challenges of a Business Analyst position. Through my tech industry experience, I have developed strong strategic planning skills essential for understanding and improving IT systems and business processes.
              </p>
              <p className="text-white/90">
                My target in 3 years is to become a Senior Business Analyst and in the next 5 years, I aim to become a Product Owner. I want to use what I've learned about managing projects to make sure things go smoothly. I am enthusiastic about the prospect of applying my knowledge to contribute to your company's growth through my work as a Business Analyst.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
