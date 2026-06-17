import { Badge } from "@/components/ui/badge";
import { AuditLog } from "../types";
import { formatDistanceToNow } from "date-fns";
import { Bot, User, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export function AuditTrail({ logs }: { logs: AuditLog[] }) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
          <tr>
            <th className="px-4 py-3 font-medium">Timestamp</th>
            <th className="px-4 py-3 font-medium">Actor</th>
            <th className="px-4 py-3 font-medium">Action & Target</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {logs.map(log => (
            <tr key={log.id} className="hover:bg-muted/30 transition-colors group">
              <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {log.type === 'LLM Audit' ? (
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-secondary-foreground" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{log.actor}</div>
                    {log.ipAddress && <div className="text-[10px] text-muted-foreground font-mono">{log.ipAddress}</div>}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="font-medium mb-0.5">{log.action}</div>
                <div className="text-xs font-mono text-muted-foreground mb-1">{log.target}</div>
                <p className="text-xs text-muted-foreground max-w-md truncate group-hover:whitespace-normal group-hover:text-foreground transition-all duration-300">
                  {log.details}
                </p>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {log.status === 'Success' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                   log.status === 'Failed' ? <AlertTriangle className="w-4 h-4 text-amber-500" /> :
                   <XCircle className="w-4 h-4 text-destructive" />}
                  <span className="font-medium">{log.status}</span>
                </div>
              </td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                No logs found matching criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
