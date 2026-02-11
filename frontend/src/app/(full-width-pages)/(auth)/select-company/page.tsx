"use client";
import { authService, User } from "@/services/authService";
import { teamService } from "@/services/teamService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SelectCompanyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }
        const userData = await authService.me(token);
        setUser(userData);

        // If only 1 company, just selection it automatically if not already set
        if (userData.companies?.length === 1 && !userData.company_id) {
          handleSelect(userData.companies[0].id);
        } else if (userData.companies?.length === 1) {
          router.push("/dashboard");
        }

      } catch (error) {
        toast.error("Session expired. Please sign in again.");
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSelect = async (companyId: number) => {
    setSwitching(companyId);
    try {
      const result = await teamService.switchCompany(companyId);
      // Update locally stored user with new active company
      const updatedUser = { ...user, company_id: companyId, company: result.user.company };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(`Switched to ${result.user.company?.name || "Business"}`);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to switch company");
    } finally {
      setSwitching(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const companies = user?.companies || [];

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-outfit relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl mb-6">
            <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-lg text-gray-600 font-medium">Select a business environment to continue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => handleSelect(company.id)}
              disabled={switching !== null}
              className={`group relative p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border-2 transition-all text-left hover:scale-[1.02] active:scale-[0.98] ${user?.company_id === company.id
                  ? 'border-brand-500 ring-4 ring-brand-500/10'
                  : 'border-white/40 hover:border-brand-200'
                }`}
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${user?.company_id === company.id ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100'
                  }`}>
                  <span className="text-xl font-black">{company.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{company.business_type}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${company.subscription_status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                    {company.subscription_status}
                  </span>

                  {switching === company.id ? (
                    <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {user?.company_id === company.id && (
                <div className="absolute top-6 right-6">
                  <div className="bg-brand-500 text-white p-1 rounded-full">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}

          {/* Create New Business Option */}
          <button
            className="p-8 bg-dashed border-2 border-dashed border-gray-300 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-gray-400 hover:text-brand-600 hover:border-brand-400 hover:bg-brand-50/50 transition-all group"
            onClick={() => router.push('/onboarding')}
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:animate-pulse">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-bold">Register New Business</span>
          </button>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              router.push('/signin');
            }}
            className="text-gray-400 hover:text-gray-600 font-bold transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </div>
  );
}
