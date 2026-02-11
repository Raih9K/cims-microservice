"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";
import {
  BoltIcon,
  BoxCubeIcon,
  BoxIcon,
  ChevronDownIcon,
  DocsIcon,
  DownloadIcon,
  GridIcon,
  GroupIcon,
  LogoutIcon
} from "../icons/index";
import { integrationService } from "../services/integrationService";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const generalItems: NavItem[] = [
  {
    icon: <GridIcon className="w-5 h-5" />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <BoxIcon className="w-5 h-5" />,
    name: "Inventory Feed",
    path: "/inventory",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    name: "Marketplace Feed",
    path: "/marketplace",
  },
];

const logisticsItems: NavItem[] = [
  {
    icon: <BoxCubeIcon className="w-5 h-5" />,
    name: "Warehouse Network",
    path: "/settings/warehouse",
  },
  {
    icon: <GroupIcon className="w-5 h-5" />,
    name: "Supplier Directory",
    path: "/settings/supplier",
  },
];

const marketplaceItems: NavItem[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    name: "Field Mapping",
    path: "/marketplace/mapping",
  },
  {
    icon: <DocsIcon className="w-5 h-5" />,
    name: "Listing Templates",
    path: "/settings/templates",
  },
];

const masterConfigItems: NavItem[] = [
  {
    icon: <GridIcon className="w-5 h-5" />,
    name: "Product Categories",
    path: "/settings/categories",
  },
  {
    icon: <BoltIcon className="w-5 h-5" />,
    name: "Product Attributes",
    path: "/settings/attributes",
  },
];

const dataItems: NavItem[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    name: "Import Data",
    path: "/inventory/import-data",
  },
  {
    icon: <DownloadIcon className="w-5 h-5" />,
    name: "Export Logs",
    path: "/inventory/export",
  },
];

