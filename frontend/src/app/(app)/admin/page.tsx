"use client";

import { useState } from "react";
import { Settings, Plug, Bot, Users, ShieldAlert, Database } from "lucide-react";
import { ConnectorsGrid } from "@/features/admin/components/ConnectorsGrid";
import { AIConfigForm } from "@/features/admin/components/AIConfigForm";
import { UserManagementTable } from "@/features/admin/components/UserManagementTable";
import { cn } from "@/lib/utils";

type AdminSection = "connectors" | "llm" | "security" | "users";

export default function AdminCenterPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>("connectors");

  const renderSection = () => {
    switch (activeSection) {
      case "connectors":
        return <ConnectorsGrid />;
      case "llm":
        return <AIConfigForm />;
      case "users":
        return <UserManagementTable />;
      case "security":
        return (
          <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-card border border-border rounded-lg shadow-sm">
            <ShieldAlert className="w-12 h-12 mb-4 opacity-20" />
            <h3 className="text-lg font-medium text-foreground mb-2">Security Settings</h3>
            <p className="text-center max-w-md">Global security settings, password policies, and SSO configuration are currently managed via Terraform.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="p-6 border-b border-border bg-card/50 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Platform Administration
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage connectors, AI configurations, users, and global settings.
          </p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r border-border bg-card overflow-y-auto hidden md:block">
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveSection("connectors")}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeSection === "connectors" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Plug className="w-4 h-4" /> Data Connectors
            </button>
            <button
              onClick={() => setActiveSection("llm")}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeSection === "llm" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Bot className="w-4 h-4" /> AI & Vector DB
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeSection === "users" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Users className="w-4 h-4" /> User Management
            </button>
            <button
              onClick={() => setActiveSection("security")}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeSection === "security" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <ShieldAlert className="w-4 h-4" /> Security Settings
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-muted/10">
          <div className="max-w-5xl mx-auto">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
