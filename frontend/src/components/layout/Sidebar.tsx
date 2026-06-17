"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  GitBranch, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Bot, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Lineage Studio", href: "/lineage", icon: GitBranch },
  { name: "Data Catalog", href: "/catalog", icon: BookOpen },
  { name: "Validation Center", href: "/validation", icon: CheckCircle },
  { name: "Impact Analysis", href: "/impact", icon: AlertTriangle },
  { name: "Agent Workspace", href: "/agents", icon: Bot },
  { name: "Governance Center", href: "/governance", icon: ShieldCheck },
  { name: "Security Center", href: "/security", icon: Lock },
  { name: "Monitoring Center", href: "/monitoring", icon: Activity },
  { name: "Administration", href: "/admin", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col hidden md:flex h-full">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">Mannat.io</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Check if current pathname starts with the item's href. 
            // For example, /catalog/123 should still highlight Data Catalog.
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-secondary text-foreground" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
