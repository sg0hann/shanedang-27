
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAnalytics } from "@/utils/analytics";
import AdminLayout from "@/components/admin/AdminLayout";

// Project data structure definition
interface Project {
  id: string;
  title: string;
  description: string;
  category: string[];
  tools: string;
  imageUrl: string;
  link?: string;
  fullDescription?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("portfolio-projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  
  const [editingProject, setEditingProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    category: ["all"],
    tools: "",
    imageUrl: "/placeholder.svg",
    fullDescription: ""
  });
  
  const { recordPageView } = useAnalytics();
  
  useEffect(() => {
    recordPageView("/admin/projects");
    document.title = "Project Management | Portfolio";
  }, [recordPageView]);
  
  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("portfolio-projects", JSON.stringify(projects));
  }, [projects]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    let categories = ["all"];
    if (value !== "all") {
      categories.push(value);
    }
    setEditingProject(prev => ({ ...prev, category: categories }));
  };
  
  const handleToolsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toolsString = e.target.value;
    setEditingProject(prev => ({ 
      ...prev, 
      tools: toolsString
    }));
  };
  
  const handleSaveProject = () => {
    if (!editingProject.title || !editingProject.description) {
      toast.error("Please fill in all required project information");
      return;
    }
    
    // Convert comma-separated tools string to an array if needed
    const processedProject = {
      ...editingProject,
      tools: editingProject.tools
    };
    
    if (editingProject.id) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id ? processedProject : p
      ));
      toast.success("Project updated successfully");
    } else {
      // Add new project
      const newProject = {
        ...processedProject,
        id: crypto.randomUUID()
      };
      setProjects([...projects, newProject]);
      toast.success("New project added successfully");
    }
    
    // Reset form
    setEditingProject({
      id: "",
      title: "",
      description: "",
      category: ["all"],
      tools: "",
      imageUrl: "/placeholder.svg",
      fullDescription: ""
    });
  };
  
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };
  
  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
      
      if (editingProject.id === id) {
        setEditingProject({
          id: "",
          title: "",
          description: "",
          category: ["all"],
          tools: "",
          imageUrl: "/placeholder.svg",
          fullDescription: ""
        });
      }
      
      toast.success("Project deleted");
    }
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Project List</CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No projects yet. Add your first project!
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
                            onClick={() => handleEditProject(project)}
                          >
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
          
          <Card>
            <CardHeader>
              <CardTitle>
                {editingProject.id ? "Edit Project" : "Add New Project"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveProject(); }}>
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editingProject.title}
                    onChange={handleInputChange}
                    placeholder="Enter project title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editingProject.description}
                    onChange={handleInputChange}
                    placeholder="Brief project description"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Full Description</Label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={editingProject.fullDescription || ""}
                    onChange={handleInputChange}
                    placeholder="Detailed project description"
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Project Category</Label>
                  <Select 
                    onValueChange={handleCategoryChange} 
                    defaultValue="all"
                    value={editingProject.category[editingProject.category.length - 1]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="data-analysis">Data Analysis</SelectItem>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="process-optimization">Process Optimization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tools">Technologies & Tools</Label>
                  <Input
                    id="tools"
                    name="tools"
                    value={editingProject.tools}
                    onChange={handleToolsChange}
                    placeholder="SQL, Excel, Power BI,... (comma separated)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={editingProject.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Project image URL"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">Project Link (optional)</Label>
                  <Input
                    id="link"
                    name="link"
                    value={editingProject.link || ""}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </div>
                
                <Button type="submit" className="w-full" onClick={handleSaveProject}>
                  {editingProject.id ? (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Update Project
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Project
                    </span>
                  )}
                </Button>
                
                {editingProject.id && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setEditingProject({
                      id: "",
                      title: "",
                      description: "",
                      category: ["all"],
                      tools: "",
                      imageUrl: "/placeholder.svg",
                      fullDescription: ""
                    })}
                  >
                    Cancel Editing
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Projects;
