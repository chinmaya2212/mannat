import { ImpactAnalysisResult } from "../types";

export const mockImpactResult: ImpactAnalysisResult = {
  searchQuery: "users.email",
  searchType: "Column",
  riskScore: 88,
  riskLevel: "High",
  affectedCounts: {
    models: 3,
    pipelines: 2,
    dashboards: 1,
    apis: 2,
    validations: 4
  },
  affectedEntities: [
    { id: "e1", name: "dim_users", type: "Model", owner: "Analytics Engineering", criticality: "High", description: "Core user dimension model." },
    { id: "e2", name: "customer_360", type: "Model", owner: "Analytics Engineering", criticality: "High", description: "Aggregated customer view." },
    { id: "e3", name: "marketing_audience_export", type: "Pipeline", owner: "Marketing Ops", criticality: "Medium", description: "Syncs emails to Iterable." },
    { id: "e4", name: "Executive KPI Dashboard", type: "Dashboard", owner: "BI Team", criticality: "Low", description: "Used for monthly reporting." },
    { id: "e5", name: "Customer Portal API", type: "API", owner: "Frontend Team", criticality: "High", description: "Serves user profile data to frontend app." },
    { id: "e6", name: "email_format_valid", type: "Validation", owner: "Data Engineering", criticality: "High", description: "Checks regex format of email column." }
  ],
  suggestedRemediation: [
    "Coordinate with Frontend Team before altering the Customer Portal API schema.",
    "Update the 'marketing_audience_export' dbt model to alias the new column name to 'email'.",
    "Notify BI Team to update the 'Executive KPI Dashboard' calculated fields.",
    "Update the 'email_format_valid' Great Expectations suite to target the new column."
  ],
  dependencyGraph: {
    nodes: [
      { id: "n1", type: "customNode", position: { x: 0, y: 150 }, data: { label: "raw.users.email", type: "source", status: "warning", system: "Postgres" } },
      { id: "n2", type: "customNode", position: { x: 300, y: 50 }, data: { label: "dim_users", type: "silver", status: "success", system: "Snowflake" } },
      { id: "n3", type: "customNode", position: { x: 300, y: 250 }, data: { label: "marketing_audience_export", type: "stage", status: "warning", system: "Airbyte" } },
      { id: "n4", type: "customNode", position: { x: 600, y: 50 }, data: { label: "customer_360", type: "gold", status: "success", system: "Snowflake" } },
      { id: "n5", type: "customNode", position: { x: 900, y: 0 }, data: { label: "Customer Portal API", type: "api", status: "error", system: "GraphQL" } },
      { id: "n6", type: "customNode", position: { x: 900, y: 100 }, data: { label: "Executive KPI Dashboard", type: "dashboard", status: "success", system: "Tableau" } },
    ],
    edges: [
      { id: "e1-2", source: "n1", target: "n2", animated: true },
      { id: "e1-3", source: "n1", target: "n3", animated: true },
      { id: "e2-4", source: "n2", target: "n4" },
      { id: "e4-5", source: "n4", target: "n5", animated: true, style: { stroke: 'hsl(var(--destructive))', strokeWidth: 2 } },
      { id: "e4-6", source: "n4", target: "n6" },
    ]
  }
};
