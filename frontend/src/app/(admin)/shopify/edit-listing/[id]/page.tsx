"use client";

import ShopifyEditForm from "@/components/marketplace/shopify/ShopifyEditForm";
import ShopifyLinkView from "@/components/marketplace/shopify/ShopifyLinkView";
import { ProductFormData, ProductFormProvider, useProductForm } from "@/context/ProductFormContext";
import { ChevronLeftIcon } from "@/icons";
import { productService } from "@/services/productService";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// We can assume we might use similar mock data or fetch logic
import shopifyProducts from "@/app/(admin)/marketplace/demoshopifyproduct.json";

function ShopifyEditLoader() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const { loadProduct } = useProductForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (hasLoaded) return;
      try {
        // Try to find in mock data first for demo purposes (using same logic as marketplace edit)
        const mockProduct = (shopifyProducts as any[]).find(p => p.id.toString() === id);

        if (mockProduct) {
          const formData: ProductFormData = {
            meta: {
              id: mockProduct.id.toString(),
              company_id: "mock-company",
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
              productIdentifierType: "SKU",
              productIdentifierValue: mockProduct.sku || "",
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
            },
            description: {
              shortDescription: "",
              mainDescription: `Marketplace Listing for ${mockProduct.title} on Shopify.`,
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
                  warehouse: "Shopify Store",
                  sku: mockProduct.sku || "",
                  available: mockProduct.stock || 0,
                  reserved: 0,
                  binLocations: [""],
                  priorityOrder: 0,
                  isDefault: true
                }
              ],
            },
            pricing: {
              costPrice: "",
              sellingPrice: mockProduct.price?.toString() || "",
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
                id: "shopify",
                name: "Shopify",
                price: mockProduct.price?.toString() || "",
                title: mockProduct.title || "",
                description: "",
                tags: []
              }]
            },
            listingStatus: {
              active: mockProduct.channel_status === 'Active' ? [{
                id: "shopify-1",
                channel: "Shopify",
                sku: mockProduct.sku || "",
                quantity: mockProduct.stock?.toString() || "0",
                price: mockProduct.price?.toString() || "",
                marketplaceId: "shopify"
              }] : [],
              drafts: [],
              notListed: mockProduct.channel_status !== 'Active' ? [{
                id: "shopify-1",
                channel: "Shopify",
                sku: mockProduct.sku || "",
                quantity: mockProduct.stock?.toString() || "0",
                price: mockProduct.price?.toString() || "",
                marketplaceId: "shopify"
              }] : [],
            },
            suppliers: [],
          };

          setProduct(mockProduct);
          loadProduct(formData);
          setHasLoaded(true);
          setLoading(false);
          return;
        }

        // Fallback to real service if not found in mock
        const response = await productService.getById(id as string);
        if (response.success && response.data) {
          const productData = response.data;
          // Reuse mapping logic from marketplace edit (simplified for brevity, can duplicate full logic if needed)
          const formData: ProductFormData = {
            // ... minimal mapping for now or duplicate full mapping from EditMarketplaceListingPage
            // duplicating full mapping to ensure consistency
            meta: {
              id: productData.id?.toString() || "",
              company_id: productData.company_id || "",
              created_by: productData.created_by || "",
              updated_by: productData.updated_by || "",
              created_at: productData.created_at || "",
              updated_at: productData.updated_at || "",
              version: productData.version || 1,
              status: productData.status || "draft",
              is_published: productData.is_published || false,
            },
            basicInfo: {
              sku: productData.sku || "",
              productIdentifierType: productData.identifiers?.[0]?.product_identifier || "",
              productIdentifierValue: productData.identifiers?.[0]?.product_identifier_value || "",
              title: productData.name || "",
              category: productData.category || "",
              condition: productData.condition || "new",
              brand: productData.brand || "",
              manufacturer: productData.manufacturer_name || "",
              msrp: "",
              purchasePrice: productData.cost_price?.toString() || "",
              retailPrice: productData.selling_price?.toString() || "",
              map: "",
              dimensionLength: productData.dimensions?.length?.toString() || "",
              dimensionWidth: productData.dimensions?.width?.toString() || "",
              dimensionHeight: productData.dimensions?.height?.toString() || "",
              dimensionUnit: productData.dimensions?.dimension_unit || "inch",
              weightValue: productData.dimensions?.weight?.toString() || "",
              weightUnit: productData.dimensions?.weight_unit || "kg",
              manufacturedCountry: productData.manufacturer_country_code || "",
              manufacturedState: productData.manufacturer_state || "",
              manufacturedCity: "",
              manufacturedPostalCode: productData.manufacturer_postal_code || "",
            },
            description: {
              shortDescription: "",
              mainDescription: productData.description || "",
              features: productData.bullet_points?.length > 0
                ? productData.bullet_points.map((bp: any) => bp.bullet_text)
                : (Array.isArray(productData.features) ? productData.features : ["", "", "", "", ""]),
            },
            variants: {
              themes: [],
              hasVariation: productData.type === "Variant",
              variantItems: (productData.variants || []).map((v: any) => ({
                id: v.id.toString(),
                title: v.name,
                sku: v.sku,
                combination: v.attributes || {},
                barcode: v.barcode || "",
                price: v.price?.toString() || "",
                quantity: v.quantity?.toString() || "0",
                warehouse: v.warehouse || "Default",
                stocks: []
              })),
            },
            inventory: {
              stocks: productData.stock_levels?.length > 0
                ? productData.stock_levels.map((sl: any) => ({
                  id: sl.id.toString(),
                  warehouse: sl.warehouse?.name || "Default",
                  sku: productData.sku || "",
                  available: sl.available_quantity || 0,
                  reserved: 0,
                  binLocations: [productData.bin || ""],
                  priorityOrder: 0,
                  isDefault: sl.warehouse?.is_default || false
                }))
                : [
                  {
                    id: "1",
                    warehouse: productData.warehouse || "Default",
                    sku: productData.sku || "",
                    available: productData.initial_quantity || 0,
                    reserved: 0,
                    binLocations: [productData.bin || ""],
                    priorityOrder: 0,
                    isDefault: true
                  }
                ],
            },
            pricing: {
              costPrice: productData.cost_price?.toString() || "",
              sellingPrice: productData.selling_price?.toString() || "",
              discountType: productData.discount_type || "none",
              discountValue: productData.discount_value?.toString() || "",
              taxClass: productData.tax_class || "standard",
            },
            media: {
              images: (productData.images || []).map((url: string, index: number) => ({
                id: index.toString(),
                url: url,
                type: 'url',
                order: index
              })),
              videos: productData.video_url ? [{ url: productData.video_url, type: 'url' }] : [],
            },
            attributes: [],
            marketplace: { channels: [] }, // Initially empty if not specific logic
            listingStatus: {
              active: [],
              drafts: [],
              notListed: [],
            },
            suppliers: [],
          };


          setProduct(productData);
          loadProduct(formData);
          setHasLoaded(true);
        } else {
          setError("Listing not found.");
        }
      } catch (err) {
        console.error("Failed to load listing", err);
        setError("Failed to load listing details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, loadProduct, hasLoaded]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium font-outfit uppercase tracking-widest text-[10px]">Loading Shopify Data...</p>
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

  if (mode === 'link' && product) {
    return <ShopifyLinkView id={id as string} product={product} />;
  }

  return <ShopifyEditForm id={id as string} isMarketplaceEdit={true} />;
}

export default function EditShopifyListingPage() {
  return (
    <div className="p-3 sm:p-4 lg:p-4 w-full max-w-[1600px] mx-auto font-outfit select-none">
      <div className="mb-4">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
          <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/marketplace" className="hover:text-brand-600 transition-colors">Marketplace</Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-900">Shopify Channel</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Edit Shopify Inventory</h1>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Manage channel-specific metadata and inventory rules</p>
          </div>
          <Link href="/marketplace" className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <ChevronLeftIcon className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      <ProductFormProvider>
        <ShopifyEditLoader />
      </ProductFormProvider>
    </div>
  );
}
