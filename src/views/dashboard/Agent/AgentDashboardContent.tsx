"use client";

import { useState } from "react";
import { ContactRequest } from "@/actions/types/Modals";
import { cn } from "@/lib/utils";
import AgentRequestSection from "./AgentRequestSection";

interface AgentDashboardContentProps {
  inProgressRequests: ContactRequest[];
  doneRequests: ContactRequest[];
  inProgressPagination?: any;
  donePagination?: any;
}

export default function AgentDashboardContent({
  inProgressRequests,
  doneRequests,
  inProgressPagination,
  donePagination,
}: AgentDashboardContentProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "done">("pending");

  const defaultStyles =
    "flex-1 py-3 2xl:py-4 3xl:py-5 font-medium rounded-lg transition-all duration-200";

  const activeStyles = "bg-primary text-foreground shadow-sm scale-[1.02]";

  const noActiveStyles =
    "text-muted-foreground hover:text-foreground hover:bg-primary/50";

  return (
    <div className="space-y-8">
      <div className="flex gap-2 p-2 bg-secondary rounded-xl mb-6 2xl:mb-10 3xl:mb-14 max-w-2xl mx-auto">
        <button
          onClick={() => setActiveTab("pending")}
          className={cn(
            defaultStyles,
            activeTab === "pending" ? activeStyles : noActiveStyles,
          )}
        >
          <span className="text-sm md:text-md 2xl:text-lg 3xl:text-xl">
            Em Andamento
          </span>
        </button>
        <button
          onClick={() => setActiveTab("done")}
          className={cn(
            defaultStyles,
            activeTab === "done" ? activeStyles : noActiveStyles,
          )}
        >
          <span className="text-sm md:text-md 2xl:text-lg 3xl:text-xl">
            Concluídas
          </span>
        </button>
      </div>

      {activeTab === "pending" ? (
        <AgentRequestSection
          title="Solicitações Pendentes / Em Andamento"
          indicatorColor="bg-blue-500"
          isPulse
          requests={inProgressRequests}
          type="pending"
          pagination={inProgressPagination}
        />
      ) : (
        <AgentRequestSection
          title="Solicitações Concluídas"
          indicatorColor="bg-green-500"
          requests={doneRequests}
          type="done"
          pagination={donePagination}
        />
      )}
    </div>
  );
}
