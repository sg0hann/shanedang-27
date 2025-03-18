
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type VisitorData = {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: Record<string, number>;
  lastUpdated: string;
  contactRequests: ContactRequest[];
  visitorEmails: VisitorEmail[];
};

export type VisitorEmail = {
  email: string;
  firstVisit: string;
  lastVisit: string;
  visitCount: number;
};

export type ContactRequest = {
  name: string;
  email: string;
  message: string;
  date: string;
};

type AnalyticsContextType = {
  visitorData: VisitorData;
  recordPageView: (path: string) => void;
  addContactRequest: (request: Omit<ContactRequest, "date">) => void;
  recordVisitorEmail: (email: string) => void;
};

const defaultVisitorData: VisitorData = {
  totalVisits: 0,
  uniqueVisitors: 0,
  pageViews: {},
  lastUpdated: new Date().toISOString(),
  contactRequests: [],
  visitorEmails: []
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [visitorData, setVisitorData] = useState<VisitorData>(() => {
    const storedData = localStorage.getItem("visitorData");
    return storedData ? JSON.parse(storedData) : defaultVisitorData;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("visitorData", JSON.stringify(visitorData));
  }, [visitorData]);

  // Track sessions to prevent counting refreshes as new visits
  const [sessionStarted, setSessionStarted] = useState(false);

  // Create a unique visitor ID if none exists and track the session
  useEffect(() => {
    const visitorId = localStorage.getItem("visitorId");
    
    if (!visitorId) {
      localStorage.setItem("visitorId", crypto.randomUUID());
      setVisitorData(prev => ({
        ...prev,
        uniqueVisitors: prev.uniqueVisitors + 1
      }));
    }
    
    // Track session so we don't count page refreshes as new visits
    if (!sessionStarted) {
      setSessionStarted(true);
      setVisitorData(prev => ({
        ...prev,
        totalVisits: prev.totalVisits + 1,
        lastUpdated: new Date().toISOString()
      }));
    }
    
    // Clean up session when the window is closed
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("sessionActive");
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    sessionStorage.setItem("sessionActive", "true");
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sessionStarted]);

  const recordPageView = (path: string) => {
    setVisitorData(prev => {
      const updatedPageViews = { ...prev.pageViews };
      updatedPageViews[path] = (updatedPageViews[path] || 0) + 1;
      
      return {
        ...prev,
        pageViews: updatedPageViews,
        lastUpdated: new Date().toISOString()
      };
    });
  };
  
  const addContactRequest = (request: Omit<ContactRequest, "date">) => {
    setVisitorData(prev => {
      const newRequest: ContactRequest = {
        ...request,
        date: new Date().toISOString()
      };
      
      // Also record the email if it's not already recorded
      recordVisitorEmail(request.email);
      
      return {
        ...prev,
        contactRequests: [...prev.contactRequests, newRequest]
      };
    });
  };
  
  const recordVisitorEmail = (email: string) => {
    if (!email) return;
    
    setVisitorData(prev => {
      const currentTime = new Date().toISOString();
      const existingEmailIndex = prev.visitorEmails.findIndex(
        visitor => visitor.email === email
      );
      
      let updatedVisitorEmails = [...prev.visitorEmails];
      
      if (existingEmailIndex >= 0) {
        // Update existing email record
        updatedVisitorEmails[existingEmailIndex] = {
          ...updatedVisitorEmails[existingEmailIndex],
          lastVisit: currentTime,
          visitCount: updatedVisitorEmails[existingEmailIndex].visitCount + 1
        };
      } else {
        // Add new email record
        updatedVisitorEmails.push({
          email,
          firstVisit: currentTime,
          lastVisit: currentTime,
          visitCount: 1
        });
      }
      
      return {
        ...prev,
        visitorEmails: updatedVisitorEmails
      };
    });
  };

  return (
    <AnalyticsContext.Provider value={{ visitorData, recordPageView, addContactRequest, recordVisitorEmail }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};
