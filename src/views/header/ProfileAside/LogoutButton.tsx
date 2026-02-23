"use client";

import { LogOut } from "lucide-react";
import { Loader } from "../../../components/ui/loader";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import LogoutAction from "../../../actions/auth/logout";
import { toast } from "sonner";
import Text from "../../../components/Text";
import { useUser } from "../../../contexts/UserContext";

// Removed interface LogoutButtonProps

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { logoutUser } = useUser();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await LogoutAction();

      if (result.status === "error") {
        toast.error(result.message, {
          closeButton: true,
          duration: 2000,
        });
      } else {
        window.location.href = "/";
        logoutUser();
      }
    } catch (e) {
      toast.error("Erro ao fazer logout", {
        closeButton: true,
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
      <Button
        variant="destructive"
        className="w-fit gap-2 h-11 shadow-sm hover:shadow-md transition-all hover:bg-destructive/90"
        size="lg"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="text-white" />
        ) : (
          <>
            <LogOut className="w-4 h-4" />
            <Text type="span" className="font-bold">
              Sair da Conta
            </Text>
          </>
        )}
      </Button>
    </div>
  );
}
