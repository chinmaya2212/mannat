import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { 
  Database, 
  HardDrive, 
  Filter, 
  Star, 
  LayoutDashboard, 
  Webhook, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Loader2
} from "lucide-react";
import { LineageNodeData } from "../types";
import { cn } from "@/lib/utils";

const typeConfig = {
  source: { icon: Database, bg: "bg-blue-500/10 text-blue-500", border: "border-blue-500/20" },
  stage: { icon: HardDrive, bg: "bg-slate-500/10 text-slate-500", border: "border-slate-500/20" },
  silver: { icon: Filter, bg: "bg-indigo-500/10 text-indigo-500", border: "border-indigo-500/20" },
  gold: { icon: Star, bg: "bg-amber-500/10 text-amber-500", border: "border-amber-500/20" },
  warehouse: { icon: Database, bg: "bg-purple-500/10 text-purple-500", border: "border-purple-500/20" },
  dashboard: { icon: LayoutDashboard, bg: "bg-emerald-500/10 text-emerald-500", border: "border-emerald-500/20" },
  api: { icon: Webhook, bg: "bg-pink-500/10 text-pink-500", border: "border-pink-500/20" },
};

const CustomNode = ({ data, selected }: NodeProps<LineageNodeData>) => {
  const config = typeConfig[data.type] || typeConfig.stage;
  const Icon = config.icon;

  return (
    <div className={cn(
      "px-4 py-3 shadow-md rounded-md bg-card border min-w-[200px] transition-all duration-200",
      selected ? "ring-2 ring-primary border-primary shadow-lg scale-105" : "border-border hover:border-primary/50",
      data.status === 'error' && !selected ? "border-destructive/50" : ""
    )}>
      {/* Top Handle for inputs */}
      {data.type !== "source" && (
        <Handle type="target" position={Position.Left} className="w-2 h-4 rounded-sm bg-muted-foreground/50 border-none" />
      )}

      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-md", config.bg)}>
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {data.type}
            </span>
            {data.status === "success" && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
            {data.status === "warning" && <AlertTriangle className="w-3 h-3 text-amber-500" />}
            {data.status === "error" && <XCircle className="w-3 h-3 text-destructive" />}
            {data.status === "running" && <Loader2 className="w-3 h-3 text-primary animate-spin" />}
          </div>
          <div className="font-medium text-sm truncate mt-0.5" title={data.label}>
            {data.label}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border flex justify-between text-xs text-muted-foreground">
        <span>{data.system || "Unknown System"}</span>
        {data.rowCount ? (
          <span className="font-mono">{new Intl.NumberFormat('en-US', { notation: "compact" }).format(data.rowCount)}</span>
        ) : (
          <span>--</span>
        )}
      </div>

      {/* Right Handle for outputs */}
      {data.type !== "dashboard" && data.type !== "api" && (
        <Handle type="source" position={Position.Right} className="w-2 h-4 rounded-sm bg-muted-foreground/50 border-none" />
      )}
    </div>
  );
};

export default memo(CustomNode);
