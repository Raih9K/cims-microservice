"use client";

import { PageSkeleton } from "@/components/common/SkeletonLoader";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, FileIcon } from "@/icons";
import Link from "next/link";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

// Icons
const ShootingStarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20l1.3-1.3m0 0L8 15l1.5 1.5M4.3 18.7L2 22l3.3-2.3L4.3 18.7zM18 4l2 2m-2-2l-2 2m2-2V2m0 2h2M12 9l2 2m-2-2l-2 2m2-2V7m0 2h2m-5 5l2 2m-2-2l-2 2m2-2v-2m0 2h2" /></svg>
);
const PulseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);
const FluxIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 14H9L8 4z" /></svg>
);
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
);
const TerminalIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
);

// System Field Schema
const systemFields = [
  {
    group: "Core Intelligence", fields: [
      { id: "basicInfo.sku", label: "SKU Identifier *" },
      { id: "basicInfo.title", label: "Product Signature *" },
      { id: "basicInfo.category", label: "Node Class" },
      { id: "basicInfo.condition", label: "State Protocol" },
    ]
  },
  {
    group: "Economic Metrics", fields: [
      { id: "pricing.sellingPrice", label: "Target Alpha Price *" },
      { id: "pricing.costPrice", label: "Resource Cost" },
      { id: "basicInfo.msrp", label: "Market Baseline" },
    ]
  },
  {
    group: "Physical Specs", fields: [
      { id: "inventory.stock", label: "Unit Reserves" },
      { id: "basicInfo.weightValue", label: "Mass (KG)" },
      { id: "basicInfo.dimensionLength", label: "Axis: X" },
      { id: "basicInfo.dimensionWidth", label: "Axis: Y" },
      { id: "basicInfo.dimensionHeight", label: "Axis: Z" },
    ]
  }
];

const flatSystemFields = systemFields.flatMap(g => g.fields);

// ============================================================================
// CONFIG SECTION (EDITABLE)
// ============================================================================
const pageConfig = {
  pageId: "inventory-import-v1",
  mockApiEndpoint: "/api/mock/inventory-import",
  dataMap: {
    id: "id",
    filename: "filename",
    date: "date",
    status: "status",
    nodes: "nodes",
    latency: "latency"
  }
};
// ============================================================================


