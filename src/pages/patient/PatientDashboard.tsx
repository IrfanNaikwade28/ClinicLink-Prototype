import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  FileText, 
  Plus,
  ChevronRight,
  Activity,
  Heart,
  Pill
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PatientDashboard() {
  // Mock data - will be replaced with real API calls when Supabase is connected
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology", 
      date: "2024-01-25",
      time: "2:30 PM",
      status: "pending"
    }
  ];

  const recentRecords = [
    {
      id: 1,
      date: "2024-01-10",
      doctor: "Dr. Sarah Johnson",
      diagnosis: "Routine Checkup",
      prescription: "Vitamin D supplement"
    },
    {
      id: 2,
      date: "2024-01-05",
      doctor: "Dr. Emily Davis",
      diagnosis: "Seasonal Allergies",
      prescription: "Antihistamine"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="status-success">Confirmed</Badge>;
      case "pending":
        return <Badge className="status-warning">Pending</Badge>;
      default:
        return <Badge className="status-info">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout userRole="patient" userName="John Doe">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's your health overview for today.</p>
          </div>
          <Link to="/patient/book-appointment">
            <Button className="btn-primary mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Upcoming Appointments"
            value={upcomingAppointments.length}
            description="Next: Tomorrow at 10:00 AM"
            icon={Calendar}
          />
          <MetricCard
            title="Medical Records"
            value="12"
            description="Last updated: 5 days ago"
            icon={FileText}
          />
          <MetricCard
            title="Health Score"
            value="85%"
            description="Good overall health"
            icon={Activity}
            trend={{ value: 5, type: "increase" }}
          />
          <MetricCard
            title="Active Prescriptions"
            value="3"
            description="Next refill: Jan 25"
            icon={Pill}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Appointments</h2>
              <Link to="/patient/appointments">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-foreground">{appointment.doctor}</h3>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{appointment.specialty}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {appointment.date} at {appointment.time}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming appointments</p>
                  <Link to="/patient/book-appointment">
                    <Button className="btn-primary mt-4">
                      Book Your First Appointment
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {/* Recent Medical Records */}
          <Card className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Medical Records</h2>
              <Link to="/patient/medical-history">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div key={record.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{record.diagnosis}</h3>
                      <p className="text-sm text-muted-foreground">{record.doctor}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{record.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Pill className="h-4 w-4 mr-1" />
                    {record.prescription}
                  </div>
                </div>
              ))}
              
              {recentRecords.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No medical records yet</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="dashboard-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/patient/book-appointment">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Book Appointment
              </Button>
            </Link>
            <Link to="/patient/medical-history">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <FileText className="h-6 w-6" />
                Medical History
              </Button>
            </Link>
            <Link to="/patient/profile">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Heart className="h-6 w-6" />
                Health Profile
              </Button>
            </Link>
            <Link to="/doctors">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Activity className="h-6 w-6" />
                Find Doctors
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}