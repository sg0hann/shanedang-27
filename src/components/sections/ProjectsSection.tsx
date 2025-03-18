
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileCode, ArrowRight } from "lucide-react";

type ProjectCategory = "all" | "website" | "mobile-app" | "dashboard-cms";

export interface ProjectMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  isMain?: boolean;
}

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
  media?: ProjectMedia[];
  demoLink?: string;
  docsLink?: string;
}

// Export the projects data so it can be used in other components
export const getProjects = (): Project[] => {
  const savedProjects = localStorage.getItem("portfolio-projects");
  const loadedProjects = savedProjects ? JSON.parse(savedProjects) : [];
  
  if (loadedProjects.length > 0) {
    return loadedProjects;
  } else {
    // Return empty array instead of default projects
    return [];
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
        
        {projectsData.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No projects added yet.</p>
          </div>
        ) : (
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
                    <div className="flex gap-2">
                      {project.docsLink && (
                        <a 
                          href={project.docsLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <FileCode className="h-4 w-4" />
                        </a>
                      )}
                      {project.demoLink && (
                        <a 
                          href={project.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
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
        )}
        
        {projectsData.length > 0 && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/projects">
                <span>View All Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
