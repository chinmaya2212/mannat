import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, MoreHorizontal, Shield } from "lucide-react";
import { mockPlatformUsers } from "../data/mockData";
import { formatDistanceToNow } from "date-fns";

export function UserManagementTable() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users by name or email..." className="pl-9 bg-background" />
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Security</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Last Active</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockPlatformUsers.map((user) => (
              <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5 font-medium">
                    {user.role === 'Platform Admin' && <Shield className="w-3.5 h-3.5 text-primary" />}
                    {user.role}
                  </div>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{user.department}</td>
                <td className="px-4 py-4">
                  {user.mfaEnabled ? (
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 text-[10px]">MFA Enabled</Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10 text-[10px]">MFA Disabled</Badge>
                  )}
                </td>
                <td className="px-4 py-4">
                  <Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'} className="uppercase text-[10px]">
                    {user.status}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-right text-muted-foreground text-xs">
                  {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
                </td>
                <td className="px-4 py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
