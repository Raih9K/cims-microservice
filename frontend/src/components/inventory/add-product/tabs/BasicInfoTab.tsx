"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import SearchableSelect from "@/components/form/SearchableSelect";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Drawer } from "@/components/ui/drawer/Drawer";
import { useProductForm } from "@/context/ProductFormContext";
import { ShootingStarIcon } from "@/icons";
import { productService } from "@/services/productService";
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";

export default function BasicInfoTab() {
  const { data, updateBasicInfo } = useProductForm();
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [brandsList, setBrandsList] = useState<any[]>([]);
  const basicInfo = data.basicInfo;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          productService.getCategories(),
          productService.getBrands()
        ]);
        if (catRes.success) setCategoriesList(catRes.data || []);
        if (brandRes.success) setBrandsList(brandRes.data || []);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    };
    fetchData();
  }, []);

  // Get all countries formatted for Select
  const countries = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  // Get states based on selected country
  const states = basicInfo.manufacturedCountry
    ? State.getStatesOfCountry(basicInfo.manufacturedCountry).map((s) => ({
      value: s.isoCode,
      label: s.name,
    }))
    : [];

  // Get cities based on selected state
  const cities = (basicInfo.manufacturedCountry && basicInfo.manufacturedState)
    ? City.getCitiesOfState(basicInfo.manufacturedCountry, basicInfo.manufacturedState).map((c) => ({
      value: c.name,
      label: c.name,
    }))
    : [];

  const handleCountryChange = (val: string) => {
    updateBasicInfo("manufacturedCountry", val);
    updateBasicInfo("manufacturedState", "");
    updateBasicInfo("manufacturedCity", "");
  };

  const handleStateChange = (val: string) => {
    updateBasicInfo("manufacturedState", val);
    updateBasicInfo("manufacturedCity", "");
  };

  const handleCreateCategory = async (name: string) => {
    try {
      const res = await productService.createCategory({
        category_name: name,
        status: 'active'
      });
      if (res.success && res.data) {
        const response = await productService.getCategories();
        if (response.success) setCategoriesList(response.data || []);
        updateBasicInfo("category", res.data.category_name);
      }
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  const handleCreateBrand = async (name: string) => {
    try {
      const res = await productService.createBrand({
        brand_name: name,
        is_active: true
      });
      if (res.success && res.data) {
        const response = await productService.getBrands();
        if (response.success) setBrandsList(response.data || []);
        updateBasicInfo("brand", res.data.brand_name);
      }
    } catch (err) {
      console.error("Failed to create brand:", err);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-fadeIn pb-6 w-full">
        {/* Section 1: Product Identity */}
        <section className="space-y-5">
          <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Product Identity</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Basic information to identify your product</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">SKU <span className="text-red-500">*</span></Label>
              <Input
                placeholder="e.g. PRD-123456"
                value={basicInfo.sku}
                onChange={(e) => updateBasicInfo("sku", e.target.value)}
                className="h-11 text-base bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 rounded-xl font-mono"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Identifier</Label>
              <div className="flex gap-3">
                <div className="w-1/3">
                  <Select
                    options={[
                      { value: "upc", label: "UPC" },
                      { value: "ean", label: "EAN" },
                      { value: "isbn", label: "ISBN" },
                      { value: "asin", label: "ASIN" },
                    ]}
                    value={basicInfo.productIdentifierType || "upc"}
                    onChange={(val) => updateBasicInfo("productIdentifierType", val)}
                    className="h-11 text-base"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Identifier value"
                    value={basicInfo.productIdentifierValue}
                    onChange={(e) => updateBasicInfo("productIdentifierValue", e.target.value)}
                    className="h-11 text-base bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Title <span className="text-red-500">*</span></Label>
              <button onClick={() => setIsAIDrawerOpen(true)} type="button" className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
                <ShootingStarIcon className="w-4 h-4" />
                Use AI
              </button>
            </div>
            <Input
              placeholder="Enter a descriptive title for your product..."
              value={basicInfo.title}
              onChange={(e) => updateBasicInfo("title", e.target.value)}
              className="h-11 text-base bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-xl"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Recommended: 50-160 characters for optimal search visibility</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</Label>
              <SearchableSelect
                options={categoriesList.map(cat => ({
                  value: cat.category_name,
                  label: cat.category_name
                }))}
                value={basicInfo.category}
                onChange={(val) => updateBasicInfo("category", val)}
                onCreate={handleCreateCategory}
                placeholder="Search or select category"
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Condition <span className="text-red-500">*</span></Label>
              <Select
                options={[
                  { value: "new", label: "New" },
                  { value: "used", label: "Used" },
                  { value: "refurbished", label: "Refurbished" },
                ]}
                value={basicInfo.condition || "new"}
                onChange={(val) => updateBasicInfo("condition", val)}
                className="h-11 text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Brand <span className="text-red-500">*</span></Label>
              <SearchableSelect
                options={brandsList.map(brand => ({
                  value: brand.brand_name,
                  label: brand.brand_name
                }))}
                value={basicInfo.brand}
                onChange={(val) => updateBasicInfo("brand", val)}
                onCreate={handleCreateBrand}
                placeholder="Search or select brand"
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Manufacturer</Label>
              <Input
                placeholder="Manufacturer name"
                value={basicInfo.manufacturer}
                onChange={(e) => updateBasicInfo("manufacturer", e.target.value)}
                className="h-11 text-base bg-white dark:bg-gray-900 rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Pricing */}
        <section className="space-y-8">
          <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Pricing</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Set pricing information for this product</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">MSRP</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="h-11 pl-10 text-base bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-xl font-mono"
                  value={basicInfo.msrp}
                  onChange={(e) => updateBasicInfo("msrp", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cost</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="h-11 pl-10 text-base bg-white dark:bg-gray-900 font-mono rounded-xl"
                  value={basicInfo.purchasePrice}
                  onChange={(e) => updateBasicInfo("purchasePrice", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Retail Price <span className="text-red-500">*</span></Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500 text-base font-medium">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="h-11 pl-10 text-base bg-white dark:bg-gray-900 border-brand-500/30 focus:border-brand-500 font-mono font-medium rounded-xl"
                  value={basicInfo.retailPrice}
                  onChange={(e) => updateBasicInfo("retailPrice", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">MAP</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="h-11 pl-10 text-base bg-white dark:bg-gray-900 font-mono rounded-xl"
                  value={basicInfo.map}
                  onChange={(e) => updateBasicInfo("map", e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Physical Properties */}
        <section className="space-y-8">
          <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Physical Properties</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dimensions and weight specifications</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dimensions (L × W × H)</Label>
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-3 gap-2 flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 z-10">L</span>
                    <Input
                      type="number"
                      placeholder="0"
                      className="h-11 pl-7 pr-2 text-sm bg-white dark:bg-gray-900 font-mono rounded-xl border-gray-200 dark:border-gray-800 focus:border-brand-500 w-full"
                      value={basicInfo.dimensionLength}
                      onChange={(e) => updateBasicInfo("dimensionLength", e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 z-10">W</span>
                    <Input
                      type="number"
                      placeholder="0"
                      className="h-11 pl-7 pr-2 text-sm bg-white dark:bg-gray-900 font-mono rounded-xl border-gray-200 dark:border-gray-800 focus:border-brand-500 w-full"
                      value={basicInfo.dimensionWidth}
                      onChange={(e) => updateBasicInfo("dimensionWidth", e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 z-10">H</span>
                    <Input
                      type="number"
                      placeholder="0"
                      className="h-11 pl-7 pr-2 text-sm bg-white dark:bg-gray-900 font-mono rounded-xl border-gray-200 dark:border-gray-800 focus:border-brand-500 w-full"
                      value={basicInfo.dimensionHeight}
                      onChange={(e) => updateBasicInfo("dimensionHeight", e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-24 shrink-0">
                  <Select
                    options={[{ value: "inch", label: "Inch" }, { value: "cm", label: "Cm" }]}
                    value={basicInfo.dimensionUnit || "inch"}
                    onChange={(val) => updateBasicInfo("dimensionUnit", val)}
                    className="h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Weight</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="h-11 text-sm bg-white dark:bg-gray-900 font-mono rounded-xl border-gray-200 dark:border-gray-800"
                    value={basicInfo.weightValue}
                    onChange={(e) => updateBasicInfo("weightValue", e.target.value)}
                  />
                </div>
                <div className="w-24 shrink-0">
                  <Select
                    options={[{ value: "kg", label: "Kg" }, { value: "lb", label: "Lb" }, { value: "oz", label: "Oz" }]}
                    value={basicInfo.weightUnit || "kg"}
                    onChange={(val) => updateBasicInfo("weightUnit", val)}
                    className="h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Origin */}
        <section className="space-y-8">
          <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
            <h2 className="text-base font-medium text-gray-900 dark:text-white">Manufacturing & Origin</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Where this product is manufactured</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Country</label>
              <Select
                options={countries}
                value={basicInfo.manufacturedCountry}
                onChange={handleCountryChange}
                className="h-11 text-base bg-white dark:bg-gray-900"
                placeholder="Select Country"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">State / Province</label>
              <Select
                options={states}
                value={basicInfo.manufacturedState}
                onChange={handleStateChange}
                className="h-11 text-base bg-white dark:bg-gray-900"
                disabled={!basicInfo.manufacturedCountry}
                placeholder="Select State"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">City</label>
              <Select
                options={cities}
                value={basicInfo.manufacturedCity}
                onChange={(val) => updateBasicInfo("manufacturedCity", val)}
                className="h-11 text-base bg-white dark:bg-gray-900"
                disabled={!basicInfo.manufacturedState}
                placeholder="Select City"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Postal Code</label>
              <Input
                placeholder="Zip Code"
                value={basicInfo.manufacturedPostalCode}
                onChange={(e) => updateBasicInfo("manufacturedPostalCode", e.target.value)}
                className="h-11 text-base bg-white dark:bg-gray-900 rounded-xl"
              />
            </div>
          </div>
        </section>
      </div>

      {/* AI Assistant Drawer */}
      <Drawer
        isOpen={isAIDrawerOpen}
        onClose={() => setIsAIDrawerOpen(false)}
        title="AI Product Assistant"
        className="w-full md:!max-w-[50vw]"
        footer={
          <div className="flex justify-end gap-3 w-full p-6 border-t border-gray-100 dark:border-gray-800">
            <Button variant="outline" onClick={() => setIsAIDrawerOpen(false)} className="h-11 px-6 rounded-xl text-xs font-semibold">Close</Button>
            <Button onClick={() => setIsAIDrawerOpen(false)} className="h-11 px-6 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 shadow-sm">Apply & Close</Button>
          </div>
        }
      >
        <div className="p-8 space-y-8">
          {/* AI Prompt Input */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">AI Generation</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Describe your product and let AI generate optimized titles and descriptions</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Prompt <span className="text-red-500">*</span></Label>
                <div className="space-y-3">
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. A high-performance wireless gaming mouse with RGB lighting, 16000 DPI sensor, and ergonomic design..."
                    rows={4}
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                  />
                  <button
                    onClick={() => {
                      setIsGenerating(true);
                      // Simulate AI generation
                      setTimeout(() => {
                        setAiSuggestions([
                          `${basicInfo.brand || "Premium"} ${aiPrompt.slice(0, 50)}... - Professional Edition`,
                          `High-Performance ${aiPrompt.slice(0, 40)}... | ${basicInfo.category || "Electronics"}`,
                          `${basicInfo.brand || "Pro"} ${aiPrompt.slice(0, 45)}... - Advanced Features`
                        ]);
                        setIsGenerating(false);
                      }, 1500);
                    }}
                    disabled={!aiPrompt.trim() || isGenerating}
                    className="w-full h-11 px-6 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-brand-500/20 disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <ShootingStarIcon className="w-4 h-4" />
                        <span>Generate with AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">AI Suggestions</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Click to apply any suggestion to your product title</p>
              </div>

              <div className="space-y-3">
                {aiSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      updateBasicInfo("title", suggestion);
                      setIsAIDrawerOpen(false);
                    }}
                    className="w-full text-left p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-brand-500/50 hover:bg-brand-50/30 dark:hover:bg-brand-500/5 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 transition-colors">
                        <span className="text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:text-white">#{idx + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1 pt-1.5">{suggestion}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 p-4 bg-blue-50/50 dark:bg-blue-500/5 border border-blue-200/50 dark:border-blue-500/10 rounded-xl">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-blue-700 dark:text-blue-300">AI-generated titles are optimized for SEO and marketplace visibility</p>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}
