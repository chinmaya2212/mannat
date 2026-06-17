import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, ShieldCheck, AlertTriangle, Eye, Lock, FileKey } from "lucide-react";
import { mockComplianceScores, mockSecurityAlerts } from "../data/mockData";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export function ComplianceDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockComplianceScores.map((score) => (
          <Card key={score.framework} className={cn(
            "border-t-4",
            score.status === 'Compliant' ? "border-t-emerald-500" :
            score.status === 'At Risk' ? "border-t-amber-500" : "border-t-destructive"
          )}>
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  {score.framework === 'GDPR' ? <Eye className="w-5 h-5 text-muted-foreground" /> :
                   score.framework === 'HIPAA' ? <Lock className="w-5 h-5 text-muted-foreground" /> :
                   <FileKey className="w-5 h-5 text-muted-foreground" />}
                  {score.framework}
                </CardTitle>
                <CardDescription className="mt-1">Compliance Score</CardDescription>
              </div>
              <div className="text-3xl font-black">
                {score.score}<span className="text-lg text-muted-foreground font-medium">%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mt-4">
                <Badge variant={score.status === 'Compliant' ? 'secondary' : score.status === 'At Risk' ? 'outline' : 'destructive'} 
                       className={score.status === 'At Risk' ? "text-amber-500 border-amber-500/50 bg-amber-500/10" : ""}>
                  {score.status}
                </Badge>
                <span className="text-muted-foreground font-medium">{score.openIssues} Open Issues</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Active Security Alerts
          </CardTitle>
          <CardDescription>Detected vulnerabilities and compliance risks across your data assets.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSecurityAlerts.map(alert => (
              <div key={alert.id} className="flex items-start justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                <div className="flex gap-4">
                  <div className="mt-0.5">
                    {alert.severity === 'Critical' ? <ShieldAlert className="w-5 h-5 text-destructive" /> :
                     alert.severity === 'High' ? <AlertTriangle className="w-5 h-5 text-orange-500" /> :
                     <ShieldCheck className="w-5 h-5 text-amber-500" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="font-mono bg-muted px-1.5 py-0.5 rounded">{alert.assetAffected}</span>
                      <span>•</span>
                      <span>{alert.category}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={alert.severity === 'Critical' ? 'destructive' : 'secondary'} className="uppercase text-[10px]">
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
