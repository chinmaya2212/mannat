"use client";

import { useState } from "react";
import { Bell, Search, User, MessageSquare } from "lucide-react";
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

export function TopNav() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96 hidden lg:block">
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

        <Button variant="outline" size="sm" className="hidden md:flex gap-2" onClick={() => setShowFeedback(true)}>
          <MessageSquare className="h-4 w-4" />
          Feedback
        </Button>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border border-card" />
        </Button>

        <FeedbackModal open={showFeedback} onOpenChange={setShowFeedback} />

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-9 w-9 rounded-full ml-1 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-center border-0 bg-transparent cursor-pointer">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="@user" />
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
