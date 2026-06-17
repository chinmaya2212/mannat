export type ApprovalStatus = "Pending" | "Approved" | "Rejected" | "SME Review";
export type ChangeType = "Schema Change" | "Business Logic" | "Access Grant" | "Pipeline Modification";

export interface WorkflowStage {
  stageName: string;
  status: "Completed" | "In Progress" | "Pending" | "Failed";
  actor: string;
  timestamp?: string;
  comments?: string;
}

export interface GovernanceRequest {
  id: string;
  title: string;
  requester: string;
  changeType: ChangeType;
  status: ApprovalStatus;
  targetAsset: string;
  description: string;
  submittedAt: string;
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  workflow: WorkflowStage[];
}
