"use client";

import { useTransition, useState } from "react";
import { Button } from "../../../components/ui/button";
import { UserCheck, ShieldCheck } from "lucide-react";
import { Loader } from "../../../components/ui/loader";
import { markAsInProgressAction } from "../../../actions/contactRequest/markAsInProgress";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "../../../actions/types/Modals";
import Text from "../../../components/Text";
import ClientProfileButton from "./ClientProfileButton";
import AgentProfileButton from "./AgentProfileButton";

interface ActionsBarProps {
  status: "pending" | "inProgress" | "done";
  requestId: string;
  agent?: User;
  client?: User;
}

export default function ActionsBar({
  status,
  requestId,
  client,
  agent,
}: ActionsBarProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleMarkAsInProgress = () => {
    startTransition(async () => {
      const result = await markAsInProgressAction(requestId);
      if (result.status === "ok") {
        toast.success("Solicitação marcada como em andamento!");
        router.refresh();
      } else {
        toast.error(result.message || "Erro ao atualizar status.");
      }
    });
  };

  return (
    <div className="flex items-center gap-4">
      {client && <ClientProfileButton client={client} />}
      {status === "pending" ? (
        <Button
          onClick={handleMarkAsInProgress}
          disabled={isPending}
          variant={"sky"}
          className="gap-2"
        >
          {isPending ? (
            <Loader />
          ) : (
            <UserCheck className="size-4 md:size-5 2xl:size-6" />
          )}
          <Text type="span" className="text-white">
            Atender Solicitação
          </Text>
        </Button>
      ) : (
        agent && <AgentProfileButton agent={agent} />
      )}
    </div>
  );
}
