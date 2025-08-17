import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DoctorDashboard() {
  return (
    <DashboardLayout userRole="doctor">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        <p>Doctor dashboard coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}