
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileTerminal, FileText, Github, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProjects } from "@/components/sections/ProjectsSection";
import { useEffect } from "react";
import { useAnalytics } from "@/utils/analytics";

type ProjectCategory = "all" | "data-analysis" | "dashboard" | "process-optimization";

export function AllProjects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [projects, setProjects] = useState([]);
  const { recordPageView } = useAnalytics();
  
  useEffect(() => {
    // Record page view when component mounts
    recordPageView("/projects");
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Load projects
    setProjects(getProjects());
  }, [recordPageView]);
  
  const filteredProjects = activeCategory === "all" 
    ? projects
    : projects.filter(project => project.category.includes(activeCategory));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All Projects</h1>
            <p className="text-muted-foreground">
              A comprehensive collection of my business analysis work
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default AllProjects;
