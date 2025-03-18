
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
    <section id="education" className="py-20">
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
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="bg-primary/10 p-8 flex items-center justify-center md:w-1/4">
                    <GraduationCap className="h-16 w-16 text-primary" />
                  </div>
                  
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{education.degree}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{education.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-primary font-medium text-sm mb-1">{education.institution}</p>
                    <p className="text-muted-foreground text-xs mb-3 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {education.location}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">{education.description}</p>
                    
                    {education.link && (
                      <a 
                        href={education.link} 
                        className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
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
