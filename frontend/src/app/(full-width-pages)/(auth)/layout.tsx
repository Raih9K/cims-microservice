import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-gray-50 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex w-full h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 sm:p-0">
          <div className="absolute inset-0 z-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
          <div className="relative z-10 w-full">
            {children}
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
