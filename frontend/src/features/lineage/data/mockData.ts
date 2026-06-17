import { LineageNode, LineageEdge } from "../types";

export const initialNodes: LineageNode[] = [
  // Sources
  {
    id: "src_postgres",
    type: "customNode",
    position: { x: 0, y: 100 },
    data: {
      id: "src_postgres",
      label: "PostgreSQL Production",
      type: "source",
      system: "PostgreSQL",
      owner: "Platform Team",
      status: "success",
      description: "Primary transactional database containing user and order data.",
    },
  },
  {
    id: "src_stripe",
    type: "customNode",
    position: { x: 0, y: 300 },
    data: {
      id: "src_stripe",
      label: "Stripe API",
      type: "source",
      system: "Stripe",
      owner: "Finance Data Team",
      status: "success",
      description: "External payment gateway data.",
    },
  },

  // Stage (Raw/Bronze)
  {
    id: "stg_users",
    type: "customNode",
    position: { x: 300, y: 50 },
    data: {
      id: "stg_users",
      label: "stg_users",
      type: "stage",
      system: "Snowflake",
      schema: "raw",
      table: "users",
      owner: "Data Engineering",
      rowCount: 1450200,
      lastRefresh: "2023-10-27T08:00:00Z",
      status: "success",
      description: "Raw users table synced via Fivetran.",
    },
  },
  {
    id: "stg_orders",
    type: "customNode",
    position: { x: 300, y: 150 },
    data: {
      id: "stg_orders",
      label: "stg_orders",
      type: "stage",
      system: "Snowflake",
      schema: "raw",
      table: "orders",
      owner: "Data Engineering",
      rowCount: 5400300,
      lastRefresh: "2023-10-27T08:00:00Z",
      status: "success",
      description: "Raw orders table synced via Fivetran.",
    },
  },
  {
    id: "stg_payments",
    type: "customNode",
    position: { x: 300, y: 300 },
    data: {
      id: "stg_payments",
      label: "stg_payments",
      type: "stage",
      system: "Snowflake",
      schema: "raw",
      table: "payments",
      owner: "Data Engineering",
      rowCount: 5120000,
      lastRefresh: "2023-10-27T08:00:00Z",
      status: "warning",
      description: "Raw payments table from Stripe.",
    },
  },

  // Silver (Clean)
  {
    id: "slv_users",
    type: "customNode",
    position: { x: 600, y: 50 },
    data: {
      id: "slv_users",
      label: "slv_users",
      type: "silver",
      system: "Snowflake",
      schema: "clean",
      table: "users_clean",
      owner: "Data Engineering",
      rowCount: 1450150,
      lastRefresh: "2023-10-27T08:30:00Z",
      status: "success",
      description: "Cleaned and deduplicated users.",
    },
  },
  {
    id: "slv_orders",
    type: "customNode",
    position: { x: 600, y: 200 },
    data: {
      id: "slv_orders",
      label: "slv_orders_enriched",
      type: "silver",
      system: "Snowflake",
      schema: "clean",
      table: "orders_enriched",
      owner: "Data Engineering",
      rowCount: 5400280,
      lastRefresh: "2023-10-27T08:35:00Z",
      status: "success",
      description: "Orders enriched with payment status.",
    },
  },

  // Gold (Curated)
  {
    id: "gld_customer_360",
    type: "customNode",
    position: { x: 900, y: 125 },
    data: {
      id: "gld_customer_360",
      label: "customer_360",
      type: "gold",
      system: "Snowflake",
      schema: "curated",
      table: "customer_360",
      owner: "Analytics Engineering",
      rowCount: 1450150,
      lastRefresh: "2023-10-27T09:00:00Z",
      status: "error",
      description: "Comprehensive customer view containing LTV, order counts.",
    },
  },

  // Warehouse / BI
  {
    id: "wh_finance_mart",
    type: "customNode",
    position: { x: 1200, y: 125 },
    data: {
      id: "wh_finance_mart",
      label: "Finance Data Mart",
      type: "warehouse",
      system: "Snowflake",
      schema: "marts",
      owner: "Finance Team",
      status: "error",
      description: "Data mart exposed to finance users.",
    },
  },

  // Dashboard & API
  {
    id: "db_exec_summary",
    type: "customNode",
    position: { x: 1500, y: 50 },
    data: {
      id: "db_exec_summary",
      label: "Executive Summary",
      type: "dashboard",
      system: "Tableau",
      owner: "BI Team",
      status: "warning",
      description: "High level KPI dashboard for C-suite.",
    },
  },
  {
    id: "api_customer_portal",
    type: "customNode",
    position: { x: 1500, y: 200 },
    data: {
      id: "api_customer_portal",
      label: "Customer Portal API",
      type: "api",
      system: "GraphQL",
      owner: "Frontend Team",
      status: "error",
      description: "API serving customer order history in the web app.",
    },
  },
];

export const initialEdges: LineageEdge[] = [
  { id: "e1", source: "src_postgres", target: "stg_users", animated: true },
  { id: "e2", source: "src_postgres", target: "stg_orders", animated: true },
  { id: "e3", source: "src_stripe", target: "stg_payments", animated: true },
  
  { id: "e4", source: "stg_users", target: "slv_users" },
  { id: "e5", source: "stg_orders", target: "slv_orders" },
  { id: "e6", source: "stg_payments", target: "slv_orders" },
  
  { id: "e7", source: "slv_users", target: "gld_customer_360" },
  { id: "e8", source: "slv_orders", target: "gld_customer_360" },
  
  { id: "e9", source: "gld_customer_360", target: "wh_finance_mart" },
  
  { id: "e10", source: "wh_finance_mart", target: "db_exec_summary" },
  { id: "e11", source: "wh_finance_mart", target: "api_customer_portal" },
];
