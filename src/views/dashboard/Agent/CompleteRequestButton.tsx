"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { markAsDoneAction } from "@/actions/contactRequest/markAsDone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/ConfirmModal";
import Text from "@/components/Text";

interface CompleteRequestButtonProps {
  requestId: string;
}

export default function CompleteRequestButton({
  requestId,
}: CompleteRequestButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleMarkAsDone = () => {
    startTransition(async () => {
      const result = await markAsDoneAction(requestId);
      if (result.status === "ok") {
        toast.success("Solicitação concluída com sucesso!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.message || "Erro ao concluir solicitação.");
      }
    });
  };

  return (
    <>
      <Button
        variant="confirm"
        size="sm"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <CheckCircle2 className="size-4 md:size-5 2xl:size-6 3xl:size-8" />
        <Text type="span" className="text-white">
          Concluir
        </Text>
      </Button>

      <ConfirmModal
        isOpen={open}
        buttonConfirmType="confirm"
        onClose={() => setOpen(false)}
        onConfirm={handleMarkAsDone}
        title="Concluir solicitação?"
        description="Esta ação marcará a solicitação como concluída e não poderá ser desfeita."
        confirmText="Sim, concluir"
        cancelText="Cancelar"
        isLoading={isPending}
      />
    </>
  );
}
