import { CheckCircle2, Clock, XCircle, AlertCircle, User, Bot, ShieldCheck, CheckSquare } from "lucide-react";
import { WorkflowStage } from "../types";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export function ApprovalTimeline({ stages }: { stages: WorkflowStage[] }) {
  return (
    <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent mt-4 mb-4">
      {stages.map((stage, idx) => {
        const isCompleted = stage.status === "Completed";
        const isFailed = stage.status === "Failed";
        const inProgress = stage.status === "In Progress";
        
        return (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm",
              isCompleted ? "bg-emerald-500 text-primary-foreground" : 
              isFailed ? "bg-destructive text-destructive-foreground" : 
              inProgress ? "bg-amber-500 text-primary-foreground animate-pulse" : 
              "bg-muted text-muted-foreground"
            )}>
              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : 
               isFailed ? <XCircle className="w-4 h-4" /> : 
               inProgress ? <Clock className="w-4 h-4" /> : 
               <div className="w-2 h-2 rounded-full bg-current" />}
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h4 className={cn("font-bold text-sm", isFailed ? "text-destructive" : inProgress ? "text-amber-500" : isCompleted ? "text-emerald-500" : "text-muted-foreground")}>
                  {stage.stageName}
                </h4>
                {stage.timestamp && (
                  <time className="text-[10px] font-medium text-muted-foreground">
                    {formatDistanceToNow(new Date(stage.timestamp), { addSuffix: true })}
                  </time>
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
                {stage.stageName === "Agent Review" ? <Bot className="w-3 h-3" /> : 
                 stage.stageName.includes("SME") ? <ShieldCheck className="w-3 h-3" /> : 
                 stage.stageName.includes("Approval") ? <CheckSquare className="w-3 h-3" /> :
                 <User className="w-3 h-3" />}
                {stage.actor}
              </p>
              {stage.comments && (
                <div className="text-sm bg-muted/50 p-2 rounded border border-border mt-2">
                  <p className="text-muted-foreground italic">&quot;{stage.comments}&quot;</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
