
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Business Development Associate",
    company: "Orient Software Development Corporation",
    period: "03/2023 - 03/2024",
    description: "Analyzed business requirements, developed specifications, and supported the implementation of software solutions.",
    achievements: [
      "Experienced in discussing with clients to gather detailed software product requirements and creating comprehensive user guides",
      "Skilled in collaborating with stakeholders to elicit, document, and analyze business needs and challenges",
      "Utilized feedback analysis to enhance product effectiveness and user satisfaction",
      "Worked with international teams to understand global market trends and customer requirements",
      "Organized and delivered end-user training, ensuring clients effectively use and understand software products"
    ],
    domain: [
      "CRM (Customer Relationship Management)",
      "HRM (Human Resource Management)"
    ]
  },
  {
    title: "Sales and Customer Management Associate",
    company: "British Council Vietnam",
    period: "10/2022 - 03/2023",
    description: "Supported sales and customer management activities, created reports, and identified trends and business opportunities.",
    achievements: [
      "Expertly handled telephone sales inquiries, fostering product interest and encouraging in-person consultations at the center",
      "Responded to email inquiries with professionalism, sparking excitement and prompting visits for face-to-face consultations",
      "Proactively informed existing customers of re-registration periods through written communication, calls, and class visits, ensuring timely awareness",
      "Conducted follow-up calls to current customers, motivating them to re-register and meticulously updated waiting list records"
    ]
  },
  {
    title: "Air Traffic Controller",
    company: "Vietnam Aviation Academy",
    period: "02/2018 - 12/2022",
    description: "Trained in air traffic control and aviation management systems.",
    achievements: [
      "Completed specialized training in air traffic control protocols and procedures",
      "Developed strong communication and decision-making skills under pressure",
      "Gained valuable experience in coordinating complex operational systems"
    ]
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Kinh nghiệm làm việc</h2>
          <p className="text-muted-foreground mt-4">
            My professional experience focuses on business analysis and data-driven decision making across various industries.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-primary/30 pl-8 ml-8 md:ml-12 space-y-12">
            {experiences.map((experience, index) => (
              <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="absolute -left-14 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/30 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                    {experience.period}
                  </span>
                  
                  <h3 className="text-xl font-semibold">{experience.title}</h3>
                  <p className="text-primary font-medium mb-4">{experience.company}</p>
                  
                  <p className="text-muted-foreground mb-4">{experience.description}</p>
                  
                  {experience.domain && (
                    <div className="mb-4">
                      <h4 className="font-medium text-sm uppercase text-muted-foreground mb-2">Domain Knowledge:</h4>
                      <ul className="space-y-1">
                        {experience.domain.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <h4 className="font-medium text-sm uppercase text-muted-foreground mb-2">Main Responsibilities:</h4>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
