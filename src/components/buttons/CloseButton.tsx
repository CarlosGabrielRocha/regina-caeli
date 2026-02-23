import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isScrolled?: boolean;
}

export function CloseButton({
  className,
  onClick,
  isScrolled = false,
  ...props
}: CloseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "absolute right-4 top-4 rounded-full hover:bg-highlight z-50 transition-all duration-300",
        isScrolled && "bg-black/10 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <X className="w-5 h-5" />
    </Button>
  );
}
