import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Admin dashboard coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}