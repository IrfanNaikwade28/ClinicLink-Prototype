import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function MedicalHistory() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Medical History</h1>
        <p>Medical history functionality coming soon with Supabase integration.</p>
      </div>
    </DashboardLayout>
  );
}