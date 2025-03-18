
import { Database, LineChart, PieChart, Presentation, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-accent/5 rounded-2xl -z-10"></div>
              <div className="relative overflow-hidden rounded-xl border border-border">
                <img 
                  src="/lovable-uploads/2d98b137-01dc-4463-a4d0-79d372619823.png"
                  alt="Shane Đặng"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-accent rounded-full -z-10 blur-2xl opacity-70"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-accent rounded-full -z-10 blur-2xl opacity-70"></div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4 bg-accent/10 backdrop-blur-sm border-accent/20 text-accent px-4 py-1.5">
                About Me
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Professional <span className="text-accent">Problem Solutions</span> For Digital Products
              </h2>
              
              <div className="text-muted-foreground space-y-4 mb-8">
                <p>
                  I am a goal-driven individual with a solid grounding in Business Development, looking forward to embracing the challenges of a Business Analyst position. Through my tech industry experience, I have developed strong strategic planning skills essential for understanding and improving IT systems and business processes.
                </p>
                <p>
                  My target in 3 years is to become a Senior Business Analyst and in the next 5 years, I aim to become a Product Owner. I want to use what I've learned about managing projects to make sure things go smoothly.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Strategic Planning</h4>
                    <p className="text-sm text-muted-foreground">Data-driven decision making</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Product Analysis</h4>
                    <p className="text-sm text-muted-foreground">End-to-end solution design</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">System Integration</h4>
                    <p className="text-sm text-muted-foreground">Seamless workflow optimization</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Client Communication</h4>
                    <p className="text-sm text-muted-foreground">Clear stakeholder management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
