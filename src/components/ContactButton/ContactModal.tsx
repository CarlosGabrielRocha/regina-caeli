"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Title from "../Title";
import { toast } from "sonner";
import ContactForm from "./ContactForm";
import NotLoggedView from "../../views/header/ProfileAside/NotLoggedView";
import Text from "../Text";
import { CloseButton } from "../buttons/CloseButton";
import { useUser } from "../../contexts/UserContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  propertyId,
}: ContactModalProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, loading, isAuthenticated, googleLogin } = useUser();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 10);
  };

  const handleGoogleSuccess = async (response: any) => {
    if (!response.credential) {
      toast.error("Erro ao fazer login com Google", { duration: 5000 });
      return;
    }
    await googleLogin(response.credential);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full max-w-90 md:max-w-120 2xl:max-w-160 bg-tertiary border border-border rounded-xl shadow-2xl overflow-hidden overflow-y-auto custom-scrollbar max-h-[93vh] flex flex-col z-50 relative p-5"
            onScroll={handleScroll}
          >
            <CloseButton onClick={onClose} isScrolled={isScrolled} />

            <div className="flex flex-col items-center gap-8">
              <div className="text-center space-y-3">
                <Title size="md">Solicitar Contato</Title>
                <Text className="text-muted-foreground text-center max-w-[80%] mx-auto">
                  {isAuthenticated
                    ? "Confirme seus dados para enviarmos sua solicitação"
                    : "Faça login para continuar"}
                </Text>
              </div>

              {loading ? (
                <div className="py-12">
                  <Loader2 className="w-10 h-10 animate-spin text-highlight" />
                </div>
              ) : !isAuthenticated ? (
                <div className="w-full">
                  <NotLoggedView
                    onLoginClick={onClose}
                    onGoogleSuccess={handleGoogleSuccess}
                  />
                </div>
              ) : (
                <ContactForm
                  name={user?.name}
                  phone={user?.phone}
                  onSuccess={onClose}
                  propertyId={propertyId}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
