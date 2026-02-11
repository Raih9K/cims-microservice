"use client";
import WarehouseFormDrawer from '@/components/inventory/warehouse/WarehouseFormDrawer';
import TableSkeleton from '@/components/ui/TableSkeleton';
import { PlusIcon } from '@/icons';
import { productService } from '@/services/productService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WarehouseSettingsPage() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Data
  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const response = await productService.getWarehouses();
      if (response.success && response.data) {
        setWarehouses(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSuccess = () => {
    fetchWarehouses();
    setIsDrawerOpen(false);
    setEditingWarehouse(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      try {
        const res = await productService.deleteWarehouse(id);
        if (res.success) {
          fetchWarehouses();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(warehouses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedWarehouses = warehouses.slice(startIndex, endIndex);

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
        <span className="font-medium text-gray-900 dark:text-white">Warehouse Location</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Warehouse Locations</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage physical storage locations, address details, and contact info.</p>
        </div>
        <button
          onClick={() => {
            setEditingWarehouse(null);
            setIsDrawerOpen(true);
          }}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add Warehouse
        </button>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          <TableSkeleton rows={5} columns={4} />
        </div>
      ) : warehouses.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Warehouses Configured</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">Start by adding your main warehouse or fulfillment center to track inventory correctly.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm z-10">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Warehouse Identification</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Facility Code</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Operational Location</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedWarehouses.map(wh => (
                  <tr key={wh.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {wh.name}
                        </span>
                        {wh.is_default && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 uppercase tracking-wider">
                            Primary
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 font-mono text-xs uppercase">
                      {wh.facility_code || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                      {[wh.city, wh.state, wh.country].filter(Boolean).join(', ') || 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 uppercase tracking-wider">
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingWarehouse(wh);
                            setIsDrawerOpen(true);
                          }}
                          className="px-3 py-1.5 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(wh.id)}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1} to {Math.min(endIndex, warehouses.length)} of {warehouses.length} warehouses
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                          ? 'bg-brand-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <WarehouseFormDrawer
        key={isDrawerOpen ? (editingWarehouse?.id || 'new') : 'closed'}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingWarehouse(null);
        }}
        onSuccess={handleSuccess}
        editingWarehouse={editingWarehouse}
      />
    </div>
  );
}
