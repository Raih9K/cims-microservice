"use client";
import Button from "@/components/ui/button/Button";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function PricingPage() {
    const router = useRouter();
    const [packages, setPackages] = useState<any[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [coupon, setCoupon] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponStatus, setCouponStatus] = useState<null | "success" | "error">(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const fetchPackages = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/signin");
                return;
            }
            const data = await authService.getPackages(token);
            setPackages(data);
            if (data.length > 0) {
                // Default to Pro if exists, otherwise first
                const pro = data.find((p: any) => p.name === 'Pro');
                setSelectedPlanId(pro ? pro.id : data[0].id);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load packages");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    const handleApplyCoupon = async (e: React.MouseEvent) => {
        e.preventDefault();
        setCouponStatus(null);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await authService.applyCoupon(token, coupon);
            setCouponStatus("success");
            setCouponDiscount(res.discount_percent);
        } catch (err: any) {
            setCouponStatus("error");
            setError(err.message);
        }
    };

    const { refreshUser } = useAuth();

    const handleSubscribe = async () => {
        if (!selectedPlanId) return;
        setSubmitting(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            await authService.subscribe(token, {
                package_id: selectedPlanId,
                coupon_code: couponStatus === "success" ? coupon : undefined
            });
            await refreshUser(); // Update global user state with new subscription
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">Choose your growth path</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Transparent pricing for every stage of your business.</p>
            </div>

            {error && !couponStatus && (
                <div className="max-w-md mx-auto mb-10 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm font-medium text-center">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        onClick={() => setSelectedPlanId(pkg.id)}
                        className={`relative rounded-3xl p-8 border cursor-pointer transition-all duration-500 ${
                            selectedPlanId === pkg.id
                            ? "bg-white border-brand-500 ring-8 ring-brand-500/5 shadow-2xl scale-105 z-10 dark:bg-gray-800 dark:border-brand-500"
                            : "bg-white/40 border-gray-100 dark:bg-gray-800/40 dark:border-gray-700 opacity-60 hover:opacity-100 backdrop-blur-sm"
                        }`}
                    >
                        {pkg.name === 'Pro' && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                                Recommended
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{pkg.name}</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-black text-gray-900 dark:text-whiteTracking-tighter">${parseFloat(pkg.price).toFixed(0)}</span>
                            <span className="text-gray-400 font-medium text-lg">/mo</span>
                        </div>
                        <ul className="space-y-5 mb-10">
                            {pkg.features.map((feat: string, i: number) => (
                                <li key={i} className="flex items-start gap-4 text-sm text-gray-600 dark:text-gray-300 leading-snug">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <div className={`w-full py-4 rounded-2xl text-center text-sm font-black transition-all duration-300 ${selectedPlanId === pkg.id ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                            {selectedPlanId === pkg.id ? 'Selected Plan' : 'Select Plan'}
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-xl mx-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                <div className="mb-10">
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 ml-1">Promotional Code</label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Type code here..."
                            className="flex-1 px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl dark:bg-gray-800/50 dark:border-gray-700 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-sm tracking-wide"
                        />
                        <button
                            type="button"
                            onClick={handleApplyCoupon}
                            className="px-8 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-colors font-black text-sm uppercase tracking-wide"
                        >
                            Apply
                        </button>
                    </div>
                    {couponStatus === "success" && <p className="text-emerald-500 text-[13px] font-black mt-4 flex items-center gap-2 px-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        SAVED {couponDiscount}% OFF!
                    </p>}
                    {couponStatus === "error" && <p className="text-red-500 text-[13px] font-bold mt-4 px-1">{error}</p>}
                </div>

                <Button className="w-full h-16 text-lg font-black rounded-[1.25rem] bg-brand-600 hover:bg-brand-700 shadow-2xl shadow-brand-600/40 uppercase tracking-widest" onClick={handleSubscribe} disabled={submitting}>
                    {submitting ? (
                         <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Securing...</span>
                         </div>
                    ) : `Activate ${packages.find(p => p.id === selectedPlanId)?.name}`}
                </Button>
                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
                        <div className="relative h-5 w-20">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" fill className="object-contain" />
                        </div>
                        <span className="w-px h-4 bg-gray-300"></span>
                        <div className="relative h-4 w-12">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" fill className="object-contain" />
                        </div>
                        <div className="relative h-6 w-10">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" fill className="object-contain" />
                        </div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium text-center leading-relaxed max-w-[280px]">
                        Secure encryption via industry standards. You can cancel your subscription at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}
