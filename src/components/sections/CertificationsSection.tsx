
import { Award, Calendar, ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    title: "Google Project Management: Professional Certificate",
    issuer: "Google",
    date: "05/2024",
    description: "Professional certificate in project management methodologies and best practices.",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/"
  },
  {
    title: "Automation Business Analysis - Concepts and Principles",
    issuer: "IIBA",
    date: "02/2024",
    description: "Certificate focused on business analysis principles in automation contexts.",
    link: "https://www.coursera.org/account/accomplishments/certificate/5QQNLFZGTA"
  },
  {
    title: "Scrum Master Certification Specialization",
    issuer: "LearnQuest",
    date: "02/2024",
    description: "Specialization in Scrum methodologies and practices for agile project management.",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/"
  },
  {
    title: "IT Business Analyst",
    issuer: "Mind X Technology School",
    date: "01/2024",
    description: "Comprehensive training in IT business analysis focusing on requirements gathering and documentation.",
    link: "https://drive.google.com/file/d/1UaYCtbkJk5F0DAMsJdbLVaq8nOI0JvHP/vie"
  },
  {
    title: "The Test of English for International Communication",
    issuer: "IIG",
    date: "11/2022",
    description: "Certification of English language proficiency for international business communication. Score: 910/990",
    link: "https://drive.google.com/file/d/1mFWQF8ibRc1oOu3YkF2B6QIpNusxVAVm/vie"
  }
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Chứng chỉ & Đào tạo</h2>
          <p className="text-muted-foreground mt-4">
            Professional certifications and training I've completed to enhance my skills and knowledge.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 stagger">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="bg-primary/10 p-8 flex items-center justify-center md:w-1/4">
                    <Award className="h-16 w-16 text-primary" />
                  </div>
                  
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{cert.title}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-primary font-medium text-sm mb-2">{cert.issuer}</p>
                    <p className="text-muted-foreground text-sm mb-4">{cert.description}</p>
                    
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Xem chứng chỉ</span>
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

export default CertificationsSection;
