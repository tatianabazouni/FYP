import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const passwordRules = [
  { test: (v: string) => v.length >= 8, label: "At least 8 characters" },
  { test: (v: string) => /[A-Z]/.test(v), label: "One uppercase letter" },
  { test: (v: string) => /\d/.test(v), label: "One number" },
];

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(location.pathname !== "/register");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [forgotMode, setForgotMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
    consent: false,
  });

  useEffect(() => {
    setIsLogin(location.pathname !== "/register");
    setError("");
    setSuccessMessage("");
    setForgotMode(false);
  }, [location.pathname]);

  const passwordScore = useMemo(() => passwordRules.filter((rule) => rule.test(formData.password)).length, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!isValidEmail) return "Please provide a valid email address.";

    if (!isLogin && !formData.name.trim()) return "Please fill in your full name.";

    if (!formData.password) return "Password is required.";

    if (!isLogin && passwordScore < passwordRules.length) {
      return "Password does not meet all strength requirements.";
    }

    if (!isLogin && !formData.consent) {
      return "Please accept the terms and privacy policy to continue.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (failedAttempts >= 5) {
      setError("Too many attempts. Please wait before trying again.");
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
        setSuccessMessage("Account created successfully. Please check your email to verify your account.");
      }

      if (formData.rememberMe) {
        localStorage.setItem("lifeos-remember-email", formData.email);
      } else {
        localStorage.removeItem("lifeos-remember-email");
      }

      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      setFailedAttempts((prev) => prev + 1);
      const message = err instanceof Error ? err.message : "Authentication failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!isValidEmail) {
      setError("Enter your email first to request a reset link.");
      return;
    }

    setError("");
    setSuccessMessage("Password reset link sent. Use the email token to complete reset.");
    setForgotMode(true);
  };

  const toggleMode = () => {
    navigate(isLogin ? "/register" : "/login");
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("lifeos-remember-email");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail, rememberMe: true }));
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="relative text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center mx-auto mb-8">
            <Sparkles className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground font-serif mb-4">LifeOS</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-serif">{isLogin ? "Welcome back" : "Start your journey"}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="mt-1.5" />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="mt-1.5" />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 rounded-md border border-border p-3 text-xs">
                <p className="font-medium">Password strength ({passwordScore}/3)</p>
                {passwordRules.map((rule) => (
                  <p key={rule.label} className={rule.test(formData.password) ? "text-green-600" : "text-muted-foreground"}>
                    • {rule.label}
                  </p>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input id="rememberMe" type="checkbox" checked={formData.rememberMe} onChange={handleChange} />
                Remember me
              </label>
              <button type="button" onClick={handleForgotPassword} className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            {!isLogin && (
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input id="consent" type="checkbox" checked={formData.consent} onChange={handleChange} className="mt-1" />
                <span>I agree to the Terms and Privacy Policy.</span>
              </label>
            )}

            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive">{error}</motion.p>}
            {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
            {failedAttempts >= 3 && <p className="text-xs text-amber-600">Rate-limit warning: multiple failed attempts detected.</p>}
            {forgotMode && <p className="text-xs text-muted-foreground">Check your inbox and open the reset token link.</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={toggleMode} className="text-primary font-medium hover:underline">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
