"use client";
import { Modal } from "@/components/ui/modal";
import { useProductForm } from "@/context/ProductFormContext";
import {
  VideoIcon
} from "@/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import AttributesTab from "./tabs/AttributesTab";
import BasicInfoTab from "./tabs/BasicInfoTab";
import DescriptionTab from "./tabs/DescriptionTab";
import ImagesTab from "./tabs/ImagesTab";
import InventoryTab from "./tabs/InventoryTabNew";
import ListingStatusTab from "./tabs/ListingStatusTab";
import MarketplaceInfoTab from "./tabs/MarketplaceInfoTab";
import SuppliersTab from "./tabs/SuppliersTab";
import VariantsTab from "./tabs/VariantsTab";

import { useFormEngine } from "@/lib/form-engine/useFormEngine";
import { productService } from "@/services/productService";

// ============================================================================
// CONFIG SECTION (EDITABLE)
// ============================================================================
const formConfig = {
  formId: "inventory-add-product-v1",
  mockResponseFile: "inventory_product_save.json",
  mockApiEndpoint: "/api/mock/inventory/add-product",
  fields: {} // Empty fields = send entire payload as is
};
// ============================================================================

interface AddProductFormProps {
  id?: string;
  variantId?: string;
  mode?: "page" | "drawer";
  onClose?: () => void;
  isMarketplaceEdit?: boolean;
}

function AddProductFormContent({ id, variantId, mode = "page", onClose, isMarketplaceEdit = false }: AddProductFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "basic";

  const [activeTab, setActiveTabState] = useState(initialTab);
  const { data, isDirty, setIsDirty, resetForm } = useProductForm();
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const { submitForm } = useFormEngine(formConfig);

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
    { id: "basic", label: "Basic Info" },
    { id: "description", label: "Description" },
    !variantId ? { id: "variants", label: "Variants" } : null,
    { id: "inventory", label: "Inventory" },
    { id: "images", label: "Images" },
    { id: "attributes", label: "Attributes" },
    { id: "marketplace", label: "Marketplace" },
    { id: "status", label: "Status" },
    { id: "suppliers", label: "Suppliers" },
  ].filter(Boolean) as { id: string; label: string }[];

  const renderContent = () => {
    switch (activeTab) {
      case "basic": return <BasicInfoTab />;
      case "description": return <DescriptionTab />;
      case "variants": return <VariantsTab />;
      case "inventory": return <InventoryTab />;
      case "images": return <ImagesTab />;
      case "attributes": return <AttributesTab />;
      case "marketplace": return <MarketplaceInfoTab />;
      case "status": return <ListingStatusTab />;
      case "suppliers": return <SuppliersTab />;
      default: return <BasicInfoTab />;
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

      // USE GENUINE SERVICE CALL
      let result;
      if (variantId && id) {
        // Updating a specific variant
        result = await productService.updateVariant(id, variantId, payload);
      } else if (id) {
        result = await productService.update(id, payload);
      } else {
        result = await productService.create(payload);
      }

      if (result.ok) {
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
        console.error("Failed to save product. Result object:", result);
        if (result.status === 422 && result.errors) {
          // Validation error
          const firstError = Object.values(result.errors)[0] as string[];
          alert(`Validation Failed: ${firstError[0]}`);
        } else {
          alert(`Failed to save product. ${result.message || `Status: ${result.status}`}`);
        }
      }
    } catch (error: any) {
      console.error("Error saving product:", error);
      // Try to parse validation errors if available
      let errorMessage = "An unexpected error occurred while saving the product";
      if (error.message) errorMessage = error.message;
      alert(errorMessage);
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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl h-full relative shadow-sm flex flex-col overflow-hidden">
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-brand-500 rounded-r-full z-10"></div>

            <div className="h-full overflow-y-auto custom-scrollbar p-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-8 pl-4">Product Overview</h3>

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
                  {data.variants.hasVariation && data.variants.variantItems.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1 pl-2 border-l-2 border-gray-100 dark:border-gray-800 max-h-32 overflow-y-auto custom-scrollbar">
                      {data.variants.variantItems.map((variant, idx) => (
                        <span key={idx} className="text-[11px] text-gray-500 dark:text-gray-400 font-mono truncate block hover:text-brand-600 transition-colors cursor-default" title={variant.sku}>
                          {variant.sku || "Pending"}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-50 dark:border-gray-800/50 pt-5">
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-2">Category</label>
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate" title={data.basicInfo.category || "--"}>
                    {data.basicInfo.category || "--"}
                  </p>
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

                {data.meta.created_at && (
                  <div className="border-t border-gray-50 dark:border-gray-800/50 pt-5 space-y-3">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      <span>Timeline</span>
                      <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-semibold text-gray-400 truncate mr-2">First Created</span>
                        <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap bg-gray-50 dark:bg-gray-800/50 px-2 py-0.5 rounded-md border border-gray-100 dark:border-gray-700">
                          {new Date(data.meta.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      {data.meta.updated_at && (
                        <div className="flex justify-between items-center animate-in fade-in slide-in-from-top-1 duration-300">
                          <span className="text-[10px] font-semibold text-gray-400 truncate mr-2">Last Modified</span>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 whitespace-nowrap bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-500/20">
                            {new Date(data.meta.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
            className="px-8 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-bold text-gray-400 hover:text-red-500 hover:border-red-500/30 transition-all"
          >
            Discard
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleSave("Draft")}
              disabled={isSaving}
              className="px-10 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-brand-500 hover:border-brand-500/30 transition-all disabled:opacity-50"
            >
              {isSaving ? "Syncing..." : "Save for later"}
            </button>
            <button
              onClick={handleNext}
              disabled={isSaving}
              className="px-12 py-3.5 bg-brand-500 text-white rounded-2xl text-xs font-bold hover:bg-brand-600 transition-all shadow-md shadow-brand-500/20 disabled:opacity-50 flex items-center gap-2 group/next"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deploying...
                </div>
              ) : (
                <>
                  {activeTab === tabs[tabs.length - 1].id ? "Commit Record" : "Proceed Next"}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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

export default function AddProductForm(props: AddProductFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProductFormContent {...props} />
    </Suspense>
  );
}
