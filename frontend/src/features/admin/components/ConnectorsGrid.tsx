import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plug, CheckCircle2, XCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { mockConnectors } from "../data/mockData";
import { formatDistanceToNow } from "date-fns";

export function ConnectorsGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Platform Connectors</h2>
          <p className="text-sm text-muted-foreground">Manage connections to your data warehouses, transformation tools, and orchestrators.</p>
        </div>
        <Button>
          <Plug className="w-4 h-4 mr-2" />
          Add Connector
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockConnectors.map((connector) => (
          <Card key={connector.id} className="flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {connector.name}
                  </CardTitle>
                  <CardDescription className="mt-1">{connector.type}</CardDescription>
                </div>
                <Badge variant={
                  connector.status === 'Connected' ? 'default' : 
                  connector.status === 'Error' ? 'destructive' : 
                  connector.status === 'Syncing' ? 'secondary' : 'outline'
                } className="flex items-center gap-1.5">
                  {connector.status === 'Connected' && <CheckCircle2 className="w-3 h-3" />}
                  {connector.status === 'Error' && <AlertTriangle className="w-3 h-3" />}
                  {connector.status === 'Syncing' && <RefreshCw className="w-3 h-3 animate-spin" />}
                  {connector.status === 'Disconnected' && <XCircle className="w-3 h-3" />}
                  {connector.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              {connector.errorMessage && (
                <p className="text-xs text-destructive mb-4 bg-destructive/10 p-2 rounded border border-destructive/20">
                  {connector.errorMessage}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                <span>Last Sync</span>
                <span>{connector.lastSync ? formatDistanceToNow(new Date(connector.lastSync), { addSuffix: true }) : 'Never'}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
