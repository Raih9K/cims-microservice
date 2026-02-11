"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();

  React.useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      // If user has companies but no active company_id set
      if (user.companies?.length > 1 && !user.company_id) {
        router.push("/select-company");
      }
    } else {
      router.push("/signin");
    }
  }, [router]);

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex overflow-x-hidden">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Page Content */}
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
