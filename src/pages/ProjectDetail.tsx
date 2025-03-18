
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink, FileCode } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProjects, Project } from "@/components/sections/ProjectsSection";
import NotFound from "./NotFound";
import { useAnalytics } from "@/utils/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const { recordPageView } = useAnalytics();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Record page view when component mounts
    recordPageView(`/projects/${projectId}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Find the project
    const allProjects = getProjects();
    const foundProject = allProjects.find(p => p.id === projectId);
    setProject(foundProject || null);
  }, [projectId, recordPageView]);
  
  if (!project) {
    return <NotFound />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/projects">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Projects</span>
              </Link>
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 rounded-xl overflow-hidden h-80">
              <img 
                src={project.imageUrl || project.image} 
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
              <div className="flex gap-2">
                {project.docsLink && (
                  <Button variant="outline" size="sm" asChild className="gap-1">
                    <a href={project.docsLink} target="_blank" rel="noopener noreferrer">
                      <FileCode className="h-4 w-4" />
                      <span>Documentation</span>
                    </a>
                  </Button>
                )}
                {project.demoLink && (
                  <Button variant="outline" size="sm" asChild className="gap-1">
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {typeof project.tools === 'string' 
                ? project.tools.split(',').map((tool, i) => (
                    <span key={i} className="bg-secondary px-3 py-1 rounded-full text-sm">
                      {tool.trim()}
                    </span>
                  ))
                : null
              }
            </div>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>
            
            {project.media && project.media.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.media.map((media, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border">
                      {media.type === 'image' ? (
                        <img 
                          src={media.url} 
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="h-64 bg-black">
                          <iframe 
                            src={media.url.includes('youtube') 
                              ? media.url.replace('watch?v=', 'embed/') 
                              : media.url
                            } 
                            className="w-full h-full" 
                            allowFullScreen
                            title={`${project.title} - Video ${index + 1}`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default ProjectDetail;
