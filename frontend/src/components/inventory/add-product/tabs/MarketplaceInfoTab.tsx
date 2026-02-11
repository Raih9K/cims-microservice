"use client";
import { useProductForm } from "@/context/ProductFormContext";
import { InfoIcon, PlusIcon, TrashBinIcon } from "@/icons";

const CHANNELS = [
    { name: "Shopify", icon: "🛍️" },
    { name: "Etsy", icon: "🎨" },
    { name: "Walmart", icon: "🛒" },
    { name: "eBay", icon: "📦" }
];

export default function MarketplaceInfoTab() {
  const { data, updateMarketplace } = useProductForm();
  const channels = data.marketplace.channels;

  const handleAddChannel = () => {
      const newChannel = {
          id: Math.random().toString(36).substr(2, 9),
          name: CHANNELS[channels.length % CHANNELS.length].name,
          price: "",
          title: "",
          description: "",
          tags: []
      };
      updateMarketplace({ channels: [...channels, newChannel] });
  };

  const removeChannel = (id: string) => {
      updateMarketplace({ channels: channels.filter(c => c.id !== id) });
  };

  const updateChannelField = (id: string, field: string, value: any) => {
      updateMarketplace({
          channels: channels.map(c => c.id === id ? { ...c, [field]: value } : c)
      });
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-10">
      {/* Banner / Info */}
      <section className="space-y-6">
        <div className="bg-gray-900 dark:bg-gray-800/40 p-6 rounded-3xl flex gap-5 border border-gray-100/10 shadow-2xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-500/10 transition-colors" />
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 text-white/40 group-hover:text-white/60 transition-colors border border-white/5">
                <InfoIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 relative z-10">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Channel Override Management</h4>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors font-medium leading-relaxed max-w-3xl">
                    Define channel-specific information to optimize your listings for different marketplaces. Values left blank will inherit data from the master product record.
                </p>
            </div>
        </div>
      </section>

      {/* Channels Configuration */}
      <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Marketplace Channel Configurations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure specific settings for each sales channel</p>
              </div>
              <button
                  onClick={handleAddChannel}
                  className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-all shadow-sm flex items-center gap-2"
              >
                  <PlusIcon className="w-4 h-4" /> Add Marketplace
              </button>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-48">Channel</th>
                    <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-36">Override Price</th>
                    <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[200px]">Custom Title</th>
                    <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[250px]">Custom Description</th>
                    <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-20"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {channels.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-16 text-center bg-gray-50/20 dark:bg-gray-900/10">
                                <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center text-gray-400 dark:text-gray-500 mb-6 shadow-sm">
                                        <PlusIcon className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">No Marketplace Channels</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                                        Add channels to customize your listing for specific marketplaces.
                                    </p>
                                    <button
                                        onClick={handleAddChannel}
                                        className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:scale-105 transition-all shadow-sm"
                                    >
                                        Configure First Channel
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        channels.map((channel) => (
                            <tr key={channel.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                                <td className="py-6 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl text-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                            {CHANNELS.find(c => c.name === channel.name)?.icon || "🌐"}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{channel.name}</span>
                                            <span className="text-xs text-green-600 dark:text-green-400">{channel.name === 'Shopify' ? 'Synced' : 'Active'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-6">
                                    <div className="relative group/input">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500 group-hover/input:text-brand-500 transition-colors">$</span>
                                        <input
                                            type="number"
                                            placeholder="Default"
                                            value={channel.price}
                                            onChange={(e) => updateChannelField(channel.id, 'price', e.target.value)}
                                            className="w-full h-11 bg-gray-50 dark:bg-gray-800/50 border border-transparent focus:border-brand-500/30 rounded-xl pl-8 pr-3 text-sm text-gray-900 dark:text-white font-medium focus:outline-none transition-all"
                                        />
                                    </div>
                                </td>
                                <td className="py-6 px-6">
                                    <input
                                        type="text"
                                        placeholder="Use master title"
                                        value={channel.title}
                                        onChange={(e) => updateChannelField(channel.id, 'title', e.target.value)}
                                        className="w-full h-11 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm text-gray-900 dark:text-white font-normal focus:outline-none focus:border-brand-500/30 transition-all"
                                    />
                                </td>
                                <td className="py-6 px-6 text-center">
                                    <div className="relative group/desc">
                                        <input
                                            type="text"
                                            placeholder="Use master description"
                                            value={channel.description}
                                            onChange={(e) => updateChannelField(channel.id, 'description', e.target.value)}
                                            className="w-full h-11 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm text-gray-900 dark:text-white font-normal focus:outline-none focus:border-brand-500/30 transition-all opacity-70 focus:opacity-100"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/desc:opacity-100 transition-all">
                                            <button className="p-2 text-brand-500 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:scale-105 transition-all">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6 px-6 text-right">
                                    <button
                                        onClick={() => removeChannel(channel.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
                                    >
                                        <TrashBinIcon className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
              </table>
            </div>

            {channels.length > 0 && (
                <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleAddChannel}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:border-brand-500/50 transition-all shadow-sm group"
                    >
                        <PlusIcon className="w-4 h-4 text-gray-400 group-hover:text-brand-500 transition-colors" />
                        Configure More Channels
                    </button>
                </div>
            )}
          </div>
      </section>
    </div>
  );
}
