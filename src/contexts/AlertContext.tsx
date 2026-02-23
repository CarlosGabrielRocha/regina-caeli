"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";

interface AlertState {
  isOpen: boolean;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface AlertContextType {
  showAlert: (
    title: string,
    description?: string,
    variant?: "default" | "destructive",
  ) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    title: "",
    description: "",
    variant: "default",
  });

  const showAlert = useCallback(
    (
      title: string,
      description?: string,
      variant: "default" | "destructive" = "default",
    ) => {
      setAlert({
        isOpen: true,
        title,
        description,
        variant,
      });

      setTimeout(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }));
      }, 5000);
    },
    [],
  );

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert.isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm animate-in fade-in slide-in-from-bottom-5">
          <Alert variant={alert.variant}>
            {alert.variant === "destructive" ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <Terminal className="h-4 w-4" />
            )}
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  return context;
}
