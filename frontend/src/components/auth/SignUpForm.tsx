"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useFormEngine } from "@/lib/form-engine/useFormEngine";
import { authService } from "@/services/authService";

// ============================================================================
// CONFIG SECTION (EDITABLE)
// ============================================================================
const formConfig = {
  formId: "auth-signup-v1",
  mockResponseFile: "auth_signup.json",
  mockApiEndpoint: "/api/mock/auth/signup",
  fields: {
    full_name: "full_name",
    email: "email",
    password: "password",
    password_confirmation: "password_confirmation",
    company_name: "company_name",
    business_type: "business_type",
    management_type: "management_type",
  }
};
// ============================================================================

export default function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    company_name: "",
    business_type: "Retail",
    management_type: "single",
  });

  const { submitForm } = useFormEngine(formConfig);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!formData.company_name) {
      setError("Company name is required");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setError("");
    setCurrentStep(1);
  };

  // ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Use real authService instead of formEngine mock
      const result = await authService.signup(formData);

      // Save email to localStorage for VerifyEmailForm fallback
      localStorage.setItem('signup_email', formData.email);

      // Redirect to verify page with correct email
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);

    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const marketplaces = [
    { name: 'Shopify', logo: 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg', angle: 0 },
    { name: 'Amazon', logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg', angle: 45 },
    { name: 'eBay', logo: 'https://www.vectorlogo.zone/logos/ebay/ebay-icon.svg', angle: 90 },
    { name: 'Etsy', logo: 'https://www.vectorlogo.zone/logos/etsy/etsy-icon.svg', angle: 135 },
    { name: 'Facebook', logo: 'https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg', angle: 180 },
    { name: 'Google', logo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg', angle: 225 },
    { name: 'Instagram', logo: 'https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg', angle: 270 },
    { name: 'TikTok', logo: 'https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg', angle: 315 },
  ];

  return (
    <div className="min-h-screen flex font-outfit">
      {/* Left Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-6 my-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-600/30 animate-float">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Start Your Business
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              {currentStep === 1 ? "Tell us about your company" : "Set up your admin account"}
            </p>
            {/* Trial Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-black text-emerald-700 uppercase tracking-wide">
                14 Days Free Trial
              </span>
              <span className="text-xs text-emerald-600 font-medium">*</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-3 py-4">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${currentStep >= 1
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                : 'bg-gray-100 text-gray-400'
                }`}>
                {currentStep > 1 ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                ) : '1'}
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-bold uppercase tracking-wider ${currentStep >= 1 ? 'text-brand-600' : 'text-gray-400'}`}>
                  Step 1
                </span>
                <span className="text-xs text-gray-500 font-medium">Company</span>
              </div>
            </div>

            {/* Connector Line */}
            <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${currentStep > 1 ? 'bg-brand-600' : 'bg-gray-200'
              }`} style={{ maxWidth: '60px' }} />

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${currentStep >= 2
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                : 'bg-gray-100 text-gray-400'
                }`}>
                2
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-bold uppercase tracking-wider ${currentStep >= 2 ? 'text-brand-600' : 'text-gray-400'}`}>
                  Step 2
                </span>
                <span className="text-xs text-gray-500 font-medium">Admin</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 animate-shake">
                <p className="text-sm font-bold text-rose-600 text-center">{error}</p>
              </div>
            )}

            {/* Step 1: Company Info */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-slideInLeft">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-sm font-black uppercase tracking-wider text-gray-700">Company Information</h3>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Company Name</Label>
                  <Input
                    type="text"
                    name="company_name"
                    placeholder="Acme Inc."
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                    className="h-12 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Business Type</Label>
                    <select
                      name="business_type"
                      value={formData.business_type}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                    >
                      <option value="eCommerce">eCommerce</option>
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Management</Label>
                    <div className="flex gap-3 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="management_type"
                          value="single"
                          checked={formData.management_type === 'single'}
                          onChange={handleChange}
                          className="w-4 h-4 text-brand-600 focus:ring-brand-500/20"
                        />
                        <span className="text-sm font-medium text-gray-600">Solo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="management_type"
                          value="team"
                          checked={formData.management_type === 'team'}
                          onChange={handleChange}
                          className="w-4 h-4 text-brand-600 focus:ring-brand-500/20"
                        />
                        <span className="text-sm font-medium text-gray-600">Team</span>
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-brand-600/30 transition-all active:scale-95"
                >
                  Continue to Step 2
                  <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            )}

            {/* Step 2: Admin Details */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-slideInRight">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="text-sm font-black uppercase tracking-wider text-gray-700">Administrator Account</h3>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Full Name</Label>
                  <Input
                    type="text"
                    name="full_name"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="h-12 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Password</Label>
                    <div className="relative">
                      <Input
                        name="password"
                        placeholder="Min 8 chars"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pr-12 h-12 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeCloseIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Confirm</Label>
                    <Input
                      name="password_confirmation"
                      placeholder="Re-enter"
                      type={showPassword ? "text" : "password"}
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                      className="h-12 bg-gray-50 border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500/20"
                  />
                  <p className="text-xs text-gray-600 font-medium">
                    I agree to the <span className="text-brand-600 font-bold">Terms & Conditions</span> and <span className="text-brand-600 font-bold">Privacy Policy</span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleBack}
                    className="h-14 px-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-sm font-black uppercase tracking-wider transition-all active:scale-95"
                  >
                    <svg className="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-brand-600/30 transition-all active:scale-95"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-400 bg-white font-medium">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="relative h-14 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 hover:border-brand-200 hover:bg-brand-50/30 transition-all group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-xs font-bold text-gray-700">Google</span>
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-blue-100 border border-blue-200 text-blue-700 text-[9px] font-black rounded-full uppercase tracking-wider">Coming Soon</span>
            </button>
            <button type="button" className="relative h-14 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#95BF47" d="M12.9 8.4L8.5 12l4.4 3.6V8.4zM2.1 7.1c0 3.7 0 7.4.1 11.1 0 .6.4 1 1 1.1 3.7.1 7.4.1 11.1.1.6 0 1-.4 1.1-1 .1-3.7.1-7.4.1-11.1 0-.6-.4-1-1-1.1-3.7-.1-7.4-.1-11.1-.1-.6 0-1 .4-1.1 1-.1.3-.2.7-.2 1z" />
                <path fill="#5E8E3E" d="M16.4 12v7.5c1.5 0 2.9-.1 4.4-.2.6 0 1-.5 1-1.1V5.8c0-.6-.5-1-1.1-1-1.5-.1-2.9-.2-4.4-.2.1 2.5.1 5 .1 7.4z" />
              </svg>
              <span className="text-xs font-bold text-gray-700">Shopify</span>
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-blue-100 border border-blue-200 text-blue-700 text-[9px] font-black rounded-full uppercase tracking-wider">Coming Soon</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              Already have an account?{" "}
              <Link href="/signin" className="text-brand-600 hover:text-brand-700 font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Orbital Display */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center space-y-12 w-full max-w-2xl">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-gray-900">
              Grow Your <span className="text-brand-600">Empire</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Join thousands of businesses managing inventory across all channels
            </p>
          </div>

          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-brand-600 to-brand-800 rounded-full flex items-center justify-center shadow-2xl shadow-brand-600/40 z-20 animate-pulse-slow">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-brand-200/30 rounded-full animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-purple-200/30 rounded-full animate-spin-reverse"></div>

            {marketplaces.map((marketplace) => {
              const radius = 200;
              const x = radius * Math.cos((marketplace.angle * Math.PI) / 180);
              const y = radius * Math.sin((marketplace.angle * Math.PI) / 180);

              return (
                <div
                  key={marketplace.name}
                  className="absolute top-1/2 left-1/2 w-16 h-16"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div className="w-full h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-3 group hover:scale-110 border border-gray-100">
                    <Image
                      src={marketplace.logo}
                      alt={marketplace.name}
                      width={40}
                      height={40}
                      className="object-contain group-hover:scale-110 transition-transform"
                      unoptimized
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500 font-medium">
              One platform for{" "}
              <span className="font-bold text-gray-900">
                Shopify, Amazon, eBay, Etsy and 50+ channels
              </span>
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          <div className={`w-2 h-2 rounded-full transition-all ${currentStep === 1 ? 'bg-brand-600 w-8' : 'bg-gray-300'}`}></div>
          <div className={`w-2 h-2 rounded-full transition-all ${currentStep === 2 ? 'bg-brand-600 w-8' : 'bg-gray-300'}`}></div>
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
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-slideInLeft { animation: slideInLeft 0.4s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.4s ease-out; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}} />
    </div>
  );
}
