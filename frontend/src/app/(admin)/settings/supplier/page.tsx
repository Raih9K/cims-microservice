"use client";
import SupplierFormDrawer from '@/components/inventory/supplier/SupplierFormDrawer';
import { Drawer } from '@/components/ui/drawer/Drawer';
import TableSkeleton from "@/components/ui/TableSkeleton";
import { PlusIcon } from '@/icons';
import { productService } from '@/services/productService';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function SupplierSettingsPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductsDrawerOpen, setIsProductsDrawerOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [supplierProducts, setSupplierProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProductCounts = useCallback(async (suppliersList: any[]) => {
    try {
      // Fetch all products to count per supplier
      const productsResponse = await productService.getProducts();
      if (productsResponse.success && productsResponse.data) {
        const counts: Record<string, number> = {};
        suppliersList.forEach((supplier: any) => {
          // Count products where supplier_id matches
          const count = productsResponse.data.filter(
            (product: any) => product.supplier_id === supplier.id
          ).length;
          counts[supplier.id] = count;
        });
        setProductCounts(counts);
      }
    } catch (error) {
      console.error('Failed to fetch product counts:', error);
    }
  }, []);

  const fetchSuppliers = useCallback(async () => {
    try {
      const response = await productService.getSuppliers();
      if (response.success && response.data) {
        setSuppliers(response.data);
        // Fetch real product counts from database
        await fetchProductCounts(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchProductCounts]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const handleSuccess = () => {
    fetchSuppliers();
    setIsDrawerOpen(false);
    setEditingSupplier(null);
  };

  const handleEdit = (supplier: any) => {
    setEditingSupplier(supplier);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this supplier?')) {
      try {
        await productService.deleteSupplier(id);
        fetchSuppliers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleViewProducts = async (supplier: any) => {
    setEditingSupplier(supplier); // Re-using for display
    setIsProductsDrawerOpen(true);
    setLoadingProducts(true);

    try {
      // Fetch real products from database for this supplier
      const response = await productService.getProducts();
      if (response.success && response.data) {
        // Filter products by supplier_id
        const products = response.data.filter(
          (product: any) => product.supplier_id === supplier.id
        ).map((product: any) => ({
          id: product.id,
          name: product.name || 'Unnamed Product',
          sku: product.sku || 'N/A',
          stock: product.quantity || 0
        }));
        setSupplierProducts(products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setSupplierProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleUpdateStock = (productId: number, newStock: number) => {
    if (confirm(`Update stock quantity to ${newStock} units?`)) {
      setSupplierProducts(prev =>
        prev.map(p => p.id === productId ? { ...p, stock: newStock } : p)
      );
    }
  };

  const handleRemoveProduct = (productId: number) => {
    if (confirm('Remove this product from the supplier? This action cannot be undone.')) {
      setSupplierProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSuppliers = suppliers.slice(startIndex, endIndex);

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
        <span className="font-medium text-gray-900 dark:text-white">Suppliers</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Manage Suppliers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Directory of your manufacturers and distributors.</p>
        </div>
        <button
          onClick={() => {
            setEditingSupplier(null);
            setIsDrawerOpen(true);
          }}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          <TableSkeleton rows={5} columns={6} />
        </div>
      ) : suppliers.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Suppliers Added</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">Keep track of your vendors and manufacturers here.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm z-10">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Supplier Identification</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Reference Code</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Contact Profile</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Contact Email</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">Portfolio</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedSuppliers.map(supplier => (
                  <tr key={supplier.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{supplier.supplier_name}</td>
                    <td className="py-4 px-6 text-gray-500 dark:text-gray-400 font-mono text-xs uppercase">{supplier.supplier_code}</td>
                    <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{supplier.contact_person_name || '-'}</td>
                    <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{supplier.email_address || '-'}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleViewProducts(supplier)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-500/20 rounded-lg font-medium text-sm transition-colors"
                      >
                        <span className="font-semibold">{productCounts[supplier.id] || 0}</span>
                        <span>View</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(supplier)}
                          className="px-3 py-1.5 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(supplier.id)}
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
                Showing {startIndex + 1} to {Math.min(endIndex, suppliers.length)} of {suppliers.length} suppliers
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

      {/* Create/Edit Supplier Drawer */}
      <SupplierFormDrawer
        key={isDrawerOpen ? (editingSupplier?.id || 'new') : 'closed'}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingSupplier(null);
        }}
        onSuccess={handleSuccess}
        editingSupplier={editingSupplier}
      />

      <Drawer
        isOpen={isProductsDrawerOpen}
        onClose={() => setIsProductsDrawerOpen(false)}
        title={`Products from ${editingSupplier?.supplier_name || 'Supplier'}`}
        className="w-full md:!max-w-[60vw]"
      >
        <div className="p-8">
          {supplierProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Products</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">This supplier has no products associated yet.</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 dark:text-gray-300">Product Name</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 dark:text-gray-300">SKU</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 dark:text-gray-300 text-center">Stock Quantity</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-700 dark:text-gray-300 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {supplierProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">{product.name}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono text-xs">{product.sku}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="number"
                            value={product.stock}
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value) || 0;
                              setSupplierProducts(prev =>
                                prev.map(p => p.id === product.id ? { ...p, stock: newValue } : p)
                              );
                            }}
                            className="w-24 h-9 px-3 text-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                          />
                          <button
                            onClick={() => handleUpdateStock(product.id, product.stock)}
                            className="px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-xs font-semibold transition-colors"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/inventory/edit/${product.id}`}
                            className="px-3 py-1.5 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg font-medium text-sm transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg font-medium text-sm transition-colors"
                          >
                            Remove
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
      </Drawer>
    </div>
  );
}
