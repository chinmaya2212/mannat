import { X, ExternalLink, Info, Activity, Clock, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineageNodeData } from "../types";
import { formatDistanceToNow } from "date-fns";

interface SidePanelProps {
  node: LineageNodeData | null;
  onClose: () => void;
}

export function SidePanel({ node, onClose }: SidePanelProps) {
  if (!node) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-96 bg-card border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300 z-10">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="uppercase text-[10px] tracking-wider font-semibold">
            {node.type}
          </Badge>
          <span className="font-medium text-sm text-muted-foreground">{node.system}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">{node.label}</h2>
          {node.schema && node.table && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono bg-muted/50 w-max px-2 py-1 rounded">
              <Box className="w-3.5 h-3.5" />
              <span>{node.schema}.{node.table}</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">About</h3>
          <p className="text-sm leading-relaxed">
            {node.description || "No description provided."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> Owner
            </span>
            <p className="text-sm font-medium">{node.owner || "Unassigned"}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Status
            </span>
            <Badge variant={node.status === 'success' ? 'default' : node.status === 'error' ? 'destructive' : 'secondary'} className="capitalize text-[10px]">
              {node.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5" /> Rows
            </span>
            <p className="text-sm font-mono">
              {node.rowCount ? new Intl.NumberFormat('en-US').format(node.rowCount) : "--"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Updated
            </span>
            <p className="text-sm font-medium">
              {node.lastRefresh ? formatDistanceToNow(new Date(node.lastRefresh), { addSuffix: true }) : "--"}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Lineage Summary</h3>
          <div className="bg-muted/30 p-3 rounded-md space-y-2 text-sm">
             <div className="flex justify-between">
               <span className="text-muted-foreground">Upstream Dependencies</span>
               <span className="font-medium">2 Nodes</span>
             </div>
             <div className="flex justify-between">
               <span className="text-muted-foreground">Downstream Consumers</span>
               <span className="font-medium">5 Nodes</span>
             </div>
          </div>
          <Button variant="outline" className="w-full text-xs" size="sm">
            <ExternalLink className="w-3.5 h-3.5 mr-2" />
            View Full Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
