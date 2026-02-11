"use client";
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Switch from '@/components/form/switch/Switch';
import { Drawer } from '@/components/ui/drawer/Drawer';
import { PlusIcon } from '@/icons';
import { api } from '@/services/authService';
import { integrationService } from '@/services/integrationService';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const channelTypes = [
  { id: 'shopify', name: 'Shopify', desc: 'Sync products and orders with your Shopify store.', logo: 'https://www.vectorlogo.zone/logos/shopify/shopify-ar21.svg', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'ebay', name: 'eBay', desc: 'Manage your eBay US and Global listings.', logo: 'https://www.vectorlogo.zone/logos/ebay/ebay-ar21.svg', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'amazon', name: 'Amazon', desc: 'Full FBM & FBA synchronization hub.', logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'bigcommerce', name: 'BigCommerce', desc: 'Enterprise-grade multi-channel sync.', logo: 'https://www.vectorlogo.zone/logos/bigcommerce/bigcommerce-ar21.svg', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'tiktok', name: 'TikTok Shop', desc: 'Push inventory to your TikTok Creator shop.', logo: 'https://www.vectorlogo.zone/logos/tiktok/tiktok-ar21.svg', color: 'text-gray-900', bg: 'bg-gray-100' },
  { id: 'woo', name: 'WooCommerce', desc: 'Connect your WordPress e-commerce site.', logo: 'https://www.vectorlogo.zone/logos/woocommerce/woocommerce-ar21.svg', color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function IntegrationsPage() {
  const [activeModal, setActiveModal] = useState<'none' | 'select' | 'connect' | 'settings'>('none');
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [connectionType, setConnectionType] = useState<'automatic' | 'manual'>('automatic');
  const [shopifyManualData, setShopifyManualData] = useState({ url: '', token: '' });
  const [isConnecting, setIsConnecting] = useState(false);

  // Manage dynamic list of connected channels
  const [connectedChannels, setConnectedChannels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [settings, setSettings] = useState({
    nickname: 'CACO',
    syncPrice: true,
    syncStock: true,
    syncInfo: false,
    maxQty: '',
    leadTime: '',
    currency: 'USD',
    marketplace: 'US',
    sellerId: 'A2L241Q87LH5Q6',
    matchingProtocol: 'sku',
    autoLink: false,
    conflictResolution: 'internal',
    syncFrequency: 'realtime',
    stockBufferType: 'percentage',
    stockBufferValue: '10',
    attributeMapping: {
      sku: { enabled: true, authority: 'internal' },
      title: { enabled: true, authority: 'internal' },
      price: { enabled: true, authority: 'internal' },
      stock: { enabled: true, authority: 'internal' },
      description: { enabled: false, authority: 'marketplace' },
      images: { enabled: true, authority: 'marketplace' },
      brand: { enabled: false, authority: 'internal' },
      weight: { enabled: false, authority: 'internal' },
    }
  });

  const fetchChannels = async () => {
    setIsLoading(true);
    try {
      const response = await integrationService.getChannels();
      if (response.success) {
        const enriched = response.data.map((c: any) => {
          const type = channelTypes.find(t => t.id === c.marketplace);
          return {
            ...c,
            typeId: c.marketplace,
            nickname: c.name,
            status: c.status === 'active' ? 'Connected' : 'Disconnected',
            bg: type?.bg || 'bg-gray-50',
            color: type?.color || 'text-gray-500',
            logo: type?.logo || '',
            desc: c.marketplace_data?.description || 'Active synchronization handshake.',
            syncDate: c.updated_at ? new Date(c.updated_at).toLocaleDateString() : 'Never',
            sellerId: c.marketplace_data?.seller_id || c.channel_id.split('-')[0].toUpperCase(),
            marketplace: c.marketplace_data?.region || 'Global'
          };
        });
        setConnectedChannels(enriched);
      }
    } catch (error) {
      console.error("Failed to fetch channels", error);
      toast.error("Failed to lead connections");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleChannelSelect = (channel: any) => {
    setSelectedChannel(channel);
    setConnectionType('automatic');
    setActiveModal('connect');
  };

  const handleManualLink = async () => {
    setIsConnecting(true);
    try {
      const response = await api.post('/channels', {
        name: shopifyManualData.url || `${selectedChannel.name} Store`,
        marketplace: selectedChannel.id,
        status: 'active',
        marketplace_data: {
          url: shopifyManualData.url,
          token: shopifyManualData.token,
          region: 'US', // default
          settings: settings
        }
      });

      if (response.status === 201) {
        toast.success(`${selectedChannel.name} connected successfully!`);
        await fetchChannels();
        setActiveModal('none');
        setShopifyManualData({ url: '', token: '' });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to establish handshake");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleUpdateSettings = async () => {
    if (!selectedChannel) return;
    setIsConnecting(true);
    try {
      const response = await integrationService.updateChannelSettings(selectedChannel.channel_id, settings);
      if (response.success) {
        toast.success("Settings synchronized successfully");
        await fetchChannels();
        setActiveModal('none');
      }
    } catch (error: any) {
      toast.error(error.message || "Update failed");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOpenSettings = (channel: any) => {
    setSelectedChannel(channel);
    if (channel.marketplace_data?.settings) {
      setSettings(prev => ({ ...prev, ...channel.marketplace_data.settings }));
    }
    setActiveModal('settings');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-screen bg-[#F9FAFB] select-none font-outfit">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/settings" className="hover:text-brand-600 transition-colors">Settings</Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900">Integrations</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Channel Integrations</h1>
          <p className="text-sm text-gray-400 mt-1 font-medium">Orchestrate and scale your multi-market synchronization handshakes.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="h-11 px-6 bg-white border border-gray-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm">
            Operational Audit
          </button>
          <button
            onClick={() => setActiveModal('select')}
            className="h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all active:scale-95"
          >
            <PlusIcon className="w-4 h-4" />
            Integrate New Shop
          </button>
        </div>
      </div>

      {/* Table View Implementation */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.03)] overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-10 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[300px]">Channel Instance</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Market Sync Stats</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-10 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-10 py-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Synchronizing Local Nodes...</p>
                    </div>
                  </td>
                </tr>
              ) : connectedChannels.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-6">
                      <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-3xl flex items-center justify-center group hover:bg-white transition-all">
                        <PlusIcon className="w-8 h-8 text-gray-200 group-hover:text-brand-500" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-gray-700">No Integrated Handshakes</h3>
                        <p className="text-sm text-gray-400 font-medium">Initialize your first marketplace connection to start syncing.</p>
                      </div>
                      <button
                        onClick={() => setActiveModal('select')}
                        className="h-12 px-10 bg-brand-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:scale-105 transition-all"
                      >
                        Establish First Link
                      </button>
                    </div>
                  </td>
                </tr>
              ) : connectedChannels.map((channel) => (
                <tr key={channel.id || channel.channel_id} className="hover:bg-gray-50/50 group transition-all duration-500 relative">
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-12 rounded-[1.25rem] flex items-center justify-center border border-gray-100/50 bg-white p-2.5 shadow-sm group-hover:shadow-md transition-all duration-500">
                        {channel.logo ? <Image src={channel.logo} alt={channel.name} width={45} height={22} className="object-contain" unoptimized /> : null}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900 tracking-tight">{channel.nickname}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-brand-600/60 uppercase tracking-widest">{channel.sellerId}</span>
                          <div className="w-1 h-1 rounded-full bg-gray-200" />
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{channel.name} Hub</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    <div className="flex gap-10">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-gray-900 font-mono tracking-tighter">0.00%</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Price Divergence</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-gray-900 font-mono tracking-tighter">100%</span>
                        <span className="text-[9px] font-bold text-emerald-500/70 uppercase tracking-widest">Stock Health</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-7 text-center">
                    <div className="flex justify-center">
                      <span className={`uppercase text-[9px] font-bold px-3 py-1.5 rounded-lg border tracking-[0.15em] transition-all shadow-sm flex items-center gap-2 ${channel.status === 'Connected'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:shadow-[0_4px_12px_rgba(16,185,129,0.1)]'
                        : 'bg-rose-50 text-rose-500 border-rose-100'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${channel.status === 'Connected' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-current'}`} />
                        {channel.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex items-center justify-end gap-2 pr-2">
                      <button
                        onClick={() => handleOpenSettings(channel)}
                        className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-brand-600 hover:border-brand-200 hover:shadow-lg transition-all flex items-center justify-center group/btn"
                        title="Configuration Settings"
                      >
                        <svg className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer
        isOpen={activeModal === 'select'}
        onClose={() => setActiveModal('none')}
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 border border-brand-100/50">
              <PlusIcon className="w-5 h-5" />
            </div>
            <span className="text-gray-900 font-bold tracking-tight">Connect Marketplace Account</span>
          </div>
        }
        footer={
          <div className="flex w-full items-center justify-end gap-3 px-2">
            <button
              onClick={() => setActiveModal('none')}
              className="h-11 px-8 bg-white border border-gray-200 text-gray-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all font-mono"
            >
              Close
            </button>
          </div>
        }
        className="!max-w-[50vw] sm:!max-w-[50vw] w-full"
      >
        <div className="p-8 space-y-10 group">
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Select Integration Platform</h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">Choose a marketplace to establish a new synchronization handshake.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {channelTypes.map((channel) => (
              <button
                key={channel.id}
                onClick={() => handleChannelSelect(channel)}
                className={`group/card relative flex items-center p-4 gap-5 border border-gray-100 rounded-2xl transition-all duration-300 hover:border-brand-500/20 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 bg-white`}
              >
                {/* Status Indicator Bar */}
                <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${channel.color.replace('text-', 'bg-')} opacity-0 group-hover/card:opacity-100 transition-opacity`} />

                <div className="relative w-16 h-12 rounded-xl flex items-center justify-center border border-gray-50 bg-gray-50/50 p-2.5 transition-all group-hover/card:bg-white group-hover/card:shadow-sm shrink-0">
                  {channel.logo && <Image
                    src={channel.logo}
                    alt={channel.name}
                    width={80}
                    height={32}
                    className="w-full h-auto object-contain transition-transform group-hover/card:scale-110"
                    unoptimized
                  />}
                </div>

                <div className="flex-1 text-left space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-gray-900 tracking-tight">{channel.name} Marketplace</h4>
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${channel.bg} ${channel.color} border-current/10 opacity-60`}>Verified Link</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">Scale your {channel.name} operations with real-time nodal sync.</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-8 w-[1px] bg-gray-100" />
                  <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover/card:border-brand-500 group-hover/card:text-brand-500 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 flex items-center justify-between gap-6 overflow-hidden relative group/banner">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-gray-900 uppercase tracking-tight">Implementation Guide</p>
                  <p className="text-[10px] text-gray-400 font-medium">Step-by-step handshake manual</p>
                </div>
              </div>
              <Link href="/help/connect-shopify" className="relative z-10 h-11 px-6 bg-white border border-gray-200 text-gray-500 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:text-brand-600 transition-all shadow-sm flex items-center justify-center">View Docs</Link>
            </div>

            <div className="bg-brand-50/30 rounded-3xl p-6 border border-brand-100/50 flex items-center justify-between gap-6 overflow-hidden relative group/banner">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-brand-100">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-brand-600 uppercase tracking-tight">Need Support?</p>
                  <p className="text-[10px] text-gray-400 font-medium">Custom nodal architecture</p>
                </div>
              </div>
              <button className="relative z-10 h-11 px-6 bg-brand-600 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-brand-700 transition-all shadow-md">Contact Arch</button>
            </div>
          </div>
        </div>
      </Drawer>

      <Drawer
        isOpen={activeModal === 'connect'}
        onClose={() => setActiveModal('none')}
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm border border-gray-100/50 p-1">
              {selectedChannel?.logo && <Image src={selectedChannel.logo} alt={selectedChannel?.name} width={30} height={15} className="object-contain" unoptimized />}
            </div>
            <span className="text-gray-900 font-bold tracking-tight">Integrate {selectedChannel?.name}</span>
          </div>
        }
        footer={
          <div className="flex w-full items-center justify-end gap-3 px-2">
            <button
              onClick={() => connectionType === 'automatic' ? setActiveModal('select') : setConnectionType('automatic')}
              className="h-11 px-8 bg-white border border-gray-200 text-gray-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all font-mono"
            >
              Back
            </button>
            <button
              onClick={connectionType === 'automatic' ? () => setActiveModal('settings') : handleManualLink}
              disabled={connectionType === 'manual' && (!shopifyManualData.url || !shopifyManualData.token || isConnecting)}
              className="h-11 px-10 bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-3 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Validating...</span>
                </>
              ) : (
                <span>{connectionType === 'automatic' ? 'Authorize Handshake' : 'Initialize Link'}</span>
              )}
            </button>
          </div>
        }
        className="!max-w-[50vw] sm:!max-w-[50vw] w-full"
      >
        <div className="p-8 space-y-10">
          <div className="flex items-center justify-between gap-6 p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 tracking-tight">Channel Authorization</h4>
                <p className="text-[11px] text-brand-600 font-bold uppercase tracking-widest">{selectedChannel?.name} Secure Sync</p>
              </div>
            </div>

            {(selectedChannel?.id === 'shopify' || selectedChannel?.id === 'bigcommerce') && (
              <div className="flex bg-white/50 p-1 rounded-xl border border-gray-100">
                <button
                  onClick={() => setConnectionType('automatic')}
                  className={`px-4 py-2 rounded-[0.85rem] text-[10px] font-bold uppercase tracking-widest transition-all ${connectionType === 'automatic' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  Auto
                </button>
                <button
                  onClick={() => setConnectionType('manual')}
                  className={`px-4 py-2 rounded-[0.85rem] text-[10px] font-bold uppercase tracking-widest transition-all ${connectionType === 'manual' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  Manual
                </button>
              </div>
            )}
          </div>

          {selectedChannel?.id === 'shopify' && (
            <Link
              href="/help/connect-shopify"
              className="flex items-center gap-4 p-4 bg-emerald-50/30 border border-emerald-100/50 rounded-2xl group/help hover:bg-emerald-50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-emerald-100 group-hover/help:scale-110 transition-transform">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">Handshake Guide</p>
                <p className="text-[10px] text-emerald-600/60 font-medium">How to connect Shopify successfully</p>
              </div>
              <svg className="w-5 h-5 text-emerald-400 group-hover/help:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          )}

          {connectionType === 'automatic' ? (
            <div className="animate-fadeIn space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Handshake Flow</p>
                <div className="space-y-3">
                  {/* @ts-ignore */}
                  {[
                    'Ensure you are logged into your seller central account.',
                    'Grant "Inventory Control" permissions when prompted.',
                    'Verify API credentials to complete the handshake.'
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-[2rem] bg-gray-50/50 border border-gray-100 group hover:border-brand-200 transition-all">
                      <span className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm border border-gray-100 group-hover:text-brand-600 transition-colors uppercase tracking-widest font-mono">{i + 1}</span>
                      <p className="text-[13px] text-gray-500 font-semibold leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Store / Marketplace Instance URL</Label>
                  <Input
                    placeholder="e.g. shopify-digital.myshopify.com"
                    value={shopifyManualData.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShopifyManualData({ ...shopifyManualData, url: e.target.value })}
                    className="h-12 bg-white border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-brand-500/10 shadow-sm px-5"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Private Handshake Token</Label>
                  <Input
                    type="password"
                    placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxx"
                    value={shopifyManualData.token}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShopifyManualData({ ...shopifyManualData, token: e.target.value })}
                    className="h-12 bg-white border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-brand-500/10 shadow-sm px-5"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Drawer>

      {/* Premium Settings Drawer */}
      <Drawer
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal('none')}
        title={
          <div className="flex items-center gap-3">
            <div className={`w-10 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm border border-gray-100/50 p-1`}>
              {selectedChannel?.logo && <Image src={selectedChannel.logo} alt={selectedChannel?.name} width={30} height={15} className="object-contain" unoptimized />}
            </div>
            <span className="text-gray-700 font-bold tracking-tight">{selectedChannel?.nickname || selectedChannel?.name || 'Channel'} Orchestration</span>
          </div>
        }
        footer={
          <div className="flex w-full items-center justify-end gap-3 px-2">
            <button
              onClick={() => setActiveModal('none')}
              className="h-11 px-8 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Discard
            </button>
            <button
              className="h-11 px-8 bg-white border border-red-100 text-red-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition-all"
            >
              Disable Link
            </button>
            <button
              onClick={handleUpdateSettings}
              disabled={isConnecting}
              className="h-11 px-10 bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting && <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
              Update Config
            </button>
          </div>
        }
        className="!max-w-[50vw] sm:!max-w-[50vw] w-full"
      >
        <div className="p-8 space-y-10 animate-fadeIn">

          {/* General Context Group */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Account Architecture</h4>
              <div className="flex items-center gap-4">
                <span className={`${settings.nickname === 'DISCONNECTED' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100'} px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border`}>Connected</span>
                <button className="flex items-center gap-2 text-[10px] font-bold text-brand-600 uppercase tracking-widest hover:opacity-75 transition-all">
                  <svg className="w-3.5 h-3.5 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  Force Reconnect
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Account Nickname <span className="text-red-500 font-bold">*</span></Label>
                  <Input
                    value={settings.nickname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, nickname: e.target.value })}
                    className="h-12 bg-white border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-brand-500/10 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 italic opacity-70">Region & Market</Label>
                  <div className="relative">
                    <Input
                      readOnly
                      value={selectedChannel?.marketplace || settings.marketplace}
                      className="h-12 bg-gray-50 border-gray-100 rounded-xl text-sm font-bold text-gray-400 shadow-sm cursor-not-allowed"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-gray-400">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Authorized ID / API Domain</Label>
                <div className="relative">
                  <Input
                    readOnly
                    value={selectedChannel?.sellerId || settings.sellerId}
                    className="h-12 bg-gray-50 border-gray-100 rounded-xl text-sm font-bold text-gray-400 font-mono tracking-tight cursor-not-allowed"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-300">
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">Locked Link</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-50/50 border border-brand-100 rounded-3xl p-6 flex items-center justify-between gap-6 transition-all hover:bg-brand-50 group">
              <div className="space-y-1">
                <h5 className="text-[11px] font-bold text-brand-600 uppercase tracking-widest">Inventory Manifest</h5>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Force re-download all marketplace listings to sync metadata.</p>
              </div>
              <button className="h-10 px-5 bg-white border border-brand-200 text-brand-600 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm hover:bg-brand-600 hover:text-white transition-all whitespace-nowrap">Force Download</button>
            </div>
          </div>

          {/* Synchronization Logic Group */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Handshake Parameters</h4>
            <div className="space-y-3">
              {[
                { key: 'syncPrice', label: 'Price Optimization', desc: 'Sync internal price points to market listings automatically.' },
                { key: 'syncStock', label: 'Inventory Pulse', desc: 'Propagate stock level alterations in real-time.' },
                { key: 'syncInfo', label: 'Content Relay', desc: 'Sync product details, images and specifications.' },
              ].map((rule) => (
                <div key={rule.key} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-brand-100 flex-wrap gap-4 transition-all group shadow-sm">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-gray-700 tracking-tight group-hover:text-brand-600 uppercase transition-colors">{rule.label}</p>
                    <p className="text-[11px] text-gray-400 font-bold">{rule.desc}</p>
                  </div>
                  <Switch
                    checked={(settings as any)[rule.key]}
                    onChange={(chk: boolean) => setSettings({ ...settings, [rule.key]: chk })}
                    className="scale-90"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mapping Configuration Group - SENSITIVE */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Field Identity & Mapping</h4>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-rose-100 animate-pulse">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Highly Sensitive
              </span>
            </div>

            <div className="p-6 bg-rose-50/30 border border-rose-100 rounded-[2rem] space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-100 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-rose-700 uppercase tracking-widest mb-1">Critical Identity Protocol</h5>
                  <p className="text-[10px] text-rose-600/70 font-medium leading-relaxed">
                    Altering the Identity Matching protocol will rebuild all existing channel-to-inventory links.
                    <span className="block mt-1 font-bold">Incorrect configuration will cause mass product duplication or data mismatch.</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Identity Matching Protocol</Label>
                  <select
                    className="w-full h-12 px-5 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all cursor-pointer shadow-sm"
                    value={(settings as any).matchingProtocol}
                    onChange={(e) => setSettings({ ...settings, matchingProtocol: e.target.value })}
                  >
                    <option value="sku">Match by SKU (Recommended)</option>
                    <option value="title">Match by Product Title</option>
                    <option value="external_id">Match by Channel External ID</option>
                    <option value="upc">Match by UPC / Barcode</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/60 border border-gray-100 rounded-2xl group transition-all hover:bg-white">
                  <div>
                    <p className="text-[11px] font-bold text-gray-900 uppercase tracking-tight">Auto-Link New Items</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Enable background linking</p>
                  </div>
                  <Switch
                    checked={(settings as any).autoLink}
                    onChange={(chk: boolean) => setSettings({ ...settings, autoLink: chk })}
                    className="scale-75"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operational Limits Group */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Operational Safeguards</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Maximum Sync Quantity</Label>
                <Input
                  type="number"
                  value={settings.maxQty}
                  placeholder="No Limit"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, maxQty: e.target.value })}
                  className="h-12 bg-white border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Inventory Buffer Value</Label>
                <div className="flex gap-2">
                  <select
                    value={settings.stockBufferType}
                    onChange={(e) => setSettings({ ...settings, stockBufferType: e.target.value })}
                    className="h-12 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none"
                  >
                    <option value="percentage">%</option>
                    <option value="fixed">Fixed</option>
                  </select>
                  <Input
                    value={settings.stockBufferValue}
                    placeholder="10"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, stockBufferValue: e.target.value })}
                    className="h-12 bg-white border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Conflict Resolution</Label>
                <select
                  className="w-full h-12 px-5 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-brand-500/10 transition-all cursor-pointer shadow-sm"
                  value={settings.conflictResolution}
                  onChange={(e) => setSettings({ ...settings, conflictResolution: e.target.value })}
                >
                  <option value="internal">Internal Wins (System Priority)</option>
                  <option value="external">External Wins (Channel Priority)</option>
                  <option value="manual">Manual Intervention (Alert Only)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Orchestration Frequency</Label>
                <select
                  className="w-full h-12 px-5 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-brand-500/10 transition-all cursor-pointer shadow-sm"
                  value={settings.syncFrequency}
                  onChange={(e) => setSettings({ ...settings, syncFrequency: e.target.value })}
                >
                  <option value="realtime">Real-time (Webhooks)</option>
                  <option value="5min">Every 5 Minutes</option>
                  <option value="15min">Every 15 Minutes</option>
                  <option value="hourly">Hourly Deep Sync</option>
                </select>
              </div>
            </div>

            {/* Marketplace & Inventory Attribute Mapping - NEW SECTION */}
            <div className="space-y-6 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800">Marketplace & Inventory Attribute Mapping</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Define Data Authority & Field Correlation</p>
                </div>
                <button className="text-[9px] font-bold text-brand-600 uppercase tracking-widest hover:underline transition-all">Restore Defaults</button>
              </div>

              <div className="space-y-6">
                {[
                  {
                    group: 'Core Identity',
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 012-2h4a2 2 0 012 2v2M9 14l2 2 4-4" /></svg>,
                    fields: [
                      { id: 'sku', label: 'SKU / Item Identifier', desc: 'Primary Correlation Key' },
                      { id: 'title', label: 'Product Title', desc: 'Listing Display Name' },
                      { id: 'brand', label: 'Brand / Manufacturer', desc: 'Entity Classification' },
                    ]
                  },
                  {
                    group: 'Pricing & Stock',
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    fields: [
                      { id: 'price', label: 'Marketplace Price', desc: 'Real-time MSRP synchronization' },
                      { id: 'stock', label: 'Inventory Level', desc: 'Pulse-based stock heartbeat' },
                    ]
                  },
                  {
                    group: 'Visual Assets & Content',
                    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
                    fields: [
                      { id: 'images', label: 'Product Gallery', desc: 'Binary image data transfer' },
                      { id: 'description', label: 'Long-tail Description', desc: 'SEO & Content Payload' },
                    ]
                  }
                ].map((category) => (
                  <div key={category.group} className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <div className="text-brand-500">{category.icon}</div>
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{category.group}</h5>
                    </div>
                    <div className="grid gap-2">
                      {category.fields.map((field) => (
                        <div key={field.id} className="group relative bg-white border border-gray-100 rounded-2xl p-4 hover:border-brand-100 transition-all flex items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={(settings.attributeMapping as any)[field.id]?.enabled}
                                onChange={(e) => {
                                  const current = (settings.attributeMapping as any)[field.id];
                                  setSettings({
                                    ...settings,
                                    attributeMapping: {
                                      ...settings.attributeMapping,
                                      [field.id]: { ...current, enabled: e.target.checked }
                                    }
                                  });
                                }}
                                className="w-5 h-5 rounded-lg border-2 border-gray-100 text-brand-600 focus:ring-brand-500/10 cursor-pointer shadow-sm transition-all"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[12px] font-bold text-gray-700 uppercase tracking-tight group-hover:text-brand-600 transition-colors">{field.label}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{field.desc}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => {
                                const current = (settings.attributeMapping as any)[field.id];
                                setSettings({
                                  ...settings,
                                  attributeMapping: {
                                    ...settings.attributeMapping,
                                    [field.id]: { ...current, authority: 'internal' }
                                  }
                                });
                              }}
                              className={`h-8 px-3 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${(settings.attributeMapping as any)[field.id]?.authority === 'internal' ? 'bg-brand-50 text-brand-600 border border-brand-100' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                              Internal Wins
                            </button>
                            <div className="w-[1px] h-4 bg-gray-100" />
                            <button
                              onClick={() => {
                                const current = (settings.attributeMapping as any)[field.id];
                                setSettings({
                                  ...settings,
                                  attributeMapping: {
                                    ...settings.attributeMapping,
                                    [field.id]: { ...current, authority: 'marketplace' }
                                  }
                                });
                              }}
                              className={`h-8 px-3 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${(settings.attributeMapping as any)[field.id]?.authority === 'marketplace' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                              Marketplace Wins
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  className="w-full h-12 flex items-center justify-center gap-2 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:border-brand-200 hover:text-brand-600 hover:bg-brand-50/30 transition-all group"
                >
                  <PlusIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  Add Custom Handshake Link
                </button>
              </div>
            </div>
          </div>

          {/* Footer Info Locking */}
          <div className="pt-6 border-t border-gray-50 flex items-center justify-between opacity-60">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Last Orchestrated</span>
              <span className="text-[10px] font-mono font-bold text-gray-600">{selectedChannel?.syncDate || '15 Apr 2024 16:50'}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Market Currency</span>
              <span className="text-[10px] font-bold text-brand-600">{settings.currency} SYNCED</span>
            </div>
          </div>

        </div>
      </Drawer>
    </div>
  );
}
