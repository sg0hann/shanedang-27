
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ArrowLeft, Save, Image, LayoutGrid, FileText, Settings, Plus, X, FileUp, Youtube, ExternalLink, FileCode } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProjects, Project } from "@/components/sections/ProjectsSection";
import { useForm } from "react-hook-form";

interface ProjectMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  isMain?: boolean;
}

const ProjectEditor = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const isNewProject = projectId === "new";
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [project, setProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    fullDescription: "",
    category: ["all"],
    tools: "",
    imageUrl: "",
    media: [],
    demoLink: "",
    docsLink: ""
  });
  
  const [activeTab, setActiveTab] = useState("general");
  const [mediaList, setMediaList] = useState<ProjectMedia[]>([]);
  
  useEffect(() => {
    if (!isNewProject) {
      const allProjects = getProjects();
      const foundProject = allProjects.find(p => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
        setMediaList(foundProject.media || []);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const newMedia: ProjectMedia = {
            id: crypto.randomUUID(),
            type: 'image',
            url: event.target.result as string,
            isMain: mediaList.length === 0 // First image is the main image
          };
          
          setMediaList(prev => [...prev, newMedia]);
          
          // If this is the first image, also set it as the project's main image
          if (mediaList.length === 0) {
            setProject(prev => ({ ...prev, imageUrl: event.target.result as string }));
          }
          
          // Clear the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddVideoMedia = () => {
    const videoUrl = prompt("Enter YouTube or video embed URL:");
    if (videoUrl) {
      const newMedia: ProjectMedia = {
        id: crypto.randomUUID(),
        type: 'video',
        url: videoUrl
      };
      
      setMediaList(prev => [...prev, newMedia]);
    }
  };
  
  const handleRemoveMedia = (id: string) => {
    const mediaToRemove = mediaList.find(media => media.id === id);
    setMediaList(prev => prev.filter(media => media.id !== id));
    
    // If removing the main image, set the first remaining image as main
    if (mediaToRemove?.isMain && mediaList.length > 1) {
      const newMainMedia = mediaList.find(media => media.id !== id);
      if (newMainMedia) {
        setMediaList(prev => 
          prev.map(media => 
            media.id === newMainMedia.id 
              ? { ...media, isMain: true } 
              : media
          )
        );
        setProject(prev => ({ ...prev, imageUrl: newMainMedia.url }));
      } else {
        setProject(prev => ({ ...prev, imageUrl: "" }));
      }
    }
  };
  
  const handleSetMainImage = (id: string) => {
    const mediaToSetAsMain = mediaList.find(media => media.id === id);
    if (mediaToSetAsMain && mediaToSetAsMain.type === 'image') {
      setMediaList(prev => 
        prev.map(media => ({
          ...media,
          isMain: media.id === id
        }))
      );
      setProject(prev => ({ ...prev, imageUrl: mediaToSetAsMain.url }));
    }
  };
  
  const handleSave = () => {
    if (!project.title.trim() || !project.description.trim()) {
      toast.error("Project title and description are required");
      return;
    }
    
    const allProjects = getProjects();
    const updatedProject = {
      ...project,
      media: mediaList
    };
    
    let updatedProjects;
    
    if (isNewProject) {
      // Create new project
      const newProject = {
        ...updatedProject,
        id: crypto.randomUUID(),
      };
      updatedProjects = [...allProjects, newProject];
      toast.success("Project created successfully");
    } else {
      // Update existing project
      updatedProjects = allProjects.map(p => 
        p.id === project.id ? updatedProject : p
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
                    placeholder="React, Node.js, MongoDB,... (comma separated)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demoLink">Demo Link</Label>
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="demoLink"
                      name="demoLink"
                      value={project.demoLink || ""}
                      onChange={handleInputChange}
                      placeholder="https://demo.example.com"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="docsLink">Documentation Link</Label>
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <FileCode className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="docsLink"
                      name="docsLink"
                      value={project.docsLink || ""}
                      onChange={handleInputChange}
                      placeholder="https://docs.example.com"
                      className="rounded-l-none"
                    />
                  </div>
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
                  <div className="flex items-center justify-between">
                    <Label>Project Media</Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <FileUp className="h-4 w-4" />
                        Upload Image
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={handleAddVideoMedia}
                      >
                        <Youtube className="h-4 w-4" />
                        Add Video
                      </Button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </div>
                  
                  {mediaList.length === 0 ? (
                    <div className="border-2 border-dashed rounded-lg p-12 text-center">
                      <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No media added yet. Upload images or add videos to your project.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mediaList.map((media) => (
                        <Card key={media.id} className="relative overflow-hidden group">
                          {media.type === 'image' ? (
                            <div className="aspect-video relative">
                              <img 
                                src={media.url} 
                                alt="Project media"
                                className="w-full h-full object-cover"
                              />
                              {media.isMain && (
                                <div className="absolute top-2 left-2 bg-primary text-white text-xs py-1 px-2 rounded">
                                  Main Image
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="aspect-video bg-black flex items-center justify-center">
                              <iframe 
                                src={media.url.includes('youtube') 
                                  ? media.url.replace('watch?v=', 'embed/') 
                                  : media.url
                                } 
                                className="w-full h-full" 
                                allowFullScreen
                                title="Video embed"
                              />
                            </div>
                          )}
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                {media.type === 'image' ? 'Image' : 'Video'}
                              </span>
                              <div className="flex gap-1">
                                {media.type === 'image' && !media.isMain && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-7 w-7 p-0"
                                    onClick={() => handleSetMainImage(media.id)}
                                  >
                                    <Image className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleRemoveMedia(media.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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
