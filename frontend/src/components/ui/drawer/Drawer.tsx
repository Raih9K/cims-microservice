"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  disableScroll?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  className,
  title,
  footer,
  disableScroll = false,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Add a marker class/attribute to tracking
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-drawer-active", "true");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Only unlock if no other drawers are closing (simple delay check or stack check)
      // Since we can't easily know about other components, we'll check if we are the last one.
      // However, simplified approach:
      // If we are unmounting, we assume we might be closing.
      // But if there are multiple drawers, we need to be careful.
      // Better approach: Let's trust that if another drawer is Open, it will keep it hidden?
      // No, the other drawer's Effect has already run.

      // Let's use a small timeout to check if we should unlock?
      // Or check if there are other visible drawers?
      // Since we are using Portals, we can query the DOM.

      const currentDrawer = drawerRef.current;
      setTimeout(() => {
        const openDrawers = document.querySelectorAll('[data-drawer-panel="true"]');
        // If we are closing, we are likely not in the DOM anymore (because !isOpen usually unmounts or hides)
        // But isOpen is false here, so we re-render?
        // Actually, if !isOpen, the component returns null? No, we return null if !mounted.
        // If !isOpen, we render hidden or translate-x-full.
        // We need to check for VISIBLE drawers.

        // Let's refine: Only reset overflow if NO drawers are legally "open".
        // The current drawer is closing (isOpen changed to false).
        // We need a reliable way.

        const hasOpenDrawers = Array.from(document.querySelectorAll('[data-drawer-open="true"]'))
          .some(el => el !== currentDrawer && !el.classList.contains('translate-x-full') && !el.classList.contains('invisible'));

        // Actually, simpler:
        // If we are closing, we just decrement a global counter? No global state.

        // Fallback: Just remove overflow. If another drawer is open, its effect should re-assert? No, effects don't Re-run.

        // Safe fix: Check if any element in document has class 'fixed inset-0 z-[99998]' that is NOT invisible?
        const visibleBackdrops = document.querySelectorAll('.fixed.inset-0.z-\\[99998\\].visible');
        if (visibleBackdrops.length === 0) {
          document.body.style.overflow = "unset";
          document.body.removeAttribute("data-drawer-active");
        }
      }, 50);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[99998] bg-gray-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        data-drawer-panel="true"
        className={`fixed inset-y-0 right-0 z-[99999] w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="text-base font-semibold text-gray-900 dark:text-white leading-none tracking-tight">{title || "Drawer"}</div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
              aria-label="Close drawer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className={`flex-1 ${disableScroll ? 'overflow-hidden' : 'overflow-y-auto'}`}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-end gap-3 flex-shrink-0 z-10">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};
