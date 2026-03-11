"use client";

import { useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import ContactModal from "./ContactModal";
import { useContactRequestActions } from "../../hooks/useContactRequestActions";
import { useUser } from "../../contexts/UserContext";
import { Loader } from "../ui/loader";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

interface ContactButtonProps extends ButtonProps {
  propertyId: string;
}

export default function ContactButton({
  propertyId,
  ...props
}: ContactButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { removeInterest, addInterest, loading } = useContactRequestActions();
  const { user } = useUser();

  const pendingRequest = user?.client.contactRequests[0];
  const propertyInterest = pendingRequest?.interests?.find(
    (interest) => interest.propertyId === propertyId,
  );

  const className = "w-fit border gap-2 3xl:px-4 3xl:py-4";

  return (
    <>
      {propertyInterest ? (
        <Button
          {...props}
          variant={"destructive"}
          onClick={() =>
            removeInterest(pendingRequest?.id || "", propertyInterest.id)
          }
          className={className}
          disabled={loading}
        >
          {loading ? (
            <Loader className="text-white" />
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-md 2xl:text-xl 3xl:text-2xl">
                Remover interesse
              </span>
            </>
          )}
        </Button>
      ) : pendingRequest ? (
        <Button
          {...props}
          variant={"confirm"}
          onClick={() => addInterest(pendingRequest.id, propertyId)}
          className={className}
          disabled={loading}
        >
          {loading ? (
            <Loader className="text-white" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-md 2xl:text-xl 3xl:text-2xl">
                Adicionar à lista de interesses
              </span>
            </>
          )}
        </Button>
      ) : (
        <Button
          {...props}
          onClick={() => setIsModalOpen(true)}
          variant={"default"}
          className={className}
        >
          <MessageSquare className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          <span className="text-sm md:text-md 2xl:text-xl 3xl:text-2xl">
            Solicitar contato
          </span>
        </Button>
      )}

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={propertyId}
      />
    </>
  );
}
