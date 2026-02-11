"use client";

import AddProductForm from "@/components/inventory/add-product/AddProductForm";
import { ProductFormData, ProductFormProvider, useProductForm } from "@/context/ProductFormContext";
import { ChevronLeftIcon } from "@/icons";
import { productService } from "@/services/productService";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function EditProductLoader() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variant");
  const { loadProduct } = useProductForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (hasLoaded) return;
      try {
        const response = await productService.getById(id as string);
        if (response.success && response.data) {
          const product = response.data;

          let variantData: any = null;
          if (variantId && product.variants) {
            variantData = product.variants.find((v: any) => v.id.toString() === variantId);
          }

          // Map backend product to ProductFormData
          const formData: ProductFormData = {
            meta: {
              id: product.id?.toString() || "",
              company_id: product.company_id || "",
              created_by: product.created_by || "",
              updated_by: product.updated_by || "",
              created_at: product.created_at || "",
              updated_at: product.updated_at || "",
              version: product.version || 1,
              status: (product.status as 'draft' | 'active' | 'archived') || "draft",
              is_published: product.is_published || false,
            },
            basicInfo: {
              sku: variantData ? (variantData.sku || "") : (product.sku || ""),
              productIdentifierType: product.identifiers?.[0]?.product_identifier || "",
              productIdentifierValue: variantData ? (variantData.barcode || "") : (product.identifiers?.[0]?.product_identifier_value || ""),
              title: variantData ? (variantData.name || "") : (product.name || ""),
              category: product.category || "",
              condition: product.condition || "new",
              brand: product.brand || "",
              manufacturer: product.manufacturer_name || "",
              msrp: "",
              purchasePrice: variantData ? (variantData.cost_price?.toString() || "") : (product.cost_price?.toString() || ""),
              retailPrice: variantData ? (variantData.selling_price?.toString() || "") : (product.selling_price?.toString() || ""),
              map: "",
              dimensionLength: product.dimensions?.length?.toString() || "",
              dimensionWidth: product.dimensions?.width?.toString() || "",
              dimensionHeight: product.dimensions?.height?.toString() || "",
              dimensionUnit: product.dimensions?.dimension_unit || "inch",
              weightValue: product.dimensions?.weight?.toString() || "",
              weightUnit: product.dimensions?.weight_unit || "kg",
              manufacturedCountry: product.manufacturer_country_code || "",
              manufacturedState: product.manufacturer_state || "",
              manufacturedCity: "",
              manufacturedPostalCode: product.manufacturer_postal_code || "",
            },
            description: {
              shortDescription: "",
              mainDescription: product.description || "",
              features: product.bullet_points?.length > 0
                ? product.bullet_points.map((bp: any) => bp.bullet_text)
                : (Array.isArray(product.features) ? product.features : ["", "", "", "", ""]),
            },
            variants: {
              themes: [],
              hasVariation: !variantData && product.type === "Variant",
              // If we are editing a specific variant, we hide other variants from the UI
              // by passing an empty list. This treats the form as a "Single Product" edit
              // for the variant itself.
              variantItems: variantData ? [] : (product.variants || []).map((v: any) => ({
                id: v.id.toString(),
                title: v.name,
                sku: v.sku,
                combination: v.attributes || {},
                barcode: v.barcode || "",
                price: v.selling_price?.toString() || "",
                quantity: v.inventory_quantity?.toString() || "0",
                warehouse: v.warehouse || "Default",
              })),
            },
            inventory: {
              stocks: variantData
                ? [{
                  id: "1",
                  warehouse: "Default",
                  sku: variantData.sku || "",
                  available: variantData.inventory_quantity || 0,
                  reserved: 0,
                  binLocations: [],
                  priorityOrder: 0,
                  isDefault: true
                }]
                : (product.stock_levels?.length > 0
                  ? product.stock_levels.map((sl: any) => ({
                    id: sl.id.toString(),
                    warehouse: sl.warehouse?.name || "Default",
                    sku: product.sku || "",
                    available: sl.available_quantity || 0,
                    reserved: 0,
                    binLocations: [product.bin || ""], // fallback bin
                    priorityOrder: 0,
                    isDefault: sl.warehouse?.is_default || false
                  }))
                  : [
                    {
                      id: "1",
                      warehouse: product.warehouse || "Default",
                      sku: product.sku || "",
                      available: product.initial_quantity || 0,
                      reserved: 0,
                      binLocations: [product.bin || ""],
                      priorityOrder: 0,
                      isDefault: true
                    }
                  ]),
            },
            pricing: {
              costPrice: variantData ? (variantData.cost_price?.toString() || "") : (product.cost_price?.toString() || ""),
              sellingPrice: variantData ? (variantData.selling_price?.toString() || "") : (product.selling_price?.toString() || ""),
              discountType: product.discount_type || "none",
              discountValue: product.discount_value?.toString() || "",
              taxClass: product.tax_class || "standard",
            },
            media: {
              images: variantData
                ? (variantData.image ? [{
                  id: "0",
                  url: variantData.image,
                  type: 'url',
                  order: 0
                }] : [])
                : (product.images || []).map((url: string, index: number) => ({
                  id: index.toString(),
                  url: url,
                  type: 'url',
                  order: index
                })),
              videos: product.video_url ? [{ url: product.video_url, type: 'url' }] : [],
            },
            attributes: product.attributes || [],
            marketplace: product.marketplace || { channels: [] },
            listingStatus: product.listingStatus || {
              active: [],
              drafts: [],
              notListed: [],
            },
            suppliers: product.suppliers || [],
          };

          loadProduct(formData);
          setHasLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load product", err);
        setError("Failed to load product data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, loadProduct, hasLoaded, variantId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading Product Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Error Loading Product</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Link href="/inventory" className="px-6 py-2 bg-brand-600 text-white rounded-xl font-semibold shadow-lg shadow-brand-600/20 hover:scale-105 transition-all">
          Back to Inventory
        </Link>
      </div>
    );
  }

  return <AddProductForm id={id as string} variantId={variantId as string | undefined} />;
}

export default function EditProductPage() {
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variant");

  return (
    <div className="p-4 sm:p-6 lg:p-6 w-full max-w-[1600px] mx-auto">
      <div className="mb-5">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/inventory" className="hover:text-brand-600 transition-colors">Inventory</Link>
          <span className="text-gray-300">/</span>
          {variantId ? (
            <>
              <span className="text-gray-500">Edit Product</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 dark:text-white font-semibold">Variant</span>
            </>
          ) : (
            <span className="text-gray-900 dark:text-white font-semibold">Edit Product</span>
          )}
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              {variantId ? "Edit Variant" : "Edit Product"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
              {variantId ? "Modify variant specific details and overrides" : "Modify existing asset details and parameters"}
            </p>
          </div>
          <Link href="/inventory" className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <ChevronLeftIcon className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      <ProductFormProvider>
        <EditProductLoader />
      </ProductFormProvider>
    </div>
  );
}
