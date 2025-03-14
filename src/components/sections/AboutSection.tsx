
import { Database, LineChart, PieChart, Presentation } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Giới thiệu</h2>
          <p className="text-muted-foreground mt-4">
            Tôi là một Business Analyst với kinh nghiệm chuyên sâu trong việc phân tích dữ liệu, 
            tối ưu hóa quy trình kinh doanh và cung cấp giải pháp dựa trên dữ liệu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="stagger">
            <div className="glass-card p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Về tôi</h3>
              <p className="text-muted-foreground mb-4">
                Với hơn 5 năm kinh nghiệm làm việc trong lĩnh vực phân tích kinh doanh tại các công ty trong nhiều ngành khác nhau, 
                tôi đã phát triển kỹ năng chuyên sâu trong việc phân tích dữ liệu, tối ưu hóa quy trình và cung cấp 
                thông tin chi tiết để thúc đẩy việc ra quyết định kinh doanh.
              </p>
              <p className="text-muted-foreground">
                Tôi đam mê việc giải quyết các vấn đề kinh doanh phức tạp thông qua việc sử dụng dữ liệu và 
                công nghệ một cách hiệu quả. Tôi luôn theo đuổi sự đổi mới và tìm kiếm cách để giúp doanh nghiệp 
                phát triển thông qua việc áp dụng phân tích dữ liệu tiên tiến.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">Giá trị cốt lõi</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">01.</span>
                  <span>Đưa ra quyết định dựa trên dữ liệu</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">02.</span>
                  <span>Liên tục học hỏi và phát triển</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">03.</span>
                  <span>Tối ưu hóa quy trình kinh doanh</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">04.</span>
                  <span>Truyền thông hiệu quả</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 stagger">
            <div className="col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-4">Định vị chuyên môn</h3>
                <p className="text-muted-foreground">
                  Chuyên gia phân tích kinh doanh với khả năng kết nối dữ liệu, công nghệ và nhu cầu kinh doanh 
                  để tạo ra giá trị thực sự cho tổ chức.
                </p>
              </div>
            </div>

            <div className="skill-card flex flex-col items-center text-center p-6">
              <Database className="text-primary mb-4 h-10 w-10" />
              <h4 className="font-medium mb-2">Phân tích dữ liệu</h4>
              <p className="text-sm text-muted-foreground">Chuyển đổi dữ liệu thành thông tin hữu ích</p>
            </div>

            <div className="skill-card flex flex-col items-center text-center p-6">
              <PieChart className="text-primary mb-4 h-10 w-10" />
              <h4 className="font-medium mb-2">Business Intelligence</h4>
              <p className="text-sm text-muted-foreground">Xây dựng giải pháp BI hiện đại</p>
            </div>

            <div className="skill-card flex flex-col items-center text-center p-6">
              <LineChart className="text-primary mb-4 h-10 w-10" />
              <h4 className="font-medium mb-2">Phân tích báo cáo</h4>
              <p className="text-sm text-muted-foreground">Cung cấp insights cho lãnh đạo</p>
            </div>

            <div className="skill-card flex flex-col items-center text-center p-6">
              <Presentation className="text-primary mb-4 h-10 w-10" />
              <h4 className="font-medium mb-2">Tư vấn quy trình</h4>
              <p className="text-sm text-muted-foreground">Tối ưu hóa quy trình kinh doanh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
