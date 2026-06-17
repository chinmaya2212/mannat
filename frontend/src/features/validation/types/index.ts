export type ValidationSeverity = "Critical" | "High" | "Medium" | "Low";
export type ValidationStatus = "Passed" | "Failed" | "Warning" | "Error" | "Running";
export type ValidationType = 
  | "Null Check"
  | "Duplicate Check"
  | "Count Check"
  | "Referential Integrity"
  | "Schema Drift"
  | "Data Type Validation"
  | "Business Rule Validation";

export interface ValidationRule {
  id: string;
  name: string;
  type: ValidationType;
  severity: ValidationSeverity;
  targetTable: string;
  targetColumn?: string;
  description: string;
  owner: string;
  status: "Active" | "Inactive";
}

export interface ValidationExecution {
  executionId: string;
  ruleId: string;
  ruleName: string;
  type: ValidationType;
  severity: ValidationSeverity;
  targetTable: string;
  status: ValidationStatus;
  startTime: string;
  durationMs: number;
  recordsProcessed: number;
  recordsFailed: number;
  errorMessage?: string;
}

export interface ValidationTrend {
  date: string;
  passed: number;
  failed: number;
  warning: number;
}
