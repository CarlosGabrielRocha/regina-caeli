import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

export type NotificationType = "success" | "error" | "info";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  type?: NotificationType;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: "text-green-500",
  error: "text-red-700",
  info: "text-blue-500",
};

export function NotificationModal({
  isOpen,
  onClose,
  message,
  type = "success",
}: NotificationModalProps) {
  const Icon = icons[type];

  useEffect(() => {
    if (isOpen) {
      // Auto-close after 15 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000 * 3);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              className="bg-card border border-border rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 pointer-events-auto relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="flex items-start gap-4 pr-8">
                <Icon className={`w-6 h-6 shrink-0 ${colors[type]}`} />
                <div className="flex-1">
                  <p className="text-foreground text-base leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
