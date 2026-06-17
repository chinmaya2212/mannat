import { Edge, Node } from "reactflow";

export type EntityType = "Column" | "Table" | "Model" | "Pipeline" | "Dashboard" | "API" | "Validation";

export interface AffectedEntity {
  id: string;
  name: string;
  type: EntityType;
  owner: string;
  criticality: "High" | "Medium" | "Low";
  description: string;
}

export interface ImpactAnalysisResult {
  searchQuery: string;
  searchType: "Column" | "Table" | "Model";
  riskScore: number; // 0-100
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  affectedCounts: {
    models: number;
    pipelines: number;
    dashboards: number;
    apis: number;
    validations: number;
  };
  affectedEntities: AffectedEntity[];
  suggestedRemediation: string[];
  dependencyGraph: {
    nodes: Node[];
    edges: Edge[];
  };
}
