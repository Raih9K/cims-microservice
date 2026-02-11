"use client";
import Link from "next/link";
import { useState } from "react";
import { BoxIcon, PlugInIcon } from "../../icons/index";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    if (notifying) setNotifying(false);
  };

  return (
    <div className="relative">
      <button
        className="relative dropdown-toggle flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-brand-500 hover:bg-brand-50/50 p-2 rounded-xl"
        onClick={handleClick}
      >
        <span
          className={`absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-brand-500 ring-2 ring-white ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-brand-500 rounded-full opacity-75 animate-ping"></span>
        </span>
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute bottom-[calc(100%+1.5rem)] -left-4 flex h-[520px] w-[350px] flex-col rounded-3xl border border-gray-100 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center justify-between">
            <div>
                <h5 className="text-xl font-black text-gray-900 tracking-tight">Intelligence Feed</h5>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Fleet Core Updates</p>
            </div>
            <span className="bg-brand-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter">4 New</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1">
          {/* Item 1 */}
          <DropdownItem
            onItemClick={closeDropdown}
            className="flex gap-4 p-4 rounded-[1.25rem] hover:bg-gray-50 transition-all duration-300 group/item"
          >
            <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 transition-transform group-hover/item:scale-105">
                    <BoxIcon className="w-6 h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 tracking-tight mb-1">Stock Level Alert</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-2 truncate">Classic White T-Shirt is below threshold...</p>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Inventory</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span className="text-[10px] font-bold text-gray-400">2 min ago</span>
                </div>
            </div>
          </DropdownItem>

          {/* Item 2 */}
          <DropdownItem
            onItemClick={closeDropdown}
            className="flex gap-4 p-4 rounded-[1.25rem] hover:bg-gray-50 transition-all duration-300 group/item"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <PlugInIcon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 tracking-tight mb-1">Integration Success</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-2 truncate">Shopify Channel synced successfully.</p>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">System</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span className="text-[10px] font-bold text-gray-400">45 min ago</span>
                </div>
            </div>
          </DropdownItem>

          {/* Item 3 */}
          <DropdownItem
            onItemClick={closeDropdown}
            className="flex gap-4 p-4 rounded-[1.25rem] hover:bg-gray-50 transition-all duration-300 group/item"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 text-lg font-black">
                RK
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 tracking-tight mb-1">Team Mention</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-2 truncate">Raihan Khan mentioned you in warehouse.</p>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Social</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span className="text-[10px] font-bold text-gray-400">2 hrs ago</span>
                </div>
            </div>
          </DropdownItem>
        </div>

        <div className="p-4 bg-gray-50/50">
            <Link
                href="/notifications"
                className="flex items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-brand-600 hover:text-white hover:border-brand-600 hover:shadow-xl hover:shadow-brand-600/20 transition-all duration-500"
            >
                View Mission Log
            </Link>
        </div>
      </Dropdown>
    </div>
  );
}
