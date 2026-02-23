"use client";

import { User } from "../../../actions/types/Modals";
import { Button } from "../../../components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import Text from "../../../components/Text";

interface AgentProfileButtonProps {
  agent: User;
}

export default function AgentProfileButton({ agent }: AgentProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <ShieldCheck className="size-4 md:size-5 2xl:size-6" />
        <Text className="hidden md:block">Ver Agente Responsável</Text>
      </Button>

      <ProfileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={agent}
      />
    </>
  );
}
