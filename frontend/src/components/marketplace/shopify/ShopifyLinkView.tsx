"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ShopifyLinkViewProps {
  id: string;
  product: any;
}

export default function ShopifyLinkView({ id, product }: ShopifyLinkViewProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);

  // Mock search results (Central Inventory)
  const allInventory = [
    { id: "101", title: product.title, sku: product.sku, stock: 45, price: product.price, image: product.channelLogo }, // Exact Match
    { id: "102", title: "Premium " + product.title, sku: product.sku + "-PRM", stock: 12, price: (product.price * 1.2).toFixed(2), image: null },
    { id: "103", title: "Generic " + product.title.split(" ")[0], sku: product.sku + "-GEN", stock: 100, price: (product.price * 0.8).toFixed(2), image: null },
  ];

  const filteredInventory = searchQuery.length > 0
    ? allInventory.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
    : allInventory; // Show all by default for demo

  const handleLink = () => {
    setIsLinking(true);
    // Simulate API call
    setTimeout(() => {
      setIsLinking(false);
      // Navigate back to marketplace or a success state
      // For now, let's just go back to feed to simulate "Done"
      router.push('/marketplace');
    }, 1500);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fadeIn h-[calc(100vh-12rem)] min-h-[600px]">

      {/* LEFT: External Channel Node (Shopify) */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center p-2.5 border border-emerald-100">
            <Image
              src="https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg"
              alt="Shopify"
              width={32}
              height={32}
              unoptimized
            />
          </div>
          <div>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">External Channel Node</p>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Shopify Storefront</h2>
          </div>
        </div>

        <div className="space-y-8 flex-1">
          <div className="p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 flex flex-col items-center text-center gap-4">
            {/* Placeholder Image */}
            <div className="w-40 h-40 bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-gray-300 shadow-sm">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">{product.sku}</p>
            </div>
            <div className="flex gap-4 w-full justify-center">
              <div className="px-5 py-3 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Price</p>
                <p className="text-sm font-bold text-gray-700">${product.price}</p>
              </div>
              <div className="px-5 py-3 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stock</p>
                <p className="text-sm font-bold text-gray-700">{product.stock}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex gap-3 items-start">
            <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
            <div>
              <p className="text-[11px] font-bold text-orange-700 uppercase tracking-wide mb-1">Unlinked Product</p>
              <p className="text-[11px] text-gray-600 leading-relaxed font-medium">This product exists on Shopify but is not connected to a Central Inventory item. Stock updates will not sync.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE: Connection Indicator */}
      <div className="hidden xl:flex flex-col justify-center items-center gap-4 text-gray-300">
        <div className="h-full w-[2px] border-l-2 border-dashed border-gray-200" />
        <div className={`p-4 rounded-full border-2 border-gray-200 bg-white z-10 transition-all duration-500 ${selectedProductId ? 'border-brand-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-110' : ''}`}>
          <svg className={`w-6 h-6 transition-colors duration-300 ${selectedProductId ? 'text-brand-500' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
        </div>
        <div className="h-full w-[2px] border-l-2 border-dashed border-gray-200" />
      </div>

      {/* RIGHT: Internal Core Node (CIMS Search) */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-600" />

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center p-2.5 border border-brand-100">
            <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <div>
            <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">Internal Core Node</p>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Source of Truth</h2>
          </div>
        </div>

        <div className="mb-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Central Inventory by SKU or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 text-sm font-bold text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <p className="text-[10px] text-gray-400 font-bold mt-2 ml-1 text-right italic">* SKU number should be similar</p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-2">
          {filteredInventory.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProductId(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 group
                        ${selectedProductId === item.id
                  ? 'bg-brand-50 border-brand-500 shadow-md shadow-brand-500/10 scale-[1.02]'
                  : 'bg-white border-gray-100 hover:border-brand-200 hover:bg-gray-50'}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                        ${selectedProductId === item.id ? 'border-brand-600 bg-brand-600' : 'border-gray-200'}`}>
                {selectedProductId === item.id && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
              </div>

              <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400">
                {item.image ? (
                  <Image src={item.image} width={32} height={32} alt="" />
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                )}
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">{item.sku}</span>
                  {item.sku === product.sku && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-wider">Perfect Match</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-gray-700">${item.price}</p>
                <p className="text-[10px] font-bold text-gray-400">{item.stock} in stock</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-50">
          <button
            onClick={handleLink}
            disabled={!selectedProductId || isLinking}
            className="w-full py-4 bg-brand-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-600/20 hover:bg-brand-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLinking ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Establishing Handshake...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                Link & Synchronize
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
