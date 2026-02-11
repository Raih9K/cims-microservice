"use client";

import { MappingSkeleton } from "@/components/common/SkeletonLoader";
import Button from "@/components/ui/button/Button";
import { PlugInIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ============================================================================
// CONFIG SECTION (EDITABLE)
// ============================================================================
const pageConfig = {
  pageId: "field-mapping-v1",
  mockApiEndpoint: "/api/mock/field-mapping",
  dataMap: {
    id: "id",
    marketplaceField: "marketplaceField",
    internalField: "internalField",
    direction: "direction"
  }
};
// ============================================================================


const availableChannels = [
  { id: "shopify", name: "Shopify Main", icon: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" },
  { id: "ebay", name: "eBay Global", icon: "https://www.vectorlogo.zone/logos/ebay/ebay-icon.svg" },
  { id: "amazon", name: "Amazon Euro", icon: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg" },
];


export default function FieldMappingConfigPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"egress" | "ingress" | "all">("all");
  const [selectedChannel, setSelectedChannel] = useState(availableChannels[0]);
  const [fieldProtocols, setFieldProtocols] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(pageConfig.mockApiEndpoint);
        if (res.ok) {
          const data = await res.json();
          setFieldProtocols(data);
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load field mappings");
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  if (!isLoaded) return <MappingSkeleton />;

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 min-h-screen bg-gray-50/50 select-none font-outfit max-w-[1440px] mx-auto">
      {/* Breadcrumb - Clean */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <span className="text-gray-300">/</span>
        <Link href="/marketplace" className="hover:text-blue-600 transition-colors">Marketplace</Link>
        <span className="text-gray-300">/</span>
        <Link href="/marketplace/mapping" className="hover:text-blue-600 transition-colors">Mapping</Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900">Field Configuration</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="flex items-center gap-4 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-blue-200 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center p-1.5 border border-gray-100">
                <Image src={selectedChannel.icon} width={24} height={24} alt={selectedChannel.name} className="object-contain" unoptimized />
              </div>
              <div className="pr-10">
                <span className="block font-bold text-gray-900 text-sm">{selectedChannel.name}</span>
                <span className="text-[11px] font-semibold text-emerald-600">Active Handshake</span>
              </div>
              <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m19 9-7 7-7-7" />
              </svg>
            </div>

            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50 overflow-hidden py-1">
              {availableChannels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className="w-full px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Image src={channel.icon} width={20} height={20} alt="" className="object-contain" unoptimized />
                  <span className="text-sm font-semibold text-gray-700">{channel.name} Configuration</span>
                </button>
              ))}
            </div>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Field Mapping Config</h1>
            <p className="text-sm text-gray-500 font-medium">Configure bi-directional sync logic for channel data manifests.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 px-6 border-gray-200 text-sm font-semibold text-gray-500 hover:text-gray-900 rounded-xl transition-all"
          >
            Clear Cache
          </Button>
          <Button
            onClick={() => toast.success("Mappings deployed to production nodes.")}
            className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/10 transition-all font-bold"
          >
            Save & Deploy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">

        {/* PRIMARY ORCHESTRATION LAYER */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">

          {/* Tab Navigation - Clean style */}
          <div className="px-8 pt-6 border-b border-gray-100">
            <div className="flex gap-10">
              {[
                { id: "all", label: "Global Scope" },
                { id: "egress", label: "Push to Channel" },
                { id: "ingress", label: "Pull from Channel" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab.id ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Table Head */}
          <div className="grid grid-cols-[1fr,80px,1fr] gap-6 px-10 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <div>Marketplace Field Node</div>
            <div className="text-center">Logic</div>
            <div className="text-right">System Registry Field</div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto no-scrollbar">
            {fieldProtocols.filter(p => activeTab === "all" || p.direction === activeTab || p.direction === "dual").map((node) => (
              <div key={node.id} className="grid grid-cols-[1fr,80px,1fr] gap-6 px-10 py-6 items-center hover:bg-gray-50/50 transition-all group">

                {/* Channel Source Field */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase pl-1">Target Key</span>
                  <input
                    type="text"
                    defaultValue={node.marketplaceField}
                    readOnly
                    className="w-full h-11 bg-white border border-gray-200 rounded-xl px-4 text-sm font-mono font-bold text-gray-700 outline-none group-hover:border-blue-200 transition-all"
                  />
                </div>

                {/* Status Indicator */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`p-2.5 rounded-xl border transition-all ${node.direction === "dual" ? "bg-blue-50 text-blue-600 border-blue-100" :
                    node.direction === "egress" ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-emerald-50 text-emerald-600 border-emerald-100"
                    }`}>
                    {node.direction === "dual" ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                    ) : node.direction === "egress" ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m14 5 7 7m0 0-7 7m7-7H3" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m10 19-7-7m0 0 7-7m-7 7h18" /></svg>
                    )}
                  </div>
                </div>

                {/* Destination Field */}
                <div className="space-y-1.5 text-right">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase pr-1 text-right">Inventory Mapping</span>
                  <select className="w-full h-11 bg-white border border-gray-200 rounded-xl px-4 text-sm font-bold text-gray-900 outline-none hover:border-blue-500/30 transition-all cursor-pointer">
                    <option value={node.internalField}>{node.internalField.replace(/_/g, " ").toUpperCase()}</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-gray-50/30 border-t border-gray-100">
            <button className="w-full h-12 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-3 text-gray-400 hover:border-blue-300 hover:text-blue-600 hover:bg-white transition-all group font-bold text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              Add New Mapping Node
            </button>
          </div>
        </div>

        {/* SIDEBAR: CHANNEL & INVENTORY SETTINGS */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <h3 className="font-bold text-gray-900">Sync Preferences</h3>
              <PlugInIcon className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              {[
                { label: "Post updates instantly", value: "Enabled" },
                { label: "Pull manifests every 5m", value: "Active" },
                { label: "Reserve 5 units buffer", value: "Global" },
                { label: "Master pricing control", value: "System" },
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{setting.label}</span>
                    <span className="text-[11px] text-gray-400 font-medium">Standard Protocol</span>
                  </div>
                  <div className="w-10 h-5 bg-blue-100 rounded-full flex items-center justify-end px-1 border border-blue-200">
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full h-12 bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 text-sm font-bold rounded-xl transition-all">
              View Connection Logs
            </Button>
          </div>

          {/* AI Intelligence Deck - Cleaned up */}
          <div className="bg-blue-600 rounded-2xl p-8 space-y-6 shadow-xl shadow-blue-600/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all" />

            <div className="flex items-center justify-between relative">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Smart Diagnostics</h3>
              <span className="text-[10px] font-bold text-blue-100 uppercase bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">Live</span>
            </div>

            <p className="text-sm text-blue-50 font-medium leading-relaxed relative">
              Logic engine v4.1 detected 4 unmapped fields in your channel that could accelerate data ingestion.
            </p>

            <Button className="w-full h-11 bg-white hover:bg-blue-50 text-blue-600 text-sm font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]">
              Automate Mapping
            </Button>
          </div>

        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
