import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff, User, UserCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | "admin">("patient");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual login logic when Supabase is connected
    setTimeout(() => {
      setIsLoading(false);
      // Mock navigation based on role
      switch (selectedRole) {
        case "patient":
          navigate("/patient/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
      }
    }, 1000);
  };

  const roles = [
    {
      key: "patient" as const,
      label: "Patient",
      icon: User,
      description: "Book appointments and manage health records"
    },
    {
      key: "doctor" as const,
      label: "Doctor",
      icon: UserCheck,
      description: "Manage practice and patient appointments"
    },
    {
      key: "admin" as const,
      label: "Admin",
      icon: Shield,
      description: "System administration and oversight"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-foreground">ClinicLink</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Card className="dashboard-card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="form-label">I am a</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {roles.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => setSelectedRole(role.key)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      selectedRole === role.key
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <role.icon className="h-5 w-5 mx-auto mb-1" />
                    <div className="text-xs font-medium">{role.label}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {roles.find(r => r.key === selectedRole)?.description}
              </p>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="form-label">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="form-label">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary-hover"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Don't have an account?</span>
            </div>
          </div>

          {/* Register Links */}
          <div className="space-y-3">
            <Link to="/register/patient">
              <Button variant="outline" className="w-full">
                Register as Patient
              </Button>
            </Link>
            <Link to="/register/doctor">
              <Button variant="outline" className="w-full">
                Apply as Doctor
              </Button>
            </Link>
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