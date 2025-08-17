import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff, UserCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function DoctorRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    specialty: "",
    licenseNumber: "",
    experience: "",
    education: "",
    hospital: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual registration logic when Supabase is connected
    setTimeout(() => {
      setIsLoading(false);
      navigate("/doctor/dashboard");
    }, 1000);
  };

  const specialties = [
    "Cardiology", "Dermatology", "Neurology", "Orthopedics",
    "Pediatrics", "Psychiatry", "Oncology", "Gynecology",
    "General Medicine", "Surgery", "Emergency Medicine"
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-foreground">ClinicLink</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Apply as Doctor</h1>
          <p className="text-muted-foreground">Join our network of healthcare professionals</p>
        </div>

        <Card className="dashboard-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="firstName" className="form-label">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Dr. John"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="form-label">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="form-label">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="dr.doe@hospital.com"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="form-label">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Security</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="form-label">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="form-input pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="form-label">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Professional Information</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="specialty" className="form-label">Specialty</Label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Specialty</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="licenseNumber" className="form-label">Medical License Number</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="MD123456789"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="experience" className="form-label">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="5"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hospital" className="form-label">Current Hospital/Clinic</Label>
                  <Input
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="General Hospital"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="education" className="form-label">Medical Education</Label>
                <Input
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="MD from Harvard Medical School"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Document Upload */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Required Documents</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload Medical License</p>
                  <Button type="button" variant="outline" size="sm">Choose File</Button>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload Medical Degree</p>
                  <Button type="button" variant="outline" size="sm">Choose File</Button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input type="checkbox" required className="mt-1" />
              <p className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:text-primary-hover">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:text-primary-hover">
                  Privacy Policy
                </Link>, and confirm that all provided information is accurate.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? "Submitting Application..." : "Submit Application"}
            </Button>
          </form>

          {/* Notice */}
          <div className="mt-6 p-4 bg-warning-light rounded-lg">
            <p className="text-sm text-warning">
              <strong>Application Review:</strong> Your application will be reviewed by our medical team within 2-3 business days. You'll receive an email confirmation once approved.
            </p>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary-hover">
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}