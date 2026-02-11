"use client";

import AddProductForm from "@/components/inventory/add-product/AddProductForm";
import BigCommerceEditForm from "@/components/marketplace/bigcommerce/BigCommerceEditForm";
import ChannelLinkView from "@/components/marketplace/ChannelLinkView";
import EbayEditForm from "@/components/marketplace/ebay/EbayEditForm";
import ShopifySyncEditForm from "@/components/marketplace/shopify/ShopifySyncEditForm";
import { ProductFormData, ProductFormProvider, useProductForm } from "@/context/ProductFormContext";
import { ChevronLeftIcon } from "@/icons";
import { listingService } from "@/services/listingService";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


function EditMarketplaceListingLoader() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode');
  const { loadProduct } = useProductForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [product, setProduct] = useState<any>(null);


  useEffect(() => {
    // If the component has loaded a product and mode is not 'link', do not re-fetch.
    // If mode is 'link', we might need to handle refreshes or mode changes differently if required.
    // For now, retaining basic guard to prevent loops.
    if (hasLoaded && mode !== 'link') return;

    const fetchListing = async () => {
      try {
        const response = await listingService.getListing(id as string);
        if (response.success && response.data) {
          const listing = response.data;

          // Check for redirect to specific pages first depending on marketplace
          const marketplace = listing.channel?.marketplace?.toLowerCase();

          if (marketplace === 'shopify') {
            router.replace(`/marketplace/shopify/edit-listing/${id}${mode ? `?mode=${mode}` : ''}`);
            return;
          } else if (marketplace === 'ebay') {
            router.replace(`/marketplace/ebay/edit-listing/${id}${mode ? `?mode=${mode}` : ''}`);
            return;
          } else if (marketplace === 'bigcommerce') {
            router.replace(`/marketplace/bigcommerce/edit-listing/${id}${mode ? `?mode=${mode}` : ''}`);
            return;
          }

          // Map backend listing + embedded product to ProductFormData
          const p = listing.product;
          const formData: ProductFormData = {
            meta: {
              id: p?.id?.toString() || listing.listing_id || "new",
              company_id: listing.company_id || "1",
              created_by: "system",
              updated_by: "system",
              created_at: listing.created_at || new Date().toISOString(),
              updated_at: listing.updated_at || new Date().toISOString(),
              version: 1,
              status: listing.status || "active",
              is_published: true,
            },
            basicInfo: {
              sku: p?.sku || listing.mapped_attributes?.sku || "",
              productIdentifierType: "SKU",
              productIdentifierValue: p?.sku || listing.mapped_attributes?.sku || "",
              title: p?.name || listing.mapped_attributes?.title || "Unknown Listing",
              category: p?.category || "General",
              condition: "new",
              brand: p?.brand || "",
              manufacturer: "",
              msrp: "",
              purchasePrice: "",
              retailPrice: p?.price?.toString() || listing.mapped_attributes?.price?.toString() || "",
              map: "",
              dimensionLength: "",
              dimensionWidth: "",
              dimensionHeight: "",
              dimensionUnit: "inch",
              weightValue: "",
              weightUnit: "kg",
              manufacturedCountry: "",
              manufacturedState: "",
              manufacturedCity: "",
              manufacturedPostalCode: "",
            },
            description: {
              shortDescription: "",
              mainDescription: p?.description || listing.mapped_attributes?.description || "",
              features: ["", "", "", "", ""],
            },
            variants: {
              themes: [],
              hasVariation: false,
              variantItems: [],
            },
            inventory: {
              stocks: [
                {
                  id: "1",
                  warehouse: "Local Node",
                  sku: p?.sku || listing.mapped_attributes?.sku || "",
                  available: p?.stock || listing.mapped_attributes?.stock || 0,
                  reserved: 0,
                  binLocations: [""],
                  priorityOrder: 0,
                  isDefault: true
                }
              ],
            },
            pricing: {
              costPrice: "",
              sellingPrice: p?.price?.toString() || listing.mapped_attributes?.price?.toString() || "",
              discountType: "none",
              discountValue: "",
              taxClass: "standard",
            },
            media: {
              images: [],
              videos: [],
            },
            attributes: [],
            marketplace: {
              channels: [{
                id: listing.channel?.marketplace || "unknown",
                name: listing.channel?.name || "Marketplace",
                price: p?.price?.toString() || listing.mapped_attributes?.price?.toString() || "",
                title: p?.name || listing.mapped_attributes?.title || "",
                description: "",
                tags: []
              }]
            },
            listingStatus: {
              active: listing.status === 'active' ? [{
                id: listing.listing_id,
                channel: listing.channel?.name || "Marketplace",
                sku: p?.sku || listing.mapped_attributes?.sku || "",
                quantity: (p?.stock || listing.mapped_attributes?.stock || 0).toString(),
                price: (p?.price || listing.mapped_attributes?.price || 0).toString(),
                marketplaceId: listing.channel?.marketplace || "unknown"
              }] : [],
              drafts: [],
              notListed: listing.status !== 'active' ? [{
                id: listing.listing_id,
                channel: listing.channel?.name || "Marketplace",
                sku: p?.sku || listing.mapped_attributes?.sku || "",
                quantity: (p?.stock || listing.mapped_attributes?.stock || 0).toString(),
                price: (p?.price || listing.mapped_attributes?.price || 0).toString(),
                marketplaceId: listing.channel?.marketplace || "unknown"
              }] : [],
            },
            suppliers: [],
          };

          setProduct(listing);
          loadProduct(formData);
          setHasLoaded(true);
        } else {
          setError("Listing handshake not found.");
        }
      } catch (err) {
        console.error("Failed to load listing details", err);
        setError("Synchronization failed. Check node stability.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id, loadProduct, hasLoaded, router, mode]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium font-outfit uppercase tracking-widest text-[10px]">Synchronizing Listing Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4 border border-rose-100">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Signal Lost</h2>
        <p className="text-gray-500 mb-6 text-sm">{error}</p>
        <Link href="/marketplace" className="px-8 py-3 bg-brand-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:scale-105 transition-all">
          Return to Hub
        </Link>
      </div>
    );
  }

  // Handle Link Mode
  if (mode === 'link' && product) {
    const p = product.product;
    const viewProduct = {
      title: product.mapped_attributes?.title || p?.name || "Unknown Listing",
      sku: product.mapped_attributes?.sku || p?.sku || "",
      price: product.mapped_attributes?.price || p?.price || 0,
      stock: product.mapped_attributes?.stock || p?.stock || 0,
      channelLogo: p?.image || null
    };

    return (
      <ChannelLinkView
        id={id as string}
        channelName={product.channel?.name || "Marketplace"}
        channelType={product.channel?.marketplace || "unknown"}
        product={viewProduct}
      />
    );
  }

  // If we haven't redirected yet (shouldn't happen for known types, but safe fallback)
  // Or if it's a generic marketplace type
  const marketplace = product?.channel?.marketplace?.toLowerCase();

  switch (marketplace) {
    case 'ebay':  // Legacy fallback if redirect fails
      return <EbayEditForm id={id as string} isMarketplaceEdit={true} />;
    case 'amazon':
      return <AddProductForm id={id as string} isMarketplaceEdit={true} />; // Placeholder
    case 'bigcommerce': // Legacy fallback
      return <BigCommerceEditForm id={id as string} isMarketplaceEdit={true} />;
    case 'shopify': // Legacy fallback
      return <ShopifySyncEditForm id={id as string} product={product} />;
    default:
      return <AddProductForm id={id as string} isMarketplaceEdit={true} />;
  }

}

export default function EditMarketplaceListingPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto font-outfit select-none">
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">
          <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
          <span className="text-gray-200">/</span>
          <Link href="/marketplace" className="hover:text-brand-600 transition-colors">Marketplace</Link>
          <span className="text-gray-200">/</span>
          <span className="text-brand-600">Edit Listing</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-700 tracking-tight">Edit Marketplace Listing</h1>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Refine channel-specific parameters and synchronization rules</p>
          </div>
          <Link href="/marketplace" className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <ChevronLeftIcon className="w-3.5 h-3.5" />
            <span>Back to Feed</span>
          </Link>
        </div>
      </div>

      <ProductFormProvider>
        <EditMarketplaceListingLoader />
      </ProductFormProvider>
    </div>
  );
}
