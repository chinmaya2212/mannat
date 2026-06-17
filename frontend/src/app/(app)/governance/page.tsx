"use client";

import { Shield, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ApprovalList } from "@/features/governance/components/ApprovalList";
import { mockGovernanceRequests } from "@/features/governance/data/mockData";

export default function GovernanceCenterPage() {
  const pendingRequests = mockGovernanceRequests.filter(req => req.status === "Pending");
  const approvedRequests = mockGovernanceRequests.filter(req => req.status === "Approved");
  const rejectedRequests = mockGovernanceRequests.filter(req => req.status === "Rejected");
  const smeReviews = mockGovernanceRequests.filter(req => req.status === "SME Review");

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="p-6 border-b border-border bg-card/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Governance Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage approvals, SME reviews, and metadata changes across your data platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Change Request
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
        <Tabs defaultValue="pending" className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <TabsList className="grid grid-cols-4 w-[600px]">
              <TabsTrigger value="pending" className="relative">
                Pending
                {pendingRequests.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                    {pendingRequests.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="sme" className="relative">
                SME Reviews
                {smeReviews.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                    {smeReviews.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <Input placeholder="Search requests..." className="w-64 bg-background" />
          </div>
          
          <TabsContent value="pending" className="mt-0">
            <ApprovalList requests={pendingRequests} />
          </TabsContent>

          <TabsContent value="sme" className="mt-0">
            <ApprovalList requests={smeReviews} />
          </TabsContent>

          <TabsContent value="approved" className="mt-0">
            <ApprovalList requests={approvedRequests} />
          </TabsContent>

          <TabsContent value="rejected" className="mt-0">
            <ApprovalList requests={rejectedRequests} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
