"use client";

import {
  BellIcon,
  BoxIcon,
  GridIcon,
  PlugInIcon,
  TrashBinIcon,
  UserIcon
} from "@/icons/index";
import Link from "next/link";
import { useState } from "react";

type Notification = {
  id: string;
  type: "inventory" | "system" | "team" | "billing";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "inventory",
    title: "Critical Stock Level",
    description: "Classic White T-Shirt (SKU: TS-001) has reached its minimum threshold of 5 units.",
    time: "2 minutes ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "2",
    type: "system",
    title: "Integration Synchronized",
    description: "Your Shopify store 'weMonks-Global' has successfully synced 14 new products.",
    time: "45 minutes ago",
    isRead: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "team",
    title: "Team Update",
    description: "Raihan Khan updated the Warehouse Access permissions for 3 staff members.",
    time: "2 hours ago",
    isRead: true,
    priority: "low",
  },
  {
    id: "4",
    type: "billing",
    title: "Payment Processed",
    description: "Your subscription for 'Prime Fleet' has been successfully renewed for Feb 2026.",
    time: "5 hours ago",
    isRead: true,
    priority: "low",
  },
  {
    id: "5",
    type: "inventory",
    title: "New Shipment Received",
    description: "Warehouse #01 received 500 units of Nike Air Max. Stock records updated.",
    time: "Yesterday",
    isRead: true,
    priority: "medium",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archive">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    return true;
  });

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const icons = {
    inventory: <BoxIcon className="w-5 h-5 text-indigo-400" />,
    system: <PlugInIcon className="w-5 h-5 text-teal-400" />,
    team: <UserIcon className="w-5 h-5 text-amber-400" />,
    billing: <GridIcon className="w-5 h-5 text-rose-400" />,
  };

  const backgrounds = {
    inventory: "bg-indigo-50/50 border-indigo-100/50",
    system: "bg-teal-50/50 border-teal-100/50",
    team: "bg-amber-50/50 border-amber-100/50",
    billing: "bg-rose-50/50 border-rose-100/50",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 min-h-screen bg-[#F9FAFB] select-none">
      {/* Breadcrumb - Matching Inventory Style */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900">Notifications</span>
      </nav>

      {/* Header - Matching Inventory Typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Intelligence Log</h1>
          <p className="text-sm text-gray-400 mt-1 font-medium">Monitoring system heartbeats and fleet activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllRead}
            className="h-10 px-5 bg-white border border-gray-100 rounded-xl text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-500 hover:border-brand-100 transition-all duration-300 shadow-sm"
          >
            Clear All Signals
          </button>
        </div>
      </div>

      {/* Tabs - Matching Inventory Layout */}
      <div className="flex border-b border-gray-100 gap-8 mb-8 overflow-x-auto no-scrollbar">
        {(["all", "unread", "archive"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative
                ${activeTab === tab ? "text-gray-700" : "text-gray-300 hover:text-gray-500"}`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-500/50 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Notification Stream - Mapped to Inventory Container Pattern */}
      <div className="bg-white/40 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden">
        <div className="divide-y divide-gray-50/50">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`group flex items-start gap-6 p-8 transition-all duration-500 border-l-4
                  ${notification.isRead
                    ? "bg-transparent border-l-transparent opacity-50"
                    : "bg-white border-l-brand-400 shadow-[inset_0_0_40px_rgba(70,95,255,0.01)]"}`}
              >
                {/* Gentle Icon Container */}
                <div className={`w-12 h-12 rounded-2xl border ${backgrounds[notification.type]} flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                  {icons[notification.type]}
                </div>

                {/* Soft Text Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold text-gray-600 tracking-tight leading-none">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="px-2 py-0.5 bg-brand-50 text-brand-500 text-[8px] font-bold uppercase tracking-widest rounded-md border border-brand-100">Action Required</span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{notification.time}</span>
                  </div>
                  <p className="text-gray-400 text-[13px] leading-relaxed mb-6 font-medium max-w-2xl">
                    {notification.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <button className="text-[10px] font-bold text-brand-400/80 uppercase tracking-widest hover:text-brand-600 transition-colors">Analyze</button>
                    <span className="w-1 h-1 bg-gray-100 rounded-full" />
                    <button className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-500 transition-colors">Quiet</button>
                  </div>
                </div>

                {/* Quiet Controls */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-gray-200 hover:text-rose-300 transition-colors rounded-xl">
                    <TrashBinIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 flex flex-col items-center justify-center text-center opacity-30">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-gray-50/50">
                <BellIcon className="w-8 h-8 text-gray-200" />
              </div>
              <h3 className="text-base font-bold text-gray-400 tracking-tight">Intelligence Log is Silent</h3>
              <p className="text-sm text-gray-300 font-medium">No active signals detected at this time.</p>
            </div>
          )}
        </div>
      </div>

      {/* Zen Intelligence Summary */}
      <div className="mt-12 p-10 rounded-[2.5rem] bg-indigo-50/20 border border-indigo-100/30 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-indigo-900/60 tracking-tight mb-2">Visual Fidelity Optimized</h2>
          <p className="text-indigo-600/50 text-xs font-medium leading-relaxed max-w-md">15-hour daily session active. Blue light filtration, low-contrast typography, and tranquil spacing are enabled to prevent ocular fatigue.</p>
        </div>
        <Link
          href="/dashboard"
          className="px-10 py-3.5 bg-white text-indigo-400 border border-indigo-100 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-sm"
        >
          Monitor Hub
        </Link>
      </div>
    </div>
  );
}
