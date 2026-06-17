"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ChevronDown, ChevronUp, Clock, User, ShieldCheck, XCircle, FileText, Database } from "lucide-react";
import { GovernanceRequest } from "../types";
import { formatDistanceToNow } from "date-fns";
import { ApprovalTimeline } from "./ApprovalTimeline";

export function ApprovalList({ requests }: { requests: GovernanceRequest[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-card border border-border rounded-lg shadow-sm">
        <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
        <p>No governance requests found in this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((req) => (
        <div key={req.id} className="bg-card border border-border rounded-lg shadow-sm overflow-hidden transition-all">
          {/* Header Row */}
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
          >
            <div className="flex-1 flex items-center gap-4">
              <div className="flex flex-col items-center justify-center shrink-0">
                {req.status === 'Approved' ? <ShieldCheck className="w-8 h-8 text-emerald-500" /> :
                 req.status === 'Rejected' ? <XCircle className="w-8 h-8 text-destructive" /> :
                 req.status === 'Pending' ? <Clock className="w-8 h-8 text-muted-foreground" /> :
                 <User className="w-8 h-8 text-amber-500" />}
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {req.title}
                  <Badge variant={req.riskLevel === 'Critical' || req.riskLevel === 'High' ? 'destructive' : req.riskLevel === 'Medium' ? 'default' : 'secondary'} className="text-[10px] uppercase">
                    {req.riskLevel} Risk
                  </Badge>
                </h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {req.changeType}</span>
                  <span className="flex items-center gap-1"><Database className="w-3.5 h-3.5" /> {req.targetAsset}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {req.requester}</span>
                  <span>{formatDistanceToNow(new Date(req.submittedAt), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Badge variant="outline" className="uppercase tracking-wider px-3 py-1 font-semibold text-xs">
                {req.status}
              </Badge>
              {expandedId === req.id ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </div>
          </div>

          {/* Expanded Details */}
          {expandedId === req.id && (
            <div className="p-6 border-t border-border bg-muted/10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Description</h4>
                    <p className="text-sm leading-relaxed">{req.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Actions</h4>
                    <div className="flex flex-col gap-2">
                      <Button className="w-full justify-start" variant="default" disabled={req.status === 'Approved' || req.status === 'Rejected'}>Approve Change</Button>
                      <Button className="w-full justify-start" variant="destructive" disabled={req.status === 'Approved' || req.status === 'Rejected'}>Reject Change</Button>
                      <Button className="w-full justify-start" variant="outline">Request More Info</Button>
                      <Button className="w-full justify-start" variant="secondary">View Code Diff</Button>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Approval Workflow</h4>
                  <ApprovalTimeline stages={req.workflow} />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
