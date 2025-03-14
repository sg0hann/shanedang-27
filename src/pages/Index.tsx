
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import ContactSection from "@/components/sections/ContactSection";
import { useAnalytics } from "@/utils/analytics";

const Index = () => {
  const { recordPageView } = useAnalytics();
  
  useEffect(() => {
    // Record page view - only once when component mounts
    recordPageView("/");
    
    // Ensure scroll behavior is smooth
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Force scroll to top when the page loads
    window.scrollTo(0, 0);
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []); // Empty dependency array to run only once
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ResourcesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
