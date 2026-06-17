import { Activity, Play, Pause, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobStatusGrid } from "@/features/monitoring/components/JobStatusGrid";
import { PipelineLatencyChart } from "@/features/monitoring/components/PipelineLatencyChart";

export default function MonitoringCenterPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="p-6 border-b border-border bg-card/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            Monitoring Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time observability into pipeline executions and system health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Pause className="w-4 h-4 mr-2" />
            Pause All Jobs
          </Button>
          <Button variant="default">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="xl:col-span-1">
             <JobStatusGrid />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-6">
            <PipelineLatencyChart />
            {/* Additional cards could go here, like server resources or active alerts */}
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 text-center text-muted-foreground">
               <p className="text-sm">Additional telemetry metrics (CPU, Memory, Network) are streaming.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
