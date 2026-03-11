import Text from "../../../../components/Text";
import { Button } from "../../../../components/ui/button";
import { Check, Edit2, Loader2, XIcon } from "lucide-react";
import { useState } from "react";
import { ContactRequest } from "../../../../actions/types/Modals";
import updateContactRequestAction from "../../../../actions/contactRequest/updateContactRequest";
import { useUser } from "../../../../contexts/UserContext";
import { useNotification } from "../../../../contexts/NotificationContext";
import { toast } from "sonner";
import { Textarea } from "../../../../components/ui/textarea";

export default function ContactRequestTabDescription({
  request,
}: {
  request: ContactRequest;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(request?.description || "");
  const { getUser } = useUser();
  const { showNotification } = useNotification();

  const cancelEdit = () => {
    setDescription(request?.description || "");
    setIsEditing(false);
  };

  const handleSaveDescription = async () => {
    setLoading(true);
    try {
      const result = await updateContactRequestAction({
        contactReqId: request.id,
        data: { description },
      });
      await getUser({ load: false });
      if (result.status === "success") {
        showNotification(
          "Solicitação de contato atualizada com sucesso!",
          "success",
        );
      } else {
        toast.error(result.message, {
          closeButton: true,
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Erro ao tentar atualizar solicitação de contato", {
        closeButton: true,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
    setIsEditing(false);
  };

  return (
    <div className="mb-4 relative group">
      <div className="flex items-center justify-between mb-1">
        <Text className="font-semibold uppercase">Descrição</Text>
        {isEditing ? (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={cancelEdit}
              disabled={loading}
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-3 2xl:size-4 3xl:size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveDescription}
              disabled={loading}
              className="h-6 w-6 text-green-500 hover:text-green-600 hover:bg-green-500/10"
            >
              {loading ? (
                <Loader2 className="size-3 2xl:size-4 3xl:size-5 animate-spin" />
              ) : (
                <Check className="size-3 2xl:size-4 3xl:size-5" />
              )}
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="size-6 3xl:size-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-amber-500"
          >
            <Edit2 className="size-3 2xl:size-4 3xl:size-5 mx-auto text-white" />
          </button>
        )}
      </div>

      {isEditing ? (
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-11 bg-background resize-none focus-visible:ring-1"
          placeholder="Adicione uma descrição para sua solicitação..."
          maxLength={200}
          minLength={20}
        />
      ) : (
        <Text
          size="small"
          className="text-muted-foreground max-w-full line-clamp-5"
          onClick={() => setIsEditing(true)}
          type="span"
        >
          {request.description ||
            "Adicione uma descrição para sua solicitação.."}
        </Text>
      )}
    </div>
  );
}
