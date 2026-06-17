import { GovernanceRequest } from "../types";

export const mockGovernanceRequests: GovernanceRequest[] = [
  {
    id: "gov_001",
    title: "Add PII column to dim_users",
    requester: "Jane Doe (Data Eng)",
    changeType: "Schema Change",
    status: "Pending",
    targetAsset: "prod_warehouse.dim_users",
    description: "Adding 'phone_number' to the users dimension to support the new SMS marketing campaign.",
    submittedAt: "2023-10-27T08:30:00Z",
    riskLevel: "High",
    workflow: [
      { stageName: "Developer Submission", status: "Completed", actor: "Jane Doe", timestamp: "2023-10-27T08:30:00Z", comments: "PR #1402 raised." },
      { stageName: "Agent Review", status: "Completed", actor: "Security Agent", timestamp: "2023-10-27T08:31:00Z", comments: "Flagged column as PII. Requires SME approval." },
      { stageName: "SME Review", status: "In Progress", actor: "Data Steward Team", comments: "Awaiting privacy compliance check." },
      { stageName: "Final Approval", status: "Pending", actor: "Data Platform Admin" }
    ]
  },
  {
    id: "gov_002",
    title: "Modify LTV Calculation Logic",
    requester: "John Smith (Analytics Eng)",
    changeType: "Business Logic",
    status: "SME Review",
    targetAsset: "marts.customer_360",
    description: "Updating the Lifetime Value metric to exclude refunded orders.",
    submittedAt: "2023-10-26T14:20:00Z",
    riskLevel: "Medium",
    workflow: [
      { stageName: "Developer Submission", status: "Completed", actor: "John Smith", timestamp: "2023-10-26T14:20:00Z" },
      { stageName: "Agent Review", status: "Completed", actor: "Lineage Agent", timestamp: "2023-10-26T14:22:00Z", comments: "Impacts 3 downstream dashboards." },
      { stageName: "SME Review", status: "In Progress", actor: "Finance Team", comments: "Reviewing impact on monthly reporting." },
      { stageName: "Final Approval", status: "Pending", actor: "Data Platform Admin" }
    ]
  },
  {
    id: "gov_003",
    title: "Grant BI Tool Read Access to Stripe Data",
    requester: "Sarah Jenkins (BI)",
    changeType: "Access Grant",
    status: "Approved",
    targetAsset: "raw.stripe_payments",
    description: "Need read access to investigate reconciliation discrepancies.",
    submittedAt: "2023-10-25T09:15:00Z",
    riskLevel: "High",
    workflow: [
      { stageName: "Developer Submission", status: "Completed", actor: "Sarah Jenkins", timestamp: "2023-10-25T09:15:00Z" },
      { stageName: "Agent Review", status: "Completed", actor: "Governance Agent", timestamp: "2023-10-25T09:16:00Z", comments: "Access adheres to RBAC policies." },
      { stageName: "SME Review", status: "Completed", actor: "Finance Team", timestamp: "2023-10-25T11:00:00Z", comments: "Approved for 30 days." },
      { stageName: "Final Approval", status: "Completed", actor: "Data Platform Admin", timestamp: "2023-10-25T11:30:00Z" }
    ]
  },
  {
    id: "gov_004",
    title: "Drop deprecated events table",
    requester: "Mike Ross (Data Eng)",
    changeType: "Schema Change",
    status: "Rejected",
    targetAsset: "events.legacy_clicks",
    description: "Removing old clicks table to save storage costs.",
    submittedAt: "2023-10-24T16:00:00Z",
    riskLevel: "Critical",
    workflow: [
      { stageName: "Developer Submission", status: "Completed", actor: "Mike Ross", timestamp: "2023-10-24T16:00:00Z" },
      { stageName: "Agent Review", status: "Completed", actor: "Lineage Agent", timestamp: "2023-10-24T16:02:00Z", comments: "WARNING: Table is still queried by 'Executive Summary' dashboard." },
      { stageName: "SME Review", status: "Completed", actor: "Product Analytics", timestamp: "2023-10-24T17:00:00Z", comments: "Rejecting. We still need this for historical YoY comparisons." },
      { stageName: "Final Approval", status: "Failed", actor: "Data Platform Admin", timestamp: "2023-10-24T17:05:00Z" }
    ]
  }
];
