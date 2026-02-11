"use client";
import ComponentHeader from "@/components/common/ComponentHeader";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Drawer } from "@/components/ui/drawer/Drawer";
import { DownloadIcon, PlusIcon, TrashBinIcon } from "@/icons";
import { productService } from "@/services/productService";
import { useEffect, useState } from "react";

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);

interface Brand {
  id: number;
  name: string;
  code: string;
  website?: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const MOCK_BRANDS: Brand[] = [
  { id: 1, name: "Apple", code: "APPLE", website: "apple.com", productCount: 45, status: 'active', createdAt: "2024-01-15" },
  { id: 2, name: "Samsung", code: "SAMSUNG", website: "samsung.com", productCount: 32, status: 'active', createdAt: "2024-01-20" },
  { id: 3, name: "Sony", code: "SONY", website: "sony.com", productCount: 28, status: 'active', createdAt: "2024-02-01" },
  { id: 4, name: "Nike", code: "NIKE", website: "nike.com", productCount: 67, status: 'active', createdAt: "2024-02-10" },
  { id: 5, name: "Adidas", code: "ADIDAS", website: "adidas.com", productCount: 0, status: 'inactive', createdAt: "2024-02-15" },
];

export default function BrandSettingsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    website: '',
    status: 'active'
  });

  const fetchBrands = async () => {
    try {
      const response = await productService.getBrands();
      if (response.success && response.data) {
        setBrands(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch brands", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setFormData({ name: '', code: '', website: '', status: 'active' });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (brand: any) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.brand_name || '',
      code: brand.brand_code || '',
      website: brand.website || '',
      status: brand.is_active ? 'active' : 'inactive'
    });
    setIsDrawerOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        brand_name: formData.name,
        brand_code: formData.code,
        website: formData.website,
        is_active: formData.status === 'active'
      };

      if (editingBrand) {
        await productService.updateBrand(editingBrand.brand_id, payload);
      } else {
        await productService.createBrand(payload);
      }
      setIsDrawerOpen(false);
      fetchBrands();
    } catch (error) {
      console.error("Failed to save brand", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await productService.deleteBrand(id);
        fetchBrands();
      } catch (error) {
        console.error("Failed to delete brand", error);
      }
    }
  };

  const filteredBrands = brands.filter(brand =>
    (brand.brand_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (brand.brand_code || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ComponentHeader
        title="Brand Management"
        description="Manage your product brands and manufacturers."
      />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search brands by name or code..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-all placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
            <FilterIcon className="w-4 h-4" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Add New Brand
          </button>
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                <th className="py-4 px-6 w-12 text-center">
                  <Checkbox id="select-all" checked={false} onChange={() => { }} />
                </th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em]">Brand</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em]">Website</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em]">Products</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em]">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em]">Created</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em] w-32 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredBrands.map((brand) => (
                <tr key={brand.brand_id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                  <td className="py-4 px-6 text-center">
                    <Checkbox id={`brand-${brand.brand_id}`} checked={false} onChange={() => { }} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">{brand.brand_name}</span>
                      <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{brand.brand_code}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {brand.website ? (
                      <a
                        href={`https://${brand.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        {brand.website}
                      </a>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-600">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${(brand.products_count || 0) > 0
                      ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                      {brand.products_count || 0} products
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${brand.is_active
                      ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                      {brand.is_active ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {new Date(brand.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(brand)}
                        className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-brand-500 border border-gray-100 dark:border-gray-700 rounded-lg transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                      </button>
                      <button
                        onClick={() => handleDelete(brand.brand_id)}
                        className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-red-500 border border-gray-100 dark:border-gray-700 rounded-lg transition-colors"
                      >
                        <TrashBinIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Add/Edit Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingBrand?.id ? "Edit Brand" : "Add New Brand"}
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)} className="px-8">Cancel</Button>
            <Button onClick={handleSave} className="bg-brand-500 hover:bg-brand-600 text-white px-8">Save Brand</Button>
          </div>
        }
      >
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 flex flex-col">
              <Label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Brand Name *</Label>
              <Input
                placeholder="e.g. Apple"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 flex flex-col">
              <Label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Brand Code *</Label>
              <Input
                placeholder="e.g. APPLE"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Website</Label>
            <Input
              type="url"
              placeholder="e.g. apple.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input
              type="checkbox"
              id="is-active"
              checked={formData.status === 'active'}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'active' : 'inactive' })}
              className="rounded"
            />
            <Label htmlFor="is-active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Brand is active
            </Label>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
