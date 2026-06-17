import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bot, Database, KeySquare, CheckCircle2 } from "lucide-react";
import { mockLLMConfigs, mockVectorDBConfigs } from "../data/mockData";

export function AIConfigForm() {
  return (
    <div className="space-y-8">
      {/* LLM Configuration */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            LLM Configuration
          </h2>
          <p className="text-sm text-muted-foreground">Configure the Large Language Models powering the AI Agents.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mockLLMConfigs.map((config, idx) => (
            <Card key={idx} className={config.status === 'Active' ? 'border-primary/50 bg-primary/5' : ''}>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{config.provider}</h3>
                    {config.status === 'Active' && <Badge className="bg-emerald-500 hover:bg-emerald-600">Active Default</Badge>}
                    {config.status === 'Configured' && <Badge variant="secondary">Configured</Badge>}
                    {config.status === 'Not Configured' && <Badge variant="outline">Not Configured</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                     <span>Model: <span className="font-mono">{config.modelName}</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Input type="password" placeholder="API Key" className="max-w-[200px]" defaultValue={config.status !== 'Not Configured' ? "****************" : ""} />
                  <Button variant={config.status === 'Active' ? 'default' : 'outline'}>
                    {config.status === 'Active' ? 'Save' : 'Configure'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vector Database Configuration */}
      <section>
        <div className="mb-4 pt-4 border-t border-border">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Vector Database Configuration
          </h2>
          <p className="text-sm text-muted-foreground">Configure the vector storage for Retrieval-Augmented Generation (RAG).</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockVectorDBConfigs.map((config, idx) => (
            <Card key={idx} className={config.status === 'Active' ? 'border-primary/50' : ''}>
              <CardContent className="p-6">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      {config.provider}
                      {config.status === 'Active' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </h3>
                    <Switch checked={config.status === 'Active'} />
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase">Collection Name</Label>
                      <Input defaultValue={config.collectionName} placeholder="e.g. mannat-embeddings" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase">Dimension</Label>
                      <Input type="number" defaultValue={config.dimension || ''} placeholder="1536" />
                    </div>
                    {config.status !== 'Not Configured' && (
                       <Button variant="outline" className="w-full mt-2">
                         <KeySquare className="w-4 h-4 mr-2" /> Manage Credentials
                       </Button>
                    )}
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
