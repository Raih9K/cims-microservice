"use client";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { PlusIcon } from "@/icons";
import { useState } from "react";

interface WarehouseNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  warehouses: any[];
  onAllocate: (data: any) => void;
  onCreateWarehouse: () => void;
}

export default function WarehouseNodeModal({
  isOpen,
  onClose,
  warehouses,
  onAllocate,
  onCreateWarehouse,
}: WarehouseNodeModalProps) {
  // Allocate State
  const [allocationData, setAllocationData] = useState({
    warehouse: warehouses.find(wh => wh.is_default)?.id || warehouses[0]?.id || "",
    available: 0,
    binLocations: [""],
    priorityOrder: 0
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-8 rounded-[2rem] transition-all duration-300 max-w-md"
    >
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Allocate Warehouse Stock</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Distribute inventory across your fulfillment network.</p>
      </div>

      <div className="space-y-6">
        {/* Node Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Warehouse</label>
            <button
              onClick={onCreateWarehouse}
              className="text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              Create New
            </button>
          </div>
          <Select
            value={allocationData.warehouse}
            options={warehouses.map(wh => ({
              value: wh.id,
              label: wh.is_default ? `${wh.name} (Primary)` : wh.name
            }))}
            onChange={(value) => setAllocationData({ ...allocationData, warehouse: value })}
            className="h-12 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700"
            placeholder="Select a node"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Initial Qty</label>
            <Input
              type="number"
              placeholder="0"
              value={allocationData.available}
              onChange={(e) => setAllocationData({ ...allocationData, available: parseInt(e.target.value) || 0 })}
              className="h-12 font-mono text-sm rounded-2xl text-center bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 focus:border-brand-500"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Priority</label>
            <Input
              type="number"
              placeholder="0"
              value={allocationData.priorityOrder}
              onChange={(e) => setAllocationData({ ...allocationData, priorityOrder: parseInt(e.target.value) || 0 })}
              className="h-12 font-mono text-sm rounded-2xl text-center bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 focus:border-brand-500"
            />
          </div>
        </div>

        {/* Info Note */}
        <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100/50 dark:border-blue-900/20">
          <p className="text-[11px] text-blue-600 dark:text-blue-400 leading-relaxed">
            <strong>Pro Tip:</strong> Priority 0 is the highest rank. Orders are fulfilled from high-priority nodes first.
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          className="h-12 px-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest border-gray-200 dark:border-gray-800"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onAllocate(allocationData)}
          className="h-12 px-8 rounded-2xl bg-brand-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20"
        >
          Allocate Stock
        </Button>
      </div>
    </Modal>
  );
}
