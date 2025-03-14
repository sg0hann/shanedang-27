
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
    // Record page view
    recordPageView("/");
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [recordPageView]);
  
  return (
    <div className="flex flex-col min-h-screen">
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
