
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileTerminal, FileText, Github, ArrowRight } from "lucide-react";

type ProjectCategory = "all" | "website" | "mobile-app" | "dashboard-cms";

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
        category: ["all", "dashboard-cms"],
        tools: "Excel, Power BI, SQL",
        link: "#",
        fullDescription: "This project involved analyzing 3 years of sales data across multiple regions to identify key performance trends. I created interactive dashboards showing product performance, regional variations, and seasonal patterns. The analysis led to a 15% increase in targeted marketing efficiency and helped optimize inventory management."
      },
      {
        id: "revenue-dashboard",
        title: "Revenue Dashboard",
        description: "Built an interactive dashboard allowing executives to track revenue KPIs in real-time.",
        imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
        category: ["all", "dashboard-cms"],
        tools: "Tableau, SQL, Excel",
        link: "#",
        fullDescription: "I designed and implemented a comprehensive revenue tracking dashboard that provides real-time insights into company performance. The dashboard integrates data from multiple sources and presents key metrics through intuitive visualizations. This tool has become essential for executive decision-making and has improved reporting efficiency by 40%."
      },
      {
        id: "e-commerce-website",
        title: "E-Commerce Website",
        description: "Developed requirements for an e-commerce platform with integrated analytics and customer tracking.",
        imageUrl: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=2070&auto=format&fit=crop",
        category: ["all", "website"],
        tools: "Figma, JIRA, SQL",
        link: "#",
        fullDescription: "Led the business analysis phase for a major e-commerce website rebuild. I gathered requirements from stakeholders, developed user stories, and coordinated with the development team to ensure business needs were properly implemented. The completed website saw a 35% increase in conversion rates."
      },
      {
        id: "mobile-app-analytics",
        title: "Mobile App Analytics",
        description: "Created analytics framework for a mobile application to track user engagement and feature adoption.",
        imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2074&auto=format&fit=crop",
        category: ["all", "mobile-app"],
        tools: "Google Analytics, Firebase, Tableau",
        link: "#",
        fullDescription: "Designed and implemented an analytics strategy for a mobile application with over 500,000 users. The solution tracked key user interactions, feature adoption, and retention metrics. Insights from this data helped prioritize feature development and improved user retention by 28%."
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
            Some of my notable business analysis projects
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
            variant={activeCategory === "website" ? "default" : "outline"} 
            onClick={() => setActiveCategory("website")}
          >
            Website
          </Button>
          <Button 
            variant={activeCategory === "mobile-app" ? "default" : "outline"} 
            onClick={() => setActiveCategory("mobile-app")}
          >
            Mobile App
          </Button>
          <Button 
            variant={activeCategory === "dashboard-cms" ? "default" : "outline"} 
            onClick={() => setActiveCategory("dashboard-cms")}
          >
            Dashboard - CMS
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
                
                <div className="flex justify-end items-center">
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
