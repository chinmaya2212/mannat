import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlayCircle, CheckCircle2, XCircle, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { mockJobs } from "../data/mockData";
import { formatDistanceToNow } from "date-fns";

export function JobStatusGrid() {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader>
        <CardTitle className="text-lg">Recent Pipeline Executions</CardTitle>
        <CardDescription>Live status of your data pipelines and individual jobs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockJobs.map(job => (
            <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {job.status === 'Success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {job.status === 'Failed' && <XCircle className="w-5 h-5 text-destructive" />}
                  {job.status === 'Running' && <RefreshCw className="w-5 h-5 text-primary animate-spin" />}
                  {job.status === 'Queued' && <Clock className="w-5 h-5 text-amber-500" />}
                  {job.status === 'Skipped' && <PlayCircle className="w-5 h-5 text-muted-foreground opacity-50" />}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{job.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">Pipeline: {job.pipelineName}</p>
                  {job.errorMessage && (
                    <div className="flex items-center gap-1.5 text-[11px] text-destructive mt-2 bg-destructive/10 p-1.5 rounded w-fit">
                      <AlertTriangle className="w-3 h-3" />
                      {job.errorMessage}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between mt-4 sm:mt-0">
                <Badge variant={
                  job.status === 'Success' ? 'secondary' : 
                  job.status === 'Failed' ? 'destructive' : 
                  job.status === 'Running' ? 'default' : 'outline'
                } className={job.status === 'Success' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' : ''}>
                  {job.status}
                </Badge>
                <div className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(new Date(job.startTime), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
