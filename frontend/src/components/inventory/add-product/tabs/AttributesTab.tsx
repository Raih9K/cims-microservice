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
import AttributeFormDrawer from "../../attribute/AttributeFormDrawer";

interface AttributeEntry {
  id: string; // Internal ID for management
  attribute_id: string; // ID from global attributes table
  name: string;
  value: string;
}

export default function AttributesTab() {
  const { data, updateAttributes } = useProductForm();
  const attributes = data.attributes || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [availableAttributes, setAvailableAttributes] = useState<any[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Confirmation dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchAttributes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productService.getAttributes();
      if (response.success && response.data) {
        setAvailableAttributes(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch attributes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch available attributes when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetchAttributes();
    }
  }, [isModalOpen, fetchAttributes]);

  const handleSelectAttribute = (attributeId: string) => {
    setSelectedAttributes(prev =>
      prev.includes(attributeId)
        ? prev.filter(id => id !== attributeId)
        : [...prev, attributeId]
    );
  };

  const handleAddSelectedAttributes = () => {
    const newEntries = selectedAttributes.map(attrId => {
      const attr = availableAttributes.find(a => a.id === attrId);
      if (!attr) return null;

      return {
        id: Math.random().toString(36).substr(2, 9),
        attribute_id: attr.id,
        name: attr.name,
        value: ""
      } as AttributeEntry;
    }).filter(Boolean) as AttributeEntry[];

    updateAttributes([...attributes, ...newEntries]);
    setIsModalOpen(false);
    setSelectedAttributes([]);
    setSearchQuery("");
  };

  const handleRequestDelete = (id: string) => {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      updateAttributes(attributes.filter(attr => attr.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  const handleUpdateValue = (id: string, value: string) => {
    updateAttributes(attributes.map(attr =>
      attr.id === id ? { ...attr, value } : attr
    ));
  };

  const filteredAttributesList = availableAttributes.filter(attr =>
    attr.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter out attributes that are already added
  const availableToAdd = filteredAttributesList.filter(
    attr => !attributes.some(a => a.attribute_id === attr.id)
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-medium text-gray-900 dark:text-white">Custom Product Attributes</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add custom fields like material, care instructions, or warranty</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/settings/attributes"
            className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            Library
          </Link>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" /> Create Attribute
          </button>
        </div>
      </div>

      <AttributeFormDrawer
        key={isDrawerOpen ? 'open' : 'closed'}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={(newAttr) => {
          fetchAttributes();
          const entry: AttributeEntry = {
            id: Math.random().toString(36).substr(2, 9),
            attribute_id: newAttr.id,
            name: newAttr.name,
            value: ""
          };
          updateAttributes([...attributes, entry]);
        }}
      />

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        {attributes.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <PlusIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">No Attributes Added</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-md mx-auto">
              Define custom attributes to provide more details about your product.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:scale-105 transition-all shadow-sm"
            >
              Select From Library
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Attribute Identification</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Attribute Value</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-20 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {attributes.map((attr) => (
                  <tr key={attr.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-tight">{attr.name}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">Custom Field</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="max-w-md">
                        <input
                          type="text"
                          placeholder={`Enter ${attr.name.toLowerCase()} value`}
                          value={attr.value}
                          onChange={(e) => handleUpdateValue(attr.id, e.target.value)}
                          className="w-full h-9 px-4 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-brand-500 focus:ring-0 transition-all text-gray-700 dark:text-gray-200"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleRequestDelete(attr.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                          title="Remove Attribute"
                        >
                          <TrashBinIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-gray-50/30 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                <PlusIcon className="w-4 h-4" /> Select Attribute
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAttributes([]);
          setSearchQuery("");
        }}
        title="Select Attributes"
        className="max-w-4xl"
      >
        <div className="p-6 space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search attributes by name..."
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
              <div className="p-12 text-center text-gray-500">Loading attributes...</div>
            ) : availableToAdd.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery ? 'No attributes found matching your search.' : 'No attributes available.'}
                </p>
                <button
                  onClick={() => { setIsModalOpen(false); setIsDrawerOpen(true); }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  Create New Attribute
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">
                {availableToAdd.map((attr) => (
                  <button
                    key={attr.id}
                    onClick={() => handleSelectAttribute(attr.id)}
                    className={`flex items-center gap-3 p-4 border rounded-2xl transition-all text-left ${selectedAttributes.includes(attr.id)
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400"
                      : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-brand-200 dark:hover:border-brand-500/30"
                      }`}
                  >
                    <Checkbox
                      id={`attr-${attr.id}`}
                      checked={selectedAttributes.includes(attr.id)}
                      readOnly
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{attr.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase">{attr.type}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAttributes.length} attribute(s) selected</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setIsModalOpen(false); setSelectedAttributes([]); setSearchQuery(""); }} className="h-11 px-6">Cancel</Button>
              <Button
                onClick={handleAddSelectedAttributes}
                disabled={selectedAttributes.length === 0}
                className="h-11 px-6 bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20"
              >
                Add {selectedAttributes.length > 0 && `(${selectedAttributes.length})`} Attribute{selectedAttributes.length !== 1 && 's'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => { setIsConfirmOpen(false); setDeleteTargetId(null); }}
        onConfirm={handleConfirmDelete}
        title="Remove Attribute?"
        message="Are you sure you want to remove this attribute from the product?"
        confirmText="Remove"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
