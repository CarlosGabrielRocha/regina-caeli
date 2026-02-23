"use client";

import ProfileAside from "../views/header/ProfileAside";
import { createContext, useContext, useState } from "react";

interface ProfileContextType {
  openProfile: (
    activeTab: "profile" | "security" | "requests" | "agent",
  ) => void;
  closeProfile: () => void;
  isProfileOpen: boolean;
  activeTab: "profile" | "security" | "requests" | "agent";
  setActiveTab: (tab: "profile" | "security" | "requests" | "agent") => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "requests" | "agent"
  >("profile");

  const openProfile = (tab: "profile" | "security" | "requests" | "agent") => {
    setIsProfileOpen(true);
    setActiveTab(tab);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        openProfile,
        closeProfile,
        isProfileOpen,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
      <ProfileAside
        isProfileOpen={isProfileOpen}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        closeProfile={closeProfile}
      />
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return context;
}
