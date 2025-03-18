
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <section id="projects" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-accent/10 backdrop-blur-sm border-accent/20 text-accent px-4 py-1.5">
              My Projects
            </Badge>
            <h2 className="section-title text-center mx-auto">
              Explore My Popular <span className="text-accent">Projects</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Some of my notable business analysis projects
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button 
              variant={activeCategory === "all" ? "default" : "outline"} 
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-accent text-background hover:bg-accent/90" : ""}
            >
              All
            </Button>
            <Button 
              variant={activeCategory === "website" ? "default" : "outline"} 
              onClick={() => setActiveCategory("website")}
              className={activeCategory === "website" ? "bg-accent text-background hover:bg-accent/90" : ""}
            >
              Website
            </Button>
            <Button 
              variant={activeCategory === "mobile-app" ? "default" : "outline"} 
              onClick={() => setActiveCategory("mobile-app")}
              className={activeCategory === "mobile-app" ? "bg-accent text-background hover:bg-accent/90" : ""}
            >
              Mobile App
            </Button>
            <Button 
              variant={activeCategory === "dashboard-cms" ? "default" : "outline"} 
              onClick={() => setActiveCategory("dashboard-cms")}
              className={activeCategory === "dashboard-cms" ? "bg-accent text-background hover:bg-accent/90" : ""}
            >
              Dashboard - CMS
            </Button>
          </div>
          
          {projectsData.length === 0 ? (
            <div className="text-center py-10 bg-card rounded-xl border border-border p-12">
              <p className="text-muted-foreground">No projects added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
              {displayedProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden group border-border bg-card hover:border-accent/30 transition-all">
                  <div className="h-60 overflow-hidden relative">
                    <img 
                      src={project.imageUrl || project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent/20 hover:bg-accent/30 text-white border-none">
                        {project.category[0]}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {typeof project.tools === 'string' 
                        ? project.tools.split(',').slice(0, 3).map((tool, i) => (
                            <span key={i} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                              {tool.trim()}
                            </span>
                          ))
                        : null
                      }
                      {typeof project.tools === 'string' && project.tools.split(',').length > 3 && (
                        <span className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                          +{project.tools.split(',').length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-2">
                        {project.docsLink && (
                          <a 
                            href={project.docsLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-accent p-1.5 rounded-md hover:bg-accent/10 transition-colors"
                          >
                            <FileCode className="h-4 w-4" />
                          </a>
                        )}
                        {project.demoLink && (
                          <a 
                            href={project.demoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-accent p-1.5 rounded-md hover:bg-accent/10 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="gap-1 border-accent/30 text-accent hover:bg-accent/10 hover:text-accent" asChild>
                        <Link to={`/projects/${project.id}`}>
                          <span>View Details</span>
                          <ArrowRight className="h-3 w-3" />
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
              <Button asChild size="lg" className="gap-2 bg-accent text-background hover:bg-accent/90">
                <Link to="/projects">
                  <span>View All Projects</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
