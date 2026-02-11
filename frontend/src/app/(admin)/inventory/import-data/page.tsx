"use client";

import { PageSkeleton } from "@/components/common/SkeletonLoader";
import Button from "@/components/ui/button/Button";
import { Drawer } from "@/components/ui/drawer/Drawer";
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Indoor Icons with refined strokes
const CloudIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
);

// Mock Active Import Configurations
const importTasks = [
  {
    id: "CFG-001",
    name: "Main Supplier Feed",
    source: "https://api.supplier.com/v1/feed.csv",
    type: "Scheduled",
    frequency: "Every 6 Hours",
    lastRun: "2 hours ago",
    status: "Active",
    mappingName: "Standard CSV v2"
  },
  {
    id: "CFG-002",
    name: "Weekly Marketing Stock",
    source: "Internal Excel Upload",
    type: "Manual",
    frequency: "On Demand",
    lastRun: "3 days ago",
    status: "Idle",
    mappingName: "Promotional Mapping"
  },
];

// Mock Logs
const recentImportLogs = [
  { id: "IMP-928", name: "Main Supplier Feed", date: "Jan 21, 2024 08:30 AM", duration: "1m 24s", processed: 1420, updated: 89, errors: 0, status: "Success" },
  { id: "IMP-927", name: "Emergency Price Hotfix", date: "Jan 20, 2024 11:45 PM", duration: "12s", processed: 45, updated: 45, errors: 0, status: "Success" },
  { id: "IMP-926", name: "Main Supplier Feed", date: "Jan 20, 2024 02:30 AM", duration: "2m 10s", processed: 1380, updated: 12, errors: 3, status: "Warning" },
];

