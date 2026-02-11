"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useState } from "react";

import { useFormEngine } from "@/lib/form-engine/useFormEngine";

// ============================================================================
// CONFIG SECTION (EDITABLE)
// ============================================================================
const formConfig = {
  formId: "auth-forgot-password-v1",
  mockResponseFile: "auth_forgot_password.json",
  mockApiEndpoint: "/api/mock/auth/forgot-password",
  fields: {
    email: "email"
  }
};
// ============================================================================

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { submitForm } = useFormEngine(formConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await submitForm({ email });

      if (result.success) {
        setSuccess(true);
      } else {
        throw new Error(result.error || "Failed to send reset link");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-outfit">
        <div className="w-full max-w-md space-y-8 bg-white rounded-3xl shadow-2xl p-10 text-center">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-600/30 animate-bounce-once">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black text-gray-900">Check your email</h1>
            <p className="text-gray-600 font-medium leading-relaxed">
              We&apos;ve sent a password reset link to<br />
              <span className="font-bold text-gray-900">{email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Click the link in the email to reset your password. It may take a few minutes to arrive.
            </p>
          </div>

          <Link
            href="/signin"
            className="inline-block w-full h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-brand-600/30 transition-all active:scale-95 flex items-center justify-center"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-outfit">
      <div className="w-full max-w-md space-y-8 bg-white rounded-3xl shadow-2xl p-10">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-600/30">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            No worries! Enter your email and we&apos;ll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Email Address</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <Input
                placeholder="eg. pixelcot@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12 h-14 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
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
                <span>Sending...</span>
              </div>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            href="/signin"
            className="text-sm font-bold text-gray-600 hover:text-brand-600 inline-flex items-center gap-2"
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
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }
      `}} />
    </div>
  );
}
