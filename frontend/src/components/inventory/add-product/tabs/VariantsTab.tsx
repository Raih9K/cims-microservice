"use client";
import Label from "@/components/form/Label";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";
import { Drawer } from "@/components/ui/drawer/Drawer";
import { useProductForm } from "@/context/ProductFormContext";
import { InfoIcon, PlusIcon, TrashBinIcon } from "@/icons";
import { productService } from "@/services/productService";
import React, { useEffect, useState } from "react";

export default function VariantsTab() {
  const { data, updateVariants } = useProductForm();
  const { themes, hasVariation, variantItems } = data.variants;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [themeInput, setThemeInput] = useState("");
  const [valueInputs, setValueInputs] = useState<{ [key: number]: string }>({});
  const [dbAttributes, setDbAttributes] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await productService.getAttributes();
        if (res.success && res.data) {
          setDbAttributes(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch attributes", err);
      }
    };
    fetchAttributes();
  }, []);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleToggleVariations = (checked: boolean) => {
    if (checked) {
      updateVariants({ hasVariation: true });
      if (themes.length === 0) {
        setIsDrawerOpen(true);
      }
    } else {
      updateVariants({ hasVariation: false });
    }
  };

  // Improved combination generator that preserves data
  const syncVariantItems = (updatedThemes: any[]) => {
    const activeThemes = updatedThemes.filter(t => t.values.length > 0);
    if (activeThemes.length === 0) return [];

    const generateCombos = (depth: number, currentCombo: { [key: string]: string }): any[] => {
      if (depth === activeThemes.length) {
        return [currentCombo];
      }

      const theme = activeThemes[depth];
      return theme.values.flatMap((val: string) =>
        generateCombos(depth + 1, { ...currentCombo, [theme.name]: val })
      );
    };

    const newCombos = generateCombos(0, {});

    // Map new combos to variant items, preserving existing data if combo matches
    return newCombos.map(combo => {
      const existingItem = variantItems.find(item =>
        Object.keys(combo).every(key => item.combination[key] === combo[key]) &&
        Object.keys(item.combination).length === Object.keys(combo).length
      );

      if (existingItem) return existingItem;

      // Auto-generate SKU based on product SKU/Title + Variant Options
      const baseSku = (data.basicInfo.sku || data.basicInfo.title || "SKU").toUpperCase().replace(/\s+/g, '-').slice(0, 8);
      const variantSuffix = Object.values(combo).join('-').toUpperCase().replace(/\s+/g, '');
      const autoSku = `${baseSku}-${variantSuffix}`;

      return {
        id: Math.random().toString(36).substr(2, 9),
        combination: combo,
        sku: autoSku,
        title: data.basicInfo.title || "",
        barcode: "",
        price: data.basicInfo.retailPrice || "0",
        quantity: "0",
        minQuantity: "0",
        warehouse: "Default",
        stocks: [
          {
            id: Math.random().toString(36).substr(2, 9),
            warehouse: "Default",
            sku: autoSku,
            available: 0,
            reserved: 0,
            binLocations: [""],
            priorityOrder: 0,
            isDefault: true
          }
        ]
      };
    });
  };

  const updateVariantField = (id: string, field: string, value: string) => {
    const newItems = variantItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateVariants({ variantItems: newItems });
  };

  const handleCreateAttribute = async (name: string) => {
    if (!name.trim()) return;
    try {
      // Check if already exists in DB to avoid duplicate call if user ignores auto-complete
      const existing = dbAttributes.find(a => a.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        setThemeInput(existing.name);
        // handleAddTheme will be called if I call it, but let's just let user press enter or click add
        // Actually, if they clicked "Create", they expect creation.
        // IF it exists locally, just select it.
        return;
      }

      const res = await productService.createAttribute({ name: name.trim(), type: 'select', values: [] });
      if (res.success && res.data) {
        setDbAttributes([...dbAttributes, res.data]);
        setThemeInput(res.data.name);
        // Optionally auto-add to the product themes
        // handleAddTheme();
      }
    } catch (err) {
      console.error("Failed to create attribute", err);
    }
  };

  const handleAddTheme = () => {
    const trimmed = themeInput.trim();
    if (trimmed && !themes.find(t => t.name.toLowerCase() === trimmed.toLowerCase())) {
      const newThemes = [...themes, { name: trimmed, values: [] }];
      const newItems = syncVariantItems(newThemes);
      updateVariants({ themes: newThemes, variantItems: newItems });
      setThemeInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTheme();
    }
  };

  const removeTheme = (index: number) => {
    const newThemes = [...themes];
    newThemes.splice(index, 1);
    const newItems = syncVariantItems(newThemes);
    updateVariants({ themes: newThemes, variantItems: newItems });
    setValueInputs({});
  };

  const handleValueInputChange = (index: number, val: string) => {
    setValueInputs({ ...valueInputs, [index]: val });
  };

  const addValue = (index: number, val: string) => {
    const trimmed = val.trim();
    if (trimmed) {
      const newThemes = JSON.parse(JSON.stringify(themes));
      if (!newThemes[index].values.includes(trimmed)) {
        newThemes[index].values.push(trimmed);
        const newItems = syncVariantItems(newThemes);
        updateVariants({ themes: newThemes, variantItems: newItems });
      }
      setValueInputs({ ...valueInputs, [index]: "" });
    }
  };

  const removeValue = (themeIndex: number, valueIndex: number) => {
    const newThemes = JSON.parse(JSON.stringify(themes));
    newThemes[themeIndex].values.splice(valueIndex, 1);
    const newItems = syncVariantItems(newThemes);
    updateVariants({ themes: newThemes, variantItems: newItems });
  };

  const handleValueInputKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addValue(index, valueInputs[index] || "");
    } else if (e.key === 'Backspace' && !valueInputs[index]) {
      const currentValues = themes[index].values;
      if (currentValues.length > 0) {
        removeValue(index, currentValues.length - 1);
      }
    }
  };

  const saveVariation = () => {
    updateVariants({ hasVariation: true });
    setIsDrawerOpen(false);
  };

  const resetVariation = () => {
    updateVariants({ hasVariation: false, themes: [] });
    setValueInputs({});
  };


  return (
    <div className="space-y-6 animate-fadeIn pb-6 max-w-6xl">
      {/* Section 1: Themes */}
      <section className="space-y-8">
        <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium text-gray-900 dark:text-white">Product Variations</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create variants based on size, color, or other attributes</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenDrawer}
                className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Manage Variations
              </button>
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Variations</span>
                <Switch
                  id="has-variation"
                  checked={hasVariation}
                  onChange={handleToggleVariations}
                  label=""
                />
              </div>
            </div>
          </div>
        </div>

        {hasVariation && themes.length > 0 && (
          <div className="flex flex-wrap gap-3 animate-fadeIn">
            {themes.map((theme: any, tIdx: number) => (
              <div key={tIdx} className="bg-brand-50/50 dark:bg-brand-500/5 border border-brand-200 dark:border-brand-500/20 px-5 py-3 rounded-2xl flex items-center gap-4 group">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-brand-600/70 dark:text-brand-400/70 font-medium">{theme.name}</span>
                  <span className="text-sm font-medium text-brand-700 dark:text-brand-300">{theme.values.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Variant Combinations */}
      {hasVariation && variantItems.length > 0 ? (
        <section className="space-y-8">
          <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-medium text-gray-900 dark:text-white">Generated Variants</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure pricing and SKU for each variant combination</p>
              </div>
              <span className="text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
                {variantItems.length} Variants
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm flex flex-col max-h-[500px]">
            <div className="overflow-auto flex-1 custom-scrollbar">
              <table className="w-full text-left border-collapse relative">
                <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    {Object.keys(variantItems[0]?.combination || {}).map((key) => (
                      <th key={key} className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 capitalize min-w-[100px] whitespace-nowrap">
                        {key}
                      </th>
                    ))}
                    <th className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[180px] whitespace-nowrap">Title</th>
                    <th className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[150px] whitespace-nowrap">SKU</th>
                    <th className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[150px] whitespace-nowrap">Barcode</th>
                    <th className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 text-center min-w-[120px] whitespace-nowrap">Price</th>
                    <th className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 text-center min-w-[60px] whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {variantItems.map((variant: any) => (
                    <tr key={variant.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                      {Object.values(variant.combination).map((val: any, idx: number) => (
                        <td key={idx} className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {val}
                          </span>
                        </td>
                      ))}
                      <td className="py-4 px-4">
                        <input
                          value={variant.title}
                          onChange={(e) => updateVariantField(variant.id, 'title', e.target.value)}
                          placeholder="Variant Title"
                          className="w-full h-9 text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg px-3 focus:border-brand-500 focus:outline-none transition-all"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <input
                          value={variant.sku}
                          onChange={(e) => updateVariantField(variant.id, 'sku', e.target.value)}
                          placeholder="SKU"
                          className="w-full h-9 text-sm font-mono bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg px-3 focus:border-brand-500 focus:outline-none transition-all"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <input
                          value={variant.barcode || ""}
                          onChange={(e) => updateVariantField(variant.id, 'barcode', e.target.value)}
                          placeholder="Barcode"
                          className="w-full h-9 text-sm font-mono bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg px-3 focus:border-brand-500 focus:outline-none transition-all"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">$</span>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => updateVariantField(variant.id, 'price', e.target.value)}
                            className="w-full h-9 pl-6 text-sm text-center bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg px-2 focus:border-brand-500 focus:outline-none transition-all"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => updateVariants({ variantItems: variantItems.filter((v: any) => v.id !== variant.id) })}
                          className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                          title="Remove Variant"
                        >
                          <TrashBinIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : hasVariation ? (
        <div className="py-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50/30 dark:bg-gray-900/10">
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure variation themes to generate variants</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start pt-12 pb-12 px-4 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50/30 dark:bg-gray-900/10 animate-fadeIn">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 mb-8 shadow-sm">
            <PlusIcon className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-tight">Setup Variations</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-10 leading-relaxed font-medium">
            Enable variations to manage products with multiple attributes like colors, sizes or materials.
          </p>
          {!hasVariation ? (
            <button
              onClick={() => handleToggleVariations(true)}
              className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Enable Variations
            </button>
          ) : (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-10 py-4 bg-brand-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-500/20"
            >
              Add Your First Theme
            </button>
          )}
        </div>
      )}

      {/* Shared Drawer for Add/Edit */}
      <Drawer className="w-full md:!max-w-[50vw]"
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={hasVariation ? "Edit Variation Themes" : "Add Variation Themes"}
        footer={
          <div className="flex justify-end gap-3 w-full p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)} className="px-6 h-11 rounded-xl text-xs font-semibold">Cancel</Button>
            <Button onClick={saveVariation} className="bg-brand-500 hover:bg-brand-600 text-white border-transparent px-6 h-11 rounded-xl text-xs font-semibold shadow-glow">
              {hasVariation ? "Update Variations" : "Confirm Themes"}
            </Button>
          </div>
        }
      >
        <div className="p-8 space-y-10">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Variation Theme Name</Label>
            <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl min-h-[64px] shadow-sm focus-within:border-brand-500 transition-all cursor-text" onClick={() => document.getElementById('theme-input')?.focus()}>
              {themes.map((theme: any, idx: number) => (
                <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 animate-fadeIn">
                  {theme.name}
                  <button
                    onClick={(e) => { e.stopPropagation(); removeTheme(idx); }}
                    className="hover:text-red-500 text-gray-400 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </span>
              ))}

              <div className="relative flex-1 min-w-[200px]">
                <input
                  id="theme-input"
                  className="w-full bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 font-medium"
                  placeholder={themes.length === 0 ? "e.g. Color, Size, Style..." : "Add another theme..."}
                  value={themeInput}
                  onChange={(e) => {
                    setThemeInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
                {showSuggestions && (
                  <div className="absolute top-full left-0 min-w-[200px] w-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-h-56 overflow-y-auto z-50 py-1">
                    {(dbAttributes || [])
                      .filter(attr => !themeInput || attr.name.toLowerCase().includes(themeInput.toLowerCase()))
                      .filter(attr => !themes.find((t: any) => t.name.toLowerCase() === attr.name.toLowerCase()))
                      .map((attr, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200 flex justify-between items-center group"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setThemeInput(attr.name);
                            setShowSuggestions(false);
                          }}
                        >
                          {attr.name}
                          <span className="text-[10px] text-gray-400 group-hover:text-brand-500 hidden group-hover:inline-block">Select</span>
                        </div>
                      ))
                    }

                    {/* Create New Option */}
                    {themeInput && themeInput.trim().length > 0 && !(dbAttributes || []).find(a => a.name.toLowerCase() === themeInput.trim().toLowerCase()) && (
                      <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1 px-2 pb-1 bg-gray-50/50 dark:bg-gray-800">
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-500/20 flex items-center gap-2 transition-colors"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleCreateAttribute(themeInput);
                            setShowSuggestions(false);
                          }}
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                          Add &quot;{themeInput}&quot; to Database
                        </button>
                      </div>
                    )}

                    {(!dbAttributes || dbAttributes.length === 0) && !themeInput && (
                      <div className="px-4 py-3 text-xs text-gray-400 text-center italic">No saved attributes found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center gap-2">
              Theme Values
              <span className="px-2 py-0.5 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-500 text-[10px] font-black">{themes.length} Active</span>
            </h4>

            {themes.length === 0 ? (
              <div className="text-center py-12 px-6 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl">
                <p className="text-gray-400 text-sm font-medium">Add a theme above to start defining its values.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {themes.map((theme: any, idx: number) => (
                  <div key={idx} className="space-y-3 animate-fadeIn">
                    <Label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Values for {theme.name} <span className="text-brand-500">*</span>
                    </Label>
                    <div className="space-y-3">
                      <div
                        className="flex flex-wrap gap-2 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl min-h-[56px] shadow-sm focus-within:border-brand-500 transition-all cursor-text"
                        onClick={() => document.getElementById(`value-input-${idx}`)?.focus()}
                      >
                        {theme.values.map((val: string, vIdx: number) => (
                          <span key={vIdx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-500/20">
                            {val}
                            <button
                              onClick={(e) => { e.stopPropagation(); removeValue(idx, vIdx); }}
                              className="hover:text-red-500 text-brand-300 transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                          </span>
                        ))}
                        <input
                          id={`value-input-${idx}`}
                          className="flex-1 bg-transparent border-none outline-none text-sm min-w-[150px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 font-medium"
                          placeholder={`Press Enter to add values`}
                          value={valueInputs[idx] || ""}
                          onChange={(e) => handleValueInputChange(idx, e.target.value)}
                          onKeyDown={(e) => handleValueInputKeyDown(idx, e)}
                        />
                      </div>
                      <div className="flex items-center gap-2 px-2">
                        <InfoIcon className="w-3.5 h-3.5 text-gray-300" />
                        <p className="text-[10px] text-gray-400 font-medium italic">
                          Separate values with comma (,) or press Enter
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
