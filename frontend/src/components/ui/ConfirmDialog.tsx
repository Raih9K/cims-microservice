import Button from "./button/Button";
import { Modal } from "./modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger"
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const typeStyles = {
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-orange-600 hover:bg-orange-700 text-white",
    info: "bg-blue-600 hover:bg-blue-700 text-white"
  };

  const iconColors = {
    danger: "text-red-600 bg-red-50 dark:bg-red-500/10",
    warning: "text-orange-600 bg-orange-50 dark:bg-orange-500/10",
    info: "text-blue-600 bg-blue-50 dark:bg-blue-500/10"
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" className="max-w-md">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconColors[type]}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 px-6"
          >
            {cancelText}
          </Button>
          <button
            onClick={handleConfirm}
            className={`h-11 px-6 rounded-xl font-semibold transition-all ${typeStyles[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
