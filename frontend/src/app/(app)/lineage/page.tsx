"use client";

import { LineageGraph } from "@/features/lineage/components/LineageGraph";
import { LineageToolbar } from "@/features/lineage/components/LineageToolbar";

export default function LineageStudioPage() {
  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden">
      <LineageToolbar />
      <div className="flex-1 w-full h-full">
        <LineageGraph />
      </div>
    </div>
  );
}
