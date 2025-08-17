import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DoctorPatients() {
  return (
    <DashboardLayout userRole="doctor">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Patients</h1>
        <p>Patient management coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}