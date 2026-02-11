"use client";

import AmazonEditForm from "@/components/marketplace/amazon/AmazonEditForm";
import BigCommerceEditForm from "@/components/marketplace/bigcommerce/BigCommerceEditForm";
import ChannelLinkView from "@/components/marketplace/ChannelLinkView";
import EbayEditForm from "@/components/marketplace/ebay/EbayEditForm";
import ShopifyEditForm from "@/components/marketplace/shopify/ShopifyEditForm";
import { ProductFormData, ProductFormProvider, useProductForm } from "@/context/ProductFormContext";
import { ChevronLeftIcon } from "@/icons";
import { listingService } from "@/services/listingService";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock data removed in favor of API fetching

function ChannelEditLoader() {
  const { id, channel } = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const { loadProduct, resetForm } = useProductForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [channelData, setChannelData] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // If mode is 'link', clear all previous data
      if (mode === 'link') {
        resetForm();
        setHasLoaded(false);
      }

      if (hasLoaded && mode !== 'link') return;

      try {
        // Fetch channel data first to determine channel type
        const channelResponse = await listingService.getListing(id as string);

        if (channelResponse.success && channelResponse.data) {
          const channelInfo = channelResponse.data;
          setChannelData(channelInfo);

          // Use API data directly
          const listing = channelResponse.data;
          const p = listing.product;

          const mockProduct = {
            id: listing.listing_id,
            sku: p?.sku || listing.mapped_attributes?.sku || "",
            title: p?.name || listing.mapped_attributes?.title || "",
            price: p?.price || listing.mapped_attributes?.price || 0,
            stock: p?.stock || listing.mapped_attributes?.stock || 0,
            channel_status: listing.status,
            image: p?.image || null
          };

          // Map to ProductFormData
          const formData: ProductFormData = {
            // Minimal mapping to satisfy ProductFormContext
            meta: {
              id: mockProduct.id.toString(),
              company_id: "1",
              created_by: "system",
              updated_by: "system",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              version: 1,
              status: "active",
              is_published: true,
            },
            basicInfo: {
              sku: mockProduct.sku || "",
              title: mockProduct.title || "",
              category: "General",
              condition: "new",
              brand: "",
              manufacturer: "",
              msrp: "",
              purchasePrice: "",
              retailPrice: mockProduct.price?.toString() || "",
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
              productIdentifierType: "SKU",
              productIdentifierValue: mockProduct.sku || ""
            },
            description: {
              shortDescription: "",
              mainDescription: `Marketplace Listing for ${mockProduct.title} on ${channelInfo.name || channel}.`,
              features: ["", "", "", "", ""]
            },
            variants: {
              themes: [],
              hasVariation: false,
              variantItems: []
            },
            inventory: {
              stocks: [{
                id: "1",
                warehouse: channelInfo.name || "Default Store",
                sku: mockProduct.sku || "",
                available: mockProduct.stock || 0,
                reserved: 0,
                binLocations: [""],
                priorityOrder: 0,
                isDefault: true
              }]
            },
            pricing: {
              costPrice: "",
              sellingPrice: mockProduct.price?.toString() || "",
              discountType: "none",
              discountValue: "",
              taxClass: "standard"
            },
            media: {
              images: mockProduct.image ? [{
                id: "1",
                url: mockProduct.image,
                type: "url",
                order: 0
              }] : [],
              videos: []
            },
            attributes: [],
            marketplace: {
              channels: [{
                id: channel as string,
                name: channelInfo.name || (channel as string),
                price: mockProduct.price?.toString() || "",
                title: mockProduct.title || "",
                description: "",
                tags: []
              }]
            },
            listingStatus: {
              active: mockProduct.channel_status === 'active' ? [{
                id: `${channel as string}-1`,
                channel: channelInfo.name || (channel as string),
                sku: mockProduct.sku || "",
                quantity: mockProduct.stock?.toString() || "0",
                price: mockProduct.price?.toString() || "",
                marketplaceId: channel as string
              }] : [],
              drafts: [],
              notListed: mockProduct.channel_status !== 'active' ? [{
                id: `${channel as string}-1`,
                channel: channelInfo.name || (channel as string),
                sku: mockProduct.sku || "",
                quantity: mockProduct.stock?.toString() || "0",
                price: mockProduct.price?.toString() || "",
                marketplaceId: channel as string
              }] : []
            },
            suppliers: []
          };

          setProduct(mockProduct);

          // Only load form data if NOT in link mode
          if (mode !== 'link') {
            loadProduct(formData);
          }

          setHasLoaded(true);
          setLoading(false);

        } else {
          setError("Channel not found.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load listing", err);
        setError("Failed to load listing details. Please try again.");
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, channel, mode, loadProduct, resetForm, hasLoaded]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium font-outfit uppercase tracking-widest text-[10px]">Loading Channel Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4 border border-rose-100">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Listing Not Found</h2>
        <p className="text-gray-500 mb-6 text-sm">{error}</p>
        <Link href="/marketplace" className="px-8 py-3 bg-brand-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:scale-105 transition-all">
          Return to Feed
        </Link>
      </div>
    );
  }

  // If mode is 'link', show the ChannelLinkView
  if (mode === 'link' && product) {
    return (
      <ChannelLinkView
        id={id as string}
        channelName={channelData?.name || (channel as string)}
        channelType={channel as string}
        product={product}
      />
    );
  }

  // Platform-specific form selector
  const platform = (channel as string).toLowerCase();

  switch (platform) {
    case 'shopify':
      return <ShopifyEditForm id={id as string} isMarketplaceEdit={true} />;
    case 'ebay':
      return <EbayEditForm id={id as string} isMarketplaceEdit={true} />;
    case 'amazon':
      return <AmazonEditForm id={id as string} isMarketplaceEdit={true} />;
    case 'bigcommerce':
      return <BigCommerceEditForm id={id as string} isMarketplaceEdit={true} />;
    default:
      return <ShopifyEditForm id={id as string} isMarketplaceEdit={true} />;
  }
}

export default function ActiveChannelPage() {
  const { channel } = useParams();
  const router = useRouter();

  // Capitalize channel name for display
  const channelName = channel
    ? (channel as string).charAt(0).toUpperCase() + (channel as string).slice(1)
    : 'Channel';

  return (
    <div className="p-3 sm:p-4 lg:p-4 w-full max-w-[1600px] mx-auto font-outfit select-none">
      <div className="mb-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/marketplace" className="hover:text-brand-600 transition-colors">Marketplace</Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-900 text-[13px]">{channelName} Synchronization</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Synchronize Discovery Node</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Manage channel-specific metadata and inventory rules before establishing handshake.</p>
          </div>
          <Link href="/marketplace" className="flex items-center gap-2 px-6 py-2 rounded-xl border border-gray-100 bg-white text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Return to Hub</span>
          </Link>
        </div>
      </div>

      <ProductFormProvider>
        <ChannelEditLoader />
      </ProductFormProvider>
    </div>
  );
}
