import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function PatientAppointments() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <p>Appointments management coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}