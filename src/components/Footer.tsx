
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Business Analyst Portfolio</h3>
            <p className="text-muted-foreground mb-4">
              Showcasing my skills, experience, and projects in the field of business analysis.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Github"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/shane-%C4%91%E1%BA%B7ng-a9183712b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:shane.mccormick0212@gmail.com" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:0978493317" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-muted-foreground">
              <p>Ho Chi Minh City, Vietnam</p>
              <p className="mt-2">
                <a href="mailto:shane.mccormick0212@gmail.com" className="hover:text-foreground transition-colors">
                  shane.mccormick0212@gmail.com
                </a>
              </p>
              <p className="mt-1">
                <a href="tel:0978493317" className="hover:text-foreground transition-colors">
                  0978493317
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Shane Portfolio. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
