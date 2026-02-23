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
import RedirectAlert from "../components/RedirectAlert";
import { useRouter } from "next/navigation";
import { FormattedProperty } from "../services/propertyService/types";

interface PropertyUpdatedState {
  isOpen: boolean;
  title: string;
  description: string;
  property: FormattedProperty | null;
}

interface PropertyUpdatedContextType {
  showPropertyUpdatedAlert: (property: FormattedProperty) => void;
  hidePropertyUpdatedAlert: () => void;
}

const PropertyUpdatedContext = createContext<
  PropertyUpdatedContextType | undefined
>(undefined);

export function PropertyUpdatedProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<PropertyUpdatedState>({
    isOpen: false,
    title: "",
    description: "",
    property: null,
  });

  const router = useRouter();

  const showPropertyUpdatedAlert = useCallback(
    (property: FormattedProperty) => {
      setAlert({
        isOpen: true,
        title: "Propriedade Atualizada!",
        description:
          "As alterações foram salvas com sucesso. Clique abaixo para visualizar.",
        property: property,
      });
    },
    [],
  );

  const hidePropertyUpdatedAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleRedirect = () => {
    if (alert.property) {
      const queryParams = new URLSearchParams({
        bedrooms: alert.property.bedrooms.toString(),
        price: alert.property.price.toString(),
        type: alert.property.type,
        city: alert.property.address.city,
        state: alert.property.address.state,
      });
      router.push(
        `/api/similar/${alert.property.id}?${queryParams.toString()}`,
      );
      hidePropertyUpdatedAlert();
    }
  };

  useEffect(() => {
    if (alert.isOpen) {
      const timer = setTimeout(() => {
        hidePropertyUpdatedAlert();
      }, 10000); // 10 seconds timeout
      return () => clearTimeout(timer);
    }
  }, [alert.isOpen, hidePropertyUpdatedAlert]);

  return (
    <PropertyUpdatedContext.Provider
      value={{ showPropertyUpdatedAlert, hidePropertyUpdatedAlert }}
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
            <RedirectAlert
              title={alert.title}
              description={alert.description}
              redirectText="Ver Propriedade"
              onRedirect={handleRedirect}
              onClose={hidePropertyUpdatedAlert}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PropertyUpdatedContext.Provider>
  );
}

export function usePropertyUpdated() {
  const context = useContext(PropertyUpdatedContext);

  if (!context) {
    throw new Error(
      "usePropertyUpdated must be used within a PropertyUpdatedProvider",
    );
  }

  return context;
}
