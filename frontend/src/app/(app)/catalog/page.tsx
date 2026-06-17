"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Database, Table as TableIcon, LayoutDashboard, Box, AlertTriangle, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CatalogFilters } from "@/features/catalog/components/CatalogFilters";
import { mockCatalogAssets } from "@/features/catalog/data/mockData";
import { formatDistanceToNow } from "date-fns";

export default function CatalogPage() {
  const [search, setSearch] = useState("");

  const filteredAssets = mockCatalogAssets.filter(asset => 
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full overflow-hidden bg-background">
      <CatalogFilters />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-border bg-card/50">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Data Catalog</h1>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search tables, dashboards, topics..." 
              className="h-12 pl-10 bg-background border-border text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="absolute right-1 top-1 h-10 px-4">
              Search
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Showing {filteredAssets.length} results</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export CSV</Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Asset Name</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Classification</th>
                  <th className="px-4 py-3 font-medium">Quality</th>
                  <th className="px-4 py-3 font-medium text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b border-border hover:bg-muted/30 transition-colors group">
                    <td className="px-4 py-4">
                      <Link href={`/catalog/${asset.id}`} className="block">
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary group-hover:underline flex items-center gap-1.5">
                            <AssetIcon type={asset.type} />
                            {asset.name}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1 font-mono">
                            {asset.database}.{asset.schema}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                        {asset.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {asset.owner}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {asset.classification.map(c => (
                          <Badge key={c} variant="secondary" className={`text-[10px] ${c === 'PII' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}`}>
                            {c}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full ${asset.qualityScore >= 95 ? 'bg-emerald-500' : asset.qualityScore >= 90 ? 'bg-amber-500' : 'bg-destructive'}`} 
                            style={{ width: `${asset.qualityScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{asset.qualityScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-muted-foreground text-xs whitespace-nowrap">
                      {formatDistanceToNow(new Date(asset.lastUpdated), { addSuffix: true })}
                    </td>
                  </tr>
                ))}
                {filteredAssets.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No assets found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssetIcon({ type }: { type: string }) {
  switch (type) {
    case "Table": return <TableIcon className="w-4 h-4 text-blue-500" />;
    case "View": return <Box className="w-4 h-4 text-purple-500" />;
    case "Topic": return <Database className="w-4 h-4 text-amber-500" />;
    case "Dashboard": return <LayoutDashboard className="w-4 h-4 text-emerald-500" />;
    default: return <TableIcon className="w-4 h-4 text-muted-foreground" />;
  }
}
