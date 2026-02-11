"use client";

import { MappingSkeleton } from "@/components/common/SkeletonLoader";
import Button from "@/components/ui/button/Button";
import { ListIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

// ============================================================================
// CONFIG SECTION (EDITABLE)
// ============================================================================
const pageConfig = {
  pageId: "marketplace-mapping-v1",
  mockApiEndpoint: "/api/mock/marketplace-mapping", // Maps to src/app/api/mock/marketplace-mapping/route.ts
  dataMap: {
    // UI Field -> JSON Key
    id: "id",
    sku: "sku",
    title: "title",
    price: "price",
    channel: "channel",
    status: "status",
    matchScore: "matchScore",
    suggestion: "suggestion",
    linked: "linked"
  }
};
// ============================================================================



export default function MappingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(pageConfig.mockApiEndpoint);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to load mock data:", error);
        toast.error("Failed to load mapping data");
      } finally {
        setIsLoaded(true);
      }
    };

    // Simulate slight network delay for realism if needed, or just fetch
    fetchData();
  }, []);

  if (!isLoaded) return <MappingSkeleton />;

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-[#F9FAFB] font-sans text-gray-900">

      {/* 1. Top Navigation & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <span className="text-gray-300">/</span>
            <Link href="/marketplace" className="hover:text-blue-600 transition-colors">Marketplace</Link>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-900">Mapping Intelligence</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Product Mapping</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Resolve identity conflicts between external marketplace listings and your internal inventory nodes.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
            {["all", "unlinked", "suggestions"].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === f ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Listings</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">1,240</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
            <ListIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Unmapped / New</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">42</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
            <FilterIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">AI Matches Found</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">18</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
        </div>
      </div>

      {/* 3. Main Mapping Activity Feed */}
      <div className="space-y-4">

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by SKU, Title, or Channel ID..."
              className="w-full h-12 pl-12 pr-4 rounded-xl text-sm font-medium bg-transparent border-none focus:ring-0 placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="h-8 w-[1px] bg-gray-100" />
          <button className="px-6 h-10 rounded-xl bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-colors">
            Advanced Filter
          </button>
        </div>

        {/* MAPPING CARDS */}
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden">

              {/* Header strip for status */}
              <div className={`h-1.5 w-full ${item.status === 'linked' ? 'bg-emerald-500' :
                item.status === 'suggestion' ? 'bg-blue-500' : 'bg-gray-200'
                }`} />

              <div className="p-6 grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-8 items-center">

                {/* LEFT: Channel Listing */}
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 p-3 flex items-center justify-center shrink-0">
                    <Image src={item.channel.icon} width={40} height={40} alt={item.channel.name} className="w-full h-full object-contain" unoptimized />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{item.channel.name}</span>
                      {item.status === 'unlinked' && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">Unmapped</span>}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mt-1">
                      <span>{item.sku}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* CENTER: Connection Logic */}
                <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
                  {item.status === 'linked' ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  ) : item.status === 'suggestion' ? (
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center border border-dashed border-gray-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </div>
                  )}

                  {item.status === 'suggestion' && (
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.matchScore}% Match</span>
                  )}
                  {item.status === 'linked' && (
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Synced</span>
                  )}
                </div>

                {/* RIGHT: System Node */}
                <div>
                  {item.status === 'linked' && item.linked ? (
                    <div className="flex items-start gap-5 p-4 rounded-2xl bg-emerald-50/20 border border-emerald-100">
                      <div className="w-12 h-12 bg-white rounded-xl border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold text-xs shadow-sm">
                        SYS
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-gray-900 leading-snug">{item.linked.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mt-1">
                          <span>{item.linked.sku}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="font-bold text-emerald-600">{item.linked.stock} Units</span>
                        </div>
                        <div className="flex justify-end mt-2">
                          <button className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> Unlink
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : item.status === 'suggestion' && item.suggestion ? (
                    <div className="flex items-start gap-5 p-4 rounded-2xl bg-blue-50/20 border border-blue-100 relative group/suggestion">
                      <div className="w-12 h-12 bg-white rounded-xl border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-xs shadow-sm">
                        SYS
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className="text-sm font-bold text-gray-900 leading-snug">{item.suggestion.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mt-1">
                          <span>{item.suggestion.sku}</span>
                        </div>
                        <Button onClick={() => toast.success("Link Established")} className="mt-3 w-full h-9 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm">
                          Confirm Match
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full min-h-[100px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center p-4 hover:border-blue-400 hover:bg-blue-50/5 transition-all cursor-pointer group/empty">
                      <p className="text-xs font-bold text-gray-400 group-hover/empty:text-blue-500 uppercase tracking-wider">No System Node Linked</p>
                      <button className="mt-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 shadow-sm hover:shadow-md transition-all">
                        Search Inventory
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
