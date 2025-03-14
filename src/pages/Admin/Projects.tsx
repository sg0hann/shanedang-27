
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAnalytics } from "@/utils/analytics";
import AdminLayout from "@/components/admin/AdminLayout";

// Định nghĩa cấu trúc dữ liệu dự án
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  link?: string;
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
    technologies: "",
    imageUrl: "/placeholder.svg"
  });
  
  const { recordPageView } = useAnalytics();
  
  useEffect(() => {
    recordPageView("/admin/projects");
    document.title = "Quản lý dự án | Portfolio";
  }, [recordPageView]);
  
  // Lưu dự án vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("portfolio-projects", JSON.stringify(projects));
  }, [projects]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProject = () => {
    if (!editingProject.title || !editingProject.description) {
      toast.error("Vui lòng điền đầy đủ thông tin dự án");
      return;
    }
    
    if (editingProject.id) {
      // Cập nhật dự án đã tồn tại
      setProjects(projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      ));
      toast.success("Cập nhật dự án thành công");
    } else {
      // Thêm dự án mới
      const newProject = {
        ...editingProject,
        id: crypto.randomUUID()
      };
      setProjects([...projects, newProject]);
      toast.success("Thêm dự án mới thành công");
    }
    
    // Reset form
    setEditingProject({
      id: "",
      title: "",
      description: "",
      technologies: "",
      imageUrl: "/placeholder.svg"
    });
  };
  
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };
  
  const handleDeleteProject = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa dự án này không?")) {
      setProjects(projects.filter(p => p.id !== id));
      
      if (editingProject.id === id) {
        setEditingProject({
          id: "",
          title: "",
          description: "",
          technologies: "",
          imageUrl: "/placeholder.svg"
        });
      }
      
      toast.success("Đã xóa dự án");
    }
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Quản lý dự án</h1>
          <p className="text-muted-foreground">
            Thêm, chỉnh sửa và xóa các dự án trong portfolio
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách dự án</CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    Chưa có dự án nào. Hãy thêm dự án mới!
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
                            <p className="text-xs text-muted-foreground mt-1">
                              {project.technologies}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditProject(project)}
                          >
                            Sửa
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
                {editingProject.id ? "Chỉnh sửa dự án" : "Thêm dự án mới"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveProject(); }}>
                <div className="space-y-2">
                  <Label htmlFor="title">Tên dự án</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editingProject.title}
                    onChange={handleInputChange}
                    placeholder="Nhập tên dự án"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editingProject.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả dự án"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="technologies">Công nghệ sử dụng</Label>
                  <Input
                    id="technologies"
                    name="technologies"
                    value={editingProject.technologies}
                    onChange={handleInputChange}
                    placeholder="SQL, Excel, Power BI,..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL hình ảnh</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={editingProject.imageUrl}
                    onChange={handleInputChange}
                    placeholder="URL hình ảnh dự án"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">Link dự án (không bắt buộc)</Label>
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
                      Cập nhật dự án
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Thêm dự án mới
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
                      technologies: "",
                      imageUrl: "/placeholder.svg"
                    })}
                  >
                    Hủy chỉnh sửa
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
