import { CatalogAsset, AssetDetails } from "../types";

export const mockCatalogAssets: CatalogAsset[] = [
  {
    id: "asset_1",
    name: "customer_360",
    database: "prod_warehouse",
    schema: "curated",
    type: "Table",
    owner: "Analytics Engineering",
    domain: "Customer",
    lob: "Marketing",
    classification: ["PII", "Confidential"],
    lastUpdated: "2023-10-27T09:00:00Z",
    qualityScore: 98,
    description: "Comprehensive customer view containing LTV, order counts, and demographic info.",
    tags: ["core", "certified", "marketing"]
  },
  {
    id: "asset_2",
    name: "daily_revenue_fact",
    database: "prod_warehouse",
    schema: "marts_finance",
    type: "Table",
    owner: "Finance Data Team",
    domain: "Revenue",
    lob: "Finance",
    classification: ["Financial", "Confidential"],
    lastUpdated: "2023-10-27T08:30:00Z",
    qualityScore: 100,
    description: "Daily aggregated revenue metrics across all regions.",
    tags: ["certified", "finance", "executive"]
  },
  {
    id: "asset_3",
    name: "stg_stripe_payments",
    database: "raw_landing",
    schema: "stripe",
    type: "Table",
    owner: "Data Engineering",
    domain: "Payments",
    lob: "Finance",
    classification: ["Financial", "PII"],
    lastUpdated: "2023-10-27T08:00:00Z",
    qualityScore: 85,
    description: "Raw payment data ingested from Stripe API.",
    tags: ["raw", "stripe"]
  },
  {
    id: "asset_4",
    name: "active_users_v",
    database: "prod_warehouse",
    schema: "marts_product",
    type: "View",
    owner: "Product Analytics",
    domain: "Engagement",
    lob: "Product",
    classification: ["Internal"],
    lastUpdated: "2023-10-27T09:15:00Z",
    qualityScore: 94,
    description: "View over user_sessions calculating daily active users.",
    tags: ["product", "kpi"]
  },
  {
    id: "asset_5",
    name: "clickstream_events",
    database: "kafka_prod",
    schema: "events",
    type: "Topic",
    owner: "Platform Team",
    domain: "Tracking",
    lob: "Product",
    classification: ["Internal"],
    lastUpdated: "2023-10-27T10:00:00Z",
    qualityScore: 99,
    description: "Real-time user clickstream events topic.",
    tags: ["streaming", "events"]
  }
];

export const mockAssetDetails: Record<string, AssetDetails> = {
  "asset_1": {
    ...mockCatalogAssets[0],
    columns: [
      { name: "customer_id", type: "VARCHAR", description: "Unique identifier for the customer", isPrimaryKey: true, isPii: false, nullPercentage: 0 },
      { name: "email", type: "VARCHAR", description: "Customer email address", isPrimaryKey: false, isPii: true, nullPercentage: 0.1 },
      { name: "lifetime_value", type: "DECIMAL(10,2)", description: "Total revenue from customer", isPrimaryKey: false, isPii: false, nullPercentage: 5 },
      { name: "first_order_date", type: "TIMESTAMP", description: "Date of first purchase", isPrimaryKey: false, isPii: false, nullPercentage: 12 },
      { name: "segment", type: "VARCHAR", description: "Marketing segment (e.g. VIP, Churn Risk)", isPrimaryKey: false, isPii: false, nullPercentage: 0 },
    ],
    validations: [
      { rule: "email_format_valid", status: "Passed", lastRun: "2023-10-27T09:00:00Z", description: "Ensures all emails match regex pattern." },
      { rule: "ltv_positive", status: "Passed", lastRun: "2023-10-27T09:00:00Z", description: "Lifetime value must be >= 0." },
      { rule: "no_orphaned_customers", status: "Warning", lastRun: "2023-10-27T09:00:00Z", description: "All customers should exist in raw.users." }
    ],
    businessRules: [
      "Customers are assigned to the VIP segment if LTV > $1000.",
      "First order date is derived from the earliest timestamp in orders_fact.",
      "If a user has requested deletion, their PII must be masked."
    ],
    metrics: {
      rowCount: 1450150,
      sizeBytes: 4500000000, // ~4.5 GB
      duplicatePercentage: 0.01,
      freshnessSla: "24 Hours"
    }
  }
};
