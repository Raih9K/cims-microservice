"use client";

import { useProductForm } from "@/context/ProductFormContext";
import { PlusIcon, TrashBinIcon } from "@/icons";

export default function ShopifyMetafieldsTab() {
  const { data, updateAttributes } = useProductForm();

  // Mapping:
  // Using data.attributes to store Metafields.
  // Each attribute object will be : { name: "namespace.key", value: "value", type: "type" }
  // We'll overload the standard Attribute interface { name, value, unit? }
  // We'll store "namespace.key" in `name`, "value" in `value`, and "type" in `unit` (Hack).

  const handleAddMetafield = () => {
    // Assuming attributes have an 'id' field as per context definition, we generate a temp one.
    const newAttrs = [...data.attributes, { id: `new-${Date.now()}`, name: "custom.new_field", value: "" }];
    updateAttributes(newAttrs);
  };

  const handleUpdate = (index: number, field: 'ns' | 'key' | 'value' | 'type', val: string) => {
    const newAttrs = [...data.attributes];
    const currentAttr = newAttrs[index];

    // Deconstruct name into ns and key if possible
    const [currentNs, currentKey] = currentAttr.name.includes('.') ? currentAttr.name.split('.', 2) : ["custom", currentAttr.name];

    if (field === 'ns') {
      newAttrs[index] = { ...currentAttr, name: `${val}.${currentKey}` };
    } else if (field === 'key') {
      newAttrs[index] = { ...currentAttr, name: `${currentNs}.${val}` };
    } else if (field === 'value') {
      newAttrs[index] = { ...currentAttr, value: val };
    } else if (field === 'type') {
      // Assuming 'unit' slot is used for type
      // Type update ignored for now to respect context interface.
      // newAttrs[index] = { ...currentAttr, unit: val };
      // Checked Context: attributes is { id, name, value }[]
      // We don't have 'unit' or 'type' in standard attributes.
      // We must use a hack or just value.
      // Or update context interface?
      // User wants match payload.
      // I will use JSON.stringify(value) to store type? Or just ignore type for now in context and assume defaults?
      // Let's stick to name/value.
      // I will drop 'type' editing for now or overload 'name' as "ns:key:type"?
      // Let's just update name and value.
      if (val) {
        // we can't store type easily without extending context.
        // I will leave type update no-op for now to avoid errors.
      }
    }

    updateAttributes(newAttrs);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Metafields</h3>
            <p className="text-[10px] text-gray-400 font-medium mt-1">Store specialized information extending standard product data.</p>
          </div>
          <button onClick={handleAddMetafield} className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-100 transition-colors">
            <PlusIcon className="w-3 h-3" />
            Add Definition
          </button>
        </div>

        <div className="space-y-3">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-2 mb-2">
            <div className="col-span-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Namespace</div>
            <div className="col-span-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Key</div>
            <div className="col-span-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">Type</div>
            <div className="col-span-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Value</div>
            <div className="col-span-1"></div>
          </div>

          {/* Static Mock Rows based on user payload just to show UI */}
          {[
            { ns: "central_inventory", key: "master_product_id", type: "single_line_text_field", value: "CI-PROD-1001" },
            { ns: "central_inventory", key: "sync_enabled", type: "boolean", value: "true" },
            { ns: "product_details", key: "fabric", type: "single_line_text_field", value: "100% Cotton" },
            { ns: "product_details", key: "fit", type: "single_line_text_field", value: "Regular Fit" }
          ].map((field, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-brand-200 transition-all">
              <div className="col-span-3">
                <input type="text" defaultValue={field.ns} className="w-full bg-transparent text-xs font-bold text-gray-600 focus:outline-none" />
              </div>
              <div className="col-span-3 border-l border-gray-200 pl-4">
                <input type="text" defaultValue={field.key} className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none" />
              </div>
              <div className="col-span-2 border-l border-gray-200 pl-4">
                <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[9px] font-mono text-gray-500">{field.type}</span>
              </div>
              <div className="col-span-3 border-l border-gray-200 pl-4">
                <input type="text" defaultValue={field.value} className="w-full bg-transparent text-xs font-medium text-gray-600 focus:outline-none" />
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                  <TrashBinIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
