"use client";

import { useProductForm } from "@/context/ProductFormContext";
import { InfoIcon } from "@/icons";

export default function ShopifyBasicTab() {
  const { data, updateBasicInfo, updateDescription } = useProductForm();

  // Helper to update specific fields for Shopify payload mapping
  // We'll map:
  // Title -> basicInfo.title
  // Body -> description.mainDescription
  // Vendor -> basicInfo.manufacturer (or brand)
  // Product Type -> basicInfo.category
  // Handle -> basicInfo.productIdentifierValue (reused slot for slug/handle)
  // Tags -> (Not direct in basicInfo, we might need to use a custom field or attributes, sticking to data.attributes or description features for now?
  // actually let's use data.marketplace.channels[0].tags if possible or add to basicInfo via "any" casting if context is strict,
  // but context is ProductFormData. Let's use basicInfo extensions/hack for now or just standard fields)

  // Actually, for this specific Shopify form, I'll assumme we update the Context which will later be transformed to the Payload.

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Description Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-50 pb-4">General Listing Details</h3>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Title</label>
            <input
              type="text"
              value={data.basicInfo.title}
              onChange={(e) => updateBasicInfo("title", e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-gray-300"
              placeholder="e.g. Classic Cotton T-Shirt"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Description (HTML)</label>
            <div className="relative">
                <textarea
                value={data.description.mainDescription}
                onChange={(e) => updateDescription("mainDescription", e.target.value)}
                rows={6}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-mono text-gray-600 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-gray-300 resize-y"
                placeholder="<h3>Product Title</h3><p>Description...</p>"
                />
                 <div className="absolute top-2 right-2 px-2 py-1 bg-gray-200 rounded text-[9px] font-bold text-gray-500 uppercase">HTML Mode</div>
            </div>
            <p className="text-[10px] text-gray-400">Standard HTML tags are supported for rich text formatting on Shopify.</p>
          </div>
        </div>
      </div>

      {/* Organization Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-50 pb-4">
             <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Organization</h3>
             <div className="group relative">
                <InfoIcon className="w-4 h-4 text-gray-300 hover:text-brand-500 cursor-pointer transition-colors" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-48 p-3 bg-gray-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Defines how this product is categorized on your store.
                </div>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Vendor</label>
            <input
              type="text"
              value={data.basicInfo.brand} // Mapping Brand -> Vendor
              onChange={(e) => updateBasicInfo("brand", e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
              placeholder="e.g. Central Inventory Brand"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Product Type</label>
            <input
              type="text"
              value={data.basicInfo.category} // Mapping Category -> Product Type
              onChange={(e) => updateBasicInfo("category", e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
              placeholder="e.g. Apparel > T-Shirt"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</label>
            <select
               // We might need a specific field for status in Shopify context, using local state or extending payload logic later.
               // For now, let's assume active/draft is stored in listingStatus temporarily or just utilize a generic field?
               // Let's assume we use 'condition' slot for now just to hold the value or better, create a local state in the form?
               // Actually Component is stateless regarding data structure extensions.
               // I'll bind it to `data.listingStatus.active.length > 0 ? 'active' : 'draft'` conceptually,
               // but for editing, we might want a direct field.
               // Let's Map: manufacturedState -> Status (Hack for demo) OR handle it in the main form submit.
               // Better: basicInfo.manufacturedState
               value={data.basicInfo.manufacturedState || "active"}
               onChange={(e) => updateBasicInfo("manufacturedState", e.target.value)}
               className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-2">
             <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Tags</label>
             <input
              type="text"
              // Mapping: Attribute-like feature? Or just comma sep string in `features` or `manufacturedCity` (Hack).
              // Let's use `manufacturedCity` for Tags storage in this demo mapping.
              value={data.basicInfo.manufacturedCity}
              onChange={(e) => updateBasicInfo("manufacturedCity", e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
              placeholder="comma, separated, tags"
            />
            <p className="text-[10px] text-gray-400">Separate tags with commas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
