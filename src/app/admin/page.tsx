// src/app/admin/page.tsx
import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // You may need to install this: npx shadcn-ui@latest add badge

export default async function AdminDashboard() {
  const supabase = createClient();

  // Fetch all profiles from the database
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("username", { ascending: true });

  if (error) {
    return <p className="text-red-500">Error loading users: {error.message}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>User ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles?.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">
                  {profile.username}
                </TableCell>
                <TableCell>{profile.full_name || "N/A"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      profile.role === "admin"
                        ? "destructive"
                        : profile.role === "referee"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {profile.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {profile.id}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
