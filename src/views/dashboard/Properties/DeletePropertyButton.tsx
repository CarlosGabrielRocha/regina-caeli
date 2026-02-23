"use client";

import { useTransition, useState } from "react";
import { Trash2 } from "lucide-react";
import { deletePropertyAction } from "../../../actions/property/deleteProperty";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "../../../contexts/UserContext";
import { Button } from "../../../components/ui/button";
import { ConfirmModal } from "../../../components/ConfirmModal";

interface DeletePropertyButtonProps {
  propertyId: string;
}

export default function DeletePropertyButton({
  propertyId,
}: DeletePropertyButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePropertyAction({
        id: propertyId,
      });
      if (result.status === "ok") {
        toast.success("Propriedade removida com sucesso!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.message || "Erro ao remover propriedade.");
      }
    });
  };

  return (
    <>
      <Button
        variant="destructive"
        size="icon"
        className="rounded-full shadow-lg"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="size-4" />
      </Button>

      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Remover Propriedade?"
        description="Esta ação não pode ser desfeita. O imóvel será permanentemente removido do sistema."
        confirmText="Sim, remover"
        cancelText="Cancelar"
        isLoading={isPending}
      />
    </>
  );
}
