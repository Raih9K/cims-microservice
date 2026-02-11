"use client";
import React, { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  onCreate?: (value: string) => void;
  className?: string;
  value?: string;
  disabled?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  placeholder = "Search or select...",
  onChange,
  onCreate,
  className = "",
  value,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync searchTerm with selected value when options load or value changes
  useEffect(() => {
    if (value) {
      const selectedOption = options.find((opt) => opt.value === value);
      if (selectedOption && searchTerm !== selectedOption.label) {
        setSearchTerm(selectedOption.label);
      }
    } else if (searchTerm !== "") {
      setSearchTerm("");
    }
  }, [value, options]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSearchTerm(option.label);
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset search term to label of current value if not selecting
        const currentLabel = options.find(opt => opt.value === value)?.label || "";
        setSearchTerm(currentLabel);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, options]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          className={`h-11 w-full rounded-xl border border-gray-300 px-4 py-2.5 pr-11 text-base shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-gray-800/50 transition-all ${disabled ? 'opacity-50' : ''}`}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => !disabled && setIsOpen(true)}
          disabled={disabled}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl max-h-64 overflow-y-auto custom-scrollbar animate-fadeIn">
          <div className="py-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${value === option.value ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </button>
              ))
            ) : onCreate && searchTerm.trim() ? (
              <button
                type="button"
                className="w-full text-left px-4 py-3 text-sm text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors flex items-center gap-2 group"
                onClick={() => {
                  onCreate(searchTerm.trim());
                  setIsOpen(false);
                }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Create &quot;{searchTerm}&quot;</p>
                  <p className="text-[10px] text-gray-500 opacity-70">Add this as a new category</p>
                </div>
              </button>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No results found for &quot;{searchTerm}&quot;</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
