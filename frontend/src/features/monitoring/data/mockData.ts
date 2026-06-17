import { PipelineJob, LatencyData } from "../types";

export const mockJobs: PipelineJob[] = [
  { id: "job_001", name: "Extract CRM Data", pipelineName: "Daily CRM Sync", status: "Success", startTime: "2023-10-27T08:00:00Z", durationMs: 45000 },
  { id: "job_002", name: "Transform Orders", pipelineName: "Finance Mart Load", status: "Failed", startTime: "2023-10-27T08:05:00Z", durationMs: 12000, errorMessage: "Out of memory error in worker node" },
  { id: "job_003", name: "Load Snowflake", pipelineName: "Finance Mart Load", status: "Skipped", startTime: "2023-10-27T08:06:00Z" },
  { id: "job_004", name: "Sync Marketing Events", pipelineName: "Event Stream", status: "Running", startTime: "2023-10-27T09:15:00Z" },
  { id: "job_005", name: "Run dbt tests", pipelineName: "Data Quality Check", status: "Queued", startTime: "2023-10-27T09:20:00Z" },
  { id: "job_006", name: "Materialize Views", pipelineName: "Analytics Refresh", status: "Success", startTime: "2023-10-27T07:30:00Z", durationMs: 320000 },
];

export const mockLatencyData: LatencyData[] = [
  { time: '08:00', avgLatencyMs: 200, maxLatencyMs: 300 },
  { time: '08:15', avgLatencyMs: 210, maxLatencyMs: 320 },
  { time: '08:30', avgLatencyMs: 190, maxLatencyMs: 290 },
  { time: '08:45', avgLatencyMs: 800, maxLatencyMs: 1500 }, // Spike
  { time: '09:00', avgLatencyMs: 220, maxLatencyMs: 350 },
  { time: '09:15', avgLatencyMs: 230, maxLatencyMs: 400 },
  { time: '09:30', avgLatencyMs: 205, maxLatencyMs: 310 },
];
