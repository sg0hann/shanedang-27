
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, Github, Globe, Link as LinkIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/components/sections/ProjectsSection";
import NotFound from "./NotFound";
import { useAnalytics } from "@/utils/analytics";

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const { recordPageView } = useAnalytics();
  
  useEffect(() => {
    // Record page view when component mounts
    recordPageView(`/projects/${projectId}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [projectId, recordPageView]);
  
  const project = projects.find(p => p.id === projectId);
  
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
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tools.map((tool, i) => (
                <span key={i} className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg leading-relaxed">
                {project.fullDescription || project.description}
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Project Overview</h2>
              <p>
                This business analysis project demonstrates my skills in data collection, 
                analysis, and visualization to solve complex business problems and provide 
                actionable insights for stakeholders.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Methodology</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Requirement gathering through stakeholder interviews</li>
                <li>Data collection and cleaning from multiple sources</li>
                <li>In-depth analysis using statistical methods</li>
                <li>Development of interactive visualizations</li>
                <li>Implementation of recommended solutions</li>
                <li>Monitoring results and continuous improvement</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Outcomes & Results</h2>
              <p>
                The project successfully addressed key business challenges and delivered 
                measurable improvements in efficiency, decision-making processes, and overall 
                performance metrics.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-between items-center border-t border-border pt-6">
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" />
                    <span>Source</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="#" target="_blank" rel="noreferrer">
                    <FileText className="h-4 w-4" />
                    <span>Documentation</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Globe className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                </Button>
              </div>
              
              <Button asChild>
                <Link to="/contact">
                  <span>Discuss this project</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default ProjectDetail;
