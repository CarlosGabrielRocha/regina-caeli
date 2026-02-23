"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, ShieldCheck, User as UserIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { User } from "../../../actions/types/Modals";
import Text from "../../../components/Text";
import { Button } from "../../../components/ui/button";
import ProfileHeader from "../../header/ProfileAside/ProfileHeader";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  isClient?: boolean;
}

export default function ProfileModal({
  isOpen,
  onClose,
  user,
  isClient,
}: ProfileModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isAgent = !!user.agent;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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
              className="bg-tertiary border border-border rounded-lg shadow-2xl w-full max-w-md mx-4 pointer-events-auto relative overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              <Text size="big" type="h1" className="text-center mt-2">Perfil</Text>

              {/* Role Title */}
              <div className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground z-10 pointer-events-none select-none">
                {isAgent ? (
                  <ShieldCheck className="size-5" />
                ) : (
                  <UserIcon className="size-5" />
                )}
                <Text size="small" type="span" className="font-medium">
                  {isAgent ? "Agente" : "Cliente"}
                </Text>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 flex flex-col items-center">
                <ProfileHeader name={user.name} email={user.email} />

                <div className="w-full space-y-4 mt-4">
                  <div className="p-4 bg-white/5 rounded-lg space-y-2">
                    <Text className="text-muted-foreground text-sm">
                      Telefone
                    </Text>
                    <Text className="font-medium">
                      {user.phone || "Não informado"}
                    </Text>
                  </div>

                  {isClient && user.phone && (
                    <Button
                      asChild
                      className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <a
                        href={`https://wa.me/${user.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4 md:size-5 2xl:size-6" />
                        <Text>Conversar no WhatsApp</Text>
                      </a>
                    </Button>
                  )}
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
