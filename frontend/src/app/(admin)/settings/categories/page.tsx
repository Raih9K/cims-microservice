"use client";
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { Drawer } from '@/components/ui/drawer/Drawer';
import { productService } from '@/services/productService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [categoryName, setCategoryName] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      await productService.createCategory({ category_name: categoryName });
      setIsDrawerOpen(false);
      fetchCategories();
      setCategoryName('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this category?')) {
      try {
        await productService.deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.error(error);
      }
    }
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
        <span className="font-medium text-gray-900 dark:text-white">Manage Categories</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Product Categories</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Organize your products into hierarchical categories.</p>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
        >
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Category List Empty</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">Categories help customers navigate your store and find products easily.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Category Name</th>
                <th className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Total Products</th>
                <th className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {cat.category_name}
                  </td>
                  <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Category Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add New Category"
        className="w-full md:!max-w-[50vw]"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)} className="h-11 px-6 rounded-xl text-xs font-semibold">Discard</Button>
            <Button onClick={handleSubmit} className="h-11 px-6 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 shadow-sm">Save Category</Button>
          </>
        }
      >
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category Name <span className="text-red-500">*</span></Label>
              <Input
                placeholder="e.g. Electronics, Clothing"
                className="h-11 rounded-xl"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
