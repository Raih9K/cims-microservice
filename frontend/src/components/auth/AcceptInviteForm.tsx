"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { authService } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AcceptInviteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  // Optional: If email is passed in query params for display
  const email = searchParams.get("email") || "";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    if (!name.trim()) {
      return "Full Name is required";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!token) {
      setError("Invalid invitation link");
      return;
    }

    setLoading(true);
    try {
      await authService.acceptInvite({
        token,
        password,
        password_confirmation: confirmPassword,
        name
      });

      setSuccess(true);

      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to accept invitation");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-outfit">
        <div className="w-full max-w-md space-y-8 bg-white rounded-3xl shadow-2xl p-10 text-center animate-slideInUp">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-600/30 animate-bounce-once">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black text-gray-900">Welcome Aboard!</h1>
            <p className="text-gray-600 font-medium">
              Your account has been set up successfully.<br />
              Redirecting you to login...
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes bounce-once {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }
          @keyframes slideInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideInUp { animation: slideInUp 0.5s ease-out; }
        `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-outfit">
      <div className="w-full max-w-md space-y-8 bg-white rounded-3xl shadow-2xl p-10 animate-slideInUp">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-600/30">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Join Your Team
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            {email ? `Completing setup for ${email}` : "Complete your account setup"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name Field */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Full Name</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-12 h-14 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">New Password</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-12 pr-12 h-14 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeCloseIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* Password strength indicator */}
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${password.length >= i * 2
                    ? password.length >= 8
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                    : "bg-gray-200"
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Confirm Password</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-12 h-14 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
            {confirmPassword && (
              <p className={`text-xs font-medium ${password === confirmPassword ? "text-emerald-600" : "text-rose-600"}`}>
                {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
              </p>
            )}
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 animate-shake">
              <p className="text-sm font-bold text-rose-600 text-center">
                {error}
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-brand-600/30 transition-all active:scale-95"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Joining Team...</span>
              </div>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInUp { animation: slideInUp 0.5s ease-out; }
         @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}} />
    </div>
  );
}
