import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, AlertTriangle, ShieldAlert, PlayCircle } from "lucide-react";
import { ValidationExecution } from "../types";

export function ValidationTable({ executions }: { executions: ValidationExecution[] }) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
          <tr>
            <th className="px-4 py-3 font-medium">Rule Name</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Target Table</th>
            <th className="px-4 py-3 font-medium">Severity</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Execution Time</th>
          </tr>
        </thead>
        <tbody>
          {executions.map((exec) => (
            <tr key={exec.executionId} className="border-b border-border hover:bg-muted/30 transition-colors">
              <td className="px-4 py-4">
                <div className="font-medium text-primary hover:underline cursor-pointer">{exec.ruleName}</div>
                {exec.errorMessage && (
                  <div className="text-xs text-destructive mt-1 truncate max-w-xs" title={exec.errorMessage}>
                    {exec.errorMessage}
                  </div>
                )}
              </td>
              <td className="px-4 py-4">
                <Badge variant="outline" className="text-[10px] uppercase">{exec.type}</Badge>
              </td>
              <td className="px-4 py-4 font-mono text-xs text-muted-foreground">
                {exec.targetTable}
              </td>
              <td className="px-4 py-4">
                <Badge variant={
                  exec.severity === 'Critical' ? 'destructive' : 
                  exec.severity === 'High' ? 'default' : 
                  'secondary'
                } className="text-[10px] uppercase">
                  {exec.severity}
                </Badge>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  {exec.status === 'Passed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {exec.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  {exec.status === 'Failed' && <ShieldAlert className="w-4 h-4 text-destructive" />}
                  {exec.status === 'Running' && <PlayCircle className="w-4 h-4 text-primary animate-pulse" />}
                  <span className="font-medium">{exec.status}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-right text-muted-foreground text-xs">
                {formatDistanceToNow(new Date(exec.startTime), { addSuffix: true })}
                <div className="text-[10px] opacity-70 mt-0.5">{exec.durationMs}ms</div>
              </td>
            </tr>
          ))}
          {executions.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                No validations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
