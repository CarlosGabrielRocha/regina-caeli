"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NotificationProvider } from "@/contexts/NotificationContext";
import LoginPage from "./login";
import RegisterPage from "./register";
import ChangePasswordPage from "./change-password";

export type AuthView = "login" | "register" | "forgot-password";

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<AuthView>("login");

  const handleNavigate = (view: AuthView) => {
    setCurrentView(view);
  };

  return (
    <NotificationProvider>
      <div className="relative flex min-h-screen items-center justify-center p-4 bg-linear-to-b from-primary to-secondary overflow-hidden">
        <div className="relative z-10 w-full max-w-md">
          <AnimatePresence mode="wait" initial={false}>
            {currentView === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginPage onNavigate={handleNavigate} />
              </motion.div>
            )}
            {currentView === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RegisterPage onNavigate={handleNavigate} />
              </motion.div>
            )}
            {currentView === "forgot-password" && (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ChangePasswordPage onNavigate={handleNavigate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </NotificationProvider>
  );
}