export default function ImportDataPage() {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isTemplateCustomizing, setIsTemplateCustomizing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Automation State
  const [protocolLocation, setProtocolLocation] = useState("HTTP");
  const [protocolConfig, setProtocolConfig] = useState({
    url: "https://www.w3.org/example",
    encoding: "Default",
    delimiter: "Comma ,",
    escape: 'quotes "',
    afterDownload: "Select",
    frequency: "Daily",
    time: "00:00"
  });

  const [importType, setImportType] = useState("Price Import");

  // Attribute selector state
  const [availableAttributes, setAvailableAttributes] = useState([
    { id: 'pid', label: 'Product-ID', checked: false },
    { id: 'pidt', label: 'Product-ID Type', checked: false },
    { id: 'pshop', label: 'Price_(Shopify MYS)', checked: false },
  ]);

  const [selectedAttributes, setSelectedAttributes] = useState([
    { id: 'sku', label: 'SKU', checked: false },
    { id: 'title', label: 'Title', checked: false },
    { id: 'pprice', label: 'Purchase Price', checked: false },
    { id: 'rprice', label: 'Retail Price', checked: false },
    { id: 'msrp', label: 'MSRP', checked: false },
    { id: 'map', label: 'MAP', checked: false },
    { id: 'curr', label: 'Currency', checked: false },
    { id: 'pamaz', label: 'Price_(Amazon 11SE)', checked: false },
    { id: 'pebay', label: 'Price_(eBay CACO)', checked: false },
  ]);

  const handleAddAttribute = () => {
    const toMove = availableAttributes.filter(a => a.checked);
    if (toMove.length === 0) {
      toast.error("Select attributes from the available pool first.");
      return;
    }
    setAvailableAttributes(availableAttributes.filter(a => !a.checked));
    setSelectedAttributes([...selectedAttributes, ...toMove.map(a => ({ ...a, checked: false }))]);
    toast.success(`Ported ${toMove.length} attributes to protocol.`);
  };

  const handleRemoveAttribute = () => {
    const toMove = selectedAttributes.filter(a => a.checked);
    if (toMove.length === 0) {
      toast.error("Select attributes to de-scope from the protocol.");
      return;
    }
    setSelectedAttributes(selectedAttributes.filter(a => !a.checked));
    setAvailableAttributes([...availableAttributes, ...toMove.map(a => ({ ...a, checked: false }))]);
    toast.success(`Removed ${toMove.length} attributes from manifest.`);
  };

  const handleAddAllAttributes = () => {
    if (availableAttributes.length === 0) return;
    setSelectedAttributes([...selectedAttributes, ...availableAttributes.map(a => ({ ...a, checked: false }))]);
    setAvailableAttributes([]);
    toast.success("Full attribute protocol synchronized.");
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleImportNow = (name: string) => {
    const loadingToast = toast.loading(`Initializing protocol: ${name}...`);
    setTimeout(() => {
      toast.success(`Synched Successfully! Handshaked ${Math.floor(Math.random() * 1000)} nodes.`, {
        id: loadingToast,
        style: {
          borderRadius: '1rem',
          background: '#111827',
          color: '#fff',
          fontSize: '12px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }
      });
    }, 2000);
  };

  if (!isLoaded) return <PageSkeleton />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-screen bg-gray-50 select-none transition-all duration-700">

      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-2">
        <Link href="/dashboard" className="hover:text-brand-500 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <span className="text-gray-200">/</span>
        <Link href="/inventory" className="hover:text-brand-500 transition-colors">Inventory</Link>
        <span className="text-gray-200">/</span>
        <span className="font-medium text-gray-600">Import Data</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white tracking-tight">Sync Hub</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Orchestrate complex data handshakes between global supply chains and internal inventory.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/inventory">
            <button className="h-11 px-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-brand-600 hover:border-brand-200 rounded-xl flex items-center gap-2 transition-all shadow-sm font-semibold text-sm">
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Back</span>
            </button>
          </Link>
          <Link href="/inventory/import">
            <button className="h-11 px-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-brand-600 hover:border-brand-200 rounded-xl flex items-center gap-2 transition-all shadow-sm font-semibold text-sm">
              <PlusIcon className="w-4 h-4 text-brand-600" />
              <span>Bulk Import</span>
            </button>
          </Link>
          <button
            onClick={() => setIsScheduling(true)}
            className="h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all active:scale-95 font-semibold text-sm"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Schedule Sync</span>
          </button>
        </div>
      </div>

      {/* Main Operational Grid */}
      <div className="grid grid-cols-12 gap-8">

        {/* LEFT: Configured Flows */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.02)] overflow-hidden">
            <div className="px-10 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Configured Data Streams</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-none">{importTasks.length} Active Nodes</span>
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {importTasks.map((task) => (
                <div key={task.id} className="p-10 hover:bg-gray-50/50 transition-all duration-500 group relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 shadow-sm transition-all duration-500 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-brand-600/20 group-hover:rotate-6">
                        <CloudIcon className="w-8 h-8" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight group-hover:text-brand-600 transition-colors uppercase">{task.name}</h4>
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="text-[10px] font-mono bg-white px-2.5 py-1 rounded-xl text-gray-500 border border-gray-100 shadow-sm font-semibold">{task.id}</span>
                          <p className="text-[11px] text-gray-400 font-semibold font-mono tracking-tight truncate max-w-[250px]">{task.source}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-10">
                      <div className="text-center md:text-left space-y-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Protocol</p>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${task.type === 'Scheduled' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                          {task.type}
                        </span>
                      </div>
                      <div className="text-center md:text-left space-y-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Frequency</p>
                        <p className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">{task.frequency}</p>
                      </div>
                      <div className="text-center md:text-left space-y-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Snapshot</p>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">{task.lastRun}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleImportNow(task.name)}
                          className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-600/10 transition-all flex items-center justify-center group/play active:scale-90"
                        >
                          <PlayIcon className="w-6 h-6 group-hover/play:scale-110 transition-transform" />
                        </button>
                        <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-brand-600 hover:border-brand-100 hover:shadow-lg transition-all flex items-center justify-center active:scale-95">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.02)] overflow-hidden">
            <div className="px-10 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Operational Deployment Logs</h3>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-10 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Flow Status</th>
                    <th className="px-6 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Task Protocol</th>
                    <th className="px-6 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Items</th>
                    <th className="px-6 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Mutated</th>
                    <th className="px-10 py-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Manifest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentImportLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/80 transition-all duration-300 group">
                      <td className="px-10 py-7">
                        <span className={`px-4 py-2 rounded-2xl text-[9px] font-bold uppercase tracking-widest border flex items-center gap-2 w-fit transition-all group-hover:scale-105
                          ${log.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                          <div className={`w-2 h-2 rounded-full ${log.status === 'Success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
                          {log.status === 'Success' ? 'Deployed' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-7">
                        <p className="text-[13px] font-medium text-gray-800 uppercase tracking-tight">{log.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono font-bold mt-0.5">SID: {log.id}</p>
                      </td>
                      <td className="px-6 py-7">
                        <div className="flex items-center gap-2.5 text-gray-500">
                          <ClockIcon className="w-4 h-4 text-brand-500" />
                          <span className="text-[11px] font-bold uppercase tracking-tight">{log.date}</span>
                        </div>
                        <p className="text-[9px] text-gray-400 font-semibold mt-1 ml-6.5 uppercase tracking-widest">Duration: {log.duration}</p>
                      </td>
                      <td className="px-6 py-7 text-center font-mono text-[13px] font-medium text-gray-900">{log.processed}</td>
                      <td className="px-6 py-7 text-center font-mono text-[13px] font-medium text-emerald-600">+{log.updated}</td>
                      <td className="px-10 py-7 text-right">
                        <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-600 hover:border-brand-200 hover:shadow-sm transition-all shadow-sm">
                          <FileTextIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: Analytical Snapshots */}
        <div className="col-span-12 xl:col-span-4 space-y-8">
          {/* Stats: Pulse Health */}
          <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[60px] -ml-16 -mb-16" />

            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-400">Sync Vitality</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Online</span>
                </div>
              </div>

              <div>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-6xl font-bold tracking-tighter leading-none">98.4<span className="text-brand-500">%</span></span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest">Platform Uptime Consensus</p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Throughput</p>
                  <p className="text-lg font-bold tracking-tight text-brand-100 italic">1.2M+</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Error Rate</p>
                  <p className="text-lg font-bold tracking-tight text-emerald-400 italic">0.02%</p>
                </div>
              </div>

              <button className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40 active:scale-95">
                Download Protocol Audit
              </button>
            </div>
          </div>

          {/* Mapping Protocol Templates */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-[0_12px_40px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.03)] transition-all">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-tight">Saved Protocols</h3>
              <button className="text-[10px] font-bold text-brand-600 uppercase tracking-widest hover:opacity-70 transition-opacity">Edit All</button>
            </div>
            <div className="space-y-4">
              {["Standard CSV v2", "Amazon Global Bulk", "Internal Supplier Protocol"].map((template) => (
                <div key={template} className="group relative">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-gray-50/50 border border-transparent hover:border-brand-100 hover:bg-white transition-all cursor-pointer shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-brand-600 group-hover:scale-110 transition-all">
                        <FileTextIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">{template}</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-emerald-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsTemplateCustomizing(true)}
              className="w-full mt-8 py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] hover:border-brand-600 hover:text-brand-600 hover:bg-brand-50/20 transition-all active:scale-[0.98]"
            >
              Architect New Protocol
            </button>
          </div>
        </div>

      </div>

      {/* High-Fidelity Automation Architect Drawer */}
      <Drawer
        isOpen={isScheduling}
        onClose={() => setIsScheduling(false)}
        title="Schedule Data Synchronization"
        className="w-full md:!max-w-[50%]"
        footer={
          <div className="flex justify-end gap-3 w-full p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <Button
              variant="outline"
              onClick={() => setIsScheduling(false)}
              className="h-11 px-8 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all text-gray-700 dark:text-gray-300"
            >
              Close
            </Button>
            <Button
              onClick={() => { setIsScheduling(false); toast.success("Protocol Bridge Activated!"); }}
              className="h-11 px-10 bg-brand-600 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Apply & Activate</span>
            </Button>
          </div>
        }
      >
        <div className="p-8 space-y-8">
          <div className="space-y-6">
            {/* Protocol Source Selector */}
            <div className="space-y-3">
              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Transmission Protocol</label>
              <div className="flex flex-wrap gap-2">
                {["HTTP", "FTP", "SFTP", "Dropbox", "S3"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setProtocolLocation(type)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all border ${protocolLocation === type ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/10' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 hover:border-brand-200'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Endpoint URL <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={protocolConfig.url}
                  onChange={(e) => setProtocolConfig({ ...protocolConfig, url: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[13px] font-medium text-gray-700 dark:text-gray-300 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-brand-600/10 focus:border-brand-600/30 outline-none transition-all placeholder:text-gray-300 font-mono"
                  placeholder="https://api.stream.io/v1/feed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Encoding</label>
                  <select className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[13px] font-medium text-gray-700 dark:text-gray-300 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all cursor-pointer">
                    <option>Default</option>
                    <option>UTF-8</option>
                    <option>ISO-8859-1</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Delimiter</label>
                  <select className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[13px] font-medium text-gray-700 dark:text-gray-300 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all cursor-pointer">
                    <option>Comma ,</option>
                    <option>Tab \t</option>
                    <option>Pipe |</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Post-process Action</label>
                <select className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[13px] font-medium text-gray-400 dark:text-gray-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all cursor-pointer">
                  <option>Select Action...</option>
                  <option>Keep File</option>
                  <option>Delete Source</option>
                  <option>Archive to Success Folder</option>
                </select>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="space-y-3">
                  <label className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider ml-1">Synchronization Heartbeat</label>
                  <div className="flex gap-3">
                    <select
                      value={protocolConfig.frequency}
                      onChange={(e) => setProtocolConfig({ ...protocolConfig, frequency: e.target.value })}
                      className="flex-[2] h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[13px] font-medium text-gray-700 dark:text-gray-300 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all cursor-pointer"
                    >
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Real-time (Webhook)</option>
                    </select>
                    <input
                      type="time"
                      value={protocolConfig.time}
                      onChange={(e) => setProtocolConfig({ ...protocolConfig, time: e.target.value })}
                      className="flex-1 h-11 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[13px] font-medium text-gray-700 dark:text-gray-300 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50/50 dark:bg-blue-500/5 border border-blue-200/50 dark:border-blue-500/10 rounded-2xl">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Scheduled synchronization maintains state-consistency across distributed vendor nodes. Active heartbeat intervals improve hive integrity.</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      {/* Customize Template Drawer */}
      <Drawer
        isOpen={isTemplateCustomizing}
        onClose={() => setIsTemplateCustomizing(false)}
        title="Customize Mapping Protocol"
        className="w-full md:!max-w-[800px]"
        footer={
          <div className="flex justify-end gap-3 w-full p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <Button
              variant="outline"
              onClick={() => setIsTemplateCustomizing(false)}
              className="h-11 px-8 rounded-xl text-[11px] font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300"
            >
              Close
            </Button>
            <Button
              onClick={() => { setIsTemplateCustomizing(false); toast.success("Protocol Manifest Updated"); }}
              className="h-11 px-10 rounded-xl bg-brand-600 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-brand-700 shadow-lg shadow-brand-600/20 active:scale-95 transition-all"
            >
              Apply & Save Protocol
            </Button>
          </div>
        }
      >
        <div className="p-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Import Type</label>
              <select
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
                className="w-full h-12 px-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-brand-600/10 focus:border-brand-600/30 outline-none transition-all cursor-pointer"
              >
                <option>Price Import</option>
                <option>Inventory Sync</option>
                <option>Product Update</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Attribute Manifest</h3>
              <p className="text-xs text-gray-500 font-medium tracking-tight">Map your source headers to CIMS logic</p>
            </div>

            <div className="grid grid-cols-12 gap-6 min-h-[450px]">
              {/* Left Column: Available Attributes */}
              <div className="col-span-12 md:col-span-5 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Available Schema</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500">{availableAttributes.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                  {availableAttributes.map((attr, idx) => (
                    <div
                      key={attr.id}
                      onClick={() => {
                        const next = [...availableAttributes];
                        next[idx].checked = !next[idx].checked;
                        setAvailableAttributes(next);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer border ${attr.checked ? 'bg-brand-50/50 dark:bg-brand-500/10 border-brand-200 dark:border-brand-500/30' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-500/30'}`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${attr.checked ? 'bg-brand-600 border-brand-600' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
                        {attr.checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-[11px] font-semibold tracking-tight ${attr.checked ? 'text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400'}`}>{attr.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Actions */}
              <div className="col-span-12 md:col-span-2 flex flex-col items-center justify-center gap-4">
                <button
                  onClick={handleAddAttribute}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-brand-600 hover:border-brand-200 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRemoveAttribute}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-rose-500 hover:border-rose-200 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center -rotate-45"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Right Column: Selected Attributes */}
              <div className="col-span-12 md:col-span-5 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-widest">Selected Schema</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-500/20 text-[10px] font-bold text-brand-600 dark:text-brand-400">{selectedAttributes.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                  {selectedAttributes.map((attr, idx) => (
                    <div
                      key={attr.id}
                      onClick={() => {
                        const next = [...selectedAttributes];
                        next[idx].checked = !next[idx].checked;
                        setSelectedAttributes(next);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer border ${attr.checked ? 'bg-brand-50/50 dark:bg-brand-500/10 border-brand-200 dark:border-brand-500/30' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-500/30'}`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${attr.checked ? 'bg-brand-600 border-brand-600' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
                        {attr.checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-[11px] font-semibold tracking-tight ${attr.checked ? 'text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400'}`}>{attr.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50/50 dark:bg-blue-500/5 border border-blue-200/50 dark:border-blue-500/10 rounded-2xl">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Standardizing your attribute protocol ensures consistent data synchronization across all connected vendor nodes.</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      <style jsx global>{`
                @keyframes scaleIn {
                    from { transform: scale(0.9) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
    </div>
  );
}
