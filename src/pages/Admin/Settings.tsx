
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/utils/auth";
import { useAnalytics } from "@/utils/analytics";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, User, LockKeyhole } from "lucide-react";

interface SiteSettings {
  siteName: string;
  ownerName: string;
  ownerTitle: string;
  aboutShort: string;
  contactEmail: string;
  linkedinUrl: string;
  githubUrl: string;
}

const defaultSettings: SiteSettings = {
  siteName: "BA Portfolio",
  ownerName: "Nguyễn Văn A",
  ownerTitle: "Business Analyst",
  aboutShort: "Chuyên gia phân tích kinh doanh với kinh nghiệm hơn 5 năm trong lĩnh vực fintech và ngân hàng.",
  contactEmail: "example@mail.com",
  linkedinUrl: "https://linkedin.com",
  githubUrl: "https://github.com"
};

const Settings = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const savedSettings = localStorage.getItem("portfolio-settings");
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { recordPageView } = useAnalytics();
  
  useEffect(() => {
    recordPageView("/admin/settings");
    document.title = "Cài đặt | Portfolio";
  }, [recordPageView]);
  
  // Lưu cài đặt vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("portfolio-settings", JSON.stringify(settings));
  }, [settings]);
  
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveSettings = () => {
    localStorage.setItem("portfolio-settings", JSON.stringify(settings));
    toast.success("Đã lưu cài đặt thành công");
  };
  
  const handleChangePassword = () => {
    if (oldPassword !== "123456") {
      toast.error("Mật khẩu hiện tại không đúng");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    
    toast.success("Đã đổi mật khẩu thành công");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Cài đặt</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin website và tài khoản
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin website
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveSettings(); }}>
                <div className="space-y-2">
                  <Label htmlFor="siteName">Tên website</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Tên của bạn</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={settings.ownerName}
                    onChange={handleSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerTitle">Chức danh</Label>
                  <Input
                    id="ownerTitle"
                    name="ownerTitle"
                    value={settings.ownerTitle}
                    onChange={handleSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="aboutShort">Giới thiệu ngắn</Label>
                  <Textarea
                    id="aboutShort"
                    name="aboutShort"
                    value={settings.aboutShort}
                    onChange={handleSettingsChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email liên hệ</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={handleSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={settings.linkedinUrl}
                    onChange={handleSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    value={settings.githubUrl}
                    onChange={handleSettingsChange}
                  />
                </div>
                
                <Button className="w-full" onClick={handleSaveSettings}>
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Lưu cài đặt
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LockKeyhole className="h-5 w-5" />
                Đổi mật khẩu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Mật khẩu hiện tại</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <Button className="w-full" onClick={handleChangePassword}>
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Đổi mật khẩu
                  </span>
                </Button>
              </form>
              
              <div className="mt-4 pt-4 border-t text-center text-sm text-muted-foreground">
                <p>Mặc định: Username: <strong>admin</strong> | Password: <strong>123456</strong></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
