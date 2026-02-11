"use client";
import { Modal } from "@/components/ui/modal";
import { useProductForm } from "@/context/ProductFormContext";
import {
  VideoIcon
} from "@/icons";
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

interface ShopifyEditFormProps {
  id?: string;
  mode?: "page" | "drawer";
  onClose?: () => void;
  isMarketplaceEdit?: boolean;
}

function ShopifyEditFormContent({ id, mode = "page", onClose, isMarketplaceEdit = false }: ShopifyEditFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "basic";

  const [activeTab, setActiveTabState] = useState(initialTab);
  const { data, isDirty, setIsDirty, resetForm } = useProductForm();
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setTimeout(() => {
        setActiveTabState(tab);
      }, 0);
    }
  }, [searchParams, activeTab]);

  // Navigation Guard: Handle browser back/forward and refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (isDirty) {
        // Stop navigation
        window.history.pushState(null, "", window.location.href);
        setIsConfirmCloseOpen(true);
      }
    };

    if (isDirty) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty]);

  // Handle internal Link navigation intercept
  useEffect(() => {
    const handleInternalClick = (e: MouseEvent) => {
      if (!isDirty) return;

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
          // If it's a link to another page, intercept
          const currentPath = window.location.pathname;
          if (href !== currentPath && href !== currentPath + searchParams.toString()) {
            e.preventDefault();
            setPendingUrl(href);
            setIsConfirmCloseOpen(true);
          }
        }
      }
    };

    document.addEventListener("click", handleInternalClick, true);
    return () => document.removeEventListener("click", handleInternalClick, true);
  }, [isDirty, searchParams]);

  const setActiveTab = (tabId: string) => {
    setActiveTabState(tabId);
    if (mode === "page") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tabId);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  const tabs = [
    { id: "basic", label: "General" },
    { id: "variants", label: "Variants & Pricing" },
    { id: "images", label: "Media" },
    { id: "metafields", label: "Metafields" },
    { id: "seo", label: "SEO" },
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

  const handleClose = () => {
    if (isDirty) {
      setIsConfirmCloseOpen(true);
    } else {
      if (mode === "drawer" && onClose) {
        onClose();
      } else {
        router.push(isMarketplaceEdit ? "/marketplace" : "/inventory");
      }
    }
  };

  const confirmClose = () => {
    setIsDirty(false);
    resetForm();
    setIsConfirmCloseOpen(false);
    if (mode === "drawer" && onClose) {
      onClose();
    } else {
      router.push(isMarketplaceEdit ? "/marketplace" : "/inventory");
    }
  };

  const calculateCompletion = () => {
    // Collect all unique fields across all tabs
    const fields = [
      // Basic Info
      data.basicInfo.title,
      data.basicInfo.sku,
      data.basicInfo.category,
      data.basicInfo.condition,
      data.basicInfo.brand,
      data.basicInfo.manufacturer,
      data.basicInfo.msrp,
      data.basicInfo.purchasePrice,
      data.basicInfo.retailPrice,
      data.basicInfo.dimensionLength,
      data.basicInfo.dimensionWidth,
      data.basicInfo.dimensionHeight,
      data.basicInfo.weightValue,
      data.basicInfo.manufacturedCountry,

      // Description
      data.description.shortDescription,
      data.description.mainDescription,
      data.description.features.filter(f => !!f).length > 0,

      // Inventory
      (data.inventory.stocks[0]?.available ?? 0) > 0,

      // Pricing
      data.pricing.costPrice,
      data.pricing.sellingPrice,

      // Media
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

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (status: string = "Draft") => {
    setIsSaving(true);
    try {
      // Create a shallow copy to update status if needed
      const payload = {
        ...data,
        listingStatus: { ...data.listingStatus, status }
      };

      let response;
      if (isMarketplaceEdit && id) {
        // For marketplace edits, we update the listing specifically
        response = await listingService.updateListing(id, {
          mapped_attributes: payload,
          status: status.toLowerCase() as any
        });
      } else {
        // Standard central product update
        response = id
          ? await productService.update(id, payload)
          : await productService.create(payload);
      }

      if (response.success) {
        toast.success(isMarketplaceEdit ? "Handshake updated successfully" : "Product saved successfully");
        setIsDirty(false);
        if (pendingUrl) {
          router.push(pendingUrl);
        } else if (mode === "drawer" && onClose) {
          onClose();
          window.location.reload();
        } else {
          router.push(isMarketplaceEdit ? "/marketplace" : "/inventory");
        }
      } else {
        console.error("Failed to save product:", response.error);
        alert(`Failed to save product: ${response.error}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An unexpected error occurred while saving the product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = () => {
    setIsConfirmCloseOpen(false);
    handleSave("Draft");
  };

  const handleDiscard = () => {
    setIsDirty(false);
    resetForm();
    setIsConfirmCloseOpen(false);
    if (pendingUrl) {
      router.push(pendingUrl);
    } else if (mode === "drawer" && onClose) {
      onClose();
    } else {
      router.push(isMarketplaceEdit ? "/marketplace" : "/inventory");
    }
  };

  return (
    <div className={`flex flex-col ${mode === 'drawer' ? 'min-h-[500px]' : 'lg:flex-row gap-5 h-[calc(100vh-10rem)]'}`}>

      {/* LEFT SIDEBAR: Product Details Summary - Hidden in Drawer Mode */}
      {mode !== 'drawer' && (
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 h-full relative overflow-hidden shadow-sm">
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-brand-500 rounded-r-full"></div>

            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-8 pl-4">Shopify Product</h3>

            <div className="flex justify-center mb-10 group">
              <div className="w-40 h-40 bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-100 dark:border-gray-700/50 rounded-[2.5rem] flex items-center justify-center text-gray-200 dark:text-gray-700 group-hover:border-brand-500/30 group-hover:text-brand-500 transition-all cursor-pointer relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <VideoIcon className="w-10 h-10 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="space-y-8 pl-4">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-2">SKU</label>
                <p className="text-sm font-medium text-gray-900 dark:text-white font-mono truncate" title={data.basicInfo.sku || "--"}>
                  {data.basicInfo.sku || "Unassigned"}
                </p>
              </div>
              <div className="border-t border-gray-50 dark:border-gray-800/50 pt-5">
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-2">Category</label>
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate" title={data.basicInfo.category || "--"}>
                  {data.basicInfo.category || "--"}
                </p>
              </div>
              <div className="border-t border-gray-50 dark:border-gray-800/50 pt-5">
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-2">Connected Marketplaces</label>
                <div className="space-y-2">
                  {data.listingStatus.active.length > 0 ? (
                    data.listingStatus.active.map((channel, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-100 dark:border-gray-800">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{channel.channel}</p>
                          <p className="text-[9px] text-gray-400 dark:text-gray-500">Synced</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-100 dark:border-gray-800 opacity-50">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <p className="text-[10px] font-medium text-gray-500">No active connections</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-50 dark:border-gray-800/50 pt-5">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Completeness</label>
                  <span className={`text-xs font-bold ${completion > 70 ? 'text-emerald-500' : completion > 40 ? 'text-orange-500' : 'text-red-500'}`}>
                    {completion}%
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium italic">
                    {filledFields} of {totalFields} fields filled
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${completion > 70 ? 'bg-emerald-500' : completion > 40 ? 'bg-orange-500' : 'bg-brand-500'}`}
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${completion === 100 ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`}></div>
                  <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 italic">
                    {completion === 100 ? 'Ready to Deploy' : 'Draft Mode'}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-50 dark:border-gray-800/50 pt-5">
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-2">Sales Velocity</label>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 dark:text-gray-600">30-Day Window</span>
                  <span className="font-bold text-gray-300 dark:text-gray-700">N/A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT CONTENT AREA */}
      <div className={`flex-1 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm relative ${mode === 'drawer' ? 'border-0 shadow-none rounded-none !bg-transparent' : ''}`}>
        {/* Top Tabs - Sticky */}
        <div className={`sticky top-0 z-30 flex overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 sm:px-6 pt-2 ${mode === 'drawer' ? 'bg-white dark:bg-gray-900' : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 relative group flex-shrink-0 ${activeTab === tab.id
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
            >
              {tab.label}
              {activeTab !== tab.id && (
                <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        <div className="px-6 py-2 bg-emerald-50/50 border-b border-emerald-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest">
            Source of Truth: Central Inventory (Read-Only Base)
          </p>
        </div>

        {/* Content Scrollable Area */}
        <div className={`${mode === 'page' ? 'flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10' : 'p-4'}`}>
          {/* Wrapper for scaling if needed, or remove scaling for drawer for better fit */}
          <div className="w-full">
            {renderContent()}
          </div>
        </div>

        {/* Bottom Action Bar - Sticky */}
        <div className={`${mode !== 'drawer' ? 'sticky bottom-0 z-20 shadow-lg border-t' : 'border-t mt-0'} px-6 py-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 flex justify-between items-center`}>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 hover:border-red-500/30 transition-all"
          >
            Discard
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleSave("Draft")}
              disabled={isSaving}
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-emerald-600 hover:border-emerald-500/30 transition-all disabled:opacity-50"
            >
              {isSaving ? "Syncing..." : "Save Draft"}
            </button>
            <button
              onClick={handleNext}
              disabled={isSaving}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 flex items-center gap-2 group/next"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Syncing...
                </div>
              ) : (
                <>
                  {activeTab === tabs[tabs.length - 1].id ? "Publish to Shopify" : "Next Step"}
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmCloseOpen}
        onClose={() => setIsConfirmCloseOpen(false)}
        className="max-w-md p-0 overflow-hidden"
        showCloseButton={false}
      >
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Wait! Unsaved Progress</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">
            You have filled out product details. What would you like to do with these changes?
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleSaveDraft}
              className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              Save as Draft
            </button>
            <button
              onClick={handleDiscard}
              className="w-full py-2.5 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 rounded-xl text-sm font-semibold transition-all"
            >
              Discard Changes
            </button>
            <button
              onClick={() => setIsConfirmCloseOpen(false)}
              className="w-full py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function ShopifyEditForm(props: ShopifyEditFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopifyEditFormContent {...props} />
    </Suspense>
  );
}
