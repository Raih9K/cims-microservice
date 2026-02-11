"use client";

import React from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";

export default function WarehouseTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Warehouse</Label>
          <Select
            options={[
              { value: "main", label: "Main Warehouse" },
              { value: "east", label: "East Coast Distribution" },
              { value: "west", label: "West Coast Hub" },
            ]}
            onChange={() => {}}
            placeholder="Select Warehouse"
          />
        </div>
        <div className="space-y-2">
          <Label>Bin / Rack Location</Label>
          <Select
            options={[
              { value: "a1", label: "A-1" },
              { value: "a2", label: "A-2" },
              { value: "b1", label: "B-1" },
            ]}
            onChange={() => {}}
            placeholder="Select Location"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Location Note</Label>
          <TextArea placeholder="Specific instructions for finding this item..." rows={3} />
        </div>
      </div>
    </div>
  );
}
