"use client";

import { useProductForm } from "@/context/ProductFormContext";

export default function ShopifySeoTab() {
  const { data } = useProductForm();

  // Mapping:
  // SEO Title -> We don't have a direct slot. using data.basicInfo.title as fallback or create a new local state if we were editing a real form.
  // SEO Description -> data.description.shortDescription (Mapping Slot)

  return (
    <div className="space-y-8 animate-fadeIn">
       <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
           <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-50 pb-4">Search Engine Optimization</h3>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Page Title</label>
                    <input
                        type="text"
                        defaultValue={data.basicInfo.title ? `${data.basicInfo.title} | Premium Quality` : ""}
                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-gray-300"
                    />
                    <p className="text-[10px] text-gray-400">0 of 70 characters used</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Meta Description</label>
                     <textarea
                        defaultValue="Buy premium classic cotton t-shirts. Comfortable, breathable and perfect for everyday wear."
                        rows={4}
                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-gray-300 resize-none"
                    />
                    <p className="text-[10px] text-gray-400">0 of 320 characters used</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">URL Handle</label>
                    <div className="flex items-center">
                        <span className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-xs font-mono text-gray-500">
                            https://store.com/products/
                        </span>
                        <input
                            type="text"
                            defaultValue="classic-cotton-tshirt"
                            className="flex-1 p-3 bg-white border border-gray-200 rounded-r-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                        />
                    </div>
                  </div>
               </div>

               {/* Preview */}
               <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Search Engine Preview</h4>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-800 mb-1 truncate">https://store.com/products/classic-cotton-tshirt</p>
                        <h4 className="text-lg text-[#1a0dab] font-medium hover:underline cursor-pointer truncate mb-1">
                            {data.basicInfo.title ? `${data.basicInfo.title} | Premium Quality` : "Page Title"}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                            Buy premium classic cotton t-shirts. Comfortable, breathable and perfect for everyday wear.
                        </p>
                    </div>
               </div>
           </div>
       </div>
    </div>
  );
}
