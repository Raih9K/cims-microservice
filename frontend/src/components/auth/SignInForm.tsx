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
  formId: "auth-signin-v1",
  mockResponseFile: "auth_signin.json",
  mockApiEndpoint: "/api/mock/auth/signin",
  fields: {
    email: "email",
    password: "password"
  }
};
// ============================================================================

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { submitForm } = useFormEngine(formConfig);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authService.login({ email, password });

      localStorage.setItem("token", result.access_token);
      localStorage.setItem("user", JSON.stringify(result.user));

      const companies = result.user.companies || [];

      if (companies.length > 1) {
        // If multiple companies, go to selection screen
        router.push("/select-company");
      } else if (companies.length === 1) {
        // Only one company, auto-select it via backend if company_id is null
        // But for now just proceed to dashboard as the backend defaults to the first one
        router.push("/dashboard");
      } else {
        // No company yet? (Shouldn't happen with signup flow)
        router.push("/dashboard");
      }

    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Marketplace integrations for orbital display
  const marketplaces = [
    { name: 'Shopify', logo: 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg', color: 'bg-emerald-500', angle: 0 },
    { name: 'Amazon', logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg', color: 'bg-orange-500', angle: 45 },
    { name: 'eBay', logo: 'https://www.vectorlogo.zone/logos/ebay/ebay-icon.svg', color: 'bg-blue-500', angle: 90 },
    { name: 'Etsy', logo: 'https://www.vectorlogo.zone/logos/etsy/etsy-icon.svg', color: 'bg-amber-500', angle: 135 },
    { name: 'Facebook', logo: 'https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg', color: 'bg-indigo-500', angle: 180 },
    { name: 'Google', logo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg', color: 'bg-rose-500', angle: 225 },
    { name: 'Instagram', logo: 'https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg', color: 'bg-pink-500', angle: 270 },
    { name: 'TikTok', logo: 'https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg', color: 'bg-gray-900', angle: 315 },
  ];

  return (
    <div className="min-h-screen flex font-outfit">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-600/30 animate-float">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Login to your account!
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Enter your registered email address and password to login!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">Email</Label>
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

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">Password</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
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
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
                <p className="text-sm font-bold text-rose-600 text-center">
                  {error}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500/20"
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  Remember me
                </span>
              </label>
              <Link
                href="/reset-password"
                className="text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                Forgot Password ?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-brand-600/30 transition-all active:scale-95"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-400 bg-white font-medium">
                Or login with
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

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-brand-600 hover:text-brand-700 font-bold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Auto-Scrolling Showcase */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 items-center justify-center p-12 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center space-y-12 w-full max-w-2xl">
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-gray-900">
              Sell Better <span className="text-brand-600">Everywhere</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Seamlessly manage your inventory across all marketplaces
            </p>
          </div>

          {/* Enhanced Orbital Display with Data Flow Animation */}
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Center CIMS Logo with Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-brand-600 to-brand-800 rounded-full flex items-center justify-center shadow-2xl shadow-brand-600/40 z-20">
              <div className="absolute inset-0 rounded-full bg-brand-400 animate-ping opacity-20"></div>
              <svg className="w-16 h-16 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>

            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-brand-200/30 rounded-full animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-purple-200/30 rounded-full animate-spin-reverse"></div>

            {/* Data Flow Particles - Animated dots flowing from center to icons */}
            {marketplaces.map((marketplace, index) => {
              const radius = 200;
              const x = radius * Math.cos((marketplace.angle * Math.PI) / 180);
              const y = radius * Math.sin((marketplace.angle * Math.PI) / 180);

              return (
                <React.Fragment key={`flow-${marketplace.name}`}>
                  {/* Animated data particle */}
                  <div
                    className="absolute top-1/2 left-1/2 w-2 h-2"
                    style={{
                      animation: `dataFlow-${index} 3s ease-in-out infinite`,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    <div className="w-full h-full bg-brand-500 rounded-full shadow-lg shadow-brand-500/50"></div>
                  </div>

                  {/* CSS Animation for this particle */}
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes dataFlow-${index} {
                      0%, 100% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 0;
                      }
                      10% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                      }
                      90% {
                        transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1);
                        opacity: 1;
                      }
                      100% {
                        transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0);
                        opacity: 0;
                      }
                    }
                  `}} />
                </React.Fragment>
              );
            })}

            {/* Marketplace Icons - Orbiting */}
            {marketplaces.map((marketplace, index) => {
              const radius = 200;
              const x = radius * Math.cos((marketplace.angle * Math.PI) / 180);
              const y = radius * Math.sin((marketplace.angle * Math.PI) / 180);

              return (
                <div
                  key={marketplace.name}
                  className="absolute top-1/2 left-1/2 w-16 h-16 transition-all duration-300"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  {/* Glow effect when receiving data */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-brand-400 blur-xl opacity-0"
                    style={{
                      animation: `iconGlow 3s ease-in-out infinite`,
                      animationDelay: `${index * 0.3 + 0.9}s`,
                    }}
                  ></div>

                  <div className="relative w-full h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-3 group hover:scale-110 border border-gray-100">
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

          {/* Compatible Text */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500 font-medium">
              Compatible with{" "}
              <span className="font-bold text-gray-900">
                Shopify, Amazon, eBay, Etsy and 50+ marketplaces
              </span>
            </p>
            <p className="text-sm text-gray-400">
              for a unified inventory management experience anywhere online.
            </p>
          </div>
        </div>

        {/* Auto-scrolling feature indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 bg-brand-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Global Animations */}
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
        @keyframes iconGlow {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}} />
    </div>
  );
}
