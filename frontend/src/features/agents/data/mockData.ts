import { ChatMessage, Conversation, ContextItem, SuggestedAction } from "../types";

export const mockConversations: Conversation[] = [
  { id: "conv_1", title: "Refactor daily_revenue_fact", lastUpdated: "2023-10-27T10:30:00Z", agentRole: "Refactor Agent" },
  { id: "conv_2", title: "Generate tests for dim_users", lastUpdated: "2023-10-26T14:15:00Z", agentRole: "Validation Agent" },
  { id: "conv_3", title: "Document stripe_payments", lastUpdated: "2023-10-25T09:00:00Z", agentRole: "Metadata Agent" },
  { id: "conv_4", title: "Trace impact of email column drop", lastUpdated: "2023-10-24T16:45:00Z", agentRole: "Lineage Agent" },
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: "msg_1",
    role: "user",
    content: "Can you help me optimize this SQL query for the daily_revenue_fact table? It's currently taking too long to run in Snowflake.",
    timestamp: "10:30 AM",
  },
  {
    id: "msg_2",
    role: "agent",
    agentRole: "Refactor Agent",
    content: "I can help with that. Looking at the context, you're querying `daily_revenue_fact` which contains about 1.4B rows. I suggest clustering the table by `date` and `region`, and replacing the correlated subquery with a window function. Here is the refactored SQL:",
    timestamp: "10:31 AM",
  },
  {
    id: "msg_3",
    role: "agent",
    agentRole: "Refactor Agent",
    content: `WITH ranked_orders AS (
  SELECT 
    order_id,
    customer_id,
    region,
    amount,
    order_date,
    ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_date DESC) as rn
  FROM raw.orders
  WHERE order_date >= DATEADD(day, -30, CURRENT_DATE())
)
SELECT 
  order_date,
  region,
  SUM(amount) as daily_revenue
FROM ranked_orders
WHERE rn = 1
GROUP BY 1, 2;`,
    timestamp: "10:31 AM",
    isCode: true
  }
];

export const mockContextItems: ContextItem[] = [
  { type: "Table", name: "daily_revenue_fact", description: "Aggregated daily revenue by region." },
  { type: "Model", name: "marts_finance.sql", description: "dbt model definition for daily_revenue_fact." },
];

export const mockSuggestedActions: SuggestedAction[] = [
  { id: "act_1", label: "Refactor SQL", action: "Refactor SQL" },
  { id: "act_2", label: "Create Model", action: "Create Model" },
  { id: "act_3", label: "Generate Validation", action: "Generate Validation" },
  { id: "act_4", label: "Create Documentation", action: "Create Documentation" },
  { id: "act_5", label: "Analyze Impact", action: "Analyze Impact" },
];
