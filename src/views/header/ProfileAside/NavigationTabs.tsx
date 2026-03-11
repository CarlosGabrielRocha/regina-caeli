"use client";

import Text from "../../../components/Text";
import { cn } from "@/lib/utils";

interface NavigationTabsProps {
  activeTab: "profile" | "security" | "requests" | "agent";
  onTabChange: (tab: "profile" | "security" | "requests" | "agent") => void;
  isAgent?: boolean;
}

export default function NavigationTabs({
  activeTab,
  onTabChange,
  isAgent = false,
}: NavigationTabsProps) {
  const defaultStyles =
    "flex-1 py-2 2xl:py-3 3xl:py-4 font-medium rounded-lg transition-all duration-200";

  const activeStyles = "bg-primary text-foreground shadow-sm scale-[1.02]";

  const noActiveStyles =
    "text-muted-foreground hover:text-foreground hover:bg-primary/50";

  return (
    <div className="flex max-sm:flex-wrap gap-2 p-1 2xl:p-2 3xl:p-3 bg-secondary rounded-xl mb-6 2xl:mb-10 3xl:mb-14">
      <button
        onClick={() => onTabChange("profile")}
        className={cn(
          defaultStyles,
          activeTab === "profile" ? activeStyles : noActiveStyles,
        )}
      >
        <Text
          type="span"
          className="text-xs md:text-sm 2xl:text-lg 3xl:text-xl font-bold"
        >
          Dados Pessoais
        </Text>
      </button>
      <button
        onClick={() => onTabChange("security")}
        className={cn(
          defaultStyles,
          activeTab === "security" ? activeStyles : noActiveStyles,
        )}
      >
        <Text
          type="span"
          className="text-xs md:text-sm 2xl:text-lg 3xl:text-xl font-bold"
        >
          Segurança
        </Text>
      </button>
      <button
        onClick={() => onTabChange("requests")}
        className={cn(
          defaultStyles,
          activeTab === "requests" ? activeStyles : noActiveStyles,
        )}
      >
        <Text
          type="span"
          className="text-xs md:text-sm 2xl:text-lg 3xl:text-xl font-bold"
        >
          Solicitações
        </Text>
      </button>

      {isAgent && (
        <button
          onClick={() => onTabChange("agent")}
          className={cn(
            defaultStyles,
            activeTab === "agent" ? activeStyles : noActiveStyles,
          )}
        >
          <Text
            type="span"
            className="text-xs md:text-sm 2xl:text-lg 3xl:text-xl font-bold"
          >
            Agente
          </Text>
        </button>
      )}
    </div>
  );
}
