"use client";
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: user?.company?.name || '',
    jobTitle: '',
    timezone: 'Asia/Dhaka',
    language: 'English'
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        company: user.company?.name || ''
      }));
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await authService.updateProfile({
        name: profileData.name,
        email: profileData.email
      });
      if (res.success) {
        toast.success('Profile updated successfully');
        // Update local storage user data
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...currentUser, ...res.user }));
        window.dispatchEvent(new Event('storage')); // Trigger update in other components
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.password_confirmation) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.updatePassword(passwordData);
      if (res.success) {
        toast.success('Password updated successfully');
        setPasswordData({ current_password: '', password: '', password_confirmation: '' });
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-500">Account</span>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900 dark:text-white">Profile</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Profile Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your personal information and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6">Profile Photo</h3>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-4xl mb-4">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <button className="px-4 py-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                Change Photo
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                Remove
              </button>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 mt-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Email Verified</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded-lg">
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">2FA Enabled</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded-lg">
                  Disabled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Account Type</span>
                <span className="px-2 py-1 bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold rounded-lg">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Full Name</Label>
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</Label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Phone Number</Label>
                  <Input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Company</Label>
                  <Input
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Company name"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Job Title</Label>
                <Input
                  value={profileData.jobTitle}
                  onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                  className="h-12 rounded-xl"
                  placeholder="Your role in the organization"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Timezone</Label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                      className="w-full h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all font-bold"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Asia/Dhaka">Bangladesh Time (BDT)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Language</Label>
                    <select
                      value={profileData.language}
                      onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                      className="w-full h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all font-bold"
                    >
                      <option value="English">English</option>
                      <option value="Bengali">বাংলা (Bengali)</option>
                      <option value="Spanish">Español (Spanish)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Cancel Changes
                </button>
                <Button
                  onClick={handleSave}
                  className="h-12 px-8 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 shadow-sm"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 mt-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Current Password</Label>
                <Input
                  type="password"
                  value={passwordData.current_password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                  className="h-12 rounded-xl"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">New Password</Label>
                  <Input
                    type="password"
                    value={passwordData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordData({ ...passwordData, password: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                  <Input
                    type="password"
                    value={passwordData.password_confirmation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordData({ ...passwordData, password_confirmation: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-8 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 shadow-sm"
                >
                  {loading ? 'Changing...' : 'Update Password'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
