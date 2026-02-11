"use client";

import { useProductForm } from "@/context/ProductFormContext";
import { InfoIcon, PlusIcon, TrashBinIcon, VideoIcon } from "@/icons";
import Image from "next/image";
import { useState } from "react";
import { MediaUploadModal } from "./MediaUploadModal";
import VariationMediaTab from "./VariationMediaTab";

export default function ImagesTab() {
  const { data, updateMedia } = useProductForm();
  const { images, videos } = data.media;
  const [activeSubTab, setActiveSubTab] = useState<"main" | "variants">("main");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Reset to 'main' subtab if variants are cleared
  if ((!data.variants?.variantItems || data.variants.variantItems.length === 0) && activeSubTab === 'variants') {
     setActiveSubTab('main');
  }

  const handleUpload = (assets: string[]) => {
    const newImages = assets.map((url, index) => ({
      id: Math.random().toString(36).substr(2, 9),
      url,
      type: "url" as const,
      order: images.length + index,
    }));

    updateMedia({ images: [...images, ...newImages] });
  };

  const removeImage = (id: string) => {
    const filtered = images.filter((img) => img.id !== id);
    const reordered = filtered.map((img, idx) => ({ ...img, order: idx }));
    updateMedia({ images: reordered });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
      const newImages = [...images];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < newImages.length) {
          const temp = newImages[index];
          newImages[index] = newImages[targetIndex];
          newImages[targetIndex] = temp;

          const final = newImages.map((img, idx) => ({ ...img, order: idx }));
          updateMedia({ images: final });
      }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn pb-6 h-full">
      {/* Dynamic Header & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Product Media Gallery
            <span className="text-[10px] font-bold bg-[#C6F432]/20 text-[#C6F432] px-2 py-0.5 rounded uppercase tracking-wider">Storage Sync</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Manage master portfolio and variant-specific media assets.</p>
        </div>

        <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <button
                    onClick={() => setActiveSubTab("main")}
                    className={`px-6 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeSubTab === "main"
                        ? "bg-[#C6F432] text-gray-900 shadow-sm scale-[1.05]"
                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                >
                    Main Portfolio
                </button>
                {data.variants?.variantItems && data.variants.variantItems.length > 0 && (
                    <button
                        onClick={() => setActiveSubTab("variants")}
                        className={`px-6 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                        activeSubTab === "variants"
                            ? "bg-[#C6F432] text-gray-900 shadow-sm scale-[1.05]"
                            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    >
                        Variant Specific
                    </button>
                )}
            </div>

            {activeSubTab === "main" && (
                <button
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete all main images?")) {
                            updateMedia({ images: [] });
                        }
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 px-4 py-2.5 rounded-xl transition-all border border-red-500/10 hover:bg-red-500/5 active:scale-95"
                >
                    Clear Master
                </button>
            )}
        </div>
      </div>

      <div className="flex-1 min-h-0">
      {activeSubTab === "variants" ? (
        <VariationMediaTab />
      ) : (
        <div className="space-y-8 h-full flex flex-col">
          <section className="bg-white dark:bg-[#1a1b1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center gap-3">
                 <h3 className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-[1.5px]">Master Portfolio Images</h3>
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {images.length}/15 TOTAL
                 </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 italic">
                 <InfoIcon className="w-3.5 h-3.5" />
                 Drag images to reorder priorities
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 overflow-y-auto custom-scrollbar pr-2 pb-4">
              {images.length < 15 && (
                <div
                  onClick={() => setIsUploadModalOpen(true)}
                  className="aspect-square bg-gray-50/50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center group hover:border-[#C6F432] hover:bg-[#C6F432]/5 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#C6F432] mb-3 transition-colors shadow-sm">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-[#C6F432] transition-colors">
                    Add Media
                  </span>
                </div>
              )}

              {images.sort((a, b) => a.order - b.order).map((img, idx) => (
                <div key={img.id} className="aspect-square relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all">
                  <Image
                    src={img.url}
                    alt="Product"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button
                      onClick={() => moveImage(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-xl transition-all disabled:opacity-20 backdrop-blur-md"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button
                      onClick={() => moveImage(idx, 'down')}
                      disabled={idx === images.length - 1}
                      className="p-2 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-xl transition-all disabled:opacity-20 backdrop-blur-md"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-2 bg-white/10 hover:bg-red-500 text-white rounded-xl transition-all backdrop-blur-md"
                    >
                      <TrashBinIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/40 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                    {idx === 0 ? "PRIMARY" : `#${idx + 1}`}
                  </div>
                </div>
              ))}

              {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-gray-50/20 dark:bg-gray-800/5 border border-gray-50 dark:border-gray-800/50 rounded-2xl flex items-center justify-center">
                    <PlusIcon className="w-8 h-8 text-gray-100 dark:text-gray-800/50" />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-[#1a1b1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-[1.5px]">
                Active Motion Assets
              </h3>
              <div className="text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-md">OPTIONAL</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">Video Stream URL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#C6F432] transition-colors">
                    <VideoIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Youtube, Vimeo, or Direct URL..."
                    className="w-full pl-12 pr-4 h-12 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-bold focus:outline-none focus:border-[#C6F432] focus:ring-4 focus:ring-[#C6F432]/5 shadow-inner"
                    value={videos[0]?.url || ""}
                    onChange={(e) => updateMedia({ videos: [{ url: e.target.value, type: 'url' }] })}
                  />
                </div>
                <p className="text-[9px] text-gray-400 font-bold tracking-wide pl-1">Sync will automatically fetch metadata.</p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">Local Asset Upload</label>
                <div className="h-12 bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-[#C6F432] hover:bg-[#C6F432]/5 rounded-2xl px-6 flex items-center justify-between gap-4 transition-all cursor-pointer group shadow-inner">
                  <div className="flex items-center gap-3">
                     <PlusIcon className="w-5 h-5 text-gray-400 group-hover:text-[#C6F432]" />
                     <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Select Video File</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 px-3 py-1 rounded-full group-hover:bg-[#C6F432] group-hover:text-gray-900 transition-all">MAX 50MB</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      </div>

      <MediaUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        maxCount={15}
        currentCount={images.length}
        title="Master Media Sync"
      />
    </div>
  );
}
