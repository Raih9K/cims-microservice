"use client";
import Link from 'next/link';

export default function BillingPage() {
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
        <span className="font-semibold text-gray-900 dark:text-white">Billing</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Billing & Subscription</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your subscription plan and payment methods</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center">
        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Billing Overview</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">View invoices, update payment methods, and manage your subscription</p>
      </div>
    </div>
  );
}
