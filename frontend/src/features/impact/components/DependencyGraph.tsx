import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/features/lineage/components/CustomNode";
import { mockImpactResult } from "../data/mockData";

const nodeTypes = {
  customNode: CustomNode,
};

export function DependencyGraph() {
  return (
    <div className="w-full h-[400px] border border-border rounded-lg bg-background overflow-hidden relative">
      <ReactFlow
        nodes={mockImpactResult.dependencyGraph.nodes}
        edges={mockImpactResult.dependencyGraph.edges}
        nodeTypes={nodeTypes}
        fitView
        className="react-flow-custom"
        minZoom={0.2}
      >
        <Background color="hsl(var(--muted-foreground))" gap={16} size={1} />
        <Controls className="bg-card border border-border shadow-sm fill-foreground text-foreground" />
      </ReactFlow>
    </div>
  );
}
