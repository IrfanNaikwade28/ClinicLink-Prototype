import { Link } from "react-router-dom";
import { Heart, Star, Calendar, MapPin, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DoctorProfile() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">ClinicLink</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="dashboard-card p-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">DJ</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">Dr. Sarah Johnson</h1>
              <p className="text-xl text-secondary mb-4">Cardiology Specialist</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="font-medium">4.8</span>
                  <span className="text-muted-foreground">(124 reviews)</span>
                </div>
                <Badge className="status-success">Available Today</Badge>
              </div>
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                City General Hospital, New York, NY
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground mb-2">$200</p>
              <p className="text-sm text-muted-foreground mb-4">Consultation Fee</p>
              <Link to="/register/patient">
                <Button className="btn-primary">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">15+ Years</h3>
              <p className="text-sm text-muted-foreground">Experience</p>
            </Card>
            <Card className="p-4 text-center">
              <Award className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold">Board Certified</h3>
              <p className="text-sm text-muted-foreground">Cardiology</p>
            </Card>
            <Card className="p-4 text-center">
              <Star className="h-8 w-8 text-warning mx-auto mb-2" />
              <h3 className="font-semibold">Top Rated</h3>
              <p className="text-sm text-muted-foreground">5 Star Reviews</p>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
              <p className="text-muted-foreground">
                Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience 
                in treating cardiovascular diseases. She specializes in preventive cardiology, 
                interventional procedures, and heart failure management.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Education & Training</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• MD - Harvard Medical School</li>
                <li>• Residency - Johns Hopkins Hospital</li>
                <li>• Fellowship - Mayo Clinic Cardiovascular Diseases</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}