export default function InventoryImportPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [file, setFile] = React.useState<File | null>(null);
  const [csvData, setCsvData] = React.useState<any[]>([]);
  const [headers, setHeaders] = React.useState<string[]>([]);
  const [mapping, setMapping] = React.useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = React.useState("forge");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [importLogs, setImportLogs] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(pageConfig.mockApiEndpoint);
        if (res.ok) {
          const data = await res.json();
          setImportLogs(data);
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load logs");
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target?.result, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      if (jsonData.length > 0) {
        const rawHeaders = jsonData[0] as string[];
        const rows = XLSX.utils.sheet_to_json(sheet);
        setHeaders(rawHeaders);
        setCsvData(rows);
        const autoMapping: Record<string, string> = {};
        rawHeaders.forEach(h => {
          const norm = h.toLowerCase().trim();
          const match = flatSystemFields.find(f => norm.includes(f.id.split('.').pop() || "") || f.label.toLowerCase().includes(norm));
          if (match) autoMapping[h] = match.id;
        });
        setMapping(autoMapping);
        toast.success(`DATA STREAM CAPTURED: ${rows.length} NODES`);
      }
    };
    reader.readAsBinaryString(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const handleImport = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("CORE SYNCHRONIZATION COMPLETE");
      setActiveTab("vault");
      setCurrentStep(1);
      setFile(null);
    }, 2000);
  };

  if (!isLoaded) return <PageSkeleton />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-screen bg-[#F9FAFB] text-gray-900 font-sans">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/inventory" className="hover:text-blue-600 transition-colors">Inventory</Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900">Bulk Import</span>
      </nav>

      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bulk Import</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Standardize and import large product datasets into the core inventory.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/inventory">
            <Button variant="outline" className="h-11 px-6 border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px]">
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 gap-8 mb-8 overflow-x-auto no-scrollbar">
        {["Inbound Forge", "Neural Logs"].map((tabLabel) => {
          const tabKey = tabLabel === "Inbound Forge" ? "forge" : "vault";
          return (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`pb-4 text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap relative ${activeTab === tabKey
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400 hover:text-gray-700"
                }`}
            >
              {tabLabel}
            </button>
          )
        })}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.02)] min-h-[600px] overflow-hidden p-8">
        {activeTab === "forge" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Progress Bar */}
            <div className="lg:col-span-12 mb-6">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-4 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold text-sm transition-all
                                ${currentStep >= s
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-200 text-gray-400'}`}>
                      {currentStep > s ? <ShieldCheck className="w-5 h-5" /> : s}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStep >= s ? 'text-gray-900' : 'text-gray-400'}`}>
                      {s === 1 ? 'Upload' : s === 2 ? 'Mapping' : 'Validation'}
                    </span>
                    {s < 3 && <div className="w-24 h-[2px] bg-gray-100 hidden sm:block mx-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="lg:col-span-12">
              {currentStep === 1 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div {...getRootProps()} className={`w-full max-w-2xl aspect-[16/9] rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-6 cursor-pointer
                      ${isDragActive ? 'border-blue-500 bg-blue-50/10' : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-blue-400'}`}>
                    <input {...getInputProps()} />

                    {file ? (
                      <div className="space-y-4 text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
                          <TerminalIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{file.name}</h3>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ready to process • {(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 mx-auto">
                          <FluxIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Drop Manifest File</h3>
                          <p className="text-gray-500 text-sm mt-1">Supports CSV, XLSX, and JSON formats</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {file && (
                    <div className="mt-8 flex gap-4">
                      <Button variant="outline" onClick={() => setFile(null)} className="h-12 border-gray-200 text-gray-500 hover:text-red-500 rounded-xl font-bold uppercase tracking-widest text-[10px]">Discard</Button>
                      <Button onClick={() => setCurrentStep(2)} className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20">
                        Proceed to Mapping
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Field Mapping</h3>
                      <p className="text-xs text-gray-500 mt-1">Match your file columns to system attributes.</p>
                    </div>
                    <Button
                      onClick={() => {
                        const autoMapping: Record<string, string> = {};
                        headers.forEach(h => {
                          const norm = h.toLowerCase().trim();
                          const match = flatSystemFields.find(f => norm.includes(f.id.split('.').pop() || "") || f.label.toLowerCase().includes(norm));
                          if (match) autoMapping[h] = match.id;
                        });
                        setMapping(autoMapping);
                        toast.success("Auto-mapping applied");
                      }}
                      className="h-9 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 border-none rounded-lg text-[10px] font-bold uppercase tracking-widest"
                    >
                      <ShootingStarIcon className="w-3.5 h-3.5 mr-2" />
                      Auto-Align
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {headers.map((h, i) => (
                      <div key={h} className="grid grid-cols-12 gap-6 items-center p-4 rounded-xl border border-gray-100 bg-gray-50/30">
                        <div className="col-span-5 flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">
                            {i + 1}
                          </div>
                          <span className="text-sm font-bold text-gray-700 truncate" title={h}>{h}</span>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <ArrowRightIcon className="w-4 h-4 text-gray-300" />
                        </div>
                        <div className="col-span-5">
                          <select
                            className={`w-full h-10 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider border outline-none cursor-pointer transition-all
                                            ${mapping[h] ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-500'}`}
                            value={mapping[h] || ""}
                            onChange={(e) => setMapping(p => ({ ...p, [h]: e.target.value }))}
                          >
                            <option value="">-- Ignore --</option>
                            {systemFields.map(g => (
                              <optgroup key={g.group} label={g.group}>
                                {g.fields.map(f => (
                                  <option key={f.id} value={f.id}>{f.label}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6 border-t border-gray-100">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="h-12 border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px]">Back</Button>
                    <Button
                      onClick={() => {
                        if (Object.values(mapping).filter(Boolean).length === 0) return toast.error("Map at least one field");
                        setCurrentStep(3);
                      }}
                      className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20"
                    >
                      Validate Data
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Ready to Import</h3>
                      <p className="text-xs text-gray-500 mt-1">{csvData.length} records ready for processing</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-xl max-h-[400px]">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          {Object.keys(mapping).filter(k => mapping[k]).map(k => (
                            <th key={k} className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 whitespace-nowrap">
                              {flatSystemFields.find(f => f.id === mapping[k])?.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {csvData.slice(0, 10).map((row, r) => (
                          <tr key={r} className="bg-white">
                            {Object.keys(mapping).filter(k => mapping[k]).map((k, c) => (
                              <td key={c} className="px-6 py-3 text-xs font-medium text-gray-700 whitespace-nowrap">
                                {row[k]?.toString() || '—'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-gray-100">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="h-12 border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px]">Adjust Mapping</Button>
                    <Button
                      onClick={handleImport}
                      disabled={isProcessing}
                      className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20"
                    >
                      {isProcessing ? 'Processing...' : 'Run Import'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* LOGS VIEW */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Import Logs</h2>
                <p className="text-sm text-gray-500 mt-1 font-medium">Historical trace of imports.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 overflow-hidden">

              <div className="grid grid-cols-5 bg-gray-50/50 border-b border-gray-100 px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                <div className="col-span-1">Stream ID</div>
                <div className="col-span-2">Filename</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-1 text-right">Nodes</div>
              </div>

              <div className="divide-y divide-gray-50">
                {importLogs.map((log) => (
                  <div key={log.id} className="grid grid-cols-5 px-8 py-5 items-center hover:bg-gray-50/30 transition-colors">
                    <div className="col-span-1 font-mono text-xs font-bold text-blue-600">{log.id}</div>
                    <div className="col-span-2 flex items-center gap-3">
                      <FileIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold text-gray-700">{log.filename}</span>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${log.status === 'SYNCED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                        {log.status}
                      </span>
                    </div>
                    <div className="col-span-1 text-right font-bold text-sm text-gray-900">{log.nodes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
