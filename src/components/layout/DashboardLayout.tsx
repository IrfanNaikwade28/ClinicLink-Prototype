import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "patient" | "doctor" | "admin";
  userName?: string;
}

export function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onToggleSidebar={toggleSidebar}
        userRole={userRole}
        userName={userName}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          userRole={userRole}
        />
        
        <main
          className={cn(
            "flex-1 pt-header transition-all duration-300",
            sidebarOpen ? "ml-sidebar" : "ml-sidebar-collapsed"
          )}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}