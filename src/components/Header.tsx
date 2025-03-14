
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/utils/auth";

const navItems = [
  { href: "#home", label: "Trang chủ" },
  { href: "#about", label: "Giới thiệu" },
  { href: "#experience", label: "Kinh nghiệm" },
  { href: "#skills", label: "Kỹ năng" },
  { href: "#projects", label: "Dự án" },
  { href: "#certifications", label: "Chứng chỉ" },
  { href: "#resources", label: "Tài nguyên" },
  { href: "#contact", label: "Liên hệ" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isAuthenticated } = useAuth();

  // Handle scroll events for styling and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Find the current active section based on scroll position
      const sections = navItems.map(item => item.href.replace("#", ""));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Adjust for header height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4", 
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-heading font-bold gradient-text"
        >
          Business Analyst
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link",
                activeSection === item.href.replace("#", "") && "active"
              )}
              onClick={(e) => scrollToSection(item.href.replace("#", ""), e)}
            >
              {item.label}
            </a>
          ))}
          
          {isAuthenticated ? (
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">Quản trị</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                <span>Đăng nhập</span>
              </Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-md animate-slide-in-bottom">
          <nav className="container mx-auto py-4 px-6 flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "py-2 px-4 rounded-md transition-colors", 
                  activeSection === item.href.replace("#", "") 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-secondary"
                )}
                onClick={(e) => scrollToSection(item.href.replace("#", ""), e)}
              >
                {item.label}
              </a>
            ))}
            
            {isAuthenticated ? (
              <Button asChild className="mt-2 w-full">
                <Link to="/admin">Quản trị</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="mt-2 w-full">
                <Link to="/login" className="flex items-center justify-center gap-1">
                  <LogIn className="h-4 w-4" />
                  <span>Đăng nhập</span>
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
