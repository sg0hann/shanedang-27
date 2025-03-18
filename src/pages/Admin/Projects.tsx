
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAnalytics } from "@/utils/analytics";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProjects, Project } from "@/components/sections/ProjectsSection";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("portfolio-projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  
  const navigate = useNavigate();
  const { recordPageView } = useAnalytics();
  
  useEffect(() => {
    recordPageView("/admin/projects");
    document.title = "Project Management | Portfolio";
  }, [recordPageView]);
  
  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("portfolio-projects", JSON.stringify(projects));
  }, [projects]);
  
  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
      toast.success("Project deleted");
    }
  };
  
  const handleEditProject = (id: string) => {
    navigate(`/admin/project-editor/${id}`);
  };
  
  const handleCreateProject = () => {
    navigate('/admin/project-editor/new');
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Add, edit, and delete projects in your portfolio
          </p>
        </div>
        
        <div className="flex justify-end mb-4">
          <Button 
            onClick={handleCreateProject}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Project
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Project List</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No projects yet. Create your first project!
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="flex items-start justify-between border rounded-md p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={project.imageUrl || "/placeholder.svg"} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.tools.split(',').map((tool, i) => (
                            <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded">
                              {tool.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditProject(project.id)}
                        className="gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Projects;
