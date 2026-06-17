import { Filter, Database, Layers, Folder, Shield, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function CatalogFilters() {
  return (
    <div className="w-64 flex-shrink-0 bg-card border-r border-border h-full flex flex-col hidden lg:flex">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          Filters
        </h2>
        <Badge variant="secondary" className="text-xs">3 Active</Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <FilterSection title="LOB" icon={Folder}>
          <FilterItem label="Finance" count={142} checked />
          <FilterItem label="Marketing" count={85} />
          <FilterItem label="Product" count={234} checked />
          <FilterItem label="HR" count={23} />
        </FilterSection>

        <FilterSection title="Layer" icon={Layers}>
          <FilterItem label="Raw (Bronze)" count={450} />
          <FilterItem label="Clean (Silver)" count={320} />
          <FilterItem label="Curated (Gold)" count={128} checked />
        </FilterSection>

        <FilterSection title="Database" icon={Database}>
          <FilterItem label="prod_warehouse" count={890} />
          <FilterItem label="raw_landing" count={1200} />
          <FilterItem label="kafka_prod" count={45} />
        </FilterSection>

        <FilterSection title="Classification" icon={Shield}>
          <FilterItem label="PII" count={84} />
          <FilterItem label="Financial" count={112} />
          <FilterItem label="Confidential" count={305} />
          <FilterItem label="Public" count={420} />
        </FilterSection>

        <FilterSection title="Owner" icon={User}>
          <Input placeholder="Search owners..." className="h-8 text-xs mb-2 bg-background" />
          <FilterItem label="Data Engineering" count={450} />
          <FilterItem label="Analytics Engineering" count={280} />
          <FilterItem label="Finance Data Team" count={112} />
        </FilterSection>

        <FilterSection title="Tags" icon={Tag}>
          <Input placeholder="Search tags..." className="h-8 text-xs mb-2 bg-background" />
          <div className="flex flex-wrap gap-2 mt-2">
             <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-secondary">core</Badge>
             <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-secondary">certified</Badge>
             <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-secondary">deprecated</Badge>
             <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-secondary">pii</Badge>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

function FilterSection({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
        <Icon className="w-3.5 h-3.5" />
        {title}
      </h3>
      <div className="space-y-2.5">
        {children}
      </div>
    </div>
  );
}

function FilterItem({ label, count, checked = false }: { label: string, count: number, checked?: boolean }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center space-x-2">
        <Checkbox id={`filter-${label}`} checked={checked} className="rounded-sm" />
        <label 
          htmlFor={`filter-${label}`} 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-primary transition-colors"
        >
          {label}
        </label>
      </div>
      <span className="text-xs text-muted-foreground">{count}</span>
    </div>
  );
}
