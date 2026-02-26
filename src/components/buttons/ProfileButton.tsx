"use client";

import { cn } from "@/lib/utils";
import Icon from "../icons/Icon";
import { useProfile } from "../../contexts/ProfileContext";
import DefaultProps from "../props/DefaultProps";
import { useUser } from "../../contexts/UserContext";

export default function ProfileButton({ className }: DefaultProps) {
  const { openProfile } = useProfile();
  const { getUser } = useUser();

  const handleClick = () => {
    getUser();
    openProfile("profile");
  };
  return (
    <button
      className={cn(
        "bg-linear-to-b from-primary to-secondary p-1 rounded-md hover:translate-y-0.5 transition-all",
        className,
      )}
      onClick={handleClick}
    >
      <Icon
        src="/icons/user-icon.svg"
        alt="Perfil"
        className={cn("shadow-sm size-7 2xl:size-10", className)}
      />
    </button>
  );
}
