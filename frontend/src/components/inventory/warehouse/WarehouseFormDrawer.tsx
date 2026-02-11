"use client";
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import Switch from '@/components/form/switch/Switch';
import Button from '@/components/ui/button/Button';
import { Drawer } from '@/components/ui/drawer/Drawer';
import { productService } from '@/services/productService';
import { Country, State } from 'country-state-city';
import { useEffect, useMemo, useState } from 'react';

interface WarehouseFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newWarehouse: any) => void;
  editingWarehouse?: any;
}

export default function WarehouseFormDrawer({ isOpen, onClose, onSuccess, editingWarehouse }: WarehouseFormDrawerProps) {
  const [formData, setFormData] = useState({
    name: '',
    facility_code: '',
    address: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    is_default: false,
    status: 'active'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: editingWarehouse?.name || '',
        facility_code: editingWarehouse?.facility_code || '',
        address: editingWarehouse?.address || '',
        email: editingWarehouse?.email || '',
        phone: editingWarehouse?.phone || '',
        country: editingWarehouse?.country || '',
        state: editingWarehouse?.state || '',
        city: editingWarehouse?.city || '',
        zip_code: editingWarehouse?.zip_code || '',
        is_default: editingWarehouse?.is_default || false,
        status: editingWarehouse?.status || 'active'
      });
    }
  }, [isOpen, editingWarehouse]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response;
      if (editingWarehouse?.id) {
        response = await productService.updateWarehouse(editingWarehouse.id, formData);
      } else {
        response = await productService.createWarehouse(formData);
      }

      if (response.success) {
        onSuccess(response.data);
        onClose();
      }
    } catch (error) {
      console.error('Failed to save warehouse:', error);
    } finally {
      setLoading(false);
    }
  };

  const countries = useMemo(() => Country.getAllCountries().map(c => ({ value: c.isoCode, label: c.name })), []);
  const states = useMemo(() => formData.country ? State.getStatesOfCountry(formData.country).map(s => ({ value: s.isoCode, label: s.name })) : [], [formData.country]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={editingWarehouse ? "Modify Facility Schema" : "Register Logistics Node"}
      className="w-full md:!max-w-[50vw]"
      footer={
        <div className="flex items-center justify-end gap-3 w-full px-1">
          <Button variant="outline" onClick={onClose} className="h-11 px-8 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Discard</Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            className="h-11 px-8 rounded-xl bg-brand-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all"
          >
            {editingWarehouse ? 'Update Facility' : 'Save Facility'}
          </Button>
        </div>
      }
    >
      <div className="p-0 space-y-0 h-full overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 custom-scrollbar">

          {/* Section 1: Facility Identification */}
          <section className="relative group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-sm transition-transform group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Facility Identification</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Define facility name and tracking references</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Warehouse Display Name</Label>
                <Input
                  placeholder="e.g. Central Distribution Center"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Unique Facility Code</Label>
                <Input
                  placeholder="e.g. WH-MAIN-01"
                  className="h-11 rounded-xl font-mono uppercase bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.facility_code}
                  onChange={(e) => setFormData({ ...formData, facility_code: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="space-y-1.5 flex flex-col justify-end">
                <div className="flex items-center h-11 px-1">
                  <Switch
                    id="is-default-drawer"
                    label="Primary Fulfillment Center"
                    checked={formData.is_default}
                    onChange={(checked) => setFormData({ ...formData, is_default: checked })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Operational Location */}
          <section className="relative group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm transition-transform group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Operational Location</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Physical distribution point and warehouse origin</p>
              </div>
            </div>

            <div className="space-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Street Address / Unit</Label>
                <Input
                  placeholder="Physical street address"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Country</Label>
                  <Select
                    options={countries}
                    value={formData.country}
                    onChange={(val) => setFormData({ ...formData, country: val, state: '', city: '' })}
                    className="h-11 rounded-xl"
                    placeholder="Select Country"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">State / Region</Label>
                  <Select
                    options={states}
                    value={formData.state}
                    onChange={(val) => setFormData({ ...formData, state: val, city: '' })}
                    disabled={!formData.country}
                    className="h-11 rounded-xl"
                    placeholder="Select State"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">City / Municipality</Label>
                  <Input
                    placeholder="City name"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Zip / Postal Code</Label>
                  <Input
                    placeholder="e.g. 10001"
                    className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Contact Matrix */}
          <section className="relative group pb-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm transition-transform group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Communication Link</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Facility management contact details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Admin Email</Label>
                <Input
                  placeholder="logistics@company.com"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Admin Phone</Label>
                <Input
                  placeholder="+1 (000) 000-0000"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Drawer>
  );
}
