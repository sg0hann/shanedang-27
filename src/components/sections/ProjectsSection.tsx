
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileTerminal, FileText, Github, ArrowRight } from "lucide-react";

type ProjectCategory = "all" | "data-analysis" | "dashboard" | "process-optimization";

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageUrl?: string;
  category: string[];
  tools: string;
  link?: string;
  fullDescription?: string;
}

// Export the projects data so it can be used in other components
export const getProjects = (): Project[] => {
  const savedProjects = localStorage.getItem("portfolio-projects");
  const loadedProjects = savedProjects ? JSON.parse(savedProjects) : [];
  
  if (loadedProjects.length > 0) {
    return loadedProjects;
  } else {
    // Default projects if none are in localStorage
    return [
      {
        id: "sales-data-analysis",
        title: "Sales Data Analysis",
        description: "Comprehensive analysis of sales data to identify trends, opportunities, and areas for improvement.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        category: ["all", "data-analysis"],
        tools: "Excel, Power BI, SQL",
        link: "#",
        fullDescription: "This project involved analyzing 3 years of sales data across multiple regions to identify key performance trends. I created interactive dashboards showing product performance, regional variations, and seasonal patterns. The analysis led to a 15% increase in targeted marketing efficiency and helped optimize inventory management."
      },
      {
        id: "revenue-dashboard",
        title: "Revenue Dashboard",
        description: "Built an interactive dashboard allowing executives to track revenue KPIs in real-time.",
        imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
        category: ["all", "dashboard"],
        tools: "Tableau, SQL, Excel",
        link: "#",
        fullDescription: "I designed and implemented a comprehensive revenue tracking dashboard that provides real-time insights into company performance. The dashboard integrates data from multiple sources and presents key metrics through intuitive visualizations. This tool has become essential for executive decision-making and has improved reporting efficiency by 40%."
      },
      {
        id: "operational-process-optimization",
        title: "Operational Process Optimization",
        description: "Analyzed and improved operational processes, reducing cycle time and increasing efficiency.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        category: ["all", "process-optimization"],
        tools: "Visio, JIRA, Excel",
        link: "#",
        fullDescription: "In this project, I identified bottlenecks in core operational processes by mapping current workflows and collecting performance data. After implementing process improvements and automation for repetitive tasks, we achieved a 30% reduction in processing time and significantly improved quality metrics."
      }
    ];
  }
};

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  
  // Fetch projects from localStorage
  useEffect(() => {
    setProjectsData(getProjects());
  }, []);
  
  // Show only first 3 projects on the homepage
  const displayedProjects = activeCategory === "all" 
    ? projectsData.slice(0, 3) 
    : projectsData.filter(project => project.category.includes(activeCategory)).slice(0, 3);
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Featured Projects</h2>
          <p className="text-muted-foreground mt-4">
            Some of my notable business analysis projects.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button 
            variant={activeCategory === "all" ? "default" : "outline"} 
            onClick={() => setActiveCategory("all")}
          >
            All
          </Button>
          <Button 
            variant={activeCategory === "data-analysis" ? "default" : "outline"} 
            onClick={() => setActiveCategory("data-analysis")}
          >
            Data Analysis
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
            Process Optimization
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
          {displayedProjects.map((project, index) => (
            <Card key={index} className="project-card overflow-hidden group border-none">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.imageUrl || project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {typeof project.tools === 'string' 
                    ? project.tools.split(',').map((tool, i) => (
                        <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                          {tool.trim()}
                        </span>
                      ))
                    : null
                  }
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
                    <Link to={`/projects/${project.id}`}>
                      <span>View Details</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/projects">
              <span>View All Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
