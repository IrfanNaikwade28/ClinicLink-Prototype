import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AdminPatients() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Manage Patients</h1>
        <p>Patient management coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}