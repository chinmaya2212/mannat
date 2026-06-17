export type ConnectorStatus = "Connected" | "Error" | "Disconnected" | "Syncing";

export interface Connector {
  id: string;
  name: "dbt" | "Snowflake" | "Airflow" | "Jenkins" | "Databricks" | "Azure Data Factory" | "AWS Glue" | "Informatica";
  type: "Transformation" | "Warehouse" | "Orchestration" | "CI/CD" | "Data Lake" | "ETL";
  status: ConnectorStatus;
  lastSync?: string;
  errorMessage?: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: "Platform Admin" | "Data Engineer" | "Analytics Engineer" | "Data Steward" | "BI Developer" | "Viewer";
  department: string;
  lastActive: string;
  mfaEnabled: boolean;
  status: "Active" | "Suspended" | "Invited";
}

export interface AIModelConfig {
  provider: "OpenAI" | "Anthropic" | "Gemini" | "Azure OpenAI" | "Local LLM";
  modelName: string;
  isDefault: boolean;
  status: "Active" | "Configured" | "Not Configured";
}

export interface VectorDBConfig {
  provider: "Pinecone" | "Qdrant" | "Weaviate" | "Chroma" | "pgvector";
  collectionName: string;
  dimension: number;
  status: "Active" | "Configured" | "Not Configured";
}
