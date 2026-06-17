"use client";

import { 
  Database, 
  Activity, 
  ShieldAlert, 
  GitMerge, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileCode2,
  Bot
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const qualityData = [
  { name: 'Mon', nulls: 4, duplicates: 2, freshness: 98 },
  { name: 'Tue', nulls: 3, duplicates: 1, freshness: 99 },
  { name: 'Wed', nulls: 5, duplicates: 2, freshness: 95 },
  { name: 'Thu', nulls: 2, duplicates: 0, freshness: 100 },
  { name: 'Fri', nulls: 6, duplicates: 3, freshness: 94 },
  { name: 'Sat', nulls: 4, duplicates: 1, freshness: 97 },
  { name: 'Sun', nulls: 3, duplicates: 1, freshness: 98 },
];

const validationData = [
  { name: 'Raw', passed: 4000, failed: 240, warning: 100 },
  { name: 'Clean', passed: 3000, failed: 139, warning: 80 },
  { name: 'Curated', passed: 2000, failed: 10, warning: 5 },
  { name: 'Aggregated', passed: 1500, failed: 0, warning: 2 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Single pane of glass for data engineering operations.</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="all-lob">
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="LOB" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-lob">All LOBs</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="product">Product</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-layers">
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Layer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-layers">All Layers</SelectItem>
              <SelectItem value="raw">Raw (Bronze)</SelectItem>
              <SelectItem value="clean">Clean (Silver)</SelectItem>
              <SelectItem value="curated">Curated (Gold)</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="7d">
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Total Data Assets" value="12,450" change="+12%" icon={Database} />
        <KPICard title="Active Pipelines" value="842" change="+3%" icon={Activity} />
        <KPICard title="Validation Success" value="98.2%" change="+0.4%" icon={CheckCircle2} trend="up" />
        <KPICard title="Open Incidents" value="14" change="-2" icon={ShieldAlert} trend="down" />
        <KPICard title="Schema Changes" value="32" change="+8" icon={FileCode2} />
        <KPICard title="Pending Approvals" value="8" change="0" icon={Clock} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Quality Summary */}
        <Card className="lg:col-span-2 shadow-sm border-border">
          <CardHeader>
            <CardTitle>Data Quality Trend</CardTitle>
            <CardDescription>Nulls, duplicates, and freshness over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={qualityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFreshness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" tick={{ fill: '#ffffff' }} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" tick={{ fill: '#ffffff' }} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} 
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area type="monotone" dataKey="freshness" stroke="var(--primary)" fillOpacity={1} fill="url(#colorFreshness)" />
                  <Area type="monotone" dataKey="nulls" stroke="var(--destructive)" fillOpacity={0} />
                  <Area type="monotone" dataKey="duplicates" stroke="var(--chart-4)" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Validation Status */}
        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle>Validation Status</CardTitle>
            <CardDescription>By data layer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={validationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" tick={{ fill: '#ffffff' }} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" tick={{ fill: '#ffffff' }} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'var(--muted)' }} 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} 
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--foreground)' }}/>
                  <Bar dataKey="passed" stackId="a" fill="var(--primary)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="warning" stackId="a" fill="var(--chart-4)" />
                  <Bar dataKey="failed" stackId="a" fill="var(--destructive)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Widgets */}
        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Recent Schema Changes</CardTitle>
              <CardDescription>Detected in the last 24h</CardDescription>
            </div>
            <FileCode2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {[
                { table: 'users_dim', change: 'Column added', env: 'Prod', time: '2h ago' },
                { table: 'transactions_fact', change: 'Type altered', env: 'Staging', time: '5h ago' },
                { table: 'events_raw', change: 'Column dropped', env: 'Prod', time: '12h ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.table}</p>
                    <p className="text-muted-foreground text-xs">{item.change}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{item.env}</Badge>
                    <p className="text-muted-foreground text-xs mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs h-8">View All Changes</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Active Agents</CardTitle>
              <CardDescription>AI routines currently running</CardDescription>
            </div>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {[
                { name: 'Schema Monitor', status: 'Running', tasks: '12', load: '45%' },
                { name: 'Pii Scanner', status: 'Running', tasks: '8', load: '82%' },
                { name: 'Lineage Builder', status: 'Idle', tasks: '0', load: '0%' },
              ].map((agent, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${agent.status === 'Running' ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-muted-foreground text-xs">{agent.tasks} active tasks</p>
                    </div>
                  </div>
                  <div className="text-right text-xs font-mono">
                    {agent.load}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Impact Analysis Alerts</CardTitle>
              <CardDescription>Critical upstream changes</CardDescription>
            </div>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
             <div className="space-y-4 mt-4">
              {[
                { issue: 'Upstream Delay', target: 'daily_revenue_rpt', severity: 'High' },
                { issue: 'Schema Drift', target: 'customer_360', severity: 'Medium' },
                { issue: 'Data Volume Drop', target: 'ad_spend_fact', severity: 'High' },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-destructive">{alert.issue}</p>
                    <p className="text-muted-foreground text-xs font-mono">{alert.target}</p>
                  </div>
                  <Badge variant={alert.severity === 'High' ? 'destructive' : 'secondary'} className="text-[10px]">
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, icon: Icon, trend = "neutral" }: any) {
  return (
    <Card className="shadow-sm border-border">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-end gap-2">
          <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
          <span className={`text-xs font-medium mb-1 ${
            trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
