"use client";
import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import { Drawer } from '@/components/ui/drawer/Drawer';
import { PlusIcon, TrashBinIcon } from '@/icons';
import { productService } from '@/services/productService';
import { useEffect, useState } from 'react';

interface AttributeFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newAttribute: any) => void;
  editingAttribute?: any;
}

export default function AttributeFormDrawer({ isOpen, onClose, onSuccess, editingAttribute }: AttributeFormDrawerProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'text',
    value: '',
    options: [] as string[],
    required: false,
    is_variant: true
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: editingAttribute?.name || '',
        type: editingAttribute?.type || 'text',
        value: editingAttribute?.value || '',
        options: editingAttribute?.options || [],
        required: editingAttribute?.required ?? false,
        is_variant: editingAttribute?.is_variant ?? true
      });
    }
  }, [isOpen, editingAttribute]);

  const handleAddOption = () => {
    setFormData({ ...formData, options: [...formData.options, ''] });
  };

  const handleOptionChange = (index: number, val: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = val;
    setFormData({ ...formData, options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    setFormData({ ...formData, options: formData.options.filter((_, i) => i !== index) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response;
      const payload = {
        ...formData,
        options: formData.options.filter(opt => opt.trim() !== '')
      };

      if (editingAttribute?.id) {
        response = await productService.updateAttribute(editingAttribute.id, payload);
      } else {
        response = await productService.createAttribute(payload);
      }

      if (response.success) {
        onSuccess(response.data);
        onClose();
      }
    } catch (error) {
      console.error('Failed to save attribute:', error);
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = [
    { value: 'text', label: 'Simple Text Field' },
    { value: 'number', label: 'Numeric Value' },
    { value: 'select', label: 'Single Choice Dropdown' },
    { value: 'multi-select', label: 'Multiple Choice List' },
    { value: 'date', label: 'Date Picker' },
    { value: 'color', label: 'Color Hex/Picker' },
  ];

  const showOptions = formData.type === 'select' || formData.type === 'multi-select';

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={editingAttribute ? "Modify Property Schema" : "Define Property Schema"}
      className="w-full md:!max-w-[50vw]"
      footer={
        <div className="flex items-center justify-end gap-3 w-full px-1">
          <Button variant="outline" onClick={onClose} className="h-11 px-8 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Discard</Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            className="h-11 px-8 rounded-xl bg-brand-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all"
          >
            {editingAttribute ? 'Update Schema' : 'Save Schema'}
          </Button>
        </div>
      }
    >
      <div className="p-0 space-y-0 h-full overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 custom-scrollbar">

          {/* Section 1: Foundational Identity */}
          <section className="relative group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-sm transition-transform group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Foundational Identity</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Core definition and classification of the product property</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Property Display Label</Label>
                <Input
                  placeholder="e.g. Fabric Composition, Warranty Period"
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <p className="text-[10px] text-gray-400 px-1">This label will identify the field across all product interfaces.</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Data Interface Type</Label>
                <Select
                  options={typeOptions}
                  value={formData.type}
                  onChange={(val) => setFormData({ ...formData, type: val })}
                  className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end pb-1">
                <div className="flex gap-6 px-1">
                  <Checkbox
                    label="Mandatory Field"
                    checked={formData.required}
                    onChange={(val) => setFormData({ ...formData, required: val })}
                  />
                  <Checkbox
                    label="Variant Eligible"
                    checked={formData.is_variant}
                    onChange={(val) => setFormData({ ...formData, is_variant: val })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Data Schema (Options) */}
          {showOptions && (
            <section className="relative group animate-fadeIn">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm transition-transform group-hover:scale-110">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Selectable Data Set</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Define valid options available for selection</p>
                </div>
              </div>

              <div className="space-y-6 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                <div className="space-y-3">
                  {formData.options.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl">
                      <p className="text-xs text-gray-400">No options defined yet. Add choices below.</p>
                    </div>
                  )}
                  {formData.options.map((option, idx) => (
                    <div key={idx} className="flex items-center gap-3 animate-slideDown group/row">
                      <div className="w-8 h-10 flex items-center justify-center text-[10px] font-bold text-gray-400 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                        {idx + 1}
                      </div>
                      <Input
                        placeholder={`Option Value ${idx + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        className="h-10 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                      />
                      <button
                        onClick={() => handleRemoveOption(idx)}
                        className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover/row:opacity-100"
                      >
                        <TrashBinIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddOption}
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand-500 hover:text-brand-500 transition-all text-[11px] font-bold uppercase tracking-wider shadow-sm"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  Append New Choice
                </button>
              </div>
            </section>
          )}

          {/* Section 3: Value Control */}
          {!showOptions && (
            <section className="relative group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm transition-transform group-hover:scale-110">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Initial State</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Configure default value for new product entries</p>
                </div>
              </div>

              <div className="bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Default Registry Value</Label>
                  <Input
                    placeholder="Enter pre-filled value if any"
                    className="h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-brand-500/20"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  />
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </Drawer>
  );
}
