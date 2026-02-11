import { GridIcon } from "@/icons/index";
import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  pageTitle: string;
  breadcrumbItems?: { name: string; path?: string }[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, breadcrumbItems }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div className="space-y-4">
        <nav className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 overflow-x-auto no-scrollbar">
          <Link href="/dashboard" className="hover:text-brand-600 transition-all flex items-center gap-2 group shrink-0">
            <div className="w-5 h-5 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
              <GridIcon className="w-3 h-3" />
            </div>
            Dashboard
          </Link>

          {breadcrumbItems?.map((item, index) => (
            <React.Fragment key={index}>
              <span className="text-gray-200 shrink-0 select-none">/</span>
              {item.path ? (
                <Link href={item.path} className="hover:text-brand-600 transition-colors shrink-0 uppercase">
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-900 shrink-0 uppercase">{item.name}</span>
              )}
            </React.Fragment>
          ))}

          {!breadcrumbItems && (
            <>
              <span className="text-gray-200 shrink-0 select-none">/</span>
              <span className="text-gray-900 shrink-0 uppercase">{pageTitle}</span>
            </>
          )}
        </nav>

        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">{pageTitle}</h1>
          <p className="text-[12px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2 opacity-70 italic">
            weMonks Core Enterprise <span className="mx-2 text-gray-200">|</span> Node Status: Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
