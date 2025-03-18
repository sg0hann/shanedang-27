
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  BarChart,
  FileSpreadsheet,
  LineChart,
  Presentation,
  FileText,
  Zap,
  Users,
  BookOpen,
  BrainCircuit,
  Languages,
  Code
} from "lucide-react";

type SkillCategory = "technical" | "soft" | "tools" | "languages";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: SkillCategory;
}

const skills: Skill[] = [
  // Technical Skills
  { name: "SQL", icon: <Database className="h-5 w-5" />, level: 90, category: "technical" },
  { name: "Data Analysis", icon: <BarChart className="h-5 w-5" />, level: 85, category: "technical" },
  { name: "Excel", icon: <FileSpreadsheet className="h-5 w-5" />, level: 95, category: "technical" },
  { name: "Power BI", icon: <LineChart className="h-5 w-5" />, level: 80, category: "technical" },
  { name: "Tableau", icon: <Presentation className="h-5 w-5" />, level: 75, category: "technical" },
  { name: "Business Documentation", icon: <FileText className="h-5 w-5" />, level: 90, category: "technical" },
  
  // Soft Skills
  { name: "Problem Solving", icon: <Zap className="h-5 w-5" />, level: 85, category: "soft" },
  { name: "Communication", icon: <Users className="h-5 w-5" />, level: 90, category: "soft" },
  { name: "Critical Thinking", icon: <BrainCircuit className="h-5 w-5" />, level: 85, category: "soft" },
  { name: "Teamwork", icon: <Users className="h-5 w-5" />, level: 90, category: "soft" },
  
  // Tools
  { name: "JIRA", icon: <Code className="h-5 w-5" />, level: 80, category: "tools" },
  { name: "Confluence", icon: <BookOpen className="h-5 w-5" />, level: 85, category: "tools" },
  { name: "Microsoft Office", icon: <FileSpreadsheet className="h-5 w-5" />, level: 95, category: "tools" },
  { name: "Agile Methodologies", icon: <Zap className="h-5 w-5" />, level: 85, category: "tools" },
  
  // Languages
  { name: "Vietnamese", icon: <Languages className="h-5 w-5" />, level: 100, category: "languages" },
  { name: "English", icon: <Languages className="h-5 w-5" />, level: 85, category: "languages" },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("technical");
  
  const filteredSkills = skills.filter(skill => skill.category === activeCategory);
  
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-accent/10 backdrop-blur-sm border-accent/20 text-accent px-4 py-1.5">
              My Skills
            </Badge>
            <h2 className="section-title text-center mx-auto">
              Let's Explore Popular <span className="text-accent">Skills & Experience</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Professional skills and core competencies in business analysis
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button 
              variant={activeCategory === "technical" ? "default" : "outline"} 
              onClick={() => setActiveCategory("technical")}
              className={activeCategory === "technical" ? "bg-accent text-background hover:bg-accent/90" : ""}
            >
              Technical
            </Button>
            <Button 
              variant={activeCategory === "soft" ? "default" : "outline"} 
              onClick={() => setActiveCategory("soft")}
              className={activeCategory === "soft" ? "bg-accent text-background hover:bg-accent/90" : ""}
            >
              Soft Skills
            </Button>
            <Button 
              variant={activeCategory === "tools" ? "default" : "outline"} 
              onClick={() => setActiveCategory("tools")}
              className={activeCategory === "tools" ? "bg-accent text-background hover:bg-accent/90" : ""}
            >
              Tools
            </Button>
            <Button 
              variant={activeCategory === "languages" ? "default" : "outline"} 
              onClick={() => setActiveCategory("languages")}
              className={activeCategory === "languages" ? "bg-accent text-background hover:bg-accent/90" : ""}
            >
              Languages
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {filteredSkills.map((skill, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-md border border-border hover:border-accent/30 transition-all">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-accent/10 text-accent">
                    {skill.icon}
                  </div>
                </div>
                <h3 className="font-medium mb-3">{skill.name}</h3>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full" 
                    style={{ 
                      width: `${skill.level}%`,
                      transition: "width 1s ease-in-out"
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
