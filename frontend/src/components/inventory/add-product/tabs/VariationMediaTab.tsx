"use client";
import { useProductForm } from "@/context/ProductFormContext";
import { InfoIcon, PlusIcon, TrashBinIcon } from "@/icons";
import Image from "next/image";
import { useMemo, useState } from "react";
import { MediaUploadModal } from "./MediaUploadModal";

export default function VariationMediaTab() {
  const { data, updateVariants } = useProductForm();

  const variants = useMemo(() => data.variants?.variantItems || [], [data.variants?.variantItems]);
  const mainImages = useMemo(() => (data.media?.images || []).map(img => img.url), [data.media?.images]);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);

  const activeVariantId = selectedVariantId || (variants.length > 0 ? variants[0].id : null);
  const selectedVariant = variants.find(v => v.id === activeVariantId);
  const currentImagesCount = ((selectedVariant as any)?.images || []).length;

  const handleDragStart = (imageUrl: string) => {
    setDraggedImage(imageUrl);
  };

  const handleDrop = (e: React.DragEvent, variantId: string) => {
    e.preventDefault();
    if (!draggedImage) return;

    const updatedVariants = variants.map(v => {
      if (v.id === variantId) {
        const images = (v as any).images || [];
        if (images.length >= 15) return v;
        if (!images.includes(draggedImage)) {
          return { ...v, images: [...images, draggedImage] };
        }
      }
      return v;
    });

    updateVariants({ variantItems: updatedVariants });
    setDraggedImage(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleModalUpload = (assets: string[]) => {
    if (!activeVariantId) return;

    updateVariants({
      variantItems: variants.map(v => {
        if (v.id === activeVariantId) {
          const images = (v as any).images || [];
          return { ...v, images: [...images, ...assets] };
        }
        return v;
      })
    });
  };

  const handleRemoveVariantImage = (variantId: string, imageUrl: string) => {
    updateVariants({
      variantItems: variants.map(v => {
        if (v.id === variantId) {
          return { ...v, images: ((v as any).images || []).filter((img: string) => img !== imageUrl) };
        }
        return v;
      })
    });
  };

  if (variants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gray-50/50 dark:bg-gray-800/10 border border-gray-100 dark:border-gray-800 rounded-2xl text-center">
        <InfoIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">No Variants Available</h3>
        <p className="text-xs text-gray-500 mt-1 max-w-[240px]">Go to the Variations tab to create product variants first.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn h-full">
      {/* Action Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Variation Specific Media
            <span className="text-[10px] font-bold bg-[#C6F432]/20 text-[#C6F432] px-2 py-0.5 rounded uppercase tracking-wider">PRO Sync</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Manage unique images for each product variation efficiently.</p>
        </div>
      </div>

      <div className="grid grid-cols-[300px_1fr] gap-0 bg-white dark:bg-[#1a1b1e] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Sidebar */}
        <div className="border-r border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/40 flex flex-col">
          {/* Main Gallery Source Tray */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
             <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Gallery</span>
                <span className="text-[10px] font-bold text-[#C6F432]">{mainImages.length} URLS</span>
             </div>
             <div className="flex gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-x-auto custom-scrollbar group">
                {mainImages.length === 0 ? (
                  <div className="w-full text-center py-2 text-[10px] text-gray-400">No images</div>
                ) : (
                  mainImages.map((img, idx) => (
                    <div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(img)}
                      className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-600 cursor-grab active:cursor-grabbing hover:border-[#C6F432] transition-colors shadow-sm"
                    >
                      <Image src={img} alt="" width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                  ))
                )}
             </div>
             <p className="text-[9px] text-gray-400 mt-2 text-center uppercase font-bold tracking-tighter">Drag images from tray to variants below</p>
          </div>

          {/* Variant Selector List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            <div className="px-2 mb-2">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">All Variations</span>
            </div>
            {variants.map((v) => {
              const count = ((v as any).images || []).length;
              const isActive = activeVariantId === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  onDrop={(e) => handleDrop(e, v.id)}
                  onDragOver={handleDragOver}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all group ${
                    isActive
                      ? "bg-[#C6F432] text-gray-900 shadow-sm scale-[1.02]"
                      : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                  }`}
                >
                  <div className="flex flex-col items-start min-w-0 pr-2">
                    <span className="text-xs font-bold truncate w-full tracking-tight">{v.title}</span>
                    <span className={`text-[9px] font-medium ${isActive ? "text-gray-800" : "text-gray-500"}`}>
                      SKU: {v.sku || 'PENDING'}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 text-[10px] font-bold px-2.py-0.5 rounded-full ${
                    isActive ? "bg-black/10" : "bg-gray-100 dark:bg-gray-700"
                  }`}>
                    {count}/15
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col bg-white dark:bg-[#1a1b1e]">
          {selectedVariant ? (
            <div className="p-8 space-y-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{selectedVariant.title}</h3>
                   <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                         <span className="w-1.5 h-1.5 bg-[#C6F432] rounded-full"></span>
                         15 MAX IMAGES
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                         <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                         VAR-SYNC ACTIVE
                      </div>
                   </div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("Format this variant's media gallery?")) {
                       updateVariants({ variantItems: variants.map(v => v.id === activeVariantId ? { ...v, images: [] } : v) });
                    }
                  }}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-500/10 hover:bg-red-500/5 rounded-lg transition-all"
                >
                  Reset Gallery
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-6 flex-1 items-start content-start overflow-y-auto custom-scrollbar pr-2">
                {/* Upload Action */}
                {((selectedVariant as any).images || []).length < 15 && (
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="aspect-square bg-gray-50/50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#C6F432] hover:bg-[#C6F432]/5 transition-all group scale-100 hover:scale-[1.02] active:scale-95 shadow-inner"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 group-hover:text-[#C6F432] transition-colors">
                      <PlusIcon className="w-6 h-6" />
                    </div>
                    <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#C6F432]">Sync Assets</span>
                  </button>
                )}

                {/* Variant Images List */}
                {((selectedVariant as any).images || []).map((img : any, idx: number) => (
                  <div key={idx} className="aspect-square relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <Image src={img} alt="Variant" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                      <button
                        onClick={() => handleRemoveVariantImage(selectedVariant.id, img)}
                        className="w-10 h-10 bg-white/10 hover:bg-red-500 text-white rounded-xl transition-all flex items-center justify-center backdrop-blur-md"
                      >
                        <TrashBinIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/40 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                      #{idx + 1}
                    </div>
                  </div>
                ))}

                {/* Placeholder Grid Items */}
                {Array.from({ length: Math.max(0, 4 - ((selectedVariant as any).images || []).length) }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square border border-gray-100 dark:border-gray-800 rounded-2xl opacity-10 flex items-center justify-center">
                        <PlusIcon className="w-8 h-8 text-gray-300" />
                    </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center text-gray-400">
               <InfoIcon className="w-10 h-10 mb-4 opacity-20" />
               <p className="text-xs font-bold uppercase tracking-widest">Select a variant to begin</p>
            </div>
          )}
        </div>
      </div>

      <MediaUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleModalUpload}
        maxCount={15}
        currentCount={currentImagesCount}
        title={`Sync: ${selectedVariant?.title || 'Variant'}`}
      />
    </div>
  );
}
