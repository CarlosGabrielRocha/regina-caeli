import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useContactAlert } from "../contexts/ContactAlertContext";
import deleteInterestAction from "../actions/contactRequest/deleteInterest";
import newInterestAction from "../actions/contactRequest/newInterest";
import updateContactRequestAction from "../actions/contactRequest/updateContactRequest";
import { toast } from "sonner";
import { useNotification } from "../contexts/NotificationContext";

export function useContactRequestActions() {
  const { getUser } = useUser();
  const { showContactAlert } = useContactAlert();
  const { showNotification } = useNotification();

  const [loading, setLoading] = useState(false);

  const removeInterest = async (contactReqId: string, interestId: string) => {
    setLoading(true);
    try {
      const result = await deleteInterestAction({
        contactReqId: contactReqId,
        interestId: interestId,
      });
      await getUser({ load: false });
      if (result.status === "success") {
        showContactAlert(
          "Ação bem-sucedida",
          "Interesse removido com sucesso!",
        );
      } else {
        toast.error(result.message, {
          closeButton: true,
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Erro ao tentar remover interesse", {
        closeButton: true,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const addInterest = async (contactReqId: string, propertyId: string) => {
    setLoading(true);
    try {
      const result = await newInterestAction({
        contactReqId: contactReqId,
        propertyId: propertyId,
      });
      await getUser({ load: false });
      if (result.status === "success") {
        showContactAlert(
          "Ação bem-sucedida",
          "Interesse adicionado com sucesso!",
        );
      } else {
        toast.error(result.message, {
          closeButton: true,
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Erro ao tentar adicionar interesse", {
        closeButton: true,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContactRequest = async (
    description: string,
    contactReqId: string,
  ) => {
    setLoading(true);
    try {
      const result = await updateContactRequestAction({
        contactReqId: contactReqId,
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
  };

  return {
    removeInterest,
    addInterest,
    updateContactRequest,
    loading,
  };
}
