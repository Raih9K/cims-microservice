"use client";
import Link from 'next/link';

export default function ImportDataPage() {
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
                <span className="font-medium text-gray-900 dark:text-white">Import Data</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Import Data</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bulk upload products and update inventory using CSV files.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center hover:border-brand-500/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-brand-50 dark:bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Drag & Drop CSV File</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">or click to browse from your computer</p>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <button className="text-brand-600 font-medium text-sm hover:underline">Download Sample CSV</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-brand-600 font-medium text-sm hover:underline">View Formatting Guide</button>
                </div>
            </div>
        </div>
    );
}
