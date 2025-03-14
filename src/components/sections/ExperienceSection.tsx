
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Senior Business Analyst",
    company: "Tech Solutions Inc.",
    period: "2021 - Present",
    description: "Lãnh đạo nhóm phân tích kinh doanh, làm việc với các bên liên quan cấp cao để xác định và giải quyết nhu cầu kinh doanh. Phát triển quy trình phân tích dữ liệu mạnh mẽ để hỗ trợ ra quyết định chiến lược.",
    achievements: [
      "Triển khai giải pháp BI tiết kiệm 20% chi phí hoạt động",
      "Tự động hóa các quy trình báo cáo tiết kiệm 15 giờ mỗi tuần",
      "Phát triển các chỉ số KPI mới dẫn đến tăng 25% hiệu suất"
    ]
  },
  {
    title: "Business Analyst",
    company: "Finance Group",
    period: "2018 - 2021",
    description: "Phân tích yêu cầu kinh doanh, phát triển tài liệu đặc tả và hỗ trợ triển khai các giải pháp phần mềm. Làm việc chặt chẽ với đội ngũ IT và các bên liên quan.",
    achievements: [
      "Dẫn dắt dự án phân tích dữ liệu chính tạo ra giá trị 1.2M USD",
      "Tối ưu hóa quy trình giảm 30% thời gian xử lý",
      "Thiết kế dashboard BI được sử dụng bởi 200+ người dùng"
    ]
  },
  {
    title: "Junior Data Analyst",
    company: "Retail Solutions Co.",
    period: "2016 - 2018",
    description: "Hỗ trợ phân tích dữ liệu bán hàng và khách hàng, tạo báo cáo và bảng điều khiển, xác định xu hướng và cơ hội kinh doanh.",
    achievements: [
      "Phát hiện các xu hướng dữ liệu dẫn đến tăng 10% doanh số",
      "Phát triển báo cáo tự động tiết kiệm 5 giờ mỗi tuần",
      "Tối ưu hóa quy trình thu thập dữ liệu tăng 15% chính xác"
    ]
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Kinh nghiệm làm việc</h2>
          <p className="text-muted-foreground mt-4">
            Trải nghiệm chuyên nghiệp của tôi tập trung vào phân tích kinh doanh và 
            data-driven decision making trong nhiều ngành khác nhau.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-primary/30 pl-8 ml-8 md:ml-12 space-y-12">
            {experiences.map((experience, index) => (
              <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="absolute -left-14 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/30 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                    {experience.period}
                  </span>
                  
                  <h3 className="text-xl font-semibold">{experience.title}</h3>
                  <p className="text-primary font-medium mb-4">{experience.company}</p>
                  
                  <p className="text-muted-foreground mb-4">{experience.description}</p>
                  
                  <h4 className="font-medium text-sm uppercase text-muted-foreground mb-2">Thành tựu chính:</h4>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
