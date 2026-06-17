"use client";

import { Lock, Download, Filter, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ComplianceDashboard } from "@/features/security/components/ComplianceDashboard";
import { AuditTrail } from "@/features/security/components/AuditTrail";
import { mockAuditLogs } from "@/features/security/data/mockData";

export default function SecurityCenterPage() {
  const llmLogs = mockAuditLogs.filter(log => log.type === 'LLM Audit');
  const userLogs = mockAuditLogs.filter(log => log.type === 'User Access');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="p-6 border-b border-border bg-card/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Lock className="w-8 h-8 text-primary" />
            Security & Compliance
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor data exposure, AI agent activity, and framework compliance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
        <Tabs defaultValue="compliance" className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
            <TabsList className="grid grid-cols-4 w-[600px] bg-background border border-border">
              <TabsTrigger value="compliance">Compliance Risk</TabsTrigger>
              <TabsTrigger value="llm_audit">LLM Audit Logs</TabsTrigger>
              <TabsTrigger value="user_access">User Access</TabsTrigger>
              <TabsTrigger value="rbac">RBAC Map</TabsTrigger>
            </TabsList>
            <Input placeholder="Search security events..." className="w-64 bg-background shadow-sm" />
          </div>
          
          <TabsContent value="compliance" className="mt-0 space-y-6">
            <ComplianceDashboard />
          </TabsContent>

          <TabsContent value="llm_audit" className="mt-0 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">AI Agent Audit Trail</h2>
                <p className="text-sm text-muted-foreground">Immutable record of all actions taken by autonomous Copilot agents.</p>
              </div>
            </div>
            <AuditTrail logs={llmLogs} />
          </TabsContent>

          <TabsContent value="user_access" className="mt-0 space-y-4">
             <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">User Access Logs</h2>
                <p className="text-sm text-muted-foreground">Monitor who is accessing what data and when.</p>
              </div>
            </div>
            <AuditTrail logs={userLogs} />
          </TabsContent>

          <TabsContent value="rbac" className="mt-0">
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-card border border-border rounded-lg shadow-sm">
              <Lock className="w-12 h-12 mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-foreground mb-2">Role-Based Access Control map</h3>
              <p className="text-center max-w-md">Visual mapping of roles, users, and their granted privileges across the data platform is currently in development.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
