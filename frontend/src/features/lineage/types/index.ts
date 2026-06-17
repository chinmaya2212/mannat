import { Node, Edge } from "reactflow";

export type LineageNodeType = 
  | "source" 
  | "stage" 
  | "silver" 
  | "gold" 
  | "warehouse" 
  | "dashboard" 
  | "api";

export interface LineageNodeData {
  id: string;
  label: string;
  type: LineageNodeType;
  system?: string;
  schema?: string;
  table?: string;
  owner?: string;
  rowCount?: number;
  lastRefresh?: string;
  description?: string;
  status: "success" | "warning" | "error" | "running";
}

export type LineageNode = Node<LineageNodeData>;
export type LineageEdge = Edge;
