import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DoctorProfile() {
  return (
    <DashboardLayout userRole="doctor">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p>Profile management coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}