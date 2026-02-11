"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EnvelopeIcon, KeyIcon, PencilIcon, PlusIcon, TrashBinIcon } from "@/icons";
import { authService, User } from "@/services/authService";
import { teamService } from "@/services/teamService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modals
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Form States
  const [inviteData, setInviteData] = useState({ email: "", role: "Team Member" });
  const [inviteLoading, setInviteLoading] = useState(false);

  const [editData, setEditData] = useState({ name: "", role: "", status: "" });
  const [editLoading, setEditLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const [teamData, userData] = await Promise.all([
        teamService.getTeam(),
        authService.me(token)
      ]);

      setTeam(teamData);
      setCurrentUser(userData);
    } catch (error: any) {
      toast.error(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const filteredTeam = team.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    try {
      await teamService.inviteMember(inviteData);
      toast.success("Invitation sent successfully!");
      setShowInviteModal(false);
      setInviteData({ email: "", role: "Team Member" });
      fetchInitialData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setInviteLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    setEditLoading(true);
    try {
      await teamService.updateMember(selectedMember.id, editData);
      toast.success("Team member updated");
      setShowEditModal(false);
      fetchInitialData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDisable = async (id: number) => {
    if (!confirm("Are you sure? This will PERMANENTLY lock this license seat connection for this user.")) return;
    try {
      await teamService.disableMember(id);
      toast.success("Member disabled and seat freed");
      fetchInitialData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleForcePassword = async (id: number) => {
    try {
      const res = await teamService.forcePassword(id);
      alert(`Password reset successful. Temporary password: ${res.temp_password}`);
      toast.success("Password reset successful");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openEditModal = (member: any) => {
    setSelectedMember(member);
    const pivot = member.companies?.[0]?.pivot || {};
    setEditData({
      name: member.name,
      role: pivot.role || "Team Member",
      status: pivot.status || "active"
    });
    setShowEditModal(true);
  };

  // Stats
  const maxSeats = currentUser?.company?.max_seats || 5;
  const activeSeats = team.filter(m => m.companies?.[0]?.pivot?.status === 'active').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-screen bg-[#F9FAFB] select-none">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-500 font-medium tracking-tight">Account</span>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900 tracking-tight">Team</span>
      </nav>

      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Team Management</h1>
          <p className="text-sm text-gray-400 font-medium">Manage your organization&apos;s users, licenses, and security tools.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-[0.15em]">Subscription Seats</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-brand-600">{activeSeats}</span>
                <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">/ {maxSeats}</span>
              </div>
            </div>
            <div className="w-12 h-1.5 bg-gray-50 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 transition-all duration-500"
                style={{ width: `${(activeSeats / maxSeats) * 100}%` }}
              ></div>
            </div>
          </div>

          <Button
            onClick={() => setShowInviteModal(true)}
            className="h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all active:scale-95"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Add Member</span>
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-2 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
        <div className="relative flex-1 w-full lg:max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-11 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-500/10 text-sm placeholder:text-gray-400 font-semibold tracking-tight transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="h-10 px-6 flex items-center gap-2 rounded-xl border border-gray-100 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all bg-white shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            <span>Preferences</span>
          </button>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/30 border-b border-gray-50">
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Team Member</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Security Clearance</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Status</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right pr-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-10 py-6"><div className="h-12 w-48 bg-gray-100 rounded-xl"></div></td>
                    <td className="px-10 py-6"><div className="h-8 w-24 bg-gray-100 rounded-lg"></div></td>
                    <td className="px-10 py-6"><div className="h-8 w-20 bg-gray-100 rounded-full"></div></td>
                    <td className="px-10 py-6 pr-12 text-right"><div className="h-10 w-32 bg-gray-100 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredTeam.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-10 py-32 text-center h-[400px]">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center mb-6 ring-8 ring-gray-50/50">
                        <PlusIcon className="w-8 h-8 text-gray-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight">Workspace is Empty</h3>
                      <p className="text-sm text-gray-400 mt-2 font-medium">Initialize your team infrastructure by inviting experts to collaborate.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredTeam.map((member) => {
                const pivot = member.companies?.[0]?.pivot || {};
                return (
                  <tr key={member.id} className="group hover:bg-gray-50/30 transition-all duration-300 cursor-pointer">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-500">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          {pivot.status === 'active' && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{member.name}</span>
                          <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-500 transition-colors tracking-tight uppercase">{member.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-700">
                          {pivot.role || "Team Member"}
                        </span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest group-hover:text-brand-500/50 transition-colors">Enterprise Level 3</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      {pivot.is_locked ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
                          Locked Out
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-lg border transition-all ${pivot.status === 'active'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${pivot.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                          {pivot.status}
                        </span>
                      )}
                    </td>
                    <td className="px-10 py-6 text-right pr-12">
                      <div className="flex items-center justify-end gap-2.5 transition-all duration-300">
                        <button
                          onClick={() => openEditModal(member)}
                          disabled={pivot.is_locked}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-brand-600 hover:bg-brand-100/50 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn"
                          title="Edit Clearance"
                        >
                          <PencilIcon className="w-4.5 h-4.5 group-hover/btn:scale-110 transition-transform" />
                        </button>

                        <button
                          onClick={() => handleForcePassword(member.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-amber-600 hover:bg-amber-100/50 rounded-xl transition-all group/btn"
                          title="Force Protocol Reset"
                        >
                          <KeyIcon className="w-4.5 h-4.5 group-hover/btn:scale-110 transition-transform" />
                        </button>

                        <button
                          onClick={() => handleDisable(member.id)}
                          disabled={pivot.status === 'inactive'}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-100/50 rounded-xl transition-all disabled:opacity-30 group/btn"
                          title="Terminal Shutdown"
                        >
                          <TrashBinIcon className="w-4.5 h-4.5 group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals Implementation (Simplified for briefness but styled) */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-white/20 p-10 space-y-8 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/40 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <EnvelopeIcon className="w-8 h-8 text-brand-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Expand your Team</h2>
              <p className="text-gray-500 dark:text-gray-400 px-6">Invite professionals to help grow your business. We&apos;ll send them a secure link to join.</p>
            </div>

            <form onSubmit={handleInvite} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Email Address</Label>
                  <Input
                    required
                    type="email"
                    value={inviteData.email}
                    onChange={e => setInviteData({ ...inviteData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="h-14 bg-gray-50/50 border-gray-100 rounded-2xl px-5 font-medium"
                  />
                </div>
                <div>
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Account Role</Label>
                  <div className="relative">
                    <select
                      value={inviteData.role}
                      onChange={e => setInviteData({ ...inviteData, role: e.target.value })}
                      className="w-full h-14 px-5 text-sm bg-gray-50/50 border border-gray-100 rounded-2xl dark:bg-gray-800 dark:border-gray-700 outline-none appearance-none font-bold text-gray-700 dark:text-gray-200"
                    >
                      <option value="Team Manager">Team Manager</option>
                      <option value="Team Member">Team Member</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  type="submit"
                  className="w-full rounded-2xl h-14 bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-xl shadow-brand-600/30 transition-all hover:-translate-y-0.5"
                  disabled={inviteLoading}
                >
                  {inviteLoading ? "Sending Dispatch..." : "Confirm Invitation"}
                </Button>
                <button
                  type="button"
                  className="w-full h-12 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowInviteModal(false)}
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4 transition-all">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-md p-10 space-y-8 animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Modify Access</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Display Name</Label>
                  <Input
                    value={editData.name}
                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                    className="h-14 bg-gray-50 border-gray-100 rounded-2xl"
                  />
                </div>
                <div>
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Position</Label>
                  <select
                    value={editData.role}
                    onChange={e => setEditData({ ...editData, role: e.target.value })}
                    className="w-full h-14 px-5 text-sm bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                  >
                    <option value="Team Manager">Team Manager</option>
                    <option value="Team Member">Team Member</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Status</Label>
                  <select
                    value={editData.status}
                    onChange={e => setEditData({ ...editData, status: e.target.value })}
                    className="w-full h-14 px-5 text-sm bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl font-bold" onClick={() => setShowEditModal(false)}>Cancel</Button>
                <Button type="submit" className="flex-1 h-14 rounded-2xl bg-brand-600 text-white font-bold" disabled={editLoading}>
                  {editLoading ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
