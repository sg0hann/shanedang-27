
import { GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  link?: string;
}

const educationData: Education[] = [
  {
    degree: "International Business",
    institution: "University of Economics Ho Chi Minh City",
    location: "Ho Chi Minh City, Vietnam",
    period: "07/2022 - 06/2025",
    description: "Focused on business administration, strategic management, and international business principles.",
    link: "https://www.ueh.edu.vn/"
  },
  {
    degree: "Air Traffic Controller",
    institution: "Vietnam Aviation Academy",
    location: "Ho Chi Minh City, Vietnam",
    period: "02/2018 - 12/2022",
    description: "Specialized training in aviation management, airline operations, and air traffic control protocols.",
    link: "https://vaa.edu.vn/"
  }
];

export function EducationSection() {
  return (
    <section id="education" className="py-20 bg-gradient-to-b from-gray-900/50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Education</h2>
          <p className="text-muted-foreground mt-4">
            My academic background and educational qualifications
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 stagger">
            {educationData.map((education, index) => (
              <div 
                key={index} 
                className="bg-gray-900/50 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(132,204,22,0.2)] border border-accent/10 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="bg-accent/10 p-8 flex items-center justify-center md:w-1/4 border-r border-accent/10">
                    <GraduationCap className="h-16 w-16 text-accent" />
                  </div>
                  
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-white">{education.degree}</h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{education.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-accent font-medium text-sm mb-1">{education.institution}</p>
                    <p className="text-gray-400 text-xs mb-3 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {education.location}
                    </p>
                    <p className="text-gray-300 text-sm mb-4">{education.description}</p>
                    
                    {education.link && (
                      <a 
                        href={education.link} 
                        className="text-sm text-accent hover:text-accent/80 inline-flex items-center gap-1 transition-all duration-300 hover:translate-x-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Visit Institution</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
