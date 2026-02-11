"use client";

import { Modal } from "@/components/ui/modal";
import { InfoIcon, PlusIcon, TrashBinIcon } from "@/icons";
import { useEffect, useState } from "react";

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (assets: string[]) => void;
  maxCount: number;
  currentCount: number;
  title?: string;
}

export function MediaUploadModal({
  isOpen,
  onClose,
  onUpload,
  maxCount,
  currentCount,
  title = "Media Integration",
}: MediaUploadModalProps) {
  const [urlInputs, setUrlInputs] = useState<string[]>([""]);
  const remainingSlots = maxCount - currentCount;

  // Reset inputs when opening
  useEffect(() => {
    if (isOpen) {
      setUrlInputs([""]);
    }
  }, [isOpen]);

  const handleAddUrlInput = () => {
    if (urlInputs.length < remainingSlots) {
      setUrlInputs([...urlInputs, ""]);
    }
  };

  const handleUrlInputChange = (index: number, value: string) => {
    const newInputs = [...urlInputs];
    newInputs[index] = value;
    setUrlInputs(newInputs);
  };

  const handleLocalUpload = (files: FileList | null) => {
    if (!files) return;

    if (files.length > remainingSlots) {
      alert(`Limit exceeded. You can only add ${remainingSlots} more assets.`);
      return;
    }

    const newAssets: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        newAssets.push(url);
        processed++;
        if (processed === files.length) {
          onUpload(newAssets);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSyncUrls = () => {
    const validUrls = urlInputs.filter((url) => url.trim() !== "");
    if (validUrls.length === 0) return;

    onUpload(validUrls);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-[#121417] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5"
    >
      <div className="relative">
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C6F432] to-transparent opacity-50"></div>

        <div className="p-10 space-y-10">
          {/* Headline */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                {title}
                <span className="text-[10px] font-bold bg-[#C6F432] text-gray-900 px-2 py-0.5 rounded-full tracking-wider">SYNC</span>
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">Multi-Source Asset Sync</p>
            </div>
            <div className="flex flex-col items-end">
               <div className="text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-2xl border border-gray-100 dark:border-white/5 shadow-inner">
                  {currentCount} <span className="text-gray-400">/ {maxCount}</span>
               </div>
               <span className="text-[10px] font-semibold text-[#C6F432] uppercase tracking-wider mt-2">{remainingSlots} Slots Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-start">
            {/* Left: Local Upload */}
            <div className="space-y-4 group">
               <div className="flex items-center gap-2 pl-1">
                  <div className="w-1.5 h-1.5 bg-[#C6F432] rounded-full"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Local Files</span>
               </div>
               <label className="relative flex flex-col items-center justify-center h-[280px] bg-gray-50/50 dark:bg-white/[0.02] border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[2rem] hover:border-[#C6F432] hover:bg-[#C6F432]/5 transition-all cursor-pointer overflow-hidden shadow-inner font-outfit">
                  <div className="z-10 text-center p-8 space-y-4">
                    <div className="w-20 h-20 bg-white dark:bg-[#1a1c20] rounded-[1.5rem] shadow-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-300 group-hover:text-[#C6F432] group-hover:scale-110 mx-auto transition-all duration-500">
                      <PlusIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white tracking-wide mb-1">Upload Assets</p>
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Limit 5MB per chunk • JPG, PNG, WEBP</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLocalUpload(e.target.files)}
                  />
                  {/* Background Blur Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C6F432]/0 to-[#C6F432]/0 group-hover:from-[#C6F432]/5 group-hover:to-transparent transition-all"></div>
               </label>
            </div>

            {/* Right: URL Sync */}
            <div className="space-y-4 flex flex-col h-full">
              <div className="flex items-center justify-between pl-1 pr-2">
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C6F432] rounded-full"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Sync</span>
                 </div>
                 <button
                  onClick={handleAddUrlInput}
                  disabled={urlInputs.length >= remainingSlots}
                  className="text-[10px] font-bold text-[#C6F432] hover:text-white hover:bg-[#C6F432] border border-[#C6F432] px-3 py-1 rounded-lg transition-all disabled:opacity-30 uppercase tracking-tight"
                 >
                  + Add Source
                 </button>
              </div>

              <div className="flex-1 space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-3">
                {urlInputs.map((url, index) => (
                  <div key={index} className="flex gap-2 group/input">
                    <div className="relative flex-1">
                      <input
                        placeholder="Paste cloud asset link..."
                        value={url}
                        onChange={(e) => handleUrlInputChange(index, e.target.value)}
                        className="w-full h-11 pl-4 pr-4 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#C6F432] focus:ring-4 focus:ring-[#C6F432]/5 shadow-inner transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-outfit"
                      />
                    </div>
                    {urlInputs.length > 1 && (
                      <button
                        onClick={() => {
                          const newInputs = urlInputs.filter((_, i) => i !== index);
                          setUrlInputs(newInputs.length ? newInputs : [""]);
                        }}
                        className="w-11 h-11 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                      >
                        <TrashBinIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-auto">
                 <div className="bg-[#C6F432]/5 rounded-2xl p-4 border border-[#C6F432]/10 flex items-start gap-3">
                    <InfoIcon className="w-4 h-4 text-[#C6F432] mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 leading-normal uppercase tracking-wide">
                      Assets are fetched through our secure proxy to ensure cross-origin compatibility and optimized delivery.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-10 border-t border-gray-100 dark:border-white/5">
            <button
              onClick={onClose}
              className="px-10 py-4 bg-gray-100 dark:bg-white/5 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 rounded-2xl text-xs font-bold uppercase tracking-[2px] transition-all active:scale-95"
            >
              Discard
            </button>
            <button
              onClick={handleSyncUrls}
              disabled={urlInputs.every(u => !u.trim())}
              className="flex-1 py-4 bg-[#C6F432] text-gray-900 rounded-2xl text-xs font-bold uppercase tracking-[3px] hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(198,244,50,0.3)] transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
            >
              Confirm Sync
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
