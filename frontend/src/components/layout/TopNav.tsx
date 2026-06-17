"use client";

import { useState } from "react";
import { Bell, Search, User, MessageSquare, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeedbackModal } from "@/components/FeedbackModal";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { navItems } from "./Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function TopNav() {
  const [showFeedback, setShowFeedback] = useState(false);
  const pathname = usePathname();

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 shrink-0 gap-2 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        <Sheet>
          <SheetTrigger className="md:hidden flex-shrink-0 text-muted-foreground hover:text-foreground p-2 -ml-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 flex flex-col bg-card border-r-border">
            <div className="h-16 flex items-center px-6 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">M</span>
                </div>
                <span className="text-lg font-semibold text-foreground tracking-tight">Mannat.io</span>
              </SheetTitle>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1 px-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors",
                        isActive 
                          ? "bg-secondary text-foreground" 
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <div className="relative w-full max-w-sm hidden md:block lg:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search data assets, pipelines, agents..."
            className="w-full pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 mr-2">
          <span className="text-sm text-muted-foreground font-medium">Environment:</span>
          <Select defaultValue="production">
            <SelectTrigger className="w-[140px] h-9 bg-muted/50 border-transparent">
              <SelectValue placeholder="Select Env" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="flex gap-2 px-2 sm:px-3" onClick={() => setShowFeedback(true)}>
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Feedback</span>
        </Button>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border border-card" />
        </Button>

        <FeedbackModal open={showFeedback} onOpenChange={setShowFeedback} />

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-9 w-9 rounded-full ml-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center justify-center border-0 cursor-pointer p-0">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=DataEngineer" alt="@user" />
              <AvatarFallback className="bg-primary/10 text-primary">DE</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Data Engineer</p>
                <p className="text-xs leading-none text-muted-foreground">
                  engineer@mannat.io
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert("Dummy Data: User Profile Info")}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert("Dummy Data: User Settings")}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert("Dummy Data: Logged out successfully")}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
