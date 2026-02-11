"use client";

import React from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";

export default function MetaTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Product Status</Label>
          <Select
            options={[
              { value: "draft", label: "Draft" },
              { value: "active", label: "Active" },
              { value: "archived", label: "Archived" },
            ]}
            onChange={() => {}}
            placeholder="Select Status"
            defaultValue="draft"
          />
        </div>
        <div className="space-y-2">
          <Label>Visibility</Label>
          <Select
            options={[
              { value: "public", label: "Public" },
              { value: "internal", label: "Internal Only" },
            ]}
            onChange={() => {}}
            placeholder="Select Visibility"
            defaultValue="public"
          />
        </div>
        <div className="space-y-2">
           <Label>Created By</Label>
           <Input disabled value="Admin User" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Internal Notes</Label>
          <TextArea placeholder="Private notes for internal use only..." rows={3} />
        </div>
      </div>
    </div>
  );
}
