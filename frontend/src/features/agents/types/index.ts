export type AgentRole = 
  | "Metadata Agent"
  | "Validation Agent"
  | "Lineage Agent"
  | "Refactor Agent"
  | "Security Agent"
  | "Governance Agent";

export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
  agentRole?: AgentRole;
  isCode?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastUpdated: string;
  agentRole: AgentRole;
}

export interface ContextItem {
  type: "Table" | "Model" | "Validation" | "Documentation";
  name: string;
  description: string;
}

export interface SuggestedAction {
  id: string;
  label: string;
  action: "Generate Validation" | "Create Model" | "Analyze Impact" | "Create Documentation" | "Refactor SQL";
}
