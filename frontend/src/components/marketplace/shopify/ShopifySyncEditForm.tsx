"use client";

import { useProductForm } from "@/context/ProductFormContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ShopifySyncEditFormProps {
  id: string;
  product: any;
}

export default function ShopifySyncEditForm({ id, product }: ShopifySyncEditFormProps) {
  const { data, setIsDirty } = useProductForm();
  const [activeTab, setActiveTab] = useState("sync");

  const syncIssues = [
    { field: "Price", cims: `$${data.pricing.sellingPrice}`, shopify: `$${product.price}`, status: "Mismatch" },
    { field: "Stock", cims: data.inventory.stocks[0]?.available || 0, shopify: product.stock, status: "Mismatch" },
    { field: "Metadata", cims: "Linked", shopify: "Outdated", status: "Warning" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fadeIn">
      {/* Sidebar: Sync Diagnostics */}
      <div className="w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center p-2 border border-emerald-100">
              <Image
                src="https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg"
                alt="Shopify"
                width={24}
                height={24}
                unoptimized
              />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Shopify Node</p>
              <h3 className="text-sm font-bold text-gray-800 tracking-tight">Sync Diagnostic</h3>
            </div>
          </div>

          <div className="space-y-8">
            {product.channel_status === 'Active' ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Active</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                  Listing is synchronized and live on Shopify.
                </p>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-black text-rose-600 uppercase tracking-widest">{product.channel_status || "Out of Sync"}</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                  Detected data drift between CIMS and your Shopify storefront.
                </p>
              </div>
            )}

            <div className="border-t border-gray-50 pt-6">
              <label className="text-[11px] font-bold text-gray-400 block mb-3 uppercase tracking-wider">Connected Marketplaces</label>
              <div className="space-y-3">
                {/* We can infer this from product or context if available. Using static connected state for this sync view as it implies connection */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30"></div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">Shopify</p>
                    <p className="text-[10px] text-gray-400 font-medium">Connected & Active</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-6">
              <label className="text-[11px] font-bold text-gray-400 block mb-3 uppercase tracking-wider">Drift Summary</label>
              {syncIssues.map((issue) => (
                <div key={issue.field} className="flex items-center justify-between mb-3 last:mb-0">
                  <p className="text-xs font-bold text-gray-700">{issue.field}</p>
                  <span className="text-[10px] font-black text-rose-500 uppercase bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">{issue.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 group">
          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Force Re-Sync
        </button>
      </div>

      {/* Main Content: Resolution Workspace */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="flex border-b border-gray-50 px-8 pt-4">
          {[
            { id: "sync", label: "Resolving Conflicts" },
            { id: "shopify", label: "Shopify Metadata" },
            { id: "inventory", label: "Inventory Logic" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-5 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 relative ${activeTab === tab.id ? "border-emerald-500 text-emerald-600" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
            </button>
          ))}
        </div>

        <div className="flex-1 p-10 overflow-y-auto no-scrollbar">
          {activeTab === "sync" && (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 tracking-tight">Drift Resolution Hub</h2>
                  <p className="text-sm text-gray-400 font-medium">Select the authoritative source for each mismatched parameter.</p>
                </div>
                <div className="flex gap-2">
                  <button className="h-10 px-6 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-all">Pull All from Shopify</button>
                  <button className="h-10 px-6 bg-brand-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all">Push All to Shopify</button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {issueCards.map((card) => (
                  <div key={card.title} className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-8 group hover:border-emerald-200 transition-all">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center text-gray-700 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform`}>
                          {card.icon}
                        </div>
                        <div>
                          <h4 className="text-[13px] font-black text-gray-800 uppercase tracking-widest">{card.title}</h4>
                          <p className="text-[11px] text-gray-400 font-medium">{card.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group/source">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Wemonks CIMS</span>
                          <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                        </div>
                        <p className="text-3xl font-black text-gray-800 tracking-tighter">{card.cimsValue}</p>
                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-2 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                          Authoritative
                        </p>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between opacity-60 hover:opacity-100 transition-all border-dashed group/source cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Shopify Market</span>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover/source:border-emerald-500 transition-colors" />
                        </div>
                        <p className="text-3xl font-black text-gray-400 group-hover/source:text-gray-800 transition-colors tracking-tighter">{card.shopifyValue}</p>
                        <p className="text-[10px] text-gray-400 font-medium italic mt-2">Historical Drift</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "shopify" && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">Channel Specific Metadata</h2>
                <p className="text-sm text-gray-400 font-medium">Fine-tune how this product appears exclusively on Shopify.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Shopify SEO Title</label>
                  <input
                    type="text"
                    defaultValue={product.title}
                    className="w-full h-14 bg-gray-50 border-gray-100 rounded-2xl px-6 text-sm font-bold text-gray-700 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Marketplace Handle</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">/products/</span>
                    <input
                      type="text"
                      defaultValue={product.sku.toLowerCase()}
                      className="w-full h-14 bg-gray-50 border-gray-100 rounded-2xl pl-24 pr-6 text-sm font-bold text-gray-700 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Collection Tags (Shopify Only)</label>
                <div className="p-4 h-32 bg-gray-50 border-gray-100 rounded-[2rem] flex flex-wrap gap-2 content-start">
                  {product.tags.map((tag: string) => (
                    <span key={tag} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold text-gray-600 shadow-sm flex items-center gap-2 group cursor-pointer hover:border-emerald-200 transition-all">
                      #{tag}
                      <button className="opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-opacity">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </span>
                  ))}
                  <button className="px-4 py-2 border border-dashed border-gray-300 rounded-xl text-[10px] font-bold text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all">+ Add Tag</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex justify-between items-center">
          <Link href="/marketplace" className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-gray-600 transition-colors">Discard Sync Draft</Link>
          <div className="flex gap-4">
            <button className="h-12 px-8 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Archive Drift</button>
            <button className="h-12 px-12 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all">Sychronize Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const issueCards = [
  {
    title: "Price Mismatch",
    description: "Authority check required for cross-channel pricing.",
    cimsValue: "$1,800.00",
    shopifyValue: "$1,950.00",
    iconBg: "bg-blue-50",
    icon: <svg className="w-6 h-6 border-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
  },
  {
    title: "Inventory Variance",
    description: "Stock discrepancy between core and storefront.",
    cimsValue: "42 Units",
    shopifyValue: "38 Units",
    iconBg: "bg-orange-50",
    icon: <svg className="w-6 h-6 border-orange-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
  }
];
