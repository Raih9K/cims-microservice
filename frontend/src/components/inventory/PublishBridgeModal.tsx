"use client";
import Button from "@/components/ui/button/Button";
import { Channel, integrationService } from "@/services/integrationService";
import { listingService } from "@/services/listingService";
import { useEffect, useState } from "react";

interface PublishBridgeModalProps {
  product: {
    id: string;
    title: string;
    sku: string;
    price: number;
    stock: number;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function PublishBridgeModal({ product, onClose, onSuccess }: PublishBridgeModalProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [overrides, setOverrides] = useState({
    price: product.price.toString(),
    quantity: product.stock.toString(),
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await integrationService.getChannels();
        if (response.success) {
          // Only show active Shopify channels
          const shopifyChannels = response.data.filter((c: any) => c.platform === 'shopify' && c.status === 'active');
          setChannels(shopifyChannels);
          if (shopifyChannels.length > 0) {
            setSelectedChannelId(shopifyChannels[0].channel_id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch channels", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  const handlePublish = async () => {
    if (!selectedChannelId) return;
    setPublishing(true);
    setError(null);
    try {
      // 1. Create a listing entry (Draft)
      const listingResp = await listingService.createListing({
        channel_id: selectedChannelId,
        stock_item_id: product.id,
        price_override: parseFloat(overrides.price),
        quantity_allocated: parseInt(overrides.quantity),
        status: 'draft'
      });

      if (listingResp.success) {
        // 2. Trigger the "Bridge" bridge (Publish to Shopify)
        const publishResp = await listingService.publishListing(listingResp.data.listing_id);
        if (publishResp.success) {
          onSuccess();
        } else {
          setError(publishResp.message || "Failed to push to Shopify");
        }
      } else {
        setError(listingResp.message || "Failed to create listing");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Shopify Bridge</h2>
              <p className="text-sm text-gray-500 mt-1">Publish <b>{product.title}</b> to your connected store.</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400">
              <div className="w-8 h-8 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest">Scanning Channels...</p>
            </div>
          ) : channels.length === 0 ? (
            <div className="py-8 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-sm text-gray-500 mb-4">No active Shopify channels found.</p>
              <Button onClick={onClose} className="h-10 px-6 bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Connect Shopify</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Channel Selector */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Select Channel</label>
                <div className="grid grid-cols-1 gap-2">
                  {channels.map((channel) => (
                    <button
                      key={channel.channel_id}
                      onClick={() => setSelectedChannelId(channel.channel_id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${selectedChannelId === channel.channel_id
                          ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/10'
                          : 'border-gray-100 hover:border-gray-200'
                        }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-brand-600">S</div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{channel.name}</div>
                        <div className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">{channel.marketplace_data?.currency || 'USD'} • {channel.store_url}</div>
                      </div>
                      {selectedChannelId === channel.channel_id && (
                        <div className="ml-auto text-brand-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overrides */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Listing Price</label>
                  <input
                    type="number"
                    value={overrides.price}
                    onChange={(e) => setOverrides({ ...overrides, price: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-500/10 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Initial Stock</label>
                  <input
                    type="number"
                    value={overrides.quantity}
                    onChange={(e) => setOverrides({ ...overrides, quantity: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-500/10 text-sm font-bold"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 animate-headShake">
                  <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-xs font-bold text-rose-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button onClick={onClose} className="h-12 flex-1 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-widest">Cancel</Button>
                <Button
                  onClick={handlePublish}
                  disabled={publishing}
                  className={`h-12 flex-1 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${publishing ? 'bg-brand-400 cursor-not-allowed text-white' : 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/20'
                    }`}
                >
                  {publishing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Pushing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <span>Publish Now</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
