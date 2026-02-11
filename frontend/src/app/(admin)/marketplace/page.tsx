"use client";

import Button from "@/components/ui/button/Button";
import {
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PlugInIcon,
  PlusIcon
} from "@/icons/index";
import { integrationService } from "@/services/integrationService";
import { Listing, listingService } from "@/services/listingService";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function MarketplaceInventoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for real data
  const [listings, setListings] = useState<Listing[]>([]);
  const [marketplaces, setMarketplaces] = useState<any[]>([
    {
      id: 'all',
      name: 'All Channels',
      icon: <GridIcon className="w-4 h-4" />,
      count: 0
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, currentPage: 1, lastPage: 1 });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false);

  // Get values from URL or defaults
  const paramId = searchParams.get('id');
  const paramChannel = searchParams.get('channel');

  const isFocusedView = !!paramId;
  const activeMarketplace = paramId
    ? paramId.split('-')[0] // 'shopify-01' -> 'shopify'
    : (paramChannel || 'all');

  const activeTab = searchParams.get('status') || 'Active';
  const searchQuery = searchParams.get('q') || '';

  const isSpecificChannel = activeMarketplace !== 'all';

  const handleUpdateParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // Reset to page 1 for any filter/search/tab change
    if (name !== 'page') {
      params.set('page', '1');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const fetchMarketplaces = async () => {
    try {
      const response = await integrationService.getChannels();
      if (response.success) {
        const dynamicMarkets = response.data.map((c: any) => ({
          id: c.marketplace,
          idReal: c.channel_id,
          name: c.name,
          icon: <NextImage
            src={c.marketplace === 'shopify'
              ? "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg"
              : c.marketplace === 'ebay'
                ? "https://www.vectorlogo.zone/logos/ebay/ebay-icon.svg"
                : "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg"
            }
            width={16} height={16} className="w-4 h-4 object-contain" alt="" unoptimized />,
          count: 0
        }));
        setMarketplaces([
          {
            id: 'all',
            name: 'All Channels',
            icon: <GridIcon className="w-4 h-4" />,
            count: 0
          },
          ...dynamicMarkets
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch marketplaces", error);
    }
  };

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await listingService.getListings(Object.fromEntries(searchParams.entries()));
      if (response.success) {
        setListings(response.data || []);
        if (response.meta) {
          setPagination({
            total: response.meta.total,
            currentPage: response.meta.current_page,
            lastPage: response.meta.total_pages
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch listings", error);
      toast.error("Failed to synchronize marketplace hub");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchMarketplaces();
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const toggleSelectAll = () => {
    if (selectedIds.size === listings.length && listings.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(listings.map(l => l.listing_id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const gridTemplate = "minmax(120px, 0.6fr) 64px minmax(250px, 2.5fr) 110px 110px 90px 110px 80px";

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 min-h-screen bg-[#F8F9FC] select-none font-outfit">

      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900 uppercase tracking-widest text-[11px]">Marketplace</span>
        {isFocusedView && (
          <>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-900 uppercase tracking-widest text-[11px]">
              {marketplaces.find(m => m.id === activeMarketplace)?.name || activeMarketplace}
            </span>
          </>
        )}
      </nav>

      {/* Header with Pulse Indicator */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-brand-600 rounded-full" />
            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Marketplace Hub</h1>
          </div>
          <p className="text-[13px] text-gray-500 font-medium max-w-xl leading-relaxed">
            Global oversight of listing health, price parity, and cross-channel inventory synchronization.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {selectedIds.size > 0 && isSpecificChannel && (
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-100 rounded-xl animate-fadeIn mr-2">
              <span className="text-sm font-bold text-brand-600">{selectedIds.size} NODES Selected</span>
              <div className="h-4 w-[1px] bg-brand-200 mx-1" />
              <button
                className="text-xs font-bold text-brand-600 uppercase tracking-widest hover:text-brand-700 transition-colors px-2"
                onClick={() => toast.success("Bulk Orchestration Protocol Initialized")}
              >
                Orchestrate
              </button>
            </div>
          )}
          <Button
            className="h-11 px-6 bg-white border border-gray-200 hover:border-brand-300 rounded-xl flex items-center gap-2 transition-all shadow-sm group"
          >
            <PlugInIcon className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-gray-800 uppercase tracking-widest group-hover:text-brand-600">Establish Handshake</span>
          </Button>
          <Button
            onClick={() => setIsIntegrationOpen(true)}
            className="h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all active:scale-95"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest px-1">Connect Node</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Marketplace Sidebar */}
        {!isFocusedView && (
          <aside className="w-full lg:w-72 space-y-6 flex-shrink-0">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.01)] h-fit sticky top-10">
              <h3 className="px-6 pt-4 pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Platform Nodes</h3>
              <nav className="space-y-1.5 px-2">
                {marketplaces.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      if (m.id && m.id !== 'all') params.set('channel', m.id);
                      else params.delete('channel');
                      params.delete('id');
                      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                      setSelectedIds(new Set());
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-500 group
                                ${activeMarketplace === m.id
                        ? "bg-brand-600 text-white shadow-xl shadow-brand-600/20"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500
                        ${activeMarketplace === m.id ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white border border-transparent group-hover:border-gray-100 shadow-sm'}`}>
                        {m.icon}
                      </div>
                      <span className="text-[12px] font-black tracking-widest uppercase">{m.name}</span>
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg transition-colors ${activeMarketplace === m.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
                      {m.count}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-6 rounded-[2rem] bg-gray-50 border border-gray-100 space-y-4">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Growth Engine</p>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-gray-900">+12.4%</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase">Volume Potential</p>
                </div>
                <button
                  onClick={() => setIsIntegrationOpen(true)}
                  className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[9px] font-black text-gray-500 uppercase tracking-widest hover:border-brand-600 hover:text-brand-600 transition-all shadow-sm"
                >
                  Connect Now
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Channel Integration Drawer */}
        {isIntegrationOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-fadeIn"
              onClick={() => setIsIntegrationOpen(false)}
            />
            <div className="relative w-full max-w-xl bg-white h-full shadow-2xl animate-slideInRight overflow-y-auto">
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">Integrate New Channel</h2>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Expansion Handshake</p>
                  </div>
                  <button onClick={() => setIsIntegrationOpen(false)} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'shopify', name: 'Shopify', logo: 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg', color: 'text-emerald-600' },
                    { id: 'ebay', name: 'eBay', logo: 'https://www.vectorlogo.zone/logos/ebay/ebay-icon.svg', color: 'text-blue-600' },
                    { id: 'amazon', name: 'Amazon', logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg', color: 'text-orange-600' },
                    { id: 'tiktok', name: 'TikTok', logo: 'https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg', color: 'text-gray-900' },
                  ].map((channel) => (
                    <button
                      key={channel.id}
                      className="p-6 rounded-[2rem] border border-gray-100 hover:border-brand-500 hover:shadow-lg transition-all group flex flex-col items-center gap-4 bg-gray-50/30 hover:bg-white"
                    >
                      <div className="w-12 h-12 flex items-center justify-center">
                        <NextImage src={channel.logo} alt={channel.name} width={40} height={40} className="object-contain" unoptimized />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-600 group-hover:text-brand-600">{channel.name}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-12 p-8 rounded-[2rem] bg-brand-50/50 border border-brand-100 border-dashed">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm shrink-0">
                      <PlugInIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black text-brand-700 uppercase tracking-[0.2em] mb-1">Request Protocol</h5>
                      <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Don&apos;t see your marketplace? Our engineers can build custom handshake nodes for any legacy API.</p>
                      <button className="mt-4 px-5 py-2.5 bg-brand-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-md">Consult Node Architect</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative flex-1 w-full lg:max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input
                type="text"
                placeholder="Search by SKU, Channel SKU..."
                value={searchQuery}
                onChange={(e) => handleUpdateParam('q', e.target.value)}
                className="w-full pl-10 pr-4 h-10 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-500/10 text-sm font-bold placeholder:text-gray-400 tracking-tight transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <button className="h-10 px-6 flex items-center gap-2 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all bg-white flex-1 lg:flex-none justify-center">
                <ListIcon className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 hover:bg-gray-50 text-gray-400 transition-colors bg-white shadow-sm">
                <HorizontaLDots className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 gap-10 mb-8 overflow-x-auto no-scrollbar scroll-smooth">
            {["Active", "Warning", "Error", "Delisted", "Inactive"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleUpdateParam('status', tab)}
                className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap relative group ${activeTab.toLowerCase() === tab.toLowerCase()
                  ? "text-brand-600"
                  : "text-gray-400 hover:text-gray-700"
                  }`}
              >
                {tab}
                <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-brand-600 rounded-full transition-all duration-300 origin-left ${activeTab.toLowerCase() === tab.toLowerCase() ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50 opacity-40"}`} />
              </button>
            ))}
          </div>

          {/* Table Area */}
          <div className="flex-1 flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.01)] min-h-[600px]">
            {/* Header */}
            <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-4 sticky top-0 z-20">
              <div className="grid gap-4 items-center text-[10px] uppercase font-black tracking-widest text-gray-400" style={{ gridTemplateColumns: gridTemplate }}>
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={listings.length > 0 && selectedIds.size === listings.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded-lg border-gray-200 text-brand-600 focus:ring-brand-500/10 cursor-pointer transition-all"
                    />
                  </div>
                  <span>SKU / ID</span>
                </div>
                <div className="text-center">Node</div>
                <div>Listing Information</div>
                <div className="text-center">Status</div>
                <div className="text-right">Price</div>
                <div className="text-center">Units</div>
                <div className="text-center">Protocol</div>
                <div className="text-center">Actions</div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-x-auto no-scrollbar">
              <div className="min-w-[1000px] p-6 space-y-3">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
                    <div className="w-10 h-10 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Syncing Matrix...</p>
                  </div>
                ) : listings.length > 0 ? (
                  listings.map((item, idx) => {
                    const isSynced = item.is_linked;
                    const isSelected = selectedIds.has(item.listing_id);

                    return (
                      <div
                        key={item.listing_id}
                        className={`grid gap-4 px-6 py-4 items-center group rounded-2xl bg-white border ${isSelected ? 'border-brand-200 bg-brand-50/10' : 'border-transparent'} hover:border-brand-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all cursor-pointer relative z-10 animate-scaleIn`}
                        style={{ gridTemplateColumns: gridTemplate, animationDelay: `${idx * 20}ms` }}
                        onClick={() => router.push(`/marketplace/edit-listing/${item.listing_id}`)}
                      >
                        {/* SKU */}
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => toggleSelectOne(item.listing_id)}
                            className="w-4 h-4 rounded border-gray-200 text-brand-600 focus:ring-brand-500/10 cursor-pointer"
                          />
                          <span className="text-[11px] font-mono font-bold text-gray-500 tracking-tight">#{item.product?.sku || item.mapped_attributes?.sku || item.listing_id.slice(0, 8)}</span>
                        </div>

                        {/* Node Icon */}
                        <div className="flex justify-center">
                          <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm transition-transform group-hover:scale-105 duration-300">
                            <NextImage
                              src={item.channel?.marketplace === 'shopify'
                                ? "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg"
                                : "https://www.vectorlogo.zone/logos/ebay/ebay-icon.svg"}
                              width={32} height={32} className="object-contain" alt="" unoptimized
                            />
                          </div>
                        </div>

                        {/* Information */}
                        <div className="flex flex-col min-w-0 pr-4">
                          <span className="font-bold text-sm text-gray-900 truncate group-hover:text-brand-600 transition-colors uppercase" title={item.product?.name || item.mapped_attributes?.title}>
                            {item.product?.name || item.mapped_attributes?.title || 'Unknown Listing'}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{item.channel?.name}</span>
                        </div>

                        {/* Status */}
                        <div className="flex justify-center">
                          <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${item.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            item.status === 'error' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                              'bg-amber-50 text-amber-500 border-amber-100'
                            }`}>
                            {item.status}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-black text-gray-900 font-mono tracking-tighter">${(item.product?.price || item.mapped_attributes?.price || 0).toFixed(2)}</span>
                        </div>

                        {/* Stock */}
                        <div className="text-center flex flex-col items-center">
                          <span className={`text-sm font-black font-mono tracking-tighter ${(item.product?.stock ?? 0) > 0 ? 'text-gray-900' : 'text-rose-500'}`}>
                            {item.product?.stock ?? item.mapped_attributes?.stock ?? 0}
                          </span>
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest opacity-60">Nodes</span>
                        </div>

                        {/* Protocol/Updated */}
                        <div className="text-center">
                          <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest opacity-80">
                            {item.updated_at ? new Date(item.updated_at).toLocaleDateString('en-GB') : 'Syncing'}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-center gap-2 pr-2">
                          {isSynced ? (
                            <Link
                              href={`/marketplace/edit-listing/${item.listing_id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:text-brand-600 hover:bg-white border border-transparent hover:border-gray-100 transition-all flex items-center justify-center group/btn shadow-sm"
                              title="Edit Node"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </Link>
                          ) : (
                            <Link
                              href={`/marketplace/edit-listing/${item.listing_id}?mode=link`}
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 rounded-xl bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center shadow-md group/link"
                              title="Connect to Inventory"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100">
                      <svg className="w-8 h-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">No Matching Handshakes</p>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">No listings found for this channel and status combination.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {pagination.total > 0 && (
              <div className="flex items-center justify-between px-10 py-5 border-t border-gray-100 bg-gray-50/20 backdrop-blur-sm sticky bottom-0 z-20">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Showing {listings.length} nodes on Page {pagination.currentPage} of {pagination.lastPage}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateParam('page', (pagination.currentPage - 1).toString())}
                    disabled={pagination.currentPage === 1}
                    className="h-10 px-6 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 hover:border-brand-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleUpdateParam('page', (pagination.currentPage + 1).toString())}
                    disabled={pagination.currentPage === pagination.lastPage}
                    className="h-10 px-6 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-600 hover:border-brand-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
