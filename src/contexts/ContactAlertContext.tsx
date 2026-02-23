"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactAlert from "../components/ContactButton/ContactAlert";

interface ContactAlertState {
  isOpen: boolean;
  title: string;
  description: string;
}

interface ContactAlertContextType {
  showContactAlert: (title: string, description: string) => void;
  hideContactAlert: () => void;
}

const ContactAlertContext = createContext<ContactAlertContextType | undefined>(
  undefined,
);

export function ContactAlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<ContactAlertState>({
    isOpen: false,
    title: "",
    description: "",
  });

  const showContactAlert = useCallback((title: string, description: string) => {
    setAlert({
      isOpen: true,
      title,
      description,
    });
  }, []);

  useEffect(() => {
    if (alert.isOpen) {
      const timer = setTimeout(() => {
        hideContactAlert();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const hideContactAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ContactAlertContext.Provider
      value={{ showContactAlert, hideContactAlert }}
    >
      {children}
      <AnimatePresence>
        {alert.isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-2"
          >
            <ContactAlert
              title={alert.title}
              description={alert.description}
              onClose={hideContactAlert}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ContactAlertContext.Provider>
  );
}

export function useContactAlert() {
  const context = useContext(ContactAlertContext);

  if (!context) {
    throw new Error(
      "useContactAlert must be used within a ContactAlertProvider",
    );
  }

  return context;
}
