"use client";
import { useProductForm } from "@/context/ProductFormContext";
import { VideoIcon } from "@/icons";
import { listingService } from "@/services/listingService";
import { productService } from "@/services/productService";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

import ShopifyBasicTab from "@/components/marketplace/shopify/tabs/ShopifyBasicTab";
import ShopifyMediaTab from "@/components/marketplace/shopify/tabs/ShopifyMediaTab";
import ShopifyMetafieldsTab from "@/components/marketplace/shopify/tabs/ShopifyMetafieldsTab";
import ShopifySeoTab from "@/components/marketplace/shopify/tabs/ShopifySeoTab";
import ShopifyVariantsTab from "@/components/marketplace/shopify/tabs/ShopifyVariantsTab";

interface EbayEditFormProps {
  id?: string;
  mode?: "page" | "drawer";
  onClose?: () => void;
  isMarketplaceEdit?: boolean;
}

function EbayEditFormContent({ id, mode = "page", onClose, isMarketplaceEdit = false }: EbayEditFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "basic";

  const [activeTab, setActiveTabState] = useState(initialTab);
  const { data, isDirty, setIsDirty, resetForm } = useProductForm();
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setTimeout(() => {
        setActiveTabState(tab);
      }, 0);
    }
  }, [searchParams, activeTab]);

  const setActiveTab = (tabId: string) => {
    setActiveTabState(tabId);
    if (mode === "page") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tabId);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  const tabs = [
    { id: "basic", label: "eBay Details" },
    { id: "variants", label: "Price & Inventory" },
    { id: "images", label: "Gallery" },
    { id: "metafields", label: "Item Specifics" },
    { id: "seo", label: "SEO & Compatibility" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "basic": return <ShopifyBasicTab />;
      case "variants": return <ShopifyVariantsTab />;
      case "images": return <ShopifyMediaTab />;
      case "metafields": return <ShopifyMetafieldsTab />;
      case "seo": return <ShopifySeoTab />;
      default: return <ShopifyBasicTab />;
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.findIndex(curr => curr.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    } else {
      handleSave();
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (status: string = "Draft") => {
    setIsSaving(true);
    try {
      const payload = {
        ...data,
        listingStatus: { ...data.listingStatus, status }
      };

      let response;
      if (isMarketplaceEdit && id) {
        response = await listingService.updateListing(id, {
          mapped_attributes: payload,
          status: status.toLowerCase() as any
        });
      } else {
        response = id
          ? await productService.update(id, payload)
          : await productService.create(payload);
      }

      if (response.success) {
        toast.success("eBay Handshake updated successfully");
        setIsDirty(false);
        router.push("/marketplace");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to update eBay listing");
    } finally {
      setIsSaving(false);
    }
  };

  const calculateCompletion = () => {
    const fields = [
      data.basicInfo.title,
      data.basicInfo.sku,
      data.basicInfo.category,
      data.basicInfo.condition,
      data.basicInfo.brand,
      data.basicInfo.retailPrice,
      data.description.mainDescription,
      data.description.features.filter(f => !!f).length > 0,
      (data.inventory.stocks[0]?.available ?? 0) > 0,
      data.pricing.sellingPrice,
      data.media.images.length > 0,
    ];

    const filled = fields.filter(f => {
      if (typeof f === 'boolean') return f;
      if (typeof f === 'number') return f > 0;
      return !!f;
    }).length;

    const total = fields.length;
    return {
      percentage: Math.round((filled / total) * 100),
      filled,
      total
    };
  };

  const { percentage: completion, filled: filledFields, total: totalFields } = calculateCompletion();

  return (
    <div className={`flex flex-col ${mode === 'drawer' ? 'min-h-[500px]' : 'lg:flex-row gap-5 h-[calc(100vh-10rem)]'}`}>

      {/* LEFT SIDEBAR: Product Details Summary - Hidden in Drawer Mode */}
      {mode !== 'drawer' && (
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 h-full relative overflow-hidden shadow-sm">
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#0064D2] rounded-r-full"></div>

            <h3 className="text-sm font-medium text-gray-900 mb-8 pl-4">eBay Product</h3>

            <div className="flex justify-center mb-10 group">
              <div className="w-40 h-40 bg-gray-50 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex items-center justify-center text-gray-200 group-hover:border-[#0064D2]/30 group-hover:text-[#0064D2] transition-all cursor-pointer relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0064D2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <VideoIcon className="w-10 h-10 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="space-y-8 pl-4">
              <div>
                <label className="text-xs text-gray-500 block mb-2">SKU</label>
                <p className="text-sm font-medium text-gray-900 font-mono truncate" title={data.basicInfo.sku || "--"}>
                  {data.basicInfo.sku || "Unassigned"}
                </p>
              </div>
              <div className="border-t border-gray-50 pt-5">
                <label className="text-xs text-gray-500 block mb-2">Category</label>
                <p className="text-sm text-gray-700 truncate" title={data.basicInfo.category || "--"}>
                  {data.basicInfo.category || "--"}
                </p>
              </div>
              <div className="border-t border-gray-50 pt-5">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Completeness</label>
                  <span className={`text-xs font-bold ${completion > 70 ? 'text-emerald-500' : completion > 40 ? 'text-orange-500' : 'text-red-500'}`}>
                    {completion}%
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-gray-400 font-medium italic">
                    {filledFields} of {totalFields} fields filled
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${completion > 70 ? 'bg-emerald-500' : completion > 40 ? 'bg-orange-500' : 'bg-[#0064D2]'}`}
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
              <div className="border-t border-gray-50 pt-5">
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-2 h-2 rounded-full bg-[#0064D2]"></div>
                  <p className="text-[10px] font-bold text-blue-700">eBay Connected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`flex-1 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm relative`}>
        <div className={`sticky top-0 z-30 flex overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 sm:px-6 pt-2`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 relative group flex-shrink-0 ${activeTab === tab.id
                ? "border-[#E53238] text-[#E53238]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800"
                }`}
            >
              {tab.label}
              {activeTab !== tab.id && (
                <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        <div className="px-6 py-2 bg-blue-50/50 border-b border-blue-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-[9px] font-bold text-blue-700 uppercase tracking-widest">
            eBay Hub Optimization Mode
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
          {renderContent()}
        </div>

        <div className="sticky bottom-0 z-20 shadow-lg border-t px-6 py-4 bg-white flex justify-between items-center">
          <button onClick={() => router.push("/marketplace")} className="px-6 py-3 border border-gray-200 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:border-red-200 hover:text-red-500 transition-all">
            Discard
          </button>
          <div className="flex gap-4">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-[#0064D2] transition-all"
            >
              {activeTab === tabs[tabs.length - 1].id ? "Review" : "Next Step"}
            </button>
            <button
              onClick={() => handleSave()}
              disabled={isSaving}
              className="px-8 py-3 bg-[#0064D2] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0050AA] transition-all shadow-md flex items-center gap-2 shadow-blue-500/20"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Syncing...
                </>
              ) : "Publish to eBay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EbayEditForm(props: EbayEditFormProps) {
  return (
    <Suspense fallback={<div>Loading eBay Panel...</div>}>
      <EbayEditFormContent {...props} />
    </Suspense>
  );
}
