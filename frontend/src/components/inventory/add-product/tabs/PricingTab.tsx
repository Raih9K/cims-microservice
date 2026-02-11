"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { useProductForm } from "@/context/ProductFormContext";

export default function PricingTab() {
  const { data, updatePricing } = useProductForm();
  const { costPrice, sellingPrice, discountType, discountValue, taxClass } = data.pricing;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Cost Price</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={costPrice}
            onChange={(e) => updatePricing({ costPrice: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Selling Price</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={sellingPrice}
            onChange={(e) => updatePricing({ sellingPrice: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Discount Type</Label>
           <Select
            value={discountType}
            options={[
              { value: "none", label: "No Discount" },
              { value: "percentage", label: "Percentage (%)" },
              { value: "fixed", label: "Fixed Amount ($)" },
            ]}
            onChange={(value) => updatePricing({ discountType: value })}
            placeholder="Select Discount Type"
          />
        </div>
        <div className="space-y-2">
          <Label>Discount Value</Label>
          <Input
            type="number"
            placeholder="0"
            value={discountValue}
            onChange={(e) => updatePricing({ discountValue: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Tax Class</Label>
           <Select
            value={taxClass}
            options={[
              { value: "standard", label: "Standard Rate" },
              { value: "reduced", label: "Reduced Rate" },
              { value: "zero", label: "Zero Rate" },
            ]}
            onChange={(value) => updatePricing({ taxClass: value })}
            placeholder="Select Tax Class"
          />
        </div>
      </div>
    </div>
  );
}
