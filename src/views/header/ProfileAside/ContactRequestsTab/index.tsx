import { Calendar, Info, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { ContactRequest } from "../../../../actions/types/Modals";
import StatusBadge from "./StatusBadge";
import InterestsArea from "./InterestsArea";
import ContactRequestTabDescription from "./ContactRequestTabDescription";
import { useState } from "react";
import { useUser } from "../../../../contexts/UserContext";
import deleteContactRequestAction from "../../../../actions/contactRequest/deleteContactRequest";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ConfirmModal } from "../../../../components/ConfirmModal";
import { Button } from "../../../../components/ui/button";
import Text from "@/components/Text";

interface ContactRequestTabProps {
  request?: ContactRequest;
}

export default function ContactRequestsTab({
  request,
}: ContactRequestTabProps) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { getUser } = useUser();
  const router = useRouter();

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <Info className="size-8 lg:size-12 2xl:size-15 mb-2 opacity-50" />
        <Text className="text-center" type="p" size="medium">
          Você não possui solicitações de contato pendentes.
        </Text>
      </div>
    );
  }

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const executeDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteContactRequestAction({
        id: request.id,
      });

      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      setShowConfirm(false);

      await getUser({ load: false });
      router.refresh();
    } catch (error) {
      toast.error("Erro ao deletar solicitação de contato.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="rounded-lg p-4 border border-white"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <StatusBadge status={request.status} />
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(request.createdAt).toLocaleDateString("pt-BR")}
            </div>
          </div>

          {request && (
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="text-xs w-fit flex items-center gap-1 transition-colors disabled:opacity-50"
              variant="destructive"
            >
              {loading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
              Cancelar
            </Button>
          )}
        </div>
        <ContactRequestTabDescription request={request} />
        <InterestsArea request={request} />
      </motion.div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={executeDelete}
        title="Cancelar solicitação"
        description="Tem certeza que deseja cancelar esta solicitação de contato? Esta ação não pode ser desfeita."
        confirmText="Cancelar"
        cancelText="Voltar"
        isLoading={loading}
      />
    </div>
  );
}
