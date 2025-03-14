
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileTerminal, FileText, Github } from "lucide-react";

type ProjectCategory = "all" | "data-analysis" | "dashboard" | "process-optimization";

interface Project {
  title: string;
  description: string;
  image: string;
  category: ProjectCategory[];
  tools: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: "Phân tích dữ liệu bán hàng",
    description: "Phân tích toàn diện về dữ liệu bán hàng để xác định xu hướng, cơ hội và các lĩnh vực cần cải thiện.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: ["data-analysis"],
    tools: ["Excel", "Power BI", "SQL"],
    link: "#"
  },
  {
    title: "Dashboard doanh thu",
    description: "Xây dựng dashboard tương tác giúp lãnh đạo theo dõi KPI doanh thu theo thời gian thực.",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
    category: ["dashboard"],
    tools: ["Tableau", "SQL", "Excel"],
    link: "#"
  },
  {
    title: "Tối ưu quy trình vận hành",
    description: "Phân tích và cải tiến quy trình vận hành, giảm thời gian chu kỳ và tăng hiệu quả.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    category: ["process-optimization"],
    tools: ["Visio", "JIRA", "Excel"],
    link: "#"
  },
  {
    title: "Phân tích dữ liệu khách hàng",
    description: "Phân tích hành vi khách hàng để xác định phân khúc và cơ hội tăng trưởng.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    category: ["data-analysis"],
    tools: ["Python", "SQL", "Power BI"],
    link: "#"
  },
  {
    title: "Dashboard báo cáo tài chính",
    description: "Xây dựng hệ thống báo cáo tài chính tự động cho phép lãnh đạo theo dõi hiệu suất.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    category: ["dashboard"],
    tools: ["Excel", "Power BI", "SQL"],
    link: "#"
  },
  {
    title: "Tối ưu quy trình mua hàng",
    description: "Phân tích và cải tiến quy trình mua hàng, giảm thời gian xử lý và chi phí.",
    image: "https://images.unsplash.com/photo-1664575599736-c5197c684158?q=80&w=2070&auto=format&fit=crop",
    category: ["process-optimization"],
    tools: ["Visio", "Excel", "JIRA"],
    link: "#"
  }
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category.includes(activeCategory));
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Dự án tiêu biểu</h2>
          <p className="text-muted-foreground mt-4">
            Một số dự án phân tích kinh doanh tiêu biểu mà tôi đã thực hiện.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button 
            variant={activeCategory === "all" ? "default" : "outline"} 
            onClick={() => setActiveCategory("all")}
          >
            Tất cả
          </Button>
          <Button 
            variant={activeCategory === "data-analysis" ? "default" : "outline"} 
            onClick={() => setActiveCategory("data-analysis")}
          >
            Phân tích dữ liệu
          </Button>
          <Button 
            variant={activeCategory === "dashboard" ? "default" : "outline"} 
            onClick={() => setActiveCategory("dashboard")}
          >
            Dashboard
          </Button>
          <Button 
            variant={activeCategory === "process-optimization" ? "default" : "outline"} 
            onClick={() => setActiveCategory("process-optimization")}
          >
            Tối ưu quy trình
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
          {filteredProjects.map((project, index) => (
            <Card key={index} className="project-card overflow-hidden group border-none">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href="#" aria-label="Source code">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href="#" aria-label="Documentation">
                        <FileText className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <a href={project.link}>
                      <span>Xem chi tiết</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
