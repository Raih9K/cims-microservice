"use client";

import Button from "@/components/ui/button/Button";
import {
  HorizontaLDots,
  PlusIcon
} from "@/icons/index";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Demo data matching the user's requested structure
const SHOPIFY_DISCOVERY_DEMO = [
  {
    id: "sp_01",
    title: "Plain Hoodie",
    body_html: "<strong>Comfortable plain hoodie</strong>",
    vendor: "CIMS Brand",
    product_type: "Apparel",
    tags: "hoodie,plain",
    status: "Active",
    stock_type: "basic",
    variants: [
      {
        id: "v_01",
        price: "2500.00",
        sku: "HD-PLAIN-001",
        inventory_quantity: 100,
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: "sp_02",
    title: "CIMS T-Shirt",
    body_html: "<strong>Stylish T-Shirt with Sizes and Colors</strong>",
    vendor: "CIMS Brand",
    product_type: "Tops",
    tags: "tshirt, cotton, print",
    status: "Active",
    stock_type: "parent",
    options: [
      { name: "Size" },
      { name: "Color" }
    ],
    variants: [
      {
        id: "v_02",
        option1: "S",
        option2: "Red",
        price: "1500.00",
        sku: "TS-S-RED",
        inventory_quantity: 50,
        updated_at: new Date().toISOString()
      },
      {
        id: "v_03",
        option1: "M",
        option2: "Red",
        price: "1500.00",
        sku: "TS-M-RED",
        inventory_quantity: 75,
        updated_at: new Date().toISOString()
      },
      {
        id: "v_04",
        option1: "L",
        option2: "Blue",
        price: "1600.00",
        sku: "TS-L-BLU",
        inventory_quantity: 40,
        updated_at: new Date().toISOString()
      }
    ]
  },
  {
    id: "sp_03",
    title: "Urban Explorer Scarf",
    vendor: "CIMS Brand",
    product_type: "Accessories",
    status: "Out of Sync",
    stock_type: "basic",
    variants: [{ id: "v_05", price: "850.00", sku: "ACC-SC-01", inventory_quantity: 12, updated_at: new Date().toISOString() }]
  }
];

export default function ShopifyListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const activeTab = searchParams.get('status') || 'All';
  const searchQuery = searchParams.get('q') || '';

  const gridTemplate = "minmax(140px, 0.7fr) 64px minmax(220px, 2.5fr) 130px 100px 90px 110px 80px";

  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = [...SHOPIFY_DISCOVERY_DEMO];
      if (searchQuery) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      if (activeTab !== 'All') {
        filtered = filtered.filter(p => p.status === activeTab);
      }
      setProducts(filtered);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, activeTab]);

  const toggleSelectAll = () => {
    const allIds: string[] = [];
    products.forEach(p => {
      p.variants.forEach((v: any) => allIds.push(v.id));
    });

    if (selectedIds.size === allIds.length && allIds.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allIds));
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleRow = (id: string) => {
    const next = new Set(expandedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedRows(next);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-screen bg-[#F9FAFB] select-none font-outfit">

      {/* Breadcrumb - Inventory Match */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/marketplace" className="hover:text-brand-600 transition-colors">Marketplace</Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900 text-[13px]">Shopify Discovery</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Shopify Discovery</h1>
          <p className="text-sm text-gray-400 mt-1 font-medium italic uppercase tracking-widest text-[10px]">Active Node: Central-Shopify-Cluster</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-100 rounded-xl animate-fadeIn mr-2">
              <span className="text-xs font-black text-brand-600 uppercase tracking-widest">{selectedIds.size} NODES Selected</span>
              <div className="h-4 w-[1px] bg-brand-200 mx-1" />
              <button
                onClick={() => {
                  toast.success("Bulk Discovery Import Protocol Initialized");
                  setSelectedIds(new Set());
                }}
                className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-700 transition-colors px-2"
              >
                Orchestrate Import
              </button>
            </div>
          )}
          <Button
            className="h-11 px-6 bg-white border border-gray-200 hover:border-brand-300 rounded-xl flex items-center gap-2 transition-all shadow-sm group"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1000);
            }}
          >
            <svg className="w-4 h-4 text-brand-600 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest group-hover:text-brand-600">Refresh Node</span>
          </Button>
          <Link href="/marketplace/mapping/advanced-import">
            <Button
              className="h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest px-1">Import Selection</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Table Area - Inventory Match Design */}
      <div className="flex-1 flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.01)] min-h-[600px]">

        {/* Controls Panel */}
        <div className="p-4 border-b border-gray-50 flex flex-col lg:flex-row gap-4 justify-between items-center bg-gray-50/20">
          <div className="relative flex-1 w-full lg:max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input
              type="text"
              placeholder="Search Shopify Cluster..."
              value={searchQuery}
              onChange={(e) => { }}
              className="w-full pl-10 pr-4 h-10 rounded-xl bg-white border border-gray-100 focus:ring-2 focus:ring-brand-500/10 text-xs font-black placeholder:text-gray-300 tracking-tight transition-all uppercase"
            />
          </div>

          <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
            {["All", "Active", "Out of Sync"].map(tab => (
              <button
                key={tab}
                className={`px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-4 sticky top-0 z-20">
          <div className="grid gap-4 items-center text-[10px] uppercase font-black tracking-widest text-gray-400" style={{ gridTemplateColumns: gridTemplate }}>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={products.length > 0 && selectedIds.size === products.reduce((acc, p) => acc + p.variants.length, 0)}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded-lg border-gray-200 text-brand-600 focus:ring-brand-500/10 cursor-pointer transition-all"
                />
              </div>
              <span>SKU / VARIANT</span>
            </div>
            <div className="text-center">Node</div>
            <div>Discovery Information</div>
            <div className="text-center">Protocol</div>
            <div className="text-right">Market Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Handshake</div>
            <div className="text-center">Action</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-x-auto no-scrollbar">
          <div className="min-w-[1000px] p-6 space-y-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
                <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Syncing Shopify Matrix...</p>
              </div>
            ) : products.length > 0 ? (
              products.map((product, idx) => {
                const hasVariants = product.stock_type === 'parent' && product.variants.length > 1;
                const isExpanded = expandedRows.has(product.id);

                return (
                  <div key={product.id} className="contents">
                    {/* Parent Row */}
                    <div
                      className={`grid gap-4 px-6 py-4 items-center group rounded-2xl bg-white border ${isExpanded ? 'border-brand-200 bg-brand-50/5' : 'border-transparent'} hover:border-brand-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all cursor-pointer relative z-10 animate-scaleIn`}
                      style={{ gridTemplateColumns: gridTemplate, animationDelay: `${idx * 20}ms` }}
                      onClick={() => hasVariants && toggleRow(product.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {hasVariants ? (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); toggleRow(product.id); }}
                              className={`w-5 h-5 flex items-center justify-center rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all shrink-0 ${isExpanded ? 'rotate-180 text-brand-600' : ''}`}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                          ) : (
                            <input
                              type="checkbox"
                              checked={!hasVariants && selectedIds.has(product.variants[0].id)}
                              onClick={(e) => e.stopPropagation()}
                              onChange={() => toggleSelectOne(product.variants[0].id)}
                              className="w-4 h-4 rounded border-gray-200 text-brand-600 focus:ring-brand-500/10 cursor-pointer"
                            />
                          )}
                          <span className="text-[11px] font-mono font-bold text-gray-500 tracking-tight">#{product.variants[0].sku}</span>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm transition-transform group-hover:scale-105 duration-300">
                          <NextImage src="https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" width={32} height={32} className="object-contain" alt="" unoptimized />
                        </div>
                      </div>

                      <div className="flex flex-col min-w-0 pr-4">
                        <span className="font-black text-sm text-gray-900 truncate group-hover:text-brand-600 transition-colors uppercase tracking-tight" title={product.title}>
                          {product.title}
                          {hasVariants && <span className="ml-2 px-2 py-0.5 bg-gray-100 text-[9px] text-gray-400 rounded-md font-black">+{product.variants.length} NODES</span>}
                        </span>
                        <span className="text-[9px] font-black text-gray-400 mt-0.5 uppercase tracking-widest">{product.product_type} Discovery Node</span>
                      </div>

                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>
                          {product.status}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-gray-900 font-mono tracking-tighter">
                          {hasVariants ? 'CLUSTER' : `$${parseFloat(product.variants[0].price).toFixed(2)}`}
                        </span>
                      </div>

                      <div className="text-center flex flex-col items-center">
                        <span className={`text-sm font-black font-mono tracking-tighter ${product.variants[0].inventory_quantity > 0 ? 'text-gray-900' : 'text-rose-500'}`}>
                          {hasVariants ? product.variants.reduce((acc: any, v: any) => acc + (v.inventory_quantity || 0), 0) : product.variants[0].inventory_quantity}
                        </span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest opacity-60">UNITS</span>
                      </div>

                      <div className="text-center">
                        <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest opacity-80">
                          {new Date(product.variants[0].updated_at).toLocaleDateString('en-GB')}
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-2 pr-2">
                        <Link
                          href={`/shopify/edit-listing/${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-xl bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg transition-all flex items-center justify-center shadow-md group/link"
                          title="Edit and Discovery Link"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </Link>
                      </div>
                    </div>

                    {/* Expanded Variants */}
                    {isExpanded && product.variants.map((v: any, vIdx: number) => (
                      <div
                        key={v.id}
                        className={`grid gap-4 px-6 py-3 items-center group rounded-2xl bg-gray-50/50 border border-transparent hover:border-brand-100 transition-all cursor-pointer relative z-0 italic ml-12 mb-2 last:mb-4`}
                        style={{ gridTemplateColumns: gridTemplate }}
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <div className="flex items-center gap-3 pl-4 border-l-2 border-brand-100">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(v.id)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => toggleSelectOne(v.id)}
                            className="w-3.5 h-3.5 rounded border-gray-200 text-brand-600 focus:ring-brand-500/10 cursor-pointer"
                          />
                          <span className="text-[10px] font-mono font-bold text-gray-400">#{v.sku}</span>
                        </div>

                        <div className="flex justify-center">
                          <div className="w-6 h-[1px] bg-gray-200" />
                        </div>

                        <div className="flex flex-col min-w-0 pr-4">
                          <span className="text-[11px] font-black text-gray-700 truncate uppercase tracking-tight">
                            {v.option1} {v.option2 ? ` / ${v.option2}` : ''} {v.option3 ? ` / ${v.option3}` : ''}
                          </span>
                          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Protocol Variant Node</span>
                        </div>

                        <div className="flex justify-center">
                          <span className="px-2 py-0.5 rounded-lg bg-white border border-gray-100 text-[8px] font-black uppercase text-gray-400">SYNCED</span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-black text-gray-900 font-mono tracking-tighter">${parseFloat(v.price).toFixed(2)}</span>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <span className="text-xs font-black text-gray-600 font-mono">{v.inventory_quantity}</span>
                        </div>

                        <div className="text-center">
                          <span className="text-[9px] font-black text-gray-400 uppercase">{new Date(v.updated_at).toLocaleDateString('en-GB')}</span>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                          <button className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-300 hover:text-brand-600 transition-all flex items-center justify-center group/edit shadow-sm">
                            <HorizontaLDots className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100">
                  <svg className="w-8 h-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">No Cluster Items Found</p>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Your Shopify discovery scan returned zero results.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Pagination Match */}
        <div className="flex items-center justify-between px-10 py-5 border-t border-gray-100 bg-gray-50/20 backdrop-blur-sm sticky bottom-0 z-20">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Discovered <span className="text-gray-900 font-black">{products.length}</span> Master Clusters
          </p>
          <div className="flex gap-2">
            <button className="h-10 px-6 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm">
              Scan Previous Page
            </button>
            <button className="h-10 px-6 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm">
              Scan Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
