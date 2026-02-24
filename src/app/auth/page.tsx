"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginPage from "./Login";
import RequestPasswordReset from "./RequestPasswordReset";
import MessagePage from "./Message";
import { AuthView, MessageData } from "./types";
import RegisterPage from "./Register";

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [messageData, setMessageData] = useState<MessageData>({
    data: "",
    title: "",
    description: "",
    dataDescription: "",
    footerText: "",
  });

  const handleNavigate = (view: AuthView, messageData?: MessageData) => {
    setCurrentView(view);
    if (messageData) {
      setMessageData(messageData);
    }
  };

  return (
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
            <RequestPasswordReset onNavigate={handleNavigate} />
          </motion.div>
        )}
        {currentView === "message" && (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <MessagePage
              onNavigate={handleNavigate}
              data={messageData.data}
              title={messageData.title}
              description={messageData.description}
              dataDescription={messageData.dataDescription}
              footerText={messageData.footerText}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
