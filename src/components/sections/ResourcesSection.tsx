
import { Book, ExternalLink, FileTerminal, BookOpen, Video, FileText, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

type ResourceCategory = "books" | "tools" | "courses" | "articles";

interface Resource {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  category: ResourceCategory;
}

const resources: Resource[] = [
  // Books
  {
    title: "Business Analysis Body of Knowledge (BABOK Guide)",
    description: "Hướng dẫn toàn diện về các khái niệm, kỹ thuật và thực tiễn tốt nhất trong lĩnh vực phân tích kinh doanh.",
    link: "#",
    icon: <Book className="h-5 w-5" />,
    category: "books"
  },
  {
    title: "Data Science for Business",
    description: "Sách về cách áp dụng khoa học dữ liệu vào các vấn đề kinh doanh thực tế.",
    link: "#",
    icon: <Book className="h-5 w-5" />,
    category: "books"
  },
  
  // Tools
  {
    title: "Power BI",
    description: "Công cụ phân tích và trực quan hóa dữ liệu mạnh mẽ của Microsoft.",
    link: "https://powerbi.microsoft.com/",
    icon: <FileTerminal className="h-5 w-5" />,
    category: "tools"
  },
  {
    title: "Tableau",
    description: "Nền tảng phân tích dữ liệu trực quan cho phép tạo dashboard tương tác.",
    link: "https://www.tableau.com/",
    icon: <FileTerminal className="h-5 w-5" />,
    category: "tools"
  },
  
  // Courses
  {
    title: "Business Analysis Fundamentals",
    description: "Khóa học cơ bản về phân tích kinh doanh và các kỹ thuật phân tích.",
    link: "#",
    icon: <BookOpen className="h-5 w-5" />,
    category: "courses"
  },
  {
    title: "Data Analysis with Excel",
    description: "Khóa học toàn diện về phân tích dữ liệu với Microsoft Excel.",
    link: "#",
    icon: <Video className="h-5 w-5" />,
    category: "courses"
  },
  
  // Articles
  {
    title: "10 Tips for Effective Data Visualization",
    description: "Bài viết về cách tạo biểu đồ và dashboard hiệu quả.",
    link: "#",
    icon: <FileText className="h-5 w-5" />,
    category: "articles"
  },
  {
    title: "The Future of Business Analysis",
    description: "Phân tích xu hướng và tương lai của lĩnh vực BA.",
    link: "#",
    icon: <Coffee className="h-5 w-5" />,
    category: "articles"
  }
];

export function ResourcesSection() {
  const resourceCategories = [
    { value: "books", label: "Sách", icon: <Book className="h-4 w-4" /> },
    { value: "tools", label: "Công cụ", icon: <FileTerminal className="h-4 w-4" /> },
    { value: "courses", label: "Khóa học", icon: <BookOpen className="h-4 w-4" /> },
    { value: "articles", label: "Bài viết", icon: <FileText className="h-4 w-4" /> }
  ];
  
  return (
    <section id="resources" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center mx-auto">Tài nguyên & Công cụ</h2>
          <p className="text-muted-foreground mt-4">
            Các tài nguyên, công cụ và tài liệu hữu ích cho những ai quan tâm đến lĩnh vực phân tích kinh doanh.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resourceCategories.map((category) => (
            <div 
              key={category.value} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                {category.icon}
              </div>
              <h3 className="font-medium mb-2">{category.label}</h3>
              <p className="text-sm text-muted-foreground">
                {category.value === "books" && "Sách và tài liệu tham khảo hàng đầu về phân tích kinh doanh."}
                {category.value === "tools" && "Công cụ và phần mềm thiết yếu cho các BA chuyên nghiệp."}
                {category.value === "courses" && "Khóa học và chứng chỉ để nâng cao kỹ năng của bạn."}
                {category.value === "articles" && "Bài viết và blog hay về các xu hướng và thực tiễn tốt nhất."}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <Button asChild variant="link" size="sm" className="px-0">
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary"
                    >
                      <span>Khám phá</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResourcesSection;
