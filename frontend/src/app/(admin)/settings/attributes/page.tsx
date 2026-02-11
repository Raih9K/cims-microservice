"use client";
import AttributeFormDrawer from '@/components/inventory/attribute/AttributeFormDrawer';
import TableSkeleton from '@/components/ui/TableSkeleton';
import { PlusIcon } from '@/icons';
import { productService } from '@/services/productService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductAttributesPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [editingAttribute, setEditingAttribute] = useState<any>(null);

  const fetchAttributes = async () => {
    setLoading(true);
    try {
      const res = await productService.getAttributes();
      if (res.success && res.data) {
        setAttributes(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const handleSuccess = () => {
    fetchAttributes();
    setIsDrawerOpen(false);
    setEditingAttribute(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await productService.deleteAttribute(id);
      if (res.success) {
        setAttributes(attributes.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(attributes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAttributes = attributes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        <span className="text-gray-500">Settings</span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-900 dark:text-white">Product Attributes</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Product Attributes</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Define custom attributes like Material, Color, Size for your products.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingAttribute(null);
              setIsDrawerOpen(true);
            }}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Create Attribute
          </button>
        </div>
      </div>

      {/* Attributes List */}
      {loading ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          <TableSkeleton rows={5} columns={5} />
        </div>
      ) : attributes.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Attributes Defined</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">Attributes allow you to specify detailed product information consistent across your catalog.</p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm z-10 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Attribute Identification</th>
                    <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Data Type</th>
                    <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Options / Values</th>
                    <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Configuration</th>
                    <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {paginatedAttributes.map(attr => (
                    <tr key={attr.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900 dark:text-white">{attr.name}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 capitalize">{attr.type}</td>
                      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                        {attr.type === 'select' || attr.type === 'multi-select'
                          ? attr.options?.filter(Boolean).join(', ')
                          : 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-1">
                          {attr.required && (
                            <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-xs font-semibold rounded-md">
                              Required
                            </span>
                          )}
                          {attr.is_variant && (
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-md">
                              Variant
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingAttribute(attr);
                              setIsDrawerOpen(true);
                            }}
                            className="px-3 py-1.5 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg font-medium text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(attr.id)}
                            className="px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg font-medium text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-3xl">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1} to {Math.min(endIndex, attributes.length)} of {attributes.length} attributes
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                        ? 'bg-brand-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}>
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <AttributeFormDrawer
        key={isDrawerOpen ? (editingAttribute?.id || 'new') : 'closed'}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingAttribute(null);
        }}
        onSuccess={handleSuccess}
        editingAttribute={editingAttribute}
      />
    </div>
  );
}
