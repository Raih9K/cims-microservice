"use client";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { authService } from "@/services/authService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    } else {
      const storedEmail = localStorage.getItem('signup_email');
      if (storedEmail) {
        setEmail(storedEmail);
        // Also update URL for consistency
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('email', storedEmail);
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  }, [emailParam]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only numbers

    const newOtp = [...otp];
    // Allow replacing the digit
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.every(char => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      pastedData.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);

      // Focus the last filled input or the first empty one
      const focusIndex = Math.min(pastedData.length, 5);
      document.getElementById(`otp-${focusIndex}`)?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOtp({ email, otp: otpCode });
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      // Clear signup email
      localStorage.removeItem('signup_email');
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Email not found. Please sign up again.");
      return;
    }
    setResending(true);
    setError("");
    try {
      await authService.resendOtp(email);
      setCountdown(60);
      setOtp(["", "", "", "", "", ""]);
    } catch (err: any) {
      setError(err.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-outfit relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-600/30 animate-float">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600 font-medium leading-relaxed">
            We&apos;ve sent a 6-digit verification code to
          </p>
          <div className="flex justify-center">
            {email ? (
              <div className="inline-block px-4 py-2 bg-brand-50 border border-brand-100 rounded-2xl">
                <p className="text-sm font-bold text-brand-700">{email}</p>
                <button onClick={() => setEmail("")} className="text-xs text-brand-500 underline ml-2">Change</button>
              </div>
            ) : (
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-center focus:outline-brand-500"
              />
            )}
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          {/* OTP Inputs */}
          <div>
            <Label className="text-sm font-bold text-gray-700 text-center block mb-4">Enter Verification Code</Label>
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-14 h-16 text-center text-2xl font-black bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 outline-none transition-all"
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
              <p className="text-sm font-bold text-rose-600 text-center">{error}</p>
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
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify & Continue"
            )}
          </Button>
        </form>

        {/* Resend */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600 font-medium">
            Didn&apos;t receive the code?{" "}
            {countdown > 0 ? (
              <span className="font-bold text-gray-900">Wait {countdown}s</span>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-brand-600 hover:text-brand-700 font-bold transition-colors"
              >
                {resending ? "Sending..." : "Resend Code"}
              </button>
            )}
          </p>
          <Link
            href="/signin"
            className="text-sm font-bold text-gray-600 hover:text-brand-600 inline-flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </div>
  );
}
