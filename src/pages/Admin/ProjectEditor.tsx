
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Image, LayoutGrid, FileText, Settings } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProjects, Project } from "@/components/sections/ProjectsSection";

const ProjectEditor = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const isNewProject = projectId === "new";
  
  const [project, setProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    fullDescription: "",
    category: ["all"],
    tools: "",
    imageUrl: "/placeholder.svg",
  });
  
  const [activeTab, setActiveTab] = useState("general");
  
  useEffect(() => {
    if (!isNewProject) {
      const allProjects = getProjects();
      const foundProject = allProjects.find(p => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
      } else {
        toast.error("Project not found");
        navigate("/admin/projects");
      }
    }
    
    document.title = isNewProject ? "Create New Project | Portfolio" : "Edit Project | Portfolio";
  }, [projectId, isNewProject, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    let categories = ["all"];
    if (value !== "all") {
      categories.push(value);
    }
    setProject(prev => ({ ...prev, category: categories }));
  };
  
  const handleSave = () => {
    if (!project.title.trim() || !project.description.trim()) {
      toast.error("Project title and description are required");
      return;
    }
    
    const allProjects = getProjects();
    let updatedProjects;
    
    if (isNewProject) {
      // Create new project
      const newProject = {
        ...project,
        id: crypto.randomUUID(),
      };
      updatedProjects = [...allProjects, newProject];
      toast.success("Project created successfully");
    } else {
      // Update existing project
      updatedProjects = allProjects.map(p => 
        p.id === project.id ? project : p
      );
      toast.success("Project updated successfully");
    }
    
    localStorage.setItem("portfolio-projects", JSON.stringify(updatedProjects));
    navigate("/admin/projects");
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col min-h-[calc(100vh-65px)]">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/projects")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">
              {isNewProject ? "Create New Project" : "Edit Project"}
            </h1>
          </div>
          
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Project
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row flex-grow">
          <div className="w-full lg:w-64 border-r p-4">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              orientation="vertical" 
              className="w-full"
            >
              <TabsList className="flex lg:flex-col w-full h-auto bg-transparent gap-1">
                <TabsTrigger 
                  value="general" 
                  className="w-full justify-start py-2 px-3 gap-2 data-[state=active]:bg-secondary/50"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>General</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="content" 
                  className="w-full justify-start py-2 px-3 gap-2 data-[state=active]:bg-secondary/50"
                >
                  <FileText className="h-4 w-4" />
                  <span>Content</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="media" 
                  className="w-full justify-start py-2 px-3 gap-2 data-[state=active]:bg-secondary/50"
                >
                  <Image className="h-4 w-4" />
                  <span>Media</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="w-full justify-start py-2 px-3 gap-2 data-[state=active]:bg-secondary/50"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex-1 p-6 overflow-auto">
            {activeTab === "general" && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={project.title}
                    onChange={handleInputChange}
                    placeholder="Enter project title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={project.description}
                    onChange={handleInputChange}
                    placeholder="Brief project description"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Project Category</Label>
                  <Select 
                    onValueChange={handleCategoryChange} 
                    defaultValue={project.category[project.category.length - 1] || "all"}
                    value={project.category[project.category.length - 1]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="mobile-app">Mobile App</SelectItem>
                      <SelectItem value="dashboard-cms">Dashboard - CMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tools">Technologies & Tools</Label>
                  <Input
                    id="tools"
                    name="tools"
                    value={project.tools}
                    onChange={handleInputChange}
                    placeholder="SQL, Excel, Power BI,... (comma separated)"
                  />
                </div>
              </div>
            )}
            
            {activeTab === "content" && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Full Description</Label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={project.fullDescription || ""}
                    onChange={handleInputChange}
                    placeholder="Detailed project description"
                    rows={12}
                    className="min-h-[300px]"
                  />
                </div>
              </div>
            )}
            
            {activeTab === "media" && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="space-y-4">
                  <Label>Project Image</Label>
                  <div className="border rounded-lg p-4 bg-secondary/10">
                    <div className="aspect-video rounded-md overflow-hidden bg-secondary/20 mb-4">
                      <img 
                        src={project.imageUrl || "/placeholder.svg"} 
                        alt="Project preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          name="imageUrl"
                          value={project.imageUrl || ""}
                          onChange={handleInputChange}
                          placeholder="Enter image URL"
                        />
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Enter a URL to an image or use a placeholder service like Unsplash
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="link">External Link (optional)</Label>
                  <Input
                    id="link"
                    name="link"
                    value={project.link || ""}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </div>
                
                <div className="border rounded-lg p-4 bg-red-50 text-red-800 mt-8">
                  <h3 className="font-medium mb-2">Danger Zone</h3>
                  <p className="text-sm mb-4">Once you delete a project, there is no going back.</p>
                  
                  {!isNewProject && (
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        if(confirm("Are you sure you want to delete this project?")) {
                          const allProjects = getProjects();
                          const filteredProjects = allProjects.filter(p => p.id !== project.id);
                          localStorage.setItem("portfolio-projects", JSON.stringify(filteredProjects));
                          toast.success("Project deleted");
                          navigate("/admin/projects");
                        }
                      }}
                    >
                      Delete this project
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectEditor;
