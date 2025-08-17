import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  FileText,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  UserCheck,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole: "patient" | "doctor" | "admin";
}

export function Sidebar({ isOpen, onToggle, userRole }: SidebarProps) {
  const getNavigationItems = () => {
    switch (userRole) {
      case "patient":
        return [
          { name: "Dashboard", href: "/patient/dashboard", icon: Home },
          { name: "Book Appointment", href: "/patient/book-appointment", icon: Calendar },
          { name: "My Appointments", href: "/patient/appointments", icon: ClipboardList },
          { name: "Medical History", href: "/patient/medical-history", icon: FileText },
          { name: "Profile", href: "/patient/profile", icon: User },
        ];
      case "doctor":
        return [
          { name: "Dashboard", href: "/doctor/dashboard", icon: Home },
          { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
          { name: "Patients", href: "/doctor/patients", icon: Users },
          { name: "Medical Records", href: "/doctor/medical-records", icon: FileText },
          { name: "Profile", href: "/doctor/profile", icon: User },
        ];
      case "admin":
        return [
          { name: "Dashboard", href: "/admin/dashboard", icon: Home },
          { name: "Doctors", href: "/admin/doctors", icon: UserCheck },
          { name: "Patients", href: "/admin/patients", icon: Users },
          { name: "Analytics", href: "/admin/analytics", icon: Activity },
          { name: "Settings", href: "/admin/settings", icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <aside
      className={cn(
        "fixed left-0 top-header h-[calc(100vh-var(--header-height))] bg-sidebar border-r border-sidebar-border transition-all duration-300 z-30",
        isOpen ? "w-sidebar" : "w-sidebar-collapsed"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {isOpen && (
            <h2 className="text-lg font-semibold text-sidebar-foreground">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "nav-link",
                isActive && "active",
                !isOpen && "justify-center px-2"
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-sidebar-accent rounded-lg">
            <p className="text-xs text-sidebar-accent-foreground">
              Need help? Contact support
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}