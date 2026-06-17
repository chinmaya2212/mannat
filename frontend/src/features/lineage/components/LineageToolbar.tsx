import { Search, Filter, Layers, ZoomIn, ZoomOut, Maximize, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function LineageToolbar() {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
      {/* Left side: Search and Filters */}
      <div className="flex items-center gap-2 pointer-events-auto bg-card/80 backdrop-blur-md p-1.5 rounded-lg border border-border shadow-sm">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search nodes..." 
            className="h-8 pl-8 bg-background border-transparent"
          />
        </div>
        
        <div className="h-4 w-px bg-border mx-1" />
        
        <Select defaultValue="table">
          <SelectTrigger className="h-8 w-[140px] bg-background border-transparent">
            <Layers className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="View Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">System Level</SelectItem>
            <SelectItem value="database">Database Level</SelectItem>
            <SelectItem value="schema">Schema Level</SelectItem>
            <SelectItem value="table">Table Level</SelectItem>
            <SelectItem value="column">Column Level</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="sm" className="h-8 gap-2">
          <Filter className="w-3.5 h-3.5" />
          Filters
          <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">2</Badge>
        </Button>
      </div>

      {/* Right side: Tools */}
      <div className="flex items-center gap-1.5 pointer-events-auto bg-card/80 backdrop-blur-md p-1.5 rounded-lg border border-border shadow-sm">
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10">
          <AlertCircle className="w-3.5 h-3.5" />
          Impact Analysis
        </Button>
        <div className="h-4 w-px bg-border mx-1" />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Maximize className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
