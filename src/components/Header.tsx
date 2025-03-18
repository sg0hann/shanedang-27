
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, User, Briefcase, Mail, Linkedin, GraduationCap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/utils/auth";

const navItems = [
  { href: "#about", label: "About", icon: <User className="h-4 w-4 mr-2" /> },
  { href: "#experience", label: "Experience", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { href: "#education", label: "Education", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { href: "#skills", label: "Skills", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
  { href: "#projects", label: "Projects", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { href: "#contact", label: "Contact", icon: <Mail className="h-4 w-4 mr-2" /> },
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
      const sections = ["home", "about", "experience", "education", "skills", "projects", "contact"];
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
    if (sectionId.startsWith("#")) {
      sectionId = sectionId.substring(1);
    }
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
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-heading font-bold flex items-center"
        >
          Shane<span className="text-accent">.Portfolio</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                activeSection === item.href.replace("#", "") ? "text-accent" : "text-foreground/80"
              )}
              onClick={(e) => {
                if (item.href.startsWith('#')) {
                  scrollToSection(item.href, e);
                }
              }}
            >
              {item.label}
            </a>
          ))}
          
          <a
            href="https://www.linkedin.com/in/shane-%C4%91%E1%BA%B7ng-a9183712b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-accent transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          
          {isAuthenticated ? (
            <Button asChild variant="outline" size="sm" className="bg-accent/10 border-accent/30 text-accent hover:bg-accent/20">
              <Link to="/admin">Admin</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm" className="hover:bg-accent/10 hover:text-accent">
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md bg-card/50 border border-border"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-md animate-slide-in-top">
          <nav className="container mx-auto py-4 px-6 flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "py-2 px-4 rounded-md transition-colors flex items-center", 
                  activeSection === item.href.replace("#", "") 
                    ? "bg-accent/10 text-accent font-medium" 
                    : "hover:bg-secondary"
                )}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    scrollToSection(item.href, e);
                  }
                }}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
            
            <a
              href="https://www.linkedin.com/in/shane-%C4%91%E1%BA%B7ng-a9183712b/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-md transition-colors flex items-center"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </a>
            
            {isAuthenticated ? (
              <Button asChild className="mt-2 w-full bg-accent text-background hover:bg-accent/90">
                <Link to="/admin">Admin</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="mt-2 w-full">
                <Link to="/login" className="flex items-center justify-center gap-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
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
