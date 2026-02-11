"use client";
import { useProductForm } from "@/context/ProductFormContext";
import { listingService } from "@/services/listingService";
import { productService } from "@/services/productService";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

import ShopifyBasicTab from "@/components/marketplace/shopify/tabs/ShopifyBasicTab";
import ShopifyMediaTab from "@/components/marketplace/shopify/tabs/ShopifyMediaTab";
import ShopifyVariantsTab from "@/components/marketplace/shopify/tabs/ShopifyVariantsTab";

interface AmazonEditFormProps {
  id?: string;
  mode?: "page" | "drawer";
  onClose?: () => void;
  isMarketplaceEdit?: boolean;
}

function AmazonEditFormContent({ id, mode = "page", onClose, isMarketplaceEdit = false }: AmazonEditFormProps) {
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

  const setActiveTab = (tabId: string) => {
    setActiveTabState(tabId);
    if (mode === "page") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tabId);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  const tabs = [
    { id: "basic", label: "Amazon Essential" },
    { id: "variants", label: "Buy Box & Stock" },
    { id: "images", label: "A+ Content Media" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "basic": return <ShopifyBasicTab />;
      case "variants": return <ShopifyVariantsTab />;
      case "images": return <ShopifyMediaTab />;
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
        toast.success("Amazon Handshake updated successfully");
        setIsDirty(false);
        router.push("/marketplace");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to update Amazon listing");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`flex flex-col ${mode === 'drawer' ? 'min-h-[500px]' : 'lg:flex-row gap-5 h-[calc(100vh-10rem)]'}`}>
      <div className={`flex-1 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm relative`}>
        <div className={`sticky top-0 z-30 flex overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 sm:px-6 pt-2`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 relative group flex-shrink-0 ${activeTab === tab.id
                ? "border-[#FF9900] text-[#FF9900]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-6 py-2 bg-orange-50/50 border-b border-orange-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <p className="text-[9px] font-bold text-orange-700 uppercase tracking-widest">
            Amazon Seller Central Handshake
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
          {renderContent()}
        </div>

        <div className="sticky bottom-0 z-20 shadow-lg border-t px-6 py-4 bg-white flex justify-between items-center">
          <button onClick={() => router.push("/marketplace")} className="px-6 py-3 border border-gray-200 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Discard
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleSave()}
              disabled={isSaving}
              className="px-8 py-3 bg-[#232F3E] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#131921] transition-all shadow-md flex items-center gap-2"
            >
              {isSaving ? "Syncing..." : "Sync with Amazon"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AmazonEditForm(props: AmazonEditFormProps) {
  return (
    <Suspense fallback={<div>Loading Amazon Console...</div>}>
      <AmazonEditFormContent {...props} />
    </Suspense>
  );
}
