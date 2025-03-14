
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type VisitorData = {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: Record<string, number>;
  lastUpdated: string;
};

type AnalyticsContextType = {
  visitorData: VisitorData;
  recordPageView: (path: string) => void;
};

const defaultVisitorData: VisitorData = {
  totalVisits: 0,
  uniqueVisitors: 0,
  pageViews: {},
  lastUpdated: new Date().toISOString()
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

  // Create a unique visitor ID if none exists
  useEffect(() => {
    const visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
      localStorage.setItem("visitorId", crypto.randomUUID());
      setVisitorData(prev => ({
        ...prev,
        uniqueVisitors: prev.uniqueVisitors + 1
      }));
    }
  }, []);

  const recordPageView = (path: string) => {
    setVisitorData(prev => {
      const updatedPageViews = { ...prev.pageViews };
      updatedPageViews[path] = (updatedPageViews[path] || 0) + 1;
      
      return {
        ...prev,
        totalVisits: prev.totalVisits + 1,
        pageViews: updatedPageViews,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  return (
    <AnalyticsContext.Provider value={{ visitorData, recordPageView }}>
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
