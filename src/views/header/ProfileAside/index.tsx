"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import Title from "../../../components/Title";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import NotLoggedView from "./NotLoggedView";
import ProfileHeader from "./ProfileHeader";
import NavigationTabs from "./NavigationTabs";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import LogoutButton from "./LogoutButton";
import { useUser } from "../../../contexts/UserContext";
import ContactRequestsTab from "./ContactRequestsTab";
import AgentTab from "./AgentTab";

interface ProfileAsideProps {
  isProfileOpen: boolean;
  setActiveTab: (tab: "profile" | "security" | "requests" | "agent") => void;
  activeTab: "profile" | "security" | "requests" | "agent";
  closeProfile: () => void;
}

export default function ProfileAside({
  isProfileOpen,
  setActiveTab,
  activeTab,
  closeProfile,
}: ProfileAsideProps) {
  const { user, loading, isAuthenticated, googleLogin } = useUser();

  const handleGoogleSuccess = async (response: any) => {
    if (!response.credential) {
      toast.error("Erro ao fazer login com Google", { duration: 5000 });
      return;
    }

    await googleLogin(response.credential);
  };

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProfile}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-120 md:max-w-130 2xl:max-w-180 bg-tertiary border-l border-border z-50 shadow-2xl overflow-y-auto custom-scrollbar"
          >
            <div className="p-3 md:p-4 lg:p-6 flex flex-col min-h-full">
              <div className="flex justify-between items-center mb-8">
                <Title size="md">
                  {isAuthenticated ? "Meu Perfil" : "Não logado"}
                </Title>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeProfile}
                  className="rounded-full"
                >
                  <X className="size-4 md:size-5 2xl:size-7" />
                </Button>
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-highlight" />
                </div>
              ) : !isAuthenticated ? (
                <NotLoggedView
                  onLoginClick={closeProfile}
                  onGoogleSuccess={handleGoogleSuccess}
                />
              ) : (
                <>
                  <ProfileHeader name={user?.name} email={user?.email} />

                  <NavigationTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    isAgent={!!user?.agent}
                  />

                  <div className="flex-1 space-y-6 pr-1">
                    {activeTab === "profile" ? (
                      <ProfileTab
                        name={user?.name}
                        email={user?.email}
                        phone={user?.phone}
                      />
                    ) : activeTab === "security" ? (
                      <SecurityTab
                        twoFactorInitialValue={user?.twoSteps ?? false}
                      />
                    ) : activeTab === "requests" ? (
                      <ContactRequestsTab
                        request={user?.client?.contactRequests?.[0]}
                      />
                    ) : (
                      <AgentTab closeProfile={closeProfile} />
                    )}
                  </div>
                  <LogoutButton />
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
