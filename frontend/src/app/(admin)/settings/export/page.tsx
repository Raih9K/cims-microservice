"use client";
import Link from 'next/link';

export default function ExportDataPage() {
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
                <span className="font-medium text-gray-900 dark:text-white">Export Data</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Export Data</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Download your products, orders, and customer data.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Products Export", desc: "Export all product details, including variants and inventory.", icon: "box" },
                    { title: "Orders Export", desc: "Download order history, customer details, and shipping status.", icon: "cart" },
                    { title: "Inventory Report", desc: "Get a snapshot of current stock levels across all warehouses.", icon: "chart" }
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{item.desc}</p>
                        <button className="w-full py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold transition-all">
                            Export CSV
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
