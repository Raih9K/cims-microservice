"use client";
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import { Drawer } from '@/components/ui/drawer/Drawer';
import { productService } from '@/services/productService';
import { Country, State } from 'country-state-city';
import { useEffect, useMemo, useState } from 'react';

interface SupplierFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSupplier: any) => void;
  editingSupplier?: any;
}

export default function SupplierFormDrawer({ isOpen, onClose, onSuccess, editingSupplier }: SupplierFormDrawerProps) {
  const [formData, setFormData] = useState({
    supplier_name: '',
    supplier_code: '',
    contact_person_name: '',
    email_address: '',
    phone_number: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    status: 'active'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        supplier_name: editingSupplier?.supplier_name || '',
        supplier_code: editingSupplier?.supplier_code || '',
        contact_person_name: editingSupplier?.contact_person_name || '',
        email_address: editingSupplier?.email_address || '',
        phone_number: editingSupplier?.phone_number || '',
        address: editingSupplier?.address || '',
        country: editingSupplier?.country || '',
        state: editingSupplier?.state || '',
        city: editingSupplier?.city || '',
        zip_code: editingSupplier?.zip_code || '',
        status: editingSupplier?.status || 'active'
      });
    }
  }, [isOpen, editingSupplier]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response;
      if (editingSupplier?.id) {
        response = await productService.updateSupplier(editingSupplier.id, formData);
      } else {
        response = await productService.createSupplier(formData);
      }

      if (response.success) {
        onSuccess(response.data);
        onClose();
      }
    } catch (error) {
      console.error('Failed to save supplier:', error);
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
      title={editingSupplier ? "Edit Sourcing Partner" : "Register Sourcing Partner"}
      className="w-full md:!max-w-[50vw]"
      footer={
        <div className="flex items-center justify-end gap-3 w-full px-1">
          <Button variant="outline" onClick={onClose} className="h-11 px-8 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Discard</Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            className="h-11 px-8 rounded-xl bg-brand-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all"
          >
            {editingSupplier ? 'Update Partner' : 'Save Partner'}
          </Button>
        </div>
      }
    >
      <div className="p-0 space-y-0 h-full overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 custom-scrollbar">

          {/* Section 1: Identification */}
          <section className="relative group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-sm transition-transform group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Business Identity</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Define vendor legal information and reference tracking</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Legal Company Name</Label>
                <Input
                  placeholder="e.g. Acme Corp Industries"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.supplier_name}
                  onChange={(e) => setFormData({ ...formData, supplier_name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">System Source Code</Label>
                <Input
                  placeholder="e.g. VEN-0021"
                  className="h-11 rounded-xl font-mono uppercase bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.supplier_code}
                  onChange={(e) => setFormData({ ...formData, supplier_code: e.target.value.toUpperCase() })}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Contact Matrix */}
          <section className="relative group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm transition-transform group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Communication Matrix</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Operational contact person and reachability channels</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Account Manager / Contact Person</Label>
                <Input
                  placeholder="Enter full name of point of contact"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.contact_person_name}
                  onChange={(e) => setFormData({ ...formData, contact_person_name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Official Email</Label>
                <Input
                  placeholder="business@partner.com"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.email_address}
                  onChange={(e) => setFormData({ ...formData, email_address: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Contact Number</Label>
                <Input
                  placeholder="+880 1XXX-XXXXXX"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Section 3: Logistics & Origin */}
          <section className="relative group pb-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm transition-transform group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Logistics & Origin</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Physical distribution point and warehouse location</p>
              </div>
            </div>

            <div className="space-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Street Address / Warehouse Unit</Label>
                <Input
                  placeholder="Street, Building name, Flat/Suite No."
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Country of Operation</Label>
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
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Municipality / City</Label>
                  <Input
                    placeholder="City name"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Postal / Zip Code</Label>
                  <Input
                    placeholder="e.g. 1206"
                    className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Drawer>
  );
}
