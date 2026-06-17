"use client";

import { Send, Bot, User, Sparkles, Code, FileText, Database, GitMerge, ShieldCheck, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockChatHistory, mockSuggestedActions } from "../data/mockData";
import { AgentRole } from "../types";
import { cn } from "@/lib/utils";

export function ChatInterface() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background relative">
      {/* Top Bar showing active agent */}
      <div className="h-14 border-b border-border bg-card/50 flex items-center px-6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-semibold text-sm">Mannat Copilot</span>
          <span className="text-muted-foreground text-sm mx-2">/</span>
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" /> Refactor Agent
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {mockChatHistory.map((msg) => (
          <div key={msg.id} className={cn("flex gap-4 max-w-4xl", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
            )}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            
            <div className={cn("space-y-2", msg.role === 'user' ? "items-end" : "items-start")}>
              {msg.role === 'agent' && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <AgentIcon role={msg.agentRole!} />
                  <span className="font-medium">{msg.agentRole}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
              )}

              {msg.isCode ? (
                <div className="bg-muted border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto w-full">
                  <pre><code>{msg.content}</code></pre>
                </div>
              ) : (
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border rounded-tl-sm"
                )}>
                  {msg.content}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Suggested Actions */}
        <div className="flex flex-wrap gap-2 pt-4">
          {mockSuggestedActions.map(action => (
            <Button key={action.id} variant="outline" size="sm" className="rounded-full bg-background hover:bg-muted/50 border-border/50 text-xs">
              <Sparkles className="w-3 h-3 mr-2 text-primary" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background shrink-0">
        <div className="max-w-4xl mx-auto relative flex items-center">
          <Input 
            placeholder="Ask Copilot to refactor SQL, write documentation, or analyze impact..." 
            className="h-14 pl-4 pr-14 rounded-xl border-border bg-card shadow-sm text-base focus-visible:ring-primary/50"
          />
          <Button size="icon" className="absolute right-2 h-10 w-10 rounded-lg">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">
          AI agents can make mistakes. Verify code before executing in production.
        </p>
      </div>
    </div>
  );
}

function AgentIcon({ role }: { role: AgentRole }) {
  switch(role) {
    case "Metadata Agent": return <FileText className="w-3.5 h-3.5" />;
    case "Validation Agent": return <ShieldCheck className="w-3.5 h-3.5" />;
    case "Lineage Agent": return <GitMerge className="w-3.5 h-3.5" />;
    case "Refactor Agent": return <Code className="w-3.5 h-3.5" />;
    case "Security Agent": return <Database className="w-3.5 h-3.5" />;
    case "Governance Agent": return <Scale className="w-3.5 h-3.5" />;
    default: return <Bot className="w-3.5 h-3.5" />;
  }
}
