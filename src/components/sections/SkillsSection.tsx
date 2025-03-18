
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <section id="skills" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Skills</h2>
          <p className="text-muted-foreground mt-4">
            Professional skills and core competencies in business analysis
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button 
            variant={activeCategory === "technical" ? "default" : "outline"} 
            onClick={() => setActiveCategory("technical")}
            className="transition-all duration-300"
          >
            Technical
          </Button>
          <Button 
            variant={activeCategory === "soft" ? "default" : "outline"} 
            onClick={() => setActiveCategory("soft")}
            className="transition-all duration-300"
          >
            Soft Skills
          </Button>
          <Button 
            variant={activeCategory === "tools" ? "default" : "outline"} 
            onClick={() => setActiveCategory("tools")}
            className="transition-all duration-300"
          >
            Tools
          </Button>
          <Button 
            variant={activeCategory === "languages" ? "default" : "outline"} 
            onClick={() => setActiveCategory("languages")}
            className="transition-all duration-300"
          >
            Languages
          </Button>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger">
            {filteredSkills.map((skill, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className="mr-3 text-primary">{skill.icon}</div>
                  <h3 className="font-medium">{skill.name}</h3>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ 
                      width: `${skill.level}%`,
                      transition: "width 1s ease-in-out"
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Beginner</span>
                  <span className="text-xs text-muted-foreground">Expert</span>
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
