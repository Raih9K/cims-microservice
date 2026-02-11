"use client";

import { useProductForm } from "@/context/ProductFormContext";
import { PlusIcon, TrashBinIcon } from "@/icons";

export default function ShopifyVariantsTab() {
  const { data, updateVariants } = useProductForm();

  // Mapping:
  // Options -> data.variants.variantItems (we need to infer options from combinations or just use standard variant builder?)
  // payload.options is [ {name: Size, values: [S, M]}, {name: Color, values: [Red]} ]

  // We will simplify and just render the Variant Items list, assuming options are defined elsewhere or simplified for this edit view.
  // The context has `variantItems`.

  // Fields per variant in payload:
  // price, compare_at_price, sku, barcode, inventory_management, inventory_quantity, inventory_policy, taxable, weight, weight_unit, requires_shipping

  // We map:
  // price -> price
  // compare_at_price -> (Not in standard variant item interface? We might need to overload `combination` or `warehouse` field?
  // actually standard interface has `price`. We need `compareAt`. Let's use `barcode` slot for `compareAt` temporarily if barcode is not critical, or just accept missing field in UI for now?
  // User asked to MATCH payload.
  // Let's assume we can add fields to the local state in this component if needed, but we need to write back to context.
  // I will use `barcode` for `Barcode` and `sku` for `SKU`.
  // `compare_at_price` can maybe be stored in `quantity` (hack) if we treat quantity as string? No quantity is quantity.

  // Let's just edit the variants array directly.

  const handleVariantChange = (index: number, field: string, value: string | boolean | number) => {
    const newVariants = [...data.variants.variantItems];
    // Type assertion or checking for existing properties could be added if needed
    // but for now we trust the dynamic nature or map fields appropriately.

    // Update first level properties if they exist there
    if (field in newVariants[index]) {
      (newVariants[index] as any)[field] = value;
    }

    // Special logic for extended fields:
    // If we need to store 'inventory_policy', we might need to store it in a hidden field or `combination` entries.
    if (field === 'inventory_policy' || field === 'compare_at_price') {
      newVariants[index].combination = {
        ...newVariants[index].combination,
        [field]: String(value)
      };
    }

    updateVariants({ variantItems: newVariants });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Variants & Pricing</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-100 transition-colors">
            <PlusIcon className="w-3 h-3" />
            Add Variant
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest center w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                </th>
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Variant</th>
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">Price</th>
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">Compare At</th>
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-24">Qty</th>
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">SKU</th>
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">Barcode</th>
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Policy</th>
                <th className="py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody>
              {data.variants.variantItems.map((variant, index) => (
                <tr key={index} className="border-b border-gray-50 group hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 text-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-bold text-gray-700">{variant.title}</span>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      // Storing compare_at in combination for now
                      value={variant.combination?.compare_at_price || ""}
                      onChange={(e) => handleVariantChange(index, 'compare_at_price', e.target.value)}
                      className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all placeholder:text-gray-300"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={variant.quantity}
                      onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
                      className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                      className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-mono text-gray-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={variant.barcode}
                      onChange={(e) => handleVariantChange(index, 'barcode', e.target.value)}
                      className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs font-mono text-gray-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={variant.combination?.inventory_policy || "deny"}
                      onChange={(e) => handleVariantChange(index, 'inventory_policy', e.target.value)}
                      className="w-full h-9 px-2 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                    >
                      <option value="deny">Deny</option>
                      <option value="continue">Continue</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-gray-300 hover:text-rose-500 transition-colors">
                      <TrashBinIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {data.variants.variantItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400 text-xs italic">
                    No variants defined. Add options to generate variants.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Option 1 Name</label>
            <input type="text" className="w-full p-2 rounded-lg border-gray-200 text-sm font-bold" defaultValue="Size" />
            <div className="mt-2 flex gap-2">
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium">S</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium">M</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium">L</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Option 2 Name</label>
            <input type="text" className="w-full p-2 rounded-lg border-gray-200 text-sm font-bold" defaultValue="Color" />
            <div className="mt-2 flex gap-2">
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium">Black</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium">White</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
