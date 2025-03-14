
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAnalytics } from "@/utils/analytics";
import { Mail, Send, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  const { toast } = useToast();
  const { addContactRequest } = useAnalytics();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Tất cả các trường là bắt buộc",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Save contact request to analytics
    addContactRequest({
      name: formData.name,
      email: formData.email,
      message: formData.message
    });
    
    // Show success message
    toast({
      title: "Gửi tin nhắn thành công!",
      description: "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    
    setIsSubmitting(false);
  };
  
  return (
    <section id="contact" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Liên hệ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nếu bạn muốn trao đổi về cơ hội hợp tác hoặc có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với tôi.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <p className="text-muted-foreground">dangshane@gmail.com</p>
                <a href="mailto:dangshane@gmail.com" className="text-primary text-sm hover:underline">
                  Gửi email
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Vị trí</h3>
                <p className="text-muted-foreground">Tp. Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Điện thoại</h3>
                <p className="text-muted-foreground">+84 38 676 4689</p>
                <a href="tel:+84386764689" className="text-primary text-sm hover:underline">
                  Gọi ngay
                </a>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg shadow-sm border">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Họ và tên
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Tin nhắn
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nhập nội dung tin nhắn của bạn"
                rows={5}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
