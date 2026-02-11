"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Drawer } from "@/components/ui/drawer/Drawer";
import { useProductForm } from "@/context/ProductFormContext";
import { PlusIcon, TrashBinIcon } from "@/icons";
import { useState } from "react";

export default function ListingStatusTab() {
  const { data, updateListingStatus } = useProductForm();
  const { active, drafts, notListed } = data.listingStatus;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newListing, setNewListing] = useState({
      id: "",
      channel: "Shopify",
      sku: data.basicInfo.sku || "",
      quantity: "1",
      price: data.basicInfo.retailPrice || "0",
      marketplaceId: "",
      type: "active" as 'active' | 'draft' | 'notListed'
  });

  const handleAddListing = () => {
      const listing = {
          id: Math.random().toString(36).substr(2, 9),
          channel: newListing.channel,
          sku: newListing.sku,
          quantity: newListing.quantity,
          price: newListing.price,
          marketplaceId: newListing.marketplaceId || (newListing.type === 'draft' ? "Complete Draft Listing >" : "Listed"),
          selected: false
      };

      if (newListing.type === 'active') {
          updateListingStatus({ active: [...active, listing] });
      } else if (newListing.type === 'draft') {
          updateListingStatus({ drafts: [...drafts, { ...listing, selected: false }] });
      } else {
          updateListingStatus({ notListed: [...notListed, listing] });
      }
      setIsDrawerOpen(false);
  };

  const removeListing = (id: string, type: 'active' | 'draft' | 'notListed') => {
      if (type === 'active') {
          updateListingStatus({ active: active.filter(l => l.id !== id) });
      } else if (type === 'draft') {
          updateListingStatus({ drafts: drafts.filter(l => l.id !== id) });
      } else {
          updateListingStatus({ notListed: notListed.filter(l => l.id !== id) });
      }
  };

  const getChannelIcon = (name: string) => {
      switch(name.toLowerCase()) {
          case 'shopify': return "🛍️";
          case 'etsy': return "🎨";
          case 'walmart': return "🛒";
          case 'ebay': return "📦";
          default: return "🌐";
      }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-6">
      <div className="flex justify-end">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-all shadow-sm"
          >
              <PlusIcon className="w-4 h-4" />
              Add Listing Manually
          </button>
      </div>

      {/* Active Listings */}
      <section className="space-y-4">
        <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center gap-2">
            Active Listing
            <span className="text-sm text-gray-500 font-normal">({active.length})</span>
        </h3>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                        <th className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">Channel</th>
                        <th className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">SKU</th>
                        <th className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4 text-center">Quantity</th>
                        <th className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4 text-center">Price</th>
                        <th className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {active.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                            <td className="py-3 px-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{getChannelIcon(item.channel)}</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.channel}</span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-600 dark:text-gray-400">{item.sku}</td>
                            <td className="py-3 px-6 text-sm text-gray-600 dark:text-gray-400 text-center">{item.quantity}</td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900 dark:text-white text-center">{item.price}</td>
                            <td className="py-3 px-6 text-right">
                                <button onClick={() => removeListing(item.id, 'active')} className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                                    <TrashBinIcon className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {active.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-12 text-center text-gray-400 italic text-sm">No active listings added.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </section>

      {/* Drafts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center gap-2">
                Draft
                <span className="text-sm text-gray-500 font-normal">({drafts.length})</span>
            </h3>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Channel</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">SKU</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">Quantity</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">Price</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {drafts.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                            <td className="py-5 px-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{getChannelIcon(item.channel)}</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.channel}</span>
                                </div>
                            </td>
                            <td className="py-5 px-6 text-sm text-gray-600 dark:text-gray-400">{item.sku}</td>
                            <td className="py-5 px-6 text-sm text-gray-600 dark:text-gray-400 text-center">{item.quantity}</td>
                            <td className="py-5 px-6 text-sm font-medium text-gray-900 dark:text-white text-center">{item.price}</td>
                            <td className="py-5 px-6 text-right">
                                <button onClick={() => removeListing(item.id, 'draft')} className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                                    <TrashBinIcon className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {drafts.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-12 text-center text-gray-400 italic text-sm">No draft listings added.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </section>

      {/* Not Listed */}
      <section className="space-y-6">
        <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center gap-2">
            Not Listed
            <span className="text-sm text-gray-500 font-normal">({notListed.length})</span>
        </h3>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">Channel</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4">SKU</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4 text-center">Quantity</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4 text-center">Price</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 w-1/4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {notListed.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                            <td className="py-5 px-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{getChannelIcon(item.channel)}</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.channel}</span>
                                </div>
                            </td>
                            <td className="py-5 px-6 text-sm text-gray-500 italic">{item.sku}</td>
                            <td className="py-5 px-6 text-sm text-gray-500 text-center">{item.quantity}</td>
                            <td className="py-5 px-6 text-sm text-gray-500 text-center">{item.price}</td>
                            <td className="py-5 px-6 text-right">
                                <button onClick={() => removeListing(item.id, 'notListed')} className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                                    <TrashBinIcon className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {notListed.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-12 text-center text-gray-400 italic text-sm">No items in this category.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </section>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add Marketplace Listing"
        className="w-full md:!max-w-[50vw]"
        footer={
            <>
                <Button variant="outline" onClick={() => setIsDrawerOpen(false)} className="h-11 px-6 rounded-xl text-xs font-semibold">Cancel</Button>
                <Button onClick={handleAddListing} className="h-11 px-6 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 shadow-sm">Add Listing</Button>
            </>
        }
      >
        <div className="p-8 space-y-6">
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Channel</Label>
                <Select
                    value={newListing.channel}
                    options={[
                        { value: "Shopify", label: "Shopify" },
                        { value: "Etsy", label: "Etsy" },
                        { value: "Walmart", label: "Walmart" },
                        { value: "eBay", label: "eBay" }
                    ]}
                    onChange={(val) => setNewListing({ ...newListing, channel: val })}
                    className="h-11 rounded-xl"
                />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</Label>
                <Select
                    value={newListing.type}
                    options={[
                        { value: "active", label: "Active" },
                        { value: "draft", label: "Draft" },
                        { value: "notListed", label: "Not Listed" }
                    ]}
                    onChange={(val) => setNewListing({ ...newListing, type: val as any })}
                    className="h-11 rounded-xl"
                />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">SKU</Label>
                <Input
                    value={newListing.sku}
                    onChange={(e) => setNewListing({ ...newListing, sku: e.target.value })}
                    className="h-11 rounded-xl"
                />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <Input
                        type="number"
                        value={newListing.price}
                        onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                        className="h-11 pl-7 rounded-xl"
                    />
                </div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</Label>
                <Input
                    type="number"
                    value={newListing.quantity}
                    onChange={(e) => setNewListing({ ...newListing, quantity: e.target.value })}
                    className="h-11 rounded-xl"
                />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Marketplace ID</Label>
                <Input
                    placeholder="Auto-generated if blank"
                    value={newListing.marketplaceId}
                    onChange={(e) => setNewListing({ ...newListing, marketplaceId: e.target.value })}
                    className="h-11 rounded-xl"
                />
            </div>
        </div>
      </Drawer>
    </div>
  );
}
