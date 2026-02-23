import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: LucideIcon;
  variant?: "primary" | "highlight";
  className?: string;
  iconClassName?: string;
}

export default function IconBadge({
  icon: Icon,
  variant = "highlight",
  className,
  iconClassName,
}: IconBadgeProps) {
  const variants = {
    primary: "bg-primary/10 text-primary",
    highlight: "bg-highlight/15 text-highlight",
  };

  const [bgClass, textClass] = variants[variant].split(" ");

  return (
    <div className={cn("p-1.5 rounded-md", bgClass, className)}>
      <Icon className={cn("w-4 h-4", textClass, iconClassName)} />
    </div>
  );
}
