"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  NotificationModal,
  NotificationType,
} from "../components/NotificationModal";

interface NotificationState {
  isOpen: boolean;
  message?: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message?: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    message: "",
    type: "success",
  });

  const showNotification = useCallback(
    (message?: string, type: NotificationType = "success") => {
      setNotification({
        isOpen: true,
        message,
        type,
      });
    },
    [],
  );

  const closeNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={closeNotification}
        message={notification.message}
        type={notification.type}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }

  return context;
}