const accountItems: NavItem[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    name: "System Settings",
    subItems: [
      { name: "Team Management", path: "/account/team" },
      { name: "Channel Integrations", path: "/settings/integrations" },
      { name: "Billing & Plans", path: "/account/billing" },
      { name: "Organization Profile", path: "/account/organization" },
      { name: "Personal Profile", path: "/account/profile" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{ type: string; index: number } | null>(null);
  const [dynamicChannels, setDynamicChannels] = useState<NavItem[]>([]);
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

  const searchParams = useSearchParams();

  const isActive = useCallback((path: string) => {
    const itemUrl = new URL(path, "http://dummy.com");
    const itemPath = itemUrl.pathname;
    const itemIdParam = itemUrl.searchParams.get('id');

    if (itemIdParam) {
      return pathname === itemPath && searchParams.get('id') === itemIdParam;
    }

    if (itemPath === '/marketplace' && searchParams.get('id')) {
      return false;
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  }, [pathname, searchParams]);

  const handleSubmenuToggle = (index: number, menuType: string) => {
    setOpenSubmenu(prev =>
      prev?.type === menuType && prev?.index === index ? null : { type: menuType, index }
    );
  };

  useEffect(() => {
    const groups = [
      { items: generalItems, type: "main" },
      { items: logisticsItems, type: "logistics" },
      { items: marketplaceItems, type: "marketplace" },
      { items: masterConfigItems, type: "config" },
      { items: dataItems, type: "data" },
      { items: accountItems, type: "account" }
    ];

    const findAndOpen = () => {
      for (const group of groups) {
        for (let i = 0; i < group.items.length; i++) {
          if (group.items[i].subItems?.some((s: any) => isActive(s.path))) {
            setOpenSubmenu({ type: group.type, index: i });
            return;
          }
        }
      }
    };

    const timer = setTimeout(findAndOpen, 50);
    return () => clearTimeout(timer);
  }, [pathname, isActive]);

  const fetchChannels = useCallback(async () => {
    try {
      const response = await integrationService.getChannels();
      if (response.success) {
        const channels: NavItem[] = response.data.map((c: any) => ({
          name: c.name,
          path: `/marketplace?id=${c.channel_id}`,
          icon: (
            <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-transparent relative">
              <Image
                src={c.marketplace === 'shopify'
                  ? "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg"
                  : c.marketplace === 'ebay'
                    ? "https://www.vectorlogo.zone/logos/ebay/ebay-icon.svg"
                    : "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg"
                }
                alt={c.name}
                width={20}
                height={20}
                className={`w-full h-full object-contain ${c.status === 'inactive' ? 'grayscale opacity-50' : ''}`}
                unoptimized
              />
              {c.status === 'active' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-white rounded-full shadow-[0_0_5px_rgba(16,185,129,0.8)] animate-pulse"></div>
              )}
              {c.status === 'inactive' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-gray-300 border border-white rounded-full"></div>
              )}
            </div>
          )
        }));
        setDynamicChannels(channels);
      }
    } catch (error) {
      console.error("Failed to fetch sidebar channels", error);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
    const handleSync = () => fetchChannels();
    window.addEventListener('channelsUpdated', handleSync);
    return () => window.removeEventListener('channelsUpdated', handleSync);
  }, [fetchChannels]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight(prev => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const renderNavGroup = (items: NavItem[], type: string, title: string) => (
    <div className="px-4 mb-8">
      <h2 className={`px-5 mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400
        ${!isExpanded && !isHovered ? "opacity-0 invisible" : "opacity-100 visible"} transition-all duration-300`}>
        {title}
      </h2>
      <ul className="space-y-1">
        {items.map((item, idx) => {
          const isOpen = openSubmenu?.type === type && openSubmenu?.index === idx;
          const isNavItemActive = item.path ? isActive(item.path) : item.subItems?.some(s => isActive(s.path));

          return (
            <li key={item.path || `${item.name}-${idx}`} className="relative px-2">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => handleSubmenuToggle(idx, type)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isOpen || isNavItemActive
                        ? "bg-brand-50 text-brand-600 shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                      ${!isExpanded && !isHovered ? "justify-center px-0" : ""}`}
                  >
                    <span className={`transition-all duration-200 ${isNavItemActive ? "text-brand-600 scale-110" : "text-gray-400 group-hover:text-brand-600"}`}>
                      {item.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <>
                        <span className="text-sm font-bold flex-1 text-left tracking-tight">{item.name}</span>
                        <ChevronDownIcon className={`w-3.5 h-3.5 transition-all duration-300 ${isOpen ? "rotate-180 text-brand-600" : "opacity-40"}`} />
                      </>
                    )}
                  </button>
                  <div
                    ref={el => { subMenuRefs.current[`${type}-${idx}`] = el; }}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ height: isOpen && (isExpanded || isHovered || isMobileOpen) ? `${subMenuHeight[`${type}-${idx}`]}px` : "0px" }}
                  >
                    <ul className="mt-1 ml-6 border-l border-gray-100 space-y-0.5">
                      {item.subItems.map(sub => (
                        <li key={sub.name}>
                          <Link
                            href={sub.path}
                            className={`flex items-center gap-3 px-6 py-2 text-xs font-bold transition-all duration-200
                              ${isActive(sub.path) ? "text-brand-600" : "text-gray-400 hover:text-gray-900"}`}
                          >
                            <span className={`w-1 h-1 rounded-full ${isActive(sub.path) ? "bg-brand-500 shadow-[0_0_8px_#465fff]" : "bg-transparent"}`} />
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={item.path!}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive(item.path!)
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                    ${!isExpanded && !isHovered ? "justify-center px-0 mx-auto w-10 h-10" : ""}`}
                >
                  <span className={`${isActive(item.path!) ? "text-white" : "text-gray-400"}`}>
                    {item.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="text-sm font-bold tracking-tight">{item.name}</span>
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 flex flex-col
        bg-white border-r border-gray-100 shadow-xl shadow-gray-200/50
        ${isExpanded || isHovered || isMobileOpen ? "w-[280px]" : "w-[88px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-20 flex items-center px-8 flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20">
              <BoxIcon className="w-5 h-5" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          {(isExpanded || isHovered || isMobileOpen) && (
            <div className="flex flex-col min-w-0">
              <span className="text-xl font-black tracking-tighter text-gray-900 leading-none truncate">
                {user?.company?.name || 'CIMS'}
              </span>
              <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest mt-1 opacity-80 underline underline-offset-4 decoration-emerald-500">Core Engine</span>
            </div>
          )}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4 min-h-0">
        {renderNavGroup(generalItems, "main", "Inventory HQ")}
        {renderNavGroup(logisticsItems, "logistics", "Logistics & Sourcing")}
        {renderNavGroup(marketplaceItems, "marketplace", "Marketplace Hub")}
        {dynamicChannels.length > 0 && renderNavGroup(dynamicChannels, "connected", "Active Channels")}
        {renderNavGroup(masterConfigItems, "config", "Master Config")}
        {renderNavGroup(dataItems, "data", "Data Exchange")}
        {renderNavGroup(accountItems, "account", "System Administration")}
      </div>

      <div className="mt-auto flex-shrink-0 border-t border-gray-50 bg-white/80 backdrop-blur-md px-4 pb-4 pt-4">
        <div className={`p-4 rounded-[1.5rem] transition-all duration-300
          ${isExpanded || isHovered || isMobileOpen ? "bg-gray-50 border border-gray-100 shadow-sm" : "bg-transparent border-0 p-0"}`}>

          <div className={`flex items-center gap-3 ${!isExpanded && !isHovered ? "flex-col mb-0" : "mb-5"}`}>
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-black text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
            </div>
            {(isExpanded || isHovered || isMobileOpen) && (
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-gray-900 truncate tracking-tight">{user?.name || 'Administrator'}</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5 opacity-60">Prime Fleet</p>
              </div>
            )}
          </div>

          <div className={`flex items-center ${!isExpanded && !isHovered ? "flex-col gap-6 items-center" : "justify-between"}`}>
            <div className="flex gap-2">
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <div className="hover:bg-white p-1 rounded-lg transition-colors border border-transparent hover:border-gray-100 shadow-sm">
                    <ThemeToggleButton />
                  </div>
                  <div className="hover:bg-white p-1 rounded-lg transition-colors border border-transparent hover:border-gray-100 shadow-sm">
                    <NotificationDropdown />
                  </div>
                </>
              )}
            </div>

            <button
              onClick={logout}
              className={`flex items-center justify-center transition-all duration-200 group/logout
                ${!isExpanded && !isHovered
                  ? "w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white"
                  : "w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-red-500/20"
                }`}
              title="Log Out Systems"
            >
              <LogoutIcon className="w-5 h-5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
