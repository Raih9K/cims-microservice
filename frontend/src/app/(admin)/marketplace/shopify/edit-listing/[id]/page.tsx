"use client";

import { PageSkeleton } from "@/components/common/SkeletonLoader";
import ShopifyEditForm from "@/components/marketplace/shopify/ShopifyEditForm";
import ShopifyLinkView from "@/components/marketplace/shopify/ShopifyLinkView";
import Button from "@/components/ui/button/Button";
import { ProductFormData, ProductFormProvider, useProductForm } from "@/context/ProductFormContext";
import { ChevronLeftIcon } from "@/icons";
import { listingService } from "@/services/listingService";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ShopifyListingEditLoader() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const { loadProduct } = useProductForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (hasLoaded) return;
      try {
        const response = await listingService.getListing(id as string);
        if (response.success && response.data) {
          const listing = response.data;

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
                id: listing.channel?.marketplace || "shopify",
                name: listing.channel?.name || "Shopify",
                price: p?.price?.toString() || listing.mapped_attributes?.price?.toString() || "",
                title: p?.name || listing.mapped_attributes?.title || "",
                description: "",
                tags: []
              }]
            },
            listingStatus: {
              active: listing.status === 'active' ? [{
                id: listing.listing_id,
                channel: listing.channel?.name || "Shopify",
                sku: p?.sku || listing.mapped_attributes?.sku || "",
                quantity: (p?.stock || listing.mapped_attributes?.stock || 0).toString(),
                price: (p?.price || listing.mapped_attributes?.price || 0).toString(),
                marketplaceId: listing.channel?.marketplace || "shopify"
              }] : [],
              drafts: [],
              notListed: listing.status !== 'active' ? [{
                id: listing.listing_id,
                channel: listing.channel?.name || "Shopify",
                sku: p?.sku || listing.mapped_attributes?.sku || "",
                quantity: (p?.stock || listing.mapped_attributes?.stock || 0).toString(),
                price: (p?.price || listing.mapped_attributes?.price || 0).toString(),
                marketplaceId: listing.channel?.marketplace || "shopify"
              }] : [],
            },
            suppliers: [],
          };

          setProduct(listing);
          loadProduct(formData);
          setHasLoaded(true);
        } else {
          setError("Listing not found.");
        }
      } catch (err) {
        console.error("Failed to load listing details", err);
        setError("Synchronization failed.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id, loadProduct, hasLoaded]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center border border-red-100">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Error Loading Listing</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">{error}</p>
        </div>
        <Link href="/marketplace">
          <Button>Return to Marketplace</Button>
        </Link>
      </div>
    );
  }

  // Handle Link Mode (Handshake View)
  if (mode === 'link' && product) {
    const channelType = product.channel?.marketplace || product.channel?.type || 'shopify';

    // Map listing data to the shape expected by ChannelLinkView
    const viewProduct = {
      title: product.mapped_attributes?.title || product.product?.name || "Unknown Listing",
      sku: product.mapped_attributes?.sku || product.product?.sku || "",
      price: product.mapped_attributes?.price || product.product?.price || 0,
      stock: product.mapped_attributes?.stock || product.product?.stock || 0,
      channelLogo: product.product?.image || null
    };

    return (
      <ShopifyLinkView
        id={id as string}
        product={viewProduct}
      />
    );
  }

  return <ShopifyEditForm id={id as string} isMarketplaceEdit={true} />;
}

export default function EditShopifyListingPage() {
  return (
    <div className="p-3 sm:p-4 lg:p-4 w-full max-w-[1600px] mx-auto font-outfit select-none">
      <div className="mb-4">
        <nav className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
          <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
          <span className="text-gray-200">/</span>
          <Link href="/marketplace" className="hover:text-brand-600 transition-colors">Marketplace</Link>
          <span className="text-gray-200">/</span>
          <span className="text-emerald-600">Shopify Channel</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-700 tracking-tight">Edit Shopify Inventory</h1>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Manage channel-specific metadata and inventory rules</p>
          </div>
          <Link href="/marketplace" className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <ChevronLeftIcon className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      <ProductFormProvider>
        <ShopifyListingEditLoader />
      </ProductFormProvider>
    </div>
  );
}
