"use client";

import { useState } from "react";
import { Search, AlertCircle, Database, LayoutDashboard, Box, AlertTriangle, ShieldCheck, CheckCircle2, Webhook, FastForward } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockImpactResult } from "@/features/impact/data/mockData";
import { DependencyGraph } from "@/features/impact/components/DependencyGraph";

export default function ImpactAnalysisPage() {
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Search Header */}
      <div className="p-6 border-b border-border bg-card/50">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-amber-500" />
          Impact Analysis
        </h1>
        <p className="text-muted-foreground mb-6">
          Predict downstream effects of schema changes, model updates, or business logic modifications before you deploy.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-4xl">
          <Select defaultValue="Column">
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Search Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Column">Column</SelectItem>
              <SelectItem value="Table">Table</SelectItem>
              <SelectItem value="Model">dbt Model</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="e.g. users.email or dim_customers..." 
              className="pl-10 bg-background h-10"
              defaultValue="users.email"
            />
          </div>

          <Button className="w-full sm:w-auto h-10 px-8" onClick={() => setHasSearched(true)}>
            Analyze Impact
          </Button>
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
        {!hasSearched ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium text-foreground">Ready for Analysis</p>
            <p className="max-w-sm text-center mt-2">Enter a column, table, or model above to see the downstream dependency blast radius.</p>
          </div>
        ) : (
          <div className="space-y-6 max-w-7xl mx-auto">
            
            {/* Risk Score & High Level Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-destructive/10 border-destructive/20 md:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Overall Risk Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-destructive mb-1">{mockImpactResult.riskScore}</div>
                  <p className="text-xs text-destructive/80 font-medium uppercase tracking-wider">{mockImpactResult.riskLevel} IMPACT</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Affected Entities Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-8">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold flex items-center gap-2">
                         <Box className="w-5 h-5 text-blue-500" /> {mockImpactResult.affectedCounts.models}
                      </div>
                      <span className="text-xs text-muted-foreground uppercase">Models</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold flex items-center gap-2">
                         <FastForward className="w-5 h-5 text-purple-500" /> {mockImpactResult.affectedCounts.pipelines}
                      </div>
                      <span className="text-xs text-muted-foreground uppercase">Pipelines</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold flex items-center gap-2">
                         <LayoutDashboard className="w-5 h-5 text-emerald-500" /> {mockImpactResult.affectedCounts.dashboards}
                      </div>
                      <span className="text-xs text-muted-foreground uppercase">Dashboards</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold flex items-center gap-2">
                         <Webhook className="w-5 h-5 text-pink-500" /> {mockImpactResult.affectedCounts.apis}
                      </div>
                      <span className="text-xs text-muted-foreground uppercase">APIs</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold flex items-center gap-2">
                         <ShieldCheck className="w-5 h-5 text-amber-500" /> {mockImpactResult.affectedCounts.validations}
                      </div>
                      <span className="text-xs text-muted-foreground uppercase">Validations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dependency Graph */}
            <Card>
              <CardHeader>
                <CardTitle>Impacted Lineage Graph</CardTitle>
                <CardDescription>Visualizing downstream components that depend on {mockImpactResult.searchQuery}</CardDescription>
              </CardHeader>
              <CardContent>
                <DependencyGraph />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Detailed Entities List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Affected Assets Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockImpactResult.affectedEntities.map((entity) => (
                      <div key={entity.id} className="flex items-start justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] uppercase">{entity.type}</Badge>
                            <span className="font-semibold text-primary">{entity.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{entity.description}</p>
                          <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                             <Database className="w-3 h-3" /> Owner: {entity.owner}
                          </div>
                        </div>
                        <Badge variant={entity.criticality === 'High' ? 'destructive' : entity.criticality === 'Medium' ? 'default' : 'secondary'}>
                          {entity.criticality} Risk
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Remediation Checklist */}
              <Card className="lg:col-span-1 bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Suggested Remediation
                  </CardTitle>
                  <CardDescription>Tasks required to safely implement this change.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {mockImpactResult.suggestedRemediation.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-xs font-medium text-primary">
                          {idx + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{task}</p>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="default">Create Jira Tickets</Button>
                </CardContent>
              </Card>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
