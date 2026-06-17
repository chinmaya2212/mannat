import { Database, FileText, Code, Settings, Link } from "lucide-react";
import { mockContextItems } from "../data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ContextPanel() {
  return (
    <div className="w-80 flex-shrink-0 bg-card border-l border-border h-full flex flex-col hidden xl:flex">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <Database className="w-4 h-4 text-muted-foreground" />
          Active Context
        </h2>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            Attached Assets
            <Badge variant="secondary" className="text-[10px]">2</Badge>
          </h3>
          
          <div className="space-y-2">
            {mockContextItems.map((item, idx) => (
              <div key={idx} className="p-3 border border-border rounded-lg bg-background hover:border-primary/50 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-[10px] bg-muted/50">{item.type}</Badge>
                  <Link className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-sm font-medium text-primary group-hover:underline truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full text-xs border-dashed bg-transparent" size="sm">
            + Add Context
          </Button>
        </div>

        <div className="space-y-3 pt-6 border-t border-border">
           <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Environment Status
          </h3>
          <div className="p-3 bg-muted/30 rounded-lg space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Target Warehouse</span>
              <span className="font-medium flex items-center gap-1.5"><Database className="w-3 h-3 text-blue-500" /> Snowflake</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Orchestrator</span>
              <span className="font-medium flex items-center gap-1.5"><Code className="w-3 h-3 text-green-500" /> dbt Cloud</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Catalog</span>
              <span className="font-medium flex items-center gap-1.5"><FileText className="w-3 h-3 text-purple-500" /> Mannat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
