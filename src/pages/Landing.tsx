import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  CheckCircle,
  Calendar,
  UserCheck,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">ClinicLink</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <Link to="/login">
                <Button variant="outline" className="mr-2">
                  Login
                </Button>
              </Link>
              <Link to="/register/patient">
                <Button className="btn-primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Healthcare Made
                <span className="block text-secondary-light">Simple & Accessible</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Connect with qualified doctors, book appointments instantly, and manage your health records all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register/patient">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4">
                    Book Appointment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
                    Find Doctors
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Qualified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose ClinicLink?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of healthcare with our comprehensive platform designed for patients, doctors, and healthcare providers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="dashboard-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Easy Booking</h3>
              <p className="text-muted-foreground">
                Book appointments with your preferred doctors instantly. No more waiting on phone calls or long queues.
              </p>
            </Card>

            <Card className="dashboard-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Secure Records</h3>
              <p className="text-muted-foreground">
                Your medical records are encrypted and securely stored, accessible only to you and your authorized healthcare providers.
              </p>
            </Card>

            <Card className="dashboard-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Verified Doctors</h3>
              <p className="text-muted-foreground">
                All our doctors are thoroughly verified and licensed professionals with proven expertise in their specialties.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-muted-foreground">
              Find specialists across all major medical fields
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Cardiology", "Dermatology", "Neurology", "Orthopedics",
              "Pediatrics", "Psychiatry", "Oncology", "Gynecology"
            ].map((specialty) => (
              <div key={specialty} className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <Activity className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">{specialty}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Patient",
                content: "ClinicLink made it so easy to find a specialist and book an appointment. The doctors are professional and caring.",
                rating: 5
              },
              {
                name: "Dr. Michael Chen",
                role: "Cardiologist",
                content: "As a doctor, this platform helps me manage my practice efficiently. The scheduling system is intuitive and reliable.",
                rating: 5
              },
              {
                name: "Emma Wilson",
                role: "Patient",
                content: "I love having all my medical records in one place. The platform is secure and easy to navigate.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="dashboard-card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of patients and doctors who trust ClinicLink for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register/patient">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4">
                Register as Patient
              </Button>
            </Link>
            <Link to="/register/doctor">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
                Join as Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-sidebar-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-primary mr-2" />
                <span className="text-lg font-bold text-sidebar-foreground">ClinicLink</span>
              </div>
              <p className="text-sidebar-foreground/80">
                Connecting patients with quality healthcare providers for better health outcomes.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">For Patients</h3>
              <ul className="space-y-2 text-sidebar-foreground/80">
                <li><Link to="/doctors" className="hover:text-sidebar-foreground">Find Doctors</Link></li>
                <li><Link to="/register/patient" className="hover:text-sidebar-foreground">Register</Link></li>
                <li><a href="#" className="hover:text-sidebar-foreground">Health Tips</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">For Doctors</h3>
              <ul className="space-y-2 text-sidebar-foreground/80">
                <li><Link to="/register/doctor" className="hover:text-sidebar-foreground">Join Network</Link></li>
                <li><a href="#" className="hover:text-sidebar-foreground">Practice Management</a></li>
                <li><a href="#" className="hover:text-sidebar-foreground">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sidebar-foreground/80">
                <li><a href="#" className="hover:text-sidebar-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-sidebar-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-sidebar-foreground">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-sidebar-foreground/80">
            <p>&copy; 2024 ClinicLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}