
import { Award, Calendar, ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
  grade?: string;
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
    link: "https://drive.google.com/file/d/1UaYCtbkJk5F0DAMsJdbLVaq8nOI0JvHP/view"
  },
  {
    title: "The Test of English for International Communication",
    issuer: "IIG",
    date: "11/2022",
    description: "Certification of English language proficiency for international business communication.",
    grade: "910/990",
    link: "https://drive.google.com/file/d/1mFWQF8ibRc1oOu3YkF2B6QIpNusxVAVm/view"
  }
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-gradient-to-b from-background to-gray-900/50">
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
                className="bg-gray-900/50 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(132,204,22,0.2)] border border-accent/10 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="bg-accent/10 p-8 flex items-center justify-center md:w-1/4 border-r border-accent/10">
                    <Award className="h-16 w-16 text-accent" />
                  </div>
                  
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-white">{cert.title}</h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-accent font-medium text-sm mb-2">{cert.issuer}</p>
                    <p className="text-gray-300 text-sm mb-4">
                      {cert.description}
                      {cert.grade && <span className="font-medium ml-2 text-accent">Score: {cert.grade}</span>}
                    </p>
                    
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        className="text-sm text-accent hover:text-accent/80 inline-flex items-center gap-1 transition-all duration-300 hover:translate-x-1"
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
