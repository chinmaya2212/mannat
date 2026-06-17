import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  NodeMouseHandler,
  ConnectionMode
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";
import { SidePanel } from "./SidePanel";
import { initialNodes, initialEdges } from "../data/mockData";
import { LineageNodeData } from "../types";

const nodeTypes = {
  customNode: CustomNode,
};

export function LineageGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeData, setSelectedNodeData] = useState<LineageNodeData | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNodeData(node.data);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeData(null);
  }, []);

  return (
    <div className="relative w-full h-full bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="react-flow-custom"
        minZoom={0.2}
      >
        <Background color="hsl(var(--muted-foreground))" gap={16} size={1} />
        <Controls className="bg-card border border-border shadow-sm fill-foreground text-foreground" />
        <MiniMap 
          nodeColor={(n) => {
            if (n.data?.status === 'error') return '#ef4444'; // red-500
            if (n.data?.status === 'success') return '#10b981'; // emerald-500
            if (n.data?.status === 'warning') return '#f59e0b'; // amber-500
            return '#3b82f6'; // blue-500 (running or default)
          }}
          className="bg-card border border-border rounded-md shadow-sm"
        />
      </ReactFlow>

      {selectedNodeData && (
        <SidePanel 
          node={selectedNodeData} 
          onClose={() => setSelectedNodeData(null)} 
        />
      )}
    </div>
  );
}
