import AddProductForm from "@/components/inventory/add-product/AddProductForm";
import { ProductFormProvider } from "@/context/ProductFormContext";
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import { Suspense } from "react";

export default function AddProductPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-6 w-full max-w-[1600px] mx-auto">
      <div className="mb-5">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/inventory" className="hover:text-brand-600 transition-colors">Inventory</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 dark:text-white font-semibold">Add Product</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Add New Product</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Register a new asset into your digital ecosystem</p>
          </div>
          <Link href="/inventory" className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <ChevronLeftIcon className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      <ProductFormProvider>
        <Suspense fallback={<div>Loading Form...</div>}>
          <AddProductForm />
        </Suspense>
      </ProductFormProvider>
    </div>
  );
}
