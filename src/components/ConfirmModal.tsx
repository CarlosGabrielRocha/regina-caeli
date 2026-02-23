import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { createPortal } from "react-dom";
import Text from "./Text";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  buttonConfirmType?: "sky" | "destructive" | "confirm";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  description = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  buttonConfirmType = "destructive",
}: ConfirmModalProps) {
  // Close on Escape key

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, isLoading]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
            onClick={isLoading ? undefined : onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-100 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              className="border border-border rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 pointer-events-auto relative bg-tertiary"
            >
              {/* Close button */}
              {!isLoading && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fechar"
                >
                  <X className="size-5 2xl:size-6" />
                </button>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Text
                    type="h3"
                    size="big"
                    className="font-semibold text-foreground"
                  >
                    {title}
                  </Text>
                  <Text type="p" size="small" className="text-muted-foreground">
                    {description}
                  </Text>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                    className="h-9"
                  >
                    {cancelText}
                  </Button>
                  <Button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="h-9 text-white"
                    variant={buttonConfirmType}
                  >
                    {isLoading ? "Processando..." : confirmText}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
