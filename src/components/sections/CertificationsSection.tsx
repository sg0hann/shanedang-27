
import { Award, Calendar, ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    title: "Certified Business Analysis Professional (CBAP)",
    issuer: "International Institute of Business Analysis",
    date: "2022",
    description: "Chứng chỉ quốc tế cao cấp về phân tích kinh doanh, xác nhận kiến thức và kinh nghiệm trong lĩnh vực BA.",
    link: "#"
  },
  {
    title: "Project Management Professional (PMP)",
    issuer: "Project Management Institute",
    date: "2021",
    description: "Chứng chỉ quản lý dự án quốc tế, xác nhận năng lực lãnh đạo dự án và quản lý quy trình.",
    link: "#"
  },
  {
    title: "Data Analysis with Python",
    issuer: "IBM",
    date: "2020",
    description: "Chứng chỉ về phân tích dữ liệu sử dụng Python, bao gồm thống kê, trực quan hóa dữ liệu và mô hình dự đoán.",
    link: "#"
  },
  {
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    date: "2020",
    description: "Chứng chỉ xác nhận kỹ năng sử dụng Power BI để biến đổi dữ liệu thành thông tin hữu ích.",
    link: "#"
  },
  {
    title: "Agile Business Analysis",
    issuer: "Agile Alliance",
    date: "2019",
    description: "Chứng chỉ tập trung vào các phương pháp phân tích kinh doanh trong môi trường Agile.",
    link: "#"
  }
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Chứng chỉ & Đào tạo</h2>
          <p className="text-muted-foreground mt-4">
            Các chứng chỉ và khóa đào tạo chuyên môn tôi đã hoàn thành để nâng cao kỹ năng và kiến thức.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 stagger">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="bg-primary/10 p-8 flex items-center justify-center md:w-1/4">
                    <Award className="h-16 w-16 text-primary" />
                  </div>
                  
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{cert.title}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-primary font-medium text-sm mb-2">{cert.issuer}</p>
                    <p className="text-muted-foreground text-sm mb-4">{cert.description}</p>
                    
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
                      >
                        <span>Xem chứng chỉ</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
