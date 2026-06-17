import Link from "next/link";
import { ArrowLeft, Database, User, Shield, Activity, Tag, FileText, CheckCircle2, AlertTriangle, Key, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAssetDetails } from "@/features/catalog/data/mockData";
import { formatDistanceToNow } from "date-fns";

export function generateStaticParams() {
  return Object.keys(mockAssetDetails).map((id) => ({
    id: id,
  }));
}

export default async function AssetDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const asset = mockAssetDetails[resolvedParams.id] || mockAssetDetails["asset_1"]; // Fallback to asset 1 for demo

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/50 shrink-0">
        <Link href="/catalog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Catalog
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="uppercase tracking-wider">{asset.type}</Badge>
              {asset.classification.map(c => (
                <Badge key={c} variant="secondary" className={c === 'PII' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}>
                  {c}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{asset.name}</h1>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5"><Database className="w-4 h-4" /> {asset.database}</span>
              <span className="text-border">•</span>
              <span>{asset.schema}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button variant="outline">Request Access</Button>
            <Button>View in Query Editor</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="columns">Columns</TabsTrigger>
            <TabsTrigger value="lineage">Lineage</TabsTrigger>
            <TabsTrigger value="validations">Validations</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 max-w-5xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About this Asset</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{asset.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-border">
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><User className="w-4 h-4" /> Owner</span>
                    <p className="font-medium">{asset.owner}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><Activity className="w-4 h-4" /> Quality Score</span>
                    <p className="font-medium text-emerald-500">{asset.qualityScore}/100</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><Tag className="w-4 h-4" /> Domain</span>
                    <p className="font-medium">{asset.domain}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-2"><FileText className="w-4 h-4" /> Last Updated</span>
                    <p className="font-medium">{formatDistanceToNow(new Date(asset.lastUpdated), { addSuffix: true })}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                {asset.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="columns">
            <Card>
              <CardHeader>
                <CardTitle>Schema Columns</CardTitle>
                <CardDescription>{asset.columns.length} columns detected in {asset.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Description</th>
                      <th className="px-4 py-3 font-medium">Flags</th>
                      <th className="px-4 py-3 font-medium text-right">Null %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asset.columns.map(col => (
                      <tr key={col.name} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-mono font-medium flex items-center gap-2">
                          {col.isPrimaryKey && <span title="Primary Key"><Key className="w-3.5 h-3.5 text-amber-500" /></span>}
                          {col.name}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-[10px] font-mono">{col.type}</Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{col.description}</td>
                        <td className="px-4 py-3">
                          {col.isPii && <Badge variant="secondary" className="bg-destructive/10 text-destructive text-[10px]">PII</Badge>}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs">
                          {col.nullPercentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validations">
            <Card>
              <CardHeader>
                <CardTitle>Data Quality Validations</CardTitle>
                <CardDescription>Latest test run results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {asset.validations.map(val => (
                  <div key={val.rule} className="flex items-start justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {val.status === 'Passed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        {val.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                        {val.status === 'Failed' && <ShieldAlert className="w-4 h-4 text-destructive" />}
                        <span className="font-semibold font-mono text-sm">{val.rule}</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">{val.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={val.status === 'Passed' ? 'default' : val.status === 'Failed' ? 'destructive' : 'secondary'}>
                        {val.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(val.lastRun), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
             <Card>
              <CardHeader>
                <CardTitle>Business Logic & Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-3 text-sm text-muted-foreground">
                  {asset.businessRules.map((rule, idx) => (
                    <li key={idx} className="leading-relaxed">{rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               <Card>
                 <CardHeader className="pb-2">
                   <CardTitle className="text-sm text-muted-foreground font-medium">Total Rows</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="text-2xl font-bold tracking-tight">
                     {new Intl.NumberFormat('en-US', { notation: "compact" }).format(asset.metrics.rowCount)}
                   </div>
                 </CardContent>
               </Card>
               <Card>
                 <CardHeader className="pb-2">
                   <CardTitle className="text-sm text-muted-foreground font-medium">Storage Size</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="text-2xl font-bold tracking-tight">
                     {(asset.metrics.sizeBytes / 1024 / 1024 / 1024).toFixed(2)} GB
                   </div>
                 </CardContent>
               </Card>
               <Card>
                 <CardHeader className="pb-2">
                   <CardTitle className="text-sm text-muted-foreground font-medium">Duplicate Rate</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="text-2xl font-bold tracking-tight">
                     {asset.metrics.duplicatePercentage}%
                   </div>
                 </CardContent>
               </Card>
               <Card>
                 <CardHeader className="pb-2">
                   <CardTitle className="text-sm text-muted-foreground font-medium">Freshness SLA</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="text-2xl font-bold tracking-tight">
                     {asset.metrics.freshnessSla}
                   </div>
                 </CardContent>
               </Card>
             </div>
          </TabsContent>

          <TabsContent value="lineage">
             <Card className="h-[500px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">View Node Lineage</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Detailed graph rendering is available in the dedicated Lineage Studio module.
                  </p>
                  <Link href="/lineage">
                    <Button>Open Lineage Studio</Button>
                  </Link>
                </div>
             </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
