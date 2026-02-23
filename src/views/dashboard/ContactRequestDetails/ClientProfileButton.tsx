"use client";

import { User } from "../../../actions/types/Modals";
import { Button } from "../../../components/ui/button";
import { User as UserIcon } from "lucide-react";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import Text from "../../../components/Text";

interface ClientProfileButtonProps {
  client: User;
}

export default function ClientProfileButton({
  client,
}: ClientProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <UserIcon className="size-4 md:size-5 2xl:size-6" />
        <Text className="hidden md:block">Ver Perfil do Cliente</Text>
      </Button>

      <ProfileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={client}
        isClient
      />
    </>
  );
}
