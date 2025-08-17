import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function BookAppointment() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Book Appointment</h1>
        <p>Book appointment functionality coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}