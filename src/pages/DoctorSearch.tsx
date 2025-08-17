import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search, MapPin, Star, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DoctorSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Mock data - will be replaced with real API calls when Supabase is connected
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      location: "New York, NY",
      rating: 4.8,
      reviews: 124,
      experience: "15+ years",
      image: "/placeholder.svg",
      nextAvailable: "Tomorrow",
      fee: "$200"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      hospital: "Medical Center",
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 89,
      experience: "10+ years",
      image: "/placeholder.svg",
      nextAvailable: "Today",
      fee: "$150"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Neurology",
      hospital: "Brain & Spine Institute",
      location: "Chicago, IL",
      rating: 4.7,
      reviews: 156,
      experience: "20+ years",
      image: "/placeholder.svg",
      nextAvailable: "Next Week",
      fee: "$300"
    }
  ];

  const specialties = [
    "All Specialties", "Cardiology", "Dermatology", "Neurology", 
    "Orthopedics", "Pediatrics", "Psychiatry", "Oncology", "Gynecology"
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === "All Specialties" || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">ClinicLink</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register/patient">
                <Button className="btn-primary">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Find Your Doctor</h1>
          <p className="text-lg text-muted-foreground">
            Search from our network of qualified healthcare professionals
          </p>
        </div>

        {/* Search Filters */}
        <Card className="dashboard-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="form-input"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            <Button className="btn-primary">
              <Filter className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Available Doctors ({filteredDoctors.length})
          </h2>
          <p className="text-muted-foreground">
            Showing doctors based on your search criteria
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="dashboard-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {doctor.name.split(' ')[1][0]}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                      <p className="text-secondary font-medium">{doctor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{doctor.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {doctor.hospital}, {doctor.location}
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-xs">
                        Next: {doctor.nextAvailable}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">
                        Consultation: {doctor.fee}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link to={`/doctor/${doctor.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                    <Link to="/register/patient" className="flex-1">
                      <Button className="btn-primary w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No doctors found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all doctors
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("");
                setSelectedLocation("");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}