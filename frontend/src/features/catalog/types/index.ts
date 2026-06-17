export type AssetType = "Table" | "View" | "Topic" | "Dashboard" | "Model";
export type Classification = "PII" | "Financial" | "Public" | "Confidential" | "Internal";

export interface CatalogAsset {
  id: string;
  name: string;
  database: string;
  schema: string;
  type: AssetType;
  owner: string;
  domain: string;
  lob: string;
  classification: Classification[];
  lastUpdated: string;
  qualityScore: number;
  description: string;
  tags: string[];
}

export interface AssetColumn {
  name: string;
  type: string;
  description: string;
  isPrimaryKey: boolean;
  isPii: boolean;
  nullPercentage: number;
}

export interface AssetValidation {
  rule: string;
  status: "Passed" | "Failed" | "Warning";
  lastRun: string;
  description: string;
}

export interface AssetDetails extends CatalogAsset {
  columns: AssetColumn[];
  validations: AssetValidation[];
  businessRules: string[];
  metrics: {
    rowCount: number;
    sizeBytes: number;
    duplicatePercentage: number;
    freshnessSla: string;
  };
}
