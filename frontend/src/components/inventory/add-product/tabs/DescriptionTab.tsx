"use client";

import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { useProductForm } from "@/context/ProductFormContext";
import { PlusIcon, TrashBinIcon } from "@/icons";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function DescriptionTab() {
  const { data, updateDescription } = useProductForm();
  const { shortDescription, mainDescription, features } = data.description;
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "align",
    "link",
    "image",
  ];

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    updateDescription({ features: newFeatures });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-6 w-full">
      {/* Section 1: Overview */}
      <section className="space-y-8">
        <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
          <h2 className="text-base font-medium text-gray-900 dark:text-white">Product Description</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add compelling product descriptions to attract customers</p>
        </div>

        <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</Label>
            <TextArea
                placeholder="Briefly describe your product (e.g. key benefits, use cases)..."
                rows={3}
                value={shortDescription}
                onChange={(val) => updateDescription({ shortDescription: val })}
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-base focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all rounded-2xl p-4 leading-relaxed"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">This appears in search results and product listings</p>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Detailed Description</Label>
                <div className="flex bg-gray-100/80 dark:bg-gray-800/80 rounded-xl p-1 border border-gray-200/50 dark:border-gray-700/50">
                    <button
                        onClick={() => setEditorMode("visual")}
                        className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                            editorMode === "visual"
                                ? "bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                    >
                        Visual Editor
                    </button>
                    <button
                        onClick={() => setEditorMode("html")}
                        className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                            editorMode === "html"
                                ? "bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                    >
                        HTML Code
                    </button>
                </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
                {editorMode === "visual" ? (
                    <div className="h-80 text-gray-700 dark:text-gray-300">
                        <style jsx global>{`
                            .ql-toolbar {
                                border: none !important;
                                border-bottom: 1px solid #e5e7eb !important;
                                background-color: #fafafa;
                                padding: 14px 24px !important;
                            }
                            .dark .ql-toolbar {
                                border-bottom: 1px solid #374151 !important;
                                background-color: #1f2937;
                            }
                            .dark .ql-stroke { stroke: #9ca3af !important; }
                            .dark .ql-fill { fill: #9ca3af !important; }
                            .dark .ql-picker { color: #9ca3af !important; }
                            .ql-container { border: none !important; font-size: 15px !important; font-family: inherit !important; }
                            .ql-editor { min-height: 260px; padding: 28px !important; line-height: 1.8; }
                            .ql-editor::placeholder { color: #9ca3af; font-style: italic; }
                        `}</style>
                        <ReactQuill
                            theme="snow"
                            value={mainDescription}
                            onChange={(content) => updateDescription({ mainDescription: content })}
                            modules={modules}
                            formats={formats}
                            className="h-full"
                        />
                    </div>
                ) : (
                    <TextArea
                        placeholder="<p>Type your HTML description here...</p>"
                        rows={14}
                        className="border-0 focus:ring-0 rounded-none bg-transparent resize-y font-mono text-sm p-8 leading-loose"
                        value={mainDescription}
                        onChange={(val) => updateDescription({ mainDescription: val })}
                    />
                )}
            </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="space-y-8">
          <div className="pb-3 border-b border-gray-200/50 dark:border-gray-800/50">
              <div className="flex items-center justify-between">
                  <div>
                      <h2 className="text-base font-medium text-gray-900 dark:text-white">Key Features</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Highlight special features and benefits</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateDescription({ features: [...features, ""] })}
                    className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 flex items-center gap-2 transition-colors px-4 py-2 bg-brand-50 dark:bg-brand-500/10 rounded-xl"
                  >
                      <PlusIcon className="w-4 h-4" /> Add Feature
                  </button>
              </div>
          </div>
          <div className="space-y-5">
              {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-[50px_1fr_50px] gap-4 items-center animate-fadeIn group">
                  <div className="text-center">
                    <span className="text-sm font-medium text-gray-400 dark:text-gray-600 group-hover:text-brand-500 transition-colors">#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <Input
                    placeholder="e.g. Water resistant up to 50m"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="h-11 text-base bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:border-brand-500/50 font-medium transition-all rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => updateDescription({ features: features.filter((_, i) => i !== index) })}
                    className="h-11 w-11 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-200/50 dark:hover:border-red-500/20"
                  >
                      <TrashBinIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {features.length === 0 && (
                  <div className="py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50/30 dark:bg-gray-900/10">
                      <p className="text-sm text-gray-500 dark:text-gray-400">No features added yet. Click &quot;Add Feature&quot; to get started.</p>
                  </div>
              )}
          </div>
      </section>
    </div>
  );
}
