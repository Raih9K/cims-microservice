import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
  icon?: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer, maxWidth = "max-w-2xl", icon }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`bg-white dark:bg-gray-900 w-full ${maxWidth} rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 pointer-events-auto flex flex-col max-h-[90vh]`}
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {icon}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                {children}
              </div>

              {footer && (
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-2xl flex justify-end gap-3 shrink-0">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
