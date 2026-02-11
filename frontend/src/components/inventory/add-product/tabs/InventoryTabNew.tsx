"use client";
import Select from "@/components/form/Select";



import WarehouseFormDrawer from "@/components/inventory/warehouse/WarehouseFormDrawer";
import { useProductForm } from "@/context/ProductFormContext";
import { PlusIcon, TrashBinIcon } from "@/icons";
import { productService } from "@/services/productService";
import { useCallback, useEffect, useMemo, useState } from "react";
import WarehouseNodeModal from "./WarehouseNodeModal";

interface WarehouseStock {
  id: string;
  warehouse: string;
  sku: string;
  available: number;
  reserved: number;
  binLocations: string[];
  priorityOrder: number;
  isDefault: boolean;
}

const generateStockId = () => {
  return Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
};

const StockAllocationTable = ({
  stocks,
  warehouses,
  onUpdateStock,
  onUpdateBin,
  onAddBin,
  onRemoveBin,
  onSetDefault,
  onRemoveStock,
  onAllocateNode,
  title = "Stock Allocation",
  subtitle = "Manage warehouse nodes"
}: {
  stocks: WarehouseStock[];
  warehouses: any[];
  onUpdateStock: (id: string, field: string, value: any) => void;
  onUpdateBin: (stockId: string, binIndex: number, value: string) => void;
  onAddBin: (stockId: string) => void;
  onRemoveBin: (stockId: string, binIndex: number) => void;
  onSetDefault: (stockId: string) => void;
  onRemoveStock: (stockId: string) => void;
  onAllocateNode: () => void;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">{title}</h2>
          <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 uppercase">
            {stocks.length} Nodes
          </span>
        </div>
        <button
          onClick={onAllocateNode}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 text-white rounded-lg text-[10px] font-bold hover:bg-brand-600 active:scale-95 transition-all shadow-sm"
        >
          <PlusIcon className="w-3 h-3" />
          Add Node
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-2.5 px-4 text-[9px] font-black uppercase tracking-widest text-gray-400 w-[25%]">Warehouse Node</th>
                <th className="py-2.5 px-3 text-[9px] font-black uppercase tracking-widest text-gray-400 text-center w-[12%]">Available</th>
                <th className="py-2.5 px-3 text-[9px] font-black uppercase tracking-widest text-gray-400 text-center w-[12%]">Reserved</th>
                <th className="py-2.5 px-4 text-[9px] font-black uppercase tracking-widest text-gray-400 w-[40%]">Bin Locations</th>
                <th className="py-2.5 px-4 text-[9px] font-black uppercase tracking-widest text-gray-400 text-right w-[11%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {stocks.map((stock) => (
                <tr key={stock.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                  <td className="py-2 px-4">
                    <Select
                      value={stock.warehouse}
                      options={warehouses.map(wh => ({
                        value: wh.id,
                        label: wh.is_default ? `${wh.name} (P)` : wh.name
                      }))}
                      onChange={(value) => onUpdateStock(stock.id, 'warehouse', value)}
                      className="h-8 text-[11px] font-bold bg-white dark:bg-gray-800 rounded-lg border-gray-100 dark:border-gray-700 px-2"
                      placeholder="Node..."
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input
                      type="number"
                      min="0"
                      value={stock.available}
                      onChange={(e) => onUpdateStock(stock.id, 'available', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full h-8 text-[11px] text-center font-black bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border-0 focus:ring-1 focus:ring-brand-500"
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input
                      type="number"
                      min="0"
                      value={stock.reserved || 0}
                      onChange={(e) => onUpdateStock(stock.id, 'reserved', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full h-8 text-[11px] text-center font-black bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border-0 focus:ring-1 focus:ring-brand-500 text-amber-600 dark:text-amber-500"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex flex-wrap gap-1 items-center">
                      {stock.binLocations.map((bin: string, bIdx: number) => (
                        <div key={bIdx} className="relative group/bin flex items-center">
                          <input
                            value={bin}
                            onChange={(e) => onUpdateBin(stock.id, bIdx, e.target.value)}
                            placeholder="BIN"
                            className="h-7 w-16 text-[9px] font-black text-center bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md focus:w-20 transition-all focus:border-brand-500 focus:ring-0"
                          />
                          {stock.binLocations.length > 1 && (
                            <button
                              onClick={() => onRemoveBin(stock.id, bIdx)}
                              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/bin:opacity-100 transition-all z-10"
                            >
                              <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => onAddBin(stock.id)}
                        className="h-7 px-2 flex items-center justify-center rounded-md bg-white dark:bg-gray-800 text-brand-500 hover:bg-brand-500 hover:text-white transition-all border border-dashed border-gray-200 dark:border-gray-700"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {stock.isDefault ? (
                        <div className="px-2 py-0.5 bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 rounded-md text-[8px] font-black uppercase tracking-tighter">
                          PRIORITY
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => onSetDefault(stock.id)}
                            className="p-1.5 text-gray-300 hover:text-brand-500 transition-colors"
                            title="Set as Default"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </button>
                          <button
                            onClick={() => onRemoveStock(stock.id)}
                            className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <TrashBinIcon className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function InventoryTab() {
  const { data, updateInventory, updateVariants } = useProductForm();
  const stocks = data.inventory.stocks as unknown as WarehouseStock[];
  const variants = useMemo(() => data.variants?.variantItems || [], [data.variants?.variantItems]);
  const hasVariants = variants.length > 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isCreateWarehouseModalOpen, setIsCreateWarehouseModalOpen] = useState(false);
  const [warehouses, setWarehouses] = useState<any[]>([]);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const activeVariant = variants.find((v: any) => v.id === selectedVariantId);
  const activeVariantStocks = (activeVariant as any)?.stocks || [];

  const [newStockData, setNewStockData] = useState<Partial<WarehouseStock>>({
    warehouse: "",
    available: 0,
    binLocations: [""],
    priorityOrder: 0
  });

  const [isWarehouseDrawerOpen, setIsWarehouseDrawerOpen] = useState(false);

  const fetchWarehouses = useCallback(async () => {
    try {
      const response = await productService.getWarehouses();
      if (response.success && response.data) {
        setWarehouses(response.data);
        // Find and set the default warehouse automatically using functional update to avoid dependency
        setNewStockData(prev => {
          if (!prev.warehouse) {
            const defaultWarehouse = response.data.find((wh: any) => wh.is_default);
            if (defaultWarehouse) {
              return { ...prev, warehouse: defaultWarehouse.name };
            } else if (response.data.length > 0) {
              // If no default warehouse, select the first one
              return { ...prev, warehouse: response.data[0].name };
            }
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    }
  }, []);

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  // Ensure variants and main product have at least one default warehouse assigned
  useEffect(() => {
    if (warehouses.length === 0) return;

    const defaultWh = warehouses.find(w => w.is_default) || warehouses[0];
    if (!defaultWh) return;

    if (hasVariants) {
      let updated = false;
      const newVariants = variants.map(v => {
        if (!v.stocks || v.stocks.length === 0) {
          updated = true;
          return {
            ...v,
            stocks: [{
              id: generateStockId(),
              warehouse: defaultWh.id,
              sku: v.sku || "",
              available: 0,
              reserved: 0,
              binLocations: [""],
              priorityOrder: 0,
              isDefault: true
            }]
          };
        }
        return v;
      });

      if (updated) {
        updateVariants({ variantItems: newVariants });
      }
    } else {
      // Main product
      if (stocks.length === 0) {
        const newStock = {
          id: generateStockId(),
          warehouse: defaultWh.id,
          sku: "",
          available: 0,
          reserved: 0,
          binLocations: [""],
          priorityOrder: 0,
          isDefault: true
        };
        // Use updateInventory only if we are sure it won't cause loop.
        // stocks is a prop/context.
        updateInventory({ stocks: [newStock] as any });
      }
    }
  }, [warehouses, variants.length, stocks.length, hasVariants, updateInventory, updateVariants, variants]);


  const handleAddWarehouse = (overrideData?: Partial<WarehouseStock>) => {
    // Determine the default SKU from the active variant or the main product
    const defaultSku = selectedVariantId ? activeVariant?.sku : (data as any).sku;
    const dataToUse = overrideData || newStockData;

    const newStock: WarehouseStock = {
      id: generateStockId(),
      warehouse: dataToUse.warehouse || warehouses.find(w => w.is_default)?.id || warehouses[0]?.id || "",
      sku: defaultSku || "",
      available: dataToUse.available || 0,
      reserved: 0,
      binLocations: dataToUse.binLocations || [""],
      priorityOrder: dataToUse.priorityOrder || (selectedVariantId ? activeVariantStocks.length : stocks.length),
      isDefault: false
    };

    if (selectedVariantId) {
      // Update specific variant's stock
      updateVariants({
        variantItems: variants.map(v => v.id === selectedVariantId
          ? { ...v, stocks: [...(v.stocks || []), newStock] }
          : v
        )
      });
    } else {
      // Update main product's stock
      updateInventory({ stocks: [...stocks, newStock] as any });
    }

    setIsModalOpen(false);

    // Reset form with a valid default warehouse
    const defaultWh = warehouses.find(w => w.is_default)?.id || warehouses[0]?.id || "";
    setNewStockData({ warehouse: defaultWh, sku: "", available: 0, binLocations: [""], priorityOrder: 0 });
  };

  const removeWarehouse = (id: string, variantId?: string) => {
    if (variantId) {
      const variant = variants.find(v => v.id === variantId);
      if (variant && (variant.stocks || []).length <= 1) {
        // Cannot remove the last warehouse node
        return;
      }

      updateVariants({
        variantItems: variants.map(v => v.id === variantId
          ? { ...v, stocks: (v.stocks || []).filter((s: any) => s.id !== id) }
          : v
        )
      });
    } else {
      if (stocks.length <= 1) {
        // Cannot remove the last warehouse node
        return;
      }
      updateInventory({ stocks: stocks.filter(s => s.id !== id) as any });
    }
  };

  const updateStock = (id: string, field: keyof WarehouseStock, value: any, variantId?: string) => {
    if (variantId) {
      updateVariants({
        variantItems: variants.map(v => v.id === variantId
          ? { ...v, stocks: (v.stocks || []).map((s: any) => s.id === id ? { ...s, [field]: value } : s) }
          : v
        )
      });
    } else {
      updateInventory({ stocks: stocks.map(s => s.id === id ? { ...s, [field]: value } : s) as any });
    }
  };

  const addBinLocation = (stockId: string, variantId?: string) => {
    const targetStocks = variantId ? (variants.find(v => v.id === variantId)?.stocks || []) : stocks;
    const stock = targetStocks.find((s: any) => s.id === stockId);
    if (stock) {
      const newBins = [...stock.binLocations, ""];
      updateStock(stockId, 'binLocations', newBins, variantId);
    }
  };

  const removeBinLocation = (stockId: string, index: number, variantId?: string) => {
    const targetStocks = variantId ? (variants.find(v => v.id === variantId)?.stocks || []) : stocks;
    const stock = targetStocks.find((s: any) => s.id === stockId);
    if (stock && stock.binLocations.length > 1) {
      const newBins = [...stock.binLocations];
      newBins.splice(index, 1);
      updateStock(stockId, 'binLocations', newBins, variantId);
    }
  };

  const updateBinValue = (stockId: string, index: number, val: string, variantId?: string) => {
    const targetStocks = variantId ? (variants.find(v => v.id === variantId)?.stocks || []) : stocks;
    const stock = targetStocks.find((s: any) => s.id === stockId);
    if (stock) {
      const newBins = [...stock.binLocations];
      newBins[index] = val;
      updateStock(stockId, 'binLocations', newBins, variantId);
    }
  };

  const setAsDefault = (id: string, variantId?: string) => {
    if (variantId) {
      updateVariants({
        variantItems: variants.map(v => v.id === variantId
          ? { ...v, stocks: (v.stocks || []).map((s: any) => ({ ...s, isDefault: s.id === id })) }
          : v
        )
      });
    } else {
      updateInventory({ stocks: stocks.map(s => ({ ...s, isDefault: s.id === id })) as any });
    }
  };

  return (
    <div className="space-y-16 animate-fadeIn pb-16 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium text-gray-900 dark:text-white">Warehouse & Stock Management</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage inventory across multiple warehouse locations</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCreateWarehouseModalOpen(true)}
                className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Manage Warehouses
              </button>
              <button
                type="button"
                onClick={() => setIsLogOpen(true)}
                className="px-5 py-2.5 bg-brand-50 dark:bg-brand-500/10 border border-brand-200/50 dark:border-brand-500/20 rounded-xl text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-all"
              >
                View History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Variants Info - Show when variants exist */}
      {hasVariants && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/5 dark:to-pink-500/5 border border-purple-200 dark:border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Product Variants ({variants.length})</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Manage inventory for each variant separately</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {variants.map((variant, index) => (
              <div
                key={variant.id}
                className="bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-500/30 rounded-xl p-3 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-md flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{variant.title}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">SKU: {variant.sku || 'N/A'}</p>
                    {variant.price && (
                      <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold mt-1">${variant.price}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 border border-purple-200/50 dark:border-purple-500/20 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-purple-600 dark:text-purple-400">Note:</span> The inventory below applies to the main product. Each variant can have its own stock levels managed separately.
            </p>
          </div>
        </div>
      )}

      {hasVariants ? (
        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-[1fr_200px_150px_120px] px-8 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100 dark:border-gray-800">
            <span>Variant Identity</span>
            <span>Primary SKU</span>
            <span className="text-center">Nodes Active</span>
            <span className="text-center">Action</span>
          </div>

          {variants.map((variant) => {
            const variantStocks = (variant as any).stocks || [];
            const totalAvailable = variantStocks.reduce((sum: number, s: any) => sum + (s.available || 0), 0);
            const isExpanded = selectedVariantId === variant.id;

            return (
              <div key={variant.id} className={`flex flex-col bg-white dark:bg-gray-900 border ${isExpanded ? 'border-brand-500 ring-1 ring-brand-500/20' : 'border-gray-200 dark:border-gray-800'} rounded-[2rem] transition-all duration-300 shadow-sm overflow-hidden`}>
                {/* Summary Row */}
                <div
                  className={`grid grid-cols-[1fr_200px_150px_120px] items-center px-8 py-6 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors ${isExpanded ? 'bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-800' : ''}`}
                  onClick={() => setSelectedVariantId(isExpanded ? null : variant.id)}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">{variant.title}</span>
                    <span className="text-[10px] text-gray-400 font-medium mt-0.5">COMBINATION: {(variant as any).combination ? Object.values((variant as any).combination).join(' • ') : ''}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-600 dark:text-gray-400">{variant.sku || 'UNALLOCATED'}</span>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-black text-brand-500">{totalAvailable}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{variantStocks.length} LOCATIONS</span>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariantId(isExpanded ? null : variant.id);
                      }}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all mobile-hover:scale-105 ${isExpanded
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-brand-500 dark:hover:bg-brand-500 hover:text-white'
                        }`}
                    >
                      {isExpanded ? 'Close' : 'Edit Stock'}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-6 bg-gray-50/30 dark:bg-gray-900/50 animate-fadeIn">
                    <StockAllocationTable
                      stocks={variantStocks}
                      warehouses={warehouses}
                      title="Stock Allocation"
                      subtitle="Manage warehouse nodes for this variant"
                      onAllocateNode={() => setIsModalOpen(true)}
                      onUpdateStock={(id, field, value) => updateStock(id, field as keyof WarehouseStock, value, variant.id)}
                      onUpdateBin={(id, idx, value) => updateBinValue(id, idx, value, variant.id)}
                      onAddBin={(id) => addBinLocation(id, variant.id)}
                      onRemoveBin={(id, idx) => removeBinLocation(id, idx, variant.id)}
                      onSetDefault={(id) => setAsDefault(id, variant.id)}
                      onRemoveStock={(id) => removeWarehouse(id, variant.id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <StockAllocationTable
          stocks={stocks}
          warehouses={warehouses}
          title="Stock Allocation"
          subtitle="Manage warehouse nodes for the main product"
          onAllocateNode={() => setIsModalOpen(true)}
          onUpdateStock={(id, field, value) => updateStock(id, field as keyof WarehouseStock, value)}
          onUpdateBin={(id, idx, value) => updateBinValue(id, idx, value)}
          onAddBin={(id) => addBinLocation(id)}
          onRemoveBin={(id, idx) => removeBinLocation(id, idx)}
          onSetDefault={(id) => setAsDefault(id)}
          onRemoveStock={(id) => removeWarehouse(id)}
        />
      )}


      <WarehouseNodeModal
        key={isModalOpen ? 'open' : 'closed'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        warehouses={warehouses}
        onAllocate={(data) => {
          // Pass data to handleAddWarehouse to use instead of local state
          handleAddWarehouse(data);
        }}
        onCreateWarehouse={() => {
          setIsModalOpen(false);
          setIsWarehouseDrawerOpen(true);
        }}
      />

      <WarehouseFormDrawer
        key={isWarehouseDrawerOpen ? 'new-wh' : 'closed-wh'}
        isOpen={isWarehouseDrawerOpen}
        onClose={() => setIsWarehouseDrawerOpen(false)}
        onSuccess={() => {
          fetchWarehouses();
          setIsWarehouseDrawerOpen(false);
          // Re-open allocation modal
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}
