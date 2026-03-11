import { MouseIcon } from "lucide-react";
import { ReactNode } from "react";

interface TutorialProps {
  children: ReactNode;
}

export default function Tutorial({ children }: TutorialProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-2 opacity-50">
      <MouseIcon className="size-4 3xl:size-6 animate-bounce" />
      <span className="text-xs 3xl:text-base uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
}
