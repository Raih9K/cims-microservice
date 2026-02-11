"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Modal } from "@/components/ui/modal";
import { useProductForm } from "@/context/ProductFormContext";
import { PlusIcon, TrashBinIcon } from "@/icons";
import { productService } from "@/services/productService";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SupplierFormDrawer from "../../supplier/SupplierFormDrawer";

interface SupplierEntry {
  id: string;
  name: string;
  code: string;
  purchasePrice: string;
  quantity: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
}

export default function SuppliersTab() {
  const { data, updateSuppliers } = useProductForm();
  const suppliers = data.suppliers || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [availableSuppliers, setAvailableSuppliers] = useState<any[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Confirmation dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productService.getSuppliers();
      if (response.success && response.data) {
        setAvailableSuppliers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch available suppliers when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetchSuppliers();
    }
  }, [isModalOpen, fetchSuppliers]);

  const handleSelectSupplier = (supplierId: string) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplierId)
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleAddSelectedSuppliers = () => {
    const newSuppliers = selectedSuppliers.map(supplierId => {
      const supplier = availableSuppliers.find(s => s.id === supplierId);
      if (!supplier) return null;

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: supplier.supplier_name,
        code: supplier.supplier_code,
        purchasePrice: "",
        quantity: "",
        contactPerson: supplier.contact_person_name,
        email: supplier.email_address,
        phone: supplier.phone_number
      } as SupplierEntry;
    }).filter(Boolean) as SupplierEntry[];

    updateSuppliers([...suppliers, ...newSuppliers]);
    setIsModalOpen(false);
    setSelectedSuppliers([]);
    setSearchQuery("");
  };

  const handleRequestDelete = (id: string) => {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      updateSuppliers(suppliers.filter(s => s.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  const handleUpdateSupplier = (id: string, field: keyof SupplierEntry, value: string) => {
    updateSuppliers(suppliers.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const filteredSuppliers = availableSuppliers.filter(supplier =>
    supplier.supplier_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.supplier_code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter out suppliers that are already added
  const availableToAdd = filteredSuppliers.filter(
    supplier => !suppliers.some(s => s.code === supplier.supplier_code)
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-medium text-gray-900 dark:text-white">Supplier Management & Sourcing</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage suppliers, costs and stock allocations</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/settings/supplier"
            className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            Library
          </Link>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" /> Create Supplier
          </button>
        </div>
      </div>

      <SupplierFormDrawer
        key={isDrawerOpen ? 'open' : 'closed'}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={(newSupplier) => {
          fetchSuppliers();
          const entry: SupplierEntry = {
            id: Math.random().toString(36).substr(2, 9),
            name: newSupplier.supplier_name,
            code: newSupplier.supplier_code,
            purchasePrice: "",
            quantity: "",
            contactPerson: newSupplier.contact_person_name,
            email: newSupplier.email_address,
            phone: newSupplier.phone_number
          };
          updateSuppliers([...suppliers, entry]);
        }}
      />

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        {suppliers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <PlusIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">No Suppliers Added</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-md mx-auto">
              Add sourcing details for this product. You can manage multiple suppliers and costs.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:scale-105 transition-all shadow-sm"
            >
              Select From Library
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Sourcing Detail</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Purchase Price</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Allocated Stock</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-20 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{supplier.name}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                              {supplier.code}
                            </span>
                            {supplier.contactPerson && (
                              <span className="text-[10px] text-gray-400 truncate max-w-[120px]">
                                • {supplier.contactPerson}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative w-32">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">$</span>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={supplier.purchasePrice}
                          onChange={(e) => handleUpdateSupplier(supplier.id, 'purchasePrice', e.target.value)}
                          className="w-full h-9 pl-6 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-brand-500 focus:ring-0 transition-all text-gray-700 dark:text-gray-200"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          placeholder="0"
                          value={supplier.quantity}
                          onChange={(e) => handleUpdateSupplier(supplier.id, 'quantity', e.target.value)}
                          className="w-24 h-9 text-center text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-brand-500 focus:ring-0 transition-all text-gray-700 dark:text-gray-200"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleRequestDelete(supplier.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                          title="Remove Supplier"
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
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSuppliers([]);
          setSearchQuery("");
        }}
        title="Select Suppliers"
        className="max-w-4xl"
      >
        <div className="p-6 space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search suppliers by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar border border-gray-200 dark:border-gray-700 rounded-xl">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading suppliers...</div>
            ) : availableToAdd.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery ? 'No suppliers found matching your search.' : 'No suppliers available.'}
                </p>
                <button
                  onClick={() => { setIsModalOpen(false); setIsDrawerOpen(true); }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  Add New Supplier
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {availableToAdd.map((supplier) => (
                  <label key={supplier.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                    <Checkbox
                      id={`supplier-${supplier.id}`}
                      checked={selectedSuppliers.includes(supplier.id)}
                      onChange={() => handleSelectSupplier(supplier.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900 dark:text-white">{supplier.supplier_name}</span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                          {supplier.supplier_code}
                        </span>
                      </div>
                      {supplier.contact_person_name && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Contact: {supplier.contact_person_name}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSuppliers.length} supplier(s) selected</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setIsModalOpen(false); setSelectedSuppliers([]); setSearchQuery(""); }} className="h-11 px-6">Cancel</Button>
              <Button
                onClick={handleAddSelectedSuppliers}
                disabled={selectedSuppliers.length === 0}
                className="h-11 px-6 bg-brand-500 text-white hover:bg-brand-600"
              >
                Add {selectedSuppliers.length > 0 && `(${selectedSuppliers.length})`} Supplier{selectedSuppliers.length !== 1 && 's'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => { setIsConfirmOpen(false); setDeleteTargetId(null); }}
        onConfirm={handleConfirmDelete}
        title="Delete Supplier?"
        message="Are you sure you want to remove this supplier from the product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
