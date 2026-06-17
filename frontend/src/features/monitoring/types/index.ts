export type JobStatus = "Running" | "Success" | "Failed" | "Queued" | "Skipped";

export interface PipelineJob {
  id: string;
  name: string;
  pipelineName: string;
  status: JobStatus;
  startTime: string;
  durationMs?: number;
  errorMessage?: string;
}

export interface LatencyData {
  time: string;
  avgLatencyMs: number;
  maxLatencyMs: number;
}
