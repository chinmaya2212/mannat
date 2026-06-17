import { ValidationExecution, ValidationRule, ValidationTrend } from "../types";

export const mockValidationRules: ValidationRule[] = [
  {
    id: "rule_1",
    name: "users_email_not_null",
    type: "Null Check",
    severity: "Critical",
    targetTable: "raw.users",
    targetColumn: "email",
    description: "Ensure no users are missing an email address.",
    owner: "Data Engineering",
    status: "Active"
  },
  {
    id: "rule_2",
    name: "orders_id_unique",
    type: "Duplicate Check",
    severity: "Critical",
    targetTable: "raw.orders",
    targetColumn: "order_id",
    description: "Ensure order IDs are strictly unique.",
    owner: "Data Engineering",
    status: "Active"
  },
  {
    id: "rule_3",
    name: "daily_revenue_positive",
    type: "Business Rule Validation",
    severity: "High",
    targetTable: "marts.daily_revenue",
    targetColumn: "total_revenue",
    description: "Daily revenue cannot be negative.",
    owner: "Finance Data Team",
    status: "Active"
  },
  {
    id: "rule_4",
    name: "user_sessions_fk",
    type: "Referential Integrity",
    severity: "Medium",
    targetTable: "events.user_sessions",
    targetColumn: "user_id",
    description: "Session user_id must exist in users table.",
    owner: "Product Analytics",
    status: "Active"
  },
  {
    id: "rule_5",
    name: "stripe_schema_monitor",
    type: "Schema Drift",
    severity: "High",
    targetTable: "stripe.charges",
    description: "Detects removed or modified columns from Stripe API.",
    owner: "Platform Team",
    status: "Active"
  }
];

export const mockValidationExecutions: ValidationExecution[] = [
  {
    executionId: "exec_1001",
    ruleId: "rule_1",
    ruleName: "users_email_not_null",
    type: "Null Check",
    severity: "Critical",
    targetTable: "raw.users",
    status: "Failed",
    startTime: "2023-10-27T10:00:00Z",
    durationMs: 1450,
    recordsProcessed: 1450200,
    recordsFailed: 12,
    errorMessage: "12 records found with null email."
  },
  {
    executionId: "exec_1002",
    ruleId: "rule_2",
    ruleName: "orders_id_unique",
    type: "Duplicate Check",
    severity: "Critical",
    targetTable: "raw.orders",
    status: "Passed",
    startTime: "2023-10-27T10:05:00Z",
    durationMs: 3200,
    recordsProcessed: 5400300,
    recordsFailed: 0
  },
  {
    executionId: "exec_1003",
    ruleId: "rule_3",
    ruleName: "daily_revenue_positive",
    type: "Business Rule Validation",
    severity: "High",
    targetTable: "marts.daily_revenue",
    status: "Passed",
    startTime: "2023-10-27T10:10:00Z",
    durationMs: 850,
    recordsProcessed: 365,
    recordsFailed: 0
  },
  {
    executionId: "exec_1004",
    ruleId: "rule_4",
    ruleName: "user_sessions_fk",
    type: "Referential Integrity",
    severity: "Medium",
    targetTable: "events.user_sessions",
    status: "Warning",
    startTime: "2023-10-27T10:15:00Z",
    durationMs: 8400,
    recordsProcessed: 12500000,
    recordsFailed: 450,
    errorMessage: "450 orphaned sessions found (user deleted)."
  },
  {
    executionId: "exec_1005",
    ruleId: "rule_5",
    ruleName: "stripe_schema_monitor",
    type: "Schema Drift",
    severity: "High",
    targetTable: "stripe.charges",
    status: "Passed",
    startTime: "2023-10-27T10:20:00Z",
    durationMs: 120,
    recordsProcessed: 0,
    recordsFailed: 0
  },
  {
    executionId: "exec_1006",
    ruleId: "rule_1",
    ruleName: "users_email_not_null",
    type: "Null Check",
    severity: "Critical",
    targetTable: "raw.users",
    status: "Passed",
    startTime: "2023-10-26T10:00:00Z",
    durationMs: 1400,
    recordsProcessed: 1445000,
    recordsFailed: 0
  }
];

export const mockValidationTrend: ValidationTrend[] = [
  { date: "Oct 21", passed: 450, failed: 12, warning: 5 },
  { date: "Oct 22", passed: 452, failed: 10, warning: 6 },
  { date: "Oct 23", passed: 448, failed: 15, warning: 4 },
  { date: "Oct 24", passed: 455, failed: 8, warning: 7 },
  { date: "Oct 25", passed: 460, failed: 5, warning: 5 },
  { date: "Oct 26", passed: 465, failed: 2, warning: 4 },
  { date: "Oct 27", passed: 462, failed: 6, warning: 8 },
];
