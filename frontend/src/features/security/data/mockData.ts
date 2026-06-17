import { ComplianceScore, SecurityAlert, AuditLog } from "../types";

export const mockComplianceScores: ComplianceScore[] = [
  { framework: "GDPR", score: 92, status: "Compliant", openIssues: 2 },
  { framework: "HIPAA", score: 78, status: "At Risk", openIssues: 5 },
  { framework: "SOC2", score: 98, status: "Compliant", openIssues: 0 },
];

export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: "sec_001",
    title: "Unmasked PII detected in test environment",
    description: "Email addresses were found in plain text in the dev_marts.users table.",
    severity: "Critical",
    timestamp: "2023-10-27T09:15:00Z",
    category: "PII Detection",
    assetAffected: "dev_marts.users"
  },
  {
    id: "sec_002",
    title: "Excessive grants to Data Scientist role",
    description: "Role 'data_scientist' has been granted DELETE privileges on raw schemas.",
    severity: "High",
    timestamp: "2023-10-26T14:30:00Z",
    category: "RBAC Violation",
    assetAffected: "raw.public"
  },
  {
    id: "sec_003",
    title: "Wide data exposure risk",
    description: "A public dashboard 'Global Sales' is exposing transaction-level details without aggregation.",
    severity: "High",
    timestamp: "2023-10-25T11:00:00Z",
    category: "Data Exposure",
    assetAffected: "dashboard.global_sales"
  },
  {
    id: "sec_004",
    title: "New PII classification pending review",
    description: "Column 'ssn' in table 'hr_data' was auto-tagged as PII but not confirmed.",
    severity: "Medium",
    timestamp: "2023-10-24T16:45:00Z",
    category: "PII Detection",
    assetAffected: "raw.hr_data.ssn"
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "log_001",
    type: "LLM Audit",
    actor: "Refactor Agent",
    action: "Generated SQL Refactor",
    target: "marts_finance.daily_revenue",
    timestamp: "2023-10-27T10:31:00Z",
    status: "Success",
    details: "Agent generated refactored SQL clustering by date and region."
  },
  {
    id: "log_002",
    type: "User Access",
    actor: "jane.doe@mannat.io",
    action: "Viewed Asset Details",
    target: "raw.stripe_payments",
    timestamp: "2023-10-27T10:25:00Z",
    ipAddress: "192.168.1.104",
    status: "Denied",
    details: "User attempted to view restricted PII schema without adequate RBAC grants."
  },
  {
    id: "log_003",
    type: "LLM Audit",
    actor: "Security Agent",
    action: "Scanned PR #1402",
    target: "prod_warehouse.dim_users",
    timestamp: "2023-10-27T08:31:00Z",
    status: "Success",
    details: "Agent flagged 'phone_number' column as PII."
  },
  {
    id: "log_004",
    type: "User Access",
    actor: "admin@mannat.io",
    action: "Modified Role Grants",
    target: "Role: data_scientist",
    timestamp: "2023-10-26T14:28:00Z",
    ipAddress: "10.0.0.5",
    status: "Success",
    details: "Admin granted DELETE on raw.public (Triggered Alert sec_002)."
  }
];
