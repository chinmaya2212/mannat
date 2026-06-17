"use client";

import { ShieldCheck, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ValidationOverview } from "@/features/validation/components/ValidationOverview";
import { ValidationTable } from "@/features/validation/components/ValidationTable";
import { mockValidationExecutions } from "@/features/validation/data/mockData";

export default function ValidationCenterPage() {
  const activeExecutions = mockValidationExecutions.filter(e => e.status === 'Passed' || e.status === 'Warning');
  const failedExecutions = mockValidationExecutions.filter(e => e.status === 'Failed');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="p-6 border-b border-border bg-card/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            Validation Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Centralized data quality monitoring and rule enforcement.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Rule
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active ({activeExecutions.length})</TabsTrigger>
            <TabsTrigger value="failed" className="data-[state=active]:text-destructive data-[state=active]:border-b-destructive">
              Failed ({failedExecutions.length})
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <ValidationOverview />
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Active Validations</h2>
              <Input placeholder="Search active validations..." className="max-w-xs bg-background" />
            </div>
            <ValidationTable executions={activeExecutions} />
          </TabsContent>

          <TabsContent value="failed" className="space-y-4">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight text-destructive">Failed Validations</h2>
              <Input placeholder="Search failed validations..." className="max-w-xs bg-background" />
            </div>
            <ValidationTable executions={failedExecutions} />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Execution History</h2>
              <Input placeholder="Search execution history..." className="max-w-xs bg-background" />
            </div>
            <ValidationTable executions={mockValidationExecutions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
