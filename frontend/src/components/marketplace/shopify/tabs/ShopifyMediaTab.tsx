"use client";

import { useProductForm } from "@/context/ProductFormContext";
import { PlusIcon } from "@/icons";
import Image from "next/image";

export default function ShopifyMediaTab() {
  const { data } = useProductForm();

  // Mapping:
  // product.images -> data.media.images

  return (
    <div className="space-y-8 animate-fadeIn">
       <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Product Imagery</h3>
             <button className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-100 transition-colors">
                <PlusIcon className="w-3 h-3" />
                Upload New
             </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {data.media.images.map((img, index) => (
                 <div key={index} className="group relative aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-brand-500/50 transition-all overflow-hidden flex flex-col">
                     <div className="flex-1 relative w-full h-full">
                        <Image
                            src={img.url}
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-cover p-2 rounded-2xl"
                            unoptimized
                        />
                     </div>
                     <div className="absolute inset-x-0 bottom-0 p-2 bg-white/90 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform">
                         <input
                           type="text"
                           placeholder="Alt Text"
                           className="w-full text-[10px] font-medium bg-transparent border-none p-1 focus:ring-0 placeholder:text-gray-400"
                           defaultValue={index === 0 ? "Classic Cotton T-Shirt Black" : "Classic Cotton T-Shirt White"}
                         />
                     </div>
                 </div>
             ))}

             {/* Upload Placeholder */}
             <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-brand-500 hover:bg-brand-50/10 transition-all flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-brand-600">
                 <PlusIcon className="w-8 h-8 mb-2" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Add Media</span>
             </div>
          </div>
       </div>
    </div>
  );
}
