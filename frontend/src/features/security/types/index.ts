export type SeverityLevel = "Critical" | "High" | "Medium" | "Low";
export type LogType = "LLM Audit" | "User Access";

export interface ComplianceScore {
  framework: "GDPR" | "HIPAA" | "SOC2";
  score: number;
  status: "Compliant" | "At Risk" | "Non-Compliant";
  openIssues: number;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  timestamp: string;
  category: "Data Exposure" | "PII Detection" | "RBAC Violation";
  assetAffected: string;
}

export interface AuditLog {
  id: string;
  type: LogType;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress?: string;
  status: "Success" | "Failed" | "Denied";
  details: string;
}
