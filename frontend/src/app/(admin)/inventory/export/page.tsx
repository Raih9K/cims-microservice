"use client";

import {
  BoltIcon,
  BoxIcon,
  ChevronLeftIcon,
  DownloadIcon,
  FileIcon,
  GridIcon,
  GroupIcon,
  TimeIcon
} from "@/icons/index";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { PageSkeleton } from '@/components/common/SkeletonLoader';

// Internal Icons for specific use
const CloudDownload = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
  </svg>
);

const DatabaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
);

export default function ExportDataPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [exportType, setExportType] = useState('Inventory Ledger');
  const [format, setFormat] = useState('XLSX');
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return <PageSkeleton />;

  const handleExport = () => {
    setIsExporting(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast.success("Data Manifest Exported Successfully!");
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 sm:p-6 lg:p-10 transition-all duration-700 uppercase-none select-none">

      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/inventory" className="hover:text-brand-600 transition-colors">Inventory</Link>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-900">Export Hub</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-none">Export Hub</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Orchestrate high-fidelity data entities into cross-platform manifests.</p>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/inventory">
                <button className="h-12 px-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-750 flex items-center gap-2 shadow-sm">
                  <ChevronLeftIcon className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </Link>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Engine Status</span>
                  <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 mt-1 uppercase">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-12 xl:col-span-12">
            <div className="bg-white rounded-[3rem] border border-gray-100 p-10 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.02)] space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em]">Manifest Type</h3>
                    <p className="text-[12px] text-gray-400 font-medium">Select the data entity group you wish to orchestrate into a manifest.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Inventory Ledger', desc: 'Full stock & attribute data', icon: <BoxIcon className="w-5 h-5" /> },
                      { name: 'Order Logs', desc: 'Transaction history & shipping', icon: <GridIcon className="w-5 h-5" /> },
                      { name: 'Supplier Index', desc: 'Partner data & contacts', icon: <GroupIcon className="w-5 h-5" /> },
                      { name: 'Performance Audit', desc: 'Sales analytics & growth', icon: <DatabaseIcon className="w-5 h-5" /> },
                    ].map((type) => (
                      <button
                        key={type.name}
                        onClick={() => setExportType(type.name)}
                        className={`p-6 rounded-[2rem] border-2 transition-all text-left space-y-4 group
                           ${exportType === type.name
                            ? 'border-brand-600 bg-brand-50/20 shadow-xl shadow-brand-600/5'
                            : 'border-gray-50 bg-gray-50/30 hover:border-gray-200 hover:bg-white'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                           ${exportType === type.name ? 'bg-brand-600 text-white' : 'bg-white border border-gray-100 text-gray-400 group-hover:text-gray-900'}`}>
                          {type.icon}
                        </div>
                        <div>
                          <p className={`text-sm font-bold tracking-tight ${exportType === type.name ? 'text-gray-900' : 'text-gray-500'}`}>{type.name}</p>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1 opacity-60 leading-relaxed">{type.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em]">Engine Configuration</h3>
                    <p className="text-[12px] text-gray-400 font-medium">Define the format and filtering parameters for the export sequence.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] ml-1">Output Format</label>
                        <select
                          value={format}
                          onChange={(e) => setFormat(e.target.value)}
                          className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none text-sm font-bold text-gray-900 focus:ring-4 focus:ring-brand-600/10 cursor-pointer transition-all"
                        >
                          <option>XLSX (Advanced Excel)</option>
                          <option>CSV (Technical Standard)</option>
                          <option>JSON (Developer Ready)</option>
                          <option>XML (Legacy Bridge)</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] ml-1">Data Depth</label>
                        <select className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none text-sm font-bold text-gray-900 focus:ring-4 focus:ring-brand-600/10 cursor-pointer transition-all">
                          <option>Full Entity Schema</option>
                          <option>Essential Mapping</option>
                          <option>Marketplace Specific</option>
                          <option>Auditor Core</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] ml-1">Time Horizon (Date Range)</label>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="date" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none text-sm font-bold text-gray-900 focus:ring-4 focus:ring-brand-600/10 transition-all uppercase" />
                        <input type="date" className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none text-sm font-bold text-gray-900 focus:ring-4 focus:ring-brand-600/10 transition-all uppercase" />
                      </div>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-gray-900 space-y-6 shadow-2xl shadow-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                            <BoltIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-white uppercase tracking-widest">Manifest Ready</p>
                            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-[0.1em]">~ 1,240 Nodes Identified</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-widest">Validated</span>
                      </div>

                      {isExporting ? (
                        <div className="space-y-3">
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-500 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-gray-400 italic animate-pulse">Orchestrating Manifest...</span>
                            <span className="text-white">{progress}%</span>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={handleExport}
                          className="w-full py-4 bg-white hover:bg-brand-50 text-gray-900 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                        >
                          Initiate Export Protocol
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-12">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.01)]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <TimeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em]">Deployment Logs</h3>
                    <p className="text-[10px] text-gray-400 font-medium">Recent data orchestration history</p>
                  </div>
                </div>
                <button className="text-[9px] font-bold text-brand-600 uppercase tracking-widest hover:opacity-70 transition-opacity">Clear Logs</button>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                    <tr>
                      <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Timestamp</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Manifest Name</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Format</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Nodes Exported</th>
                      <th className="px-6 py-5 text-right text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { date: 'Oct 12, 2023 - 14:20', name: 'Inventory_Ledger_Final', format: 'XLSX', nodes: '4,281', status: 'ready' },
                      { date: 'Oct 10, 2023 - 09:15', name: 'Orders_Q3_Archived', format: 'CSV', nodes: '12,042', status: 'ready' },
                      { date: 'Oct 08, 2023 - 18:45', name: 'Supplier_Nodes_Global', format: 'JSON', nodes: '156', status: 'ready' },
                    ].map((log, idx) => (
                      <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{log.date}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
                              <FileIcon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 tracking-tight">{log.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest">{log.format}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{log.nodes} Nodes</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end">
                            <button className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-brand-600 hover:bg-white hover:shadow-md transition-all">
                              <DownloadIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
}
