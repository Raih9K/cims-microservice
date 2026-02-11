"use client";
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function OrganizationSettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [companyData, setCompanyData] = useState({
    name: '',
    business_type: '',
    management_type: 'single',
    settings: {
      address: '',
      tax_number: '',
      currency: 'USD'
    }
  });

  const fetchCompany = async () => {
    try {
      const res = await authService.getCompany();
      if (res.success && res.data) {
        setCompanyData({
          name: res.data.name || '',
          business_type: res.data.business_type || '',
          management_type: res.data.management_type || 'single',
          settings: res.data.settings || { address: '', tax_number: '', currency: 'USD' }
        });
      }
    } catch (error) {
      console.error('Failed to fetch company:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await authService.updateCompany(companyData);
      if (res.success) {
        toast.success('Organization profile updated');
        // Update local user context if company name changed
        if (user) {
          const updatedUser = { ...user, company: { ...user.company, name: companyData.name } };
          // This depends on how your context handles updates.
          // For now, let's assume local storage update is enough for refresh
          const userJson = localStorage.getItem('user');
          if (userJson) {
            const u = JSON.parse(userJson);
            u.company.name = companyData.name;
            localStorage.setItem('user', JSON.stringify(u));
            window.dispatchEvent(new Event('storage'));
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update organization');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-8 text-center text-gray-500">Loading organization data...</div>;
  }

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
        <span className="text-gray-500 font-medium tracking-tight">Account</span>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900 dark:text-white tracking-tight">Organization Profile</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Organization Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your business identity and operational preferences.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden p-10">
        <div className="max-w-3xl space-y-10">

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Business Identity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Legal Company Name</Label>
                <Input
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white transition-all shadow-sm"
                  placeholder="e.g. Acme Industries Ltd."
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Industry / Business Type</Label>
                <Input
                  value={companyData.business_type}
                  onChange={(e) => setCompanyData({ ...companyData, business_type: e.target.value })}
                  className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white transition-all shadow-sm"
                  placeholder="e.g. E-commerce, Retail"
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Operational Details</h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Headquarters Address</Label>
                <textarea
                  value={companyData.settings.address}
                  onChange={(e) => setCompanyData({ ...companyData, settings: { ...companyData.settings, address: e.target.value } })}
                  className="w-full h-32 p-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 text-sm font-medium transition-all shadow-sm outline-none resize-none"
                  placeholder="Enter full physical address..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Tax ID / VAT Number</Label>
                  <Input
                    value={companyData.settings.tax_number}
                    onChange={(e) => setCompanyData({ ...companyData, settings: { ...companyData.settings, tax_number: e.target.value } })}
                    className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white transition-all shadow-sm"
                    placeholder="e.g. TAX-12345678"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Default Base Currency</Label>
                  <select
                    value={companyData.settings.currency}
                    onChange={(e) => setCompanyData({ ...companyData, settings: { ...companyData.settings, currency: e.target.value } })}
                    className="w-full h-12 px-5 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all text-sm font-bold"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="BDT">BDT - Bangladeshi Taka</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="px-12 h-14 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-600/20 active:scale-95 transition-all"
            >
              {loading ? 'Processing Update...' : 'Update Organization'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
