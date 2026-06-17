import { Connector, PlatformUser, AIModelConfig, VectorDBConfig } from "../types";

export const mockConnectors: Connector[] = [
  { id: "conn_1", name: "Snowflake", type: "Warehouse", status: "Connected", lastSync: "2023-10-27T10:15:00Z" },
  { id: "conn_2", name: "dbt", type: "Transformation", status: "Syncing", lastSync: "2023-10-27T10:30:00Z" },
  { id: "conn_3", name: "Airflow", type: "Orchestration", status: "Connected", lastSync: "2023-10-27T09:00:00Z" },
  { id: "conn_4", name: "Databricks", type: "Data Lake", status: "Error", errorMessage: "Invalid Personal Access Token", lastSync: "2023-10-26T14:00:00Z" },
  { id: "conn_5", name: "Jenkins", type: "CI/CD", status: "Disconnected" },
  { id: "conn_6", name: "Azure Data Factory", type: "ETL", status: "Disconnected" },
  { id: "conn_7", name: "AWS Glue", type: "ETL", status: "Disconnected" },
  { id: "conn_8", name: "Informatica", type: "ETL", status: "Disconnected" },
];

export const mockPlatformUsers: PlatformUser[] = [
  { id: "usr_1", name: "Admin User", email: "admin@mannat.io", role: "Platform Admin", department: "Data Platform", lastActive: "2023-10-27T10:45:00Z", mfaEnabled: true, status: "Active" },
  { id: "usr_2", name: "Jane Doe", email: "jane.doe@mannat.io", role: "Data Engineer", department: "Data Engineering", lastActive: "2023-10-27T09:30:00Z", mfaEnabled: true, status: "Active" },
  { id: "usr_3", name: "John Smith", email: "john.smith@mannat.io", role: "Analytics Engineer", department: "Analytics", lastActive: "2023-10-26T16:20:00Z", mfaEnabled: false, status: "Active" },
  { id: "usr_4", name: "Sarah Jenkins", email: "sarah.j@mannat.io", role: "BI Developer", department: "BI", lastActive: "2023-10-25T11:00:00Z", mfaEnabled: true, status: "Active" },
  { id: "usr_5", name: "Mike Ross", email: "mike.ross@mannat.io", role: "Data Engineer", department: "Data Engineering", lastActive: "2023-10-20T14:00:00Z", mfaEnabled: false, status: "Suspended" },
];

export const mockLLMConfigs: AIModelConfig[] = [
  { provider: "OpenAI", modelName: "gpt-4-turbo", isDefault: true, status: "Active" },
  { provider: "Anthropic", modelName: "claude-3-opus", isDefault: false, status: "Configured" },
  { provider: "Gemini", modelName: "gemini-1.5-pro", isDefault: false, status: "Configured" },
  { provider: "Azure OpenAI", modelName: "gpt-35-turbo", isDefault: false, status: "Not Configured" },
  { provider: "Local LLM", modelName: "llama-3-70b-instruct", isDefault: false, status: "Not Configured" },
];

export const mockVectorDBConfigs: VectorDBConfig[] = [
  { provider: "Pinecone", collectionName: "mannat-context-prod", dimension: 1536, status: "Active" },
  { provider: "Qdrant", collectionName: "", dimension: 0, status: "Not Configured" },
  { provider: "Weaviate", collectionName: "", dimension: 0, status: "Not Configured" },
  { provider: "Chroma", collectionName: "local-dev-store", dimension: 1536, status: "Configured" },
  { provider: "pgvector", collectionName: "embeddings_table", dimension: 1536, status: "Configured" },
];
