import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AdminDoctors() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Manage Doctors</h1>
        <p>Doctor management coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}