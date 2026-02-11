"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { teamService } from "@/services/teamService";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function JoinContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [inviteInfo, setInviteInfo] = useState<{email: string, user_exists: boolean, company_name: string} | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const verifyToken = useCallback(async () => {
    try {
      const res = await teamService.verifyInvitation(token!);
      setInviteInfo(res);
    } catch (error: any) {
      toast.error(error.message || "Invalid or expired link");
    } finally {
      setVerifying(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token, verifyToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await teamService.acceptInvitation({
        token,
        ...formData
      });
      toast.success(inviteInfo?.user_exists ? "Workspace synced successfully!" : "Account created and joined successfully!");
      router.push("/signin");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token || (!verifying && !inviteInfo)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="text-center p-12 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 max-w-md w-full">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
          <h1 className="text-2xl font-black text-gray-900">Broken Link</h1>
          <p className="text-gray-500 mt-2 font-medium">This invitation has either expired or already been used. Please request a new invite from your manager.</p>
          <Button onClick={() => router.push("/signin")} className="mt-8 w-full h-14 rounded-2xl bg-gray-900 text-white font-bold">Back to Sign In</Button>
        </div>
      </div>
    );
  }

  if (verifying) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl shadow-gray-200 border border-gray-100 p-12 space-y-10">
            <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    {inviteInfo?.user_exists ? "Connect Account" : "Finalize Account"}
                </h1>
                <p className="text-gray-500 font-medium">
                    {inviteInfo?.user_exists
                        ? `Your account (${inviteInfo.email}) will be linked to ${inviteInfo.company_name}.`
                        : `Complete your profile to join ${inviteInfo?.company_name}.`}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    {!inviteInfo?.user_exists ? (
                        <>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Full Name</Label>
                                <Input
                                    required
                                    placeholder="John Doe"
                                    className="h-16 rounded-2xl bg-gray-50/50 border-gray-100 px-6 font-bold"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Create Password</Label>
                                <Input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-16 rounded-2xl bg-gray-50/50 border-gray-100 px-6 font-bold"
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="p-6 bg-brand-50 rounded-3xl border border-brand-100 text-center">
                            <span className="text-sm font-bold text-brand-700">Ready to join! Click the button below to sync your existing account with this workspace.</span>
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full h-16 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-lg shadow-2xl shadow-brand-600/30 transition-all active:scale-95"
                    disabled={loading}
                >
                    {loading ? "Establishing Access..." : inviteInfo?.user_exists ? "Accept & Sync workspace" : "Create Account & Join"}
                </Button>
            </form>

            <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest pt-4">
                Secure Enterprise Authentication
            </p>
        </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoinContent />
    </Suspense>
  )
}
