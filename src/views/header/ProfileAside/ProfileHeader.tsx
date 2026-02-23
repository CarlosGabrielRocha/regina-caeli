"use client";

import Text from "../../../components/Text";

interface ProfileHeaderProps {
  name?: string;
  email?: string;
}

export default function ProfileHeader({
  name = "Usuário",
  email = "email@exemplo.com",
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 2xl:mt-6 mb-10 2xl:mb-14 animate-in fade-in zoom-in duration-300 w-full">
      <Text size="big" className="font-semibold w-full truncate text-center">
        {name}
      </Text>
      <Text size="medium" className="text-muted-foreground w-full truncate text-center">
        {email}
      </Text>
    </div>
  );
}
