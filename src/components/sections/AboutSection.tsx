
import { Database, LineChart, PieChart, Presentation } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-blue-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">About Me</h2>
          <p className="text-muted-foreground mt-4">
            I am a Business Analyst with experience in analyzing business needs, optimizing processes, and providing data-driven solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="stagger">
            <div className="glass-card p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">About Me</h3>
              <p className="text-muted-foreground mb-4">
                I am a goal-driven individual with a solid grounding in Business Development, looking forward to embracing the challenges of a Business Analyst position. Through my tech industry experience, I have developed strong strategic planning skills essential for understanding and improving IT systems and business processes.
              </p>
              <p className="text-muted-foreground">
                My target in 3 years is to become a Senior Business Analyst and in the next 5 years, I aim to become a Product Owner. I want to use what I've learned about managing projects to make sure things go smoothly. I am enthusiastic about the prospect of applying my knowledge to contribute to your company's growth through my work as a Business Analyst.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">Core Values</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">01.</span>
                  <span>Data-driven decision making</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">02.</span>
                  <span>Continuous learning and development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">03.</span>
                  <span>Business process optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">04.</span>
                  <span>Effective communication</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 stagger">
            <div className="col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4">Professional Focus</h3>
                <p className="text-muted-foreground">
                  Business analyst specializing in connecting data, technology, and business needs to create real value for organizations.
                </p>
              </div>
            </div>

            <div className="skill-card flex flex-col items-center text-center p-6">
              <Database className="text-primary mb-4 h-10 w-10" />
              <h4 className="font-medium mb-2">Data Analysis</h4>
              <p className="text-sm text-muted-foreground">Transforming data into useful insights</p>
            </div>

            <div className="skill-card flex flex-col items-center text-center p-6">
              <PieChart className="text-primary mb-4 h-10 w-10" />
              <h4 className="font-medium mb-2">Business Intelligence</h4>
              <p className="text-sm text-muted-foreground">Building modern BI solutions</p>
            </div>

            <div className="skill-card flex flex-col items-center text-center p-6">
              <LineChart className="text-primary mb-4 h-10 w-10" />
              <h4 className="font-medium mb-2">Report Analysis</h4>
              <p className="text-sm text-muted-foreground">Providing insights to leadership</p>
            </div>

            <div className="skill-card flex flex-col items-center text-center p-6">
              <Presentation className="text-primary mb-4 h-10 w-10" />
              <h4 className="font-medium mb-2">Process Consulting</h4>
              <p className="text-sm text-muted-foreground">Optimizing business processes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
