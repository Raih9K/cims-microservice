"use client";

import { PageSkeleton } from '@/components/common/SkeletonLoader';
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Icons
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const ListIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const GroupIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

// Type Definitions
interface Template {
  id: string;
  name: string;
  platform: string;
  type: string;
  status: string;
  fields: number;
  lastUpdated: string;
  category: string;
  version: string;
}

interface TaxonomyGroup {
  id: string;
  name: string;
  path: string;
  products_count: number;
}

// ============================================================================
// CONFIG SECTION (EDITABLE)
// ============================================================================
const pageConfig = {
  pageId: "listing-templates-v1",
  mockApiEndpoint: "/api/mock/listing-templates",
  dataMap: {
    templates: "templates",
    taxonomyGroups: "taxonomyGroups"
  }
};
// ============================================================================

export default function ListingTemplatesPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Drawer Handling
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'template' | 'taxonomy'>('none');

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Templates");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Editing States
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [editingTaxonomy, setEditingTaxonomy] = useState<TaxonomyGroup | null>(null);

  // Local state for attributes builder
  const [attributes, setAttributes] = useState([{ key: "Material", value: "Cotton" }]);

  // Mock Templates Data
  const [templates, setTemplates] = useState<Template[]>([]);
  const [taxonomyGroups, setTaxonomyGroups] = useState<TaxonomyGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(pageConfig.mockApiEndpoint);
        if (res.ok) {
          const data = await res.json();
          setTemplates(data.templates);
          setTaxonomyGroups(data.taxonomyGroups);
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load data");
      } finally {
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Selection Logic
  const toggleSelectAll = () => {
    // Only applies to Templates for now
    if (selectedIds.size === templates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(templates.map(t => t.id)));
    }
  };

  const toggleSelectOne = (id: string, e: React.SyntheticEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  // --- DRAWER ACTIONS ---

  // Template Actions
  const openTemplateDrawer = (template?: Template) => {
    setEditingTemplate(template || null);
    setActiveDrawer('template');
  };

  // Taxonomy Actions
  const openTaxonomyDrawer = (group?: TaxonomyGroup) => {
    setEditingTaxonomy(group || null);
    setActiveDrawer('taxonomy');
  };

  const closeDrawer = () => {
    setActiveDrawer('none');
    setEditingTemplate(null);
    setEditingTaxonomy(null);
  };

  // Attribute Builder Actions
  const addAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  const removeAttribute = (index: number) => {
    const newAttrs = [...attributes];
    newAttrs.splice(index, 1);
    setAttributes(newAttrs);
  };

  if (!isLoaded) return <PageSkeleton />;

  const getPlatformIcon = (platform: string, size = 20) => {
    const iconMap: Record<string, string> = {
      'Shopify': 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg',
      'Amazon': 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg',
      'eBay': 'https://www.vectorlogo.zone/logos/ebay/ebay-icon.svg'
    };

    if (iconMap[platform]) {
      return <Image src={iconMap[platform]} width={size} height={size} alt={platform} unoptimized className="object-contain" />;
    }
    return <div className={`w-[${size}px] h-[${size}px] bg-gray-200 rounded-full`} />;
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active': return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case 'Draft': return "bg-amber-50 text-amber-600 border-amber-100";
      case 'Archived': return "bg-gray-50 text-gray-400 border-gray-100";
      default: return "bg-gray-50 text-gray-400 border-gray-100";
    }
  };

  const filteredTemplates = templates.filter(t => {
    return t.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-screen bg-[#F9FAFB] text-gray-900 font-sans">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/settings" className="hover:text-blue-600 transition-colors">Settings</Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900">Listing Templates</span>
      </nav>

      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Template Registry</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manage cross-channel listing schemas and data blueprints.</p>
        </div>
        <div className="flex items-center gap-3">
          {activeTab === 'Templates' ? (
            <Button
              onClick={() => openTemplateDrawer()}
              className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest px-1">New Template</span>
            </Button>
          ) : (
            <Button
              onClick={() => openTaxonomyDrawer()}
              className="h-11 px-6 bg-gray-900 hover:bg-black text-white rounded-xl flex items-center gap-2 shadow-lg shadow-gray-900/20 transition-all active:scale-95"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest px-1">Add Group</span>
            </Button>
          )}
        </div>
      </div>

      {/* Top Filtering Tabs */}
      <div className="flex border-b border-gray-100 gap-8 mb-8 overflow-x-auto no-scrollbar">
        {["Templates", "Taxonomy Groups"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap relative ${activeTab === tab
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-400 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.02)] overflow-hidden min-h-[500px]">
        {activeTab === 'Templates' ? (
          <div className="overflow-x-auto no-scrollbar">
            <div className="min-w-[1000px]">
              {/* Grid Header */}
              <div
                className="grid gap-6 px-10 py-6 bg-gray-50/30 border-b border-gray-50 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400"
                style={{ gridTemplateColumns: "minmax(60px, 0.5fr) minmax(280px, 2.5fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(100px, 1fr) minmax(140px, 1fr) 120px" }}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={templates.length > 0 && selectedIds.size === templates.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500/10 cursor-pointer"
                  />
                  <span>ID</span>
                </div>
                <div>Template Name</div>
                <div>Platform</div>
                <div>Category</div>
                <div className="text-center">Fields</div>
                <div>Last Modified</div>
                <div className="text-center">Status</div>
              </div>

              {/* Grid Body */}
              <div className="divide-y divide-gray-50">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => openTemplateDrawer(template)}
                    className="grid gap-6 px-10 py-6 items-center hover:bg-gray-50/30 transition-all group cursor-pointer"
                    style={{ gridTemplateColumns: "minmax(60px, 0.5fr) minmax(280px, 2.5fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(100px, 1fr) minmax(140px, 1fr) 120px" }}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(template.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => toggleSelectOne(template.id, e)}
                        className="w-4 h-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500/10 cursor-pointer"
                      />
                      <span className="text-[11px] font-mono font-bold text-gray-300 group-hover:text-blue-600 transition-colors">#{template.id}</span>
                    </div>

                    <div>
                      <div className="font-bold text-sm text-gray-700 truncate pr-6 group-hover:text-blue-600 transition-colors" title={template.name}>
                        {template.name}
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{template.type} • {template.version}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border border-transparent ${template.platform === 'Shopify' ? 'bg-emerald-50 text-emerald-600' :
                        template.platform === 'Amazon' ? 'bg-orange-50 text-orange-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                        {getPlatformIcon(template.platform)}
                      </div>
                      <span className="text-xs font-bold text-gray-500">{template.platform}</span>
                    </div>

                    <div>
                      <span className="px-3 py-1 bg-gray-50/50 border border-gray-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:border-blue-100/30 group-hover:text-blue-500 transition-all">
                        {template.category}
                      </span>
                    </div>

                    <div className="text-center">
                      <span className="text-sm font-bold text-gray-700 font-mono">{template.fields}</span>
                    </div>

                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {template.lastUpdated}
                    </div>

                    <div className="flex justify-center">
                      <span className={`uppercase text-[9px] font-bold px-3 py-1 rounded-lg border tracking-[0.15em] transition-all ${getStatusStyle(template.status)}`}>
                        {template.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* TAXONOMY GROUP TABLE */
          <div className="overflow-x-auto no-scrollbar">
            <div className="min-w-[800px]">
              <div
                className="grid gap-6 px-10 py-6 bg-gray-50/30 border-b border-gray-50 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400"
                style={{ gridTemplateColumns: "100px 1fr 1fr 100px" }}
              >
                <div>Group ID</div>
                <div>Group Name</div>
                <div>Taxonomy Path</div>
                <div className="text-right">Products</div>
              </div>
              <div className="divide-y divide-gray-50">
                {taxonomyGroups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => openTaxonomyDrawer(group)}
                    className="grid gap-6 px-10 py-6 items-center hover:bg-gray-50/30 transition-all cursor-pointer group"
                    style={{ gridTemplateColumns: "100px 1fr 1fr 100px" }}
                  >
                    <div className="text-[11px] font-mono font-bold text-gray-400 group-hover:text-blue-600 transition-colors">{group.id}</div>
                    <div className="font-bold text-sm text-gray-700">{group.name}</div>
                    <div className="text-xs text-gray-500 font-mono bg-gray-100/50 px-2 py-1 rounded inline-block w-fit">{group.path}</div>
                    <div className="text-right text-sm font-bold text-gray-900">{group.products_count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================== */}
      {/*               DRAWER 1: TEMPLATES                          */}
      {/* ========================================================== */}
      {activeDrawer === 'template' && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={closeDrawer} />
          <div className="relative w-full max-w-[50vw] bg-white h-full shadow-2xl overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300">

            {/* Template Drawer Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                {editingTemplate ? getPlatformIcon(editingTemplate.platform, 24) : <PlusIcon className="w-6 h-6 text-gray-400" />}
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{editingTemplate ? 'Edit Template' : 'New Template'}</h2>
                  <p className="text-xs text-gray-500 font-medium">
                    {editingTemplate ? `Modify configuration for ${editingTemplate.name}` : 'Configure a new listing blueprint'}
                  </p>
                </div>
              </div>
              <button onClick={closeDrawer} className="w-8 h-8 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-400 transition-colors">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Template Configuration Form */}
            <div className="p-8 space-y-10 flex-1">
              {/* Basic Settings */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Identity</h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Template Name</label>
                    <input
                      type="text"
                      defaultValue={editingTemplate?.name}
                      placeholder="e.g. Shopify Premium Electronics v2"
                      className="w-full h-11 px-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 outline-none transition-all text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Platform Config */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Target Platform</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['Shopify', 'Amazon', 'eBay'].map(p => (
                    <button key={p} className={`flex flex-col items-center justify-center gap-2 h-20 rounded-2xl border transition-all group ${editingTemplate?.platform === p ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'}`}>
                      <div className={`${editingTemplate?.platform === p ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                        {getPlatformIcon(p, 24)}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${editingTemplate?.platform === p ? 'text-blue-700' : 'text-gray-500 group-hover:text-blue-600'}`}>{p}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Strategy */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Content Strategy</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Marketplace Category</label>
                    <input
                      type="text"
                      placeholder="e.g. 1245 (Electronics)"
                      className="w-full h-11 px-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 outline-none transition-all text-sm font-mono font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Pricing Multiplier</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1.20"
                        className="w-full h-11 px-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 outline-none transition-all text-sm font-mono font-bold"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">Factor</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Title Pattern</label>
                    <input
                      type="text"
                      placeholder="{{Brand}} {{Title}} - {{Color}}"
                      className="w-full h-11 px-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 outline-none transition-all text-sm font-mono font-semibold"
                    />
                    <p className="text-[10px] text-gray-400 font-medium">Available variables: {'{{Brand}}, {{Title}}, {{Color}}, {{Size}}, {{Sku}}'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Description Wrapper (HTML)</label>
                    <textarea
                      rows={4}
                      placeholder="<div class='product-desc'>{{Description}}</div>"
                      className="w-full p-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 outline-none transition-all text-sm font-mono font-medium resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Static Attributes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Static Attributes</h3>
                  <button onClick={addAttribute} className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest">+ Add Field</button>
                </div>

                <div className="space-y-3">
                  {attributes.map((attr, idx) => (
                    <div key={idx} className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                      <input
                        type="text"
                        placeholder="Attribute Name"
                        value={attr.key}
                        onChange={(e) => {
                          const newAttrs = [...attributes];
                          newAttrs[idx].key = e.target.value;
                          setAttributes(newAttrs);
                        }}
                        className="flex-1 h-10 px-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 outline-none transition-all text-xs font-bold"
                      />
                      <span className="text-gray-300 font-bold">:</span>
                      <input
                        type="text"
                        placeholder="Default Value"
                        value={attr.value}
                        onChange={(e) => {
                          const newAttrs = [...attributes];
                          newAttrs[idx].value = e.target.value;
                          setAttributes(newAttrs);
                        }}
                        className="flex-1 h-10 px-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 outline-none transition-all text-xs font-medium"
                      />
                      <button onClick={() => removeAttribute(idx)} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {attributes.length === 0 && (
                    <p className="text-xs text-gray-400 italic text-center py-2">No static attributes defined.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Template Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 gap-3 flex">
              <Button variant="outline" onClick={closeDrawer} className="flex-1 h-12 border-gray-200 hover:bg-white text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px]">Cancel</Button>
              <Button onClick={() => { closeDrawer(); toast.success("Template saved"); }} className="flex-[2] h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl font-bold uppercase tracking-widest text-[10px]">Save Blueprint</Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/*               DRAWER 2: TAXONOMY GROUPS                    */}
      {/* ========================================================== */}
      {activeDrawer === 'taxonomy' && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={closeDrawer} />
          <div className="relative w-full max-w-[50vw] bg-white h-full shadow-2xl overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300">

            {/* Taxonomy Drawer Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                  <GroupIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{editingTaxonomy ? 'Edit Group' : 'New Taxonomy Group'}</h2>
                  <p className="text-xs text-gray-500 font-medium">
                    {editingTaxonomy ? `Update node ${editingTaxonomy.id}` : 'Define a new product classification node'}
                  </p>
                </div>
              </div>
              <button onClick={closeDrawer} className="w-8 h-8 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-400 transition-colors">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Taxonomy Configuration Form */}
            <div className="p-8 space-y-8 flex-1">

              {/* Core Identity */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Group Identity</h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Group Name</label>
                    <input
                      type="text"
                      defaultValue={editingTaxonomy?.name}
                      placeholder="e.g. Summer Campaign Electronics"
                      className="w-full h-11 px-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-gray-900/5 focus:border-gray-300 outline-none transition-all text-sm font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Taxonomy ID</label>
                    <input
                      type="text"
                      defaultValue={editingTaxonomy?.id}
                      placeholder="e.g. TX-409"
                      className="w-full h-11 px-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-gray-900/5 focus:border-gray-300 outline-none transition-all text-sm font-mono font-bold uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Path Configuration */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Hierarchy Path</h3>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500">Category Path</label>
                  <textarea
                    rows={3}
                    defaultValue={editingTaxonomy?.path}
                    placeholder="Root > Category > Sub-Category"
                    className="w-full p-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-gray-900/5 focus:border-gray-300 outline-none transition-all text-sm font-mono font-medium resize-none"
                  />
                  <p className="text-[10px] text-gray-400 font-medium">Use {'>'} separator for nested levels.</p>
                </div>
              </div>

            </div>

            {/* Taxonomy Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 gap-3 flex">
              <Button variant="outline" onClick={closeDrawer} className="flex-1 h-12 border-gray-200 hover:bg-white text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px]">Cancel</Button>
              <Button onClick={() => { closeDrawer(); toast.success("Taxonomy Group Saved"); }} className="flex-[2] h-12 bg-gray-900 hover:bg-black text-white shadow-lg shadow-gray-900/10 rounded-xl font-bold uppercase tracking-widest text-[10px]">Save Node</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
