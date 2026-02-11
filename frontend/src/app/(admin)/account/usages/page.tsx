"use client";
import Link from 'next/link';

export default function UsagesPage() {
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
                <span className="text-gray-500">Account</span>
                <span className="text-gray-300">/</span>
                <span className="font-medium text-gray-900 dark:text-white">Usages</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Usage Analytics</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor your platform usage and API consumption</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Platform Usage</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">Track your API calls, storage usage, and feature consumption</p>
            </div>
        </div>
    );
}
