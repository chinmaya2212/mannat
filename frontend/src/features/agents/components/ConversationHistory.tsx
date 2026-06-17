import { MessageSquare, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockConversations } from "../data/mockData";
import { formatDistanceToNow } from "date-fns";

export function ConversationHistory() {
  return (
    <div className="w-72 flex-shrink-0 bg-card border-r border-border h-full flex flex-col hidden lg:flex">
      <div className="p-4 border-b border-border space-y-4">
        <Button className="w-full justify-start" variant="default">
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search history..." className="pl-9 bg-background h-9 text-sm" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2">
          Recent
        </h3>
        {mockConversations.map((conv) => (
          <button 
            key={conv.id} 
            className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm group"
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="overflow-hidden">
                <p className="font-medium truncate">{conv.title}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="truncate">{conv.agentRole}</span>
                  <span>•</span>
                  <span className="whitespace-nowrap">{formatDistanceToNow(new Date(conv.lastUpdated))}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
