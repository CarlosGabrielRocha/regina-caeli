import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

export function Loader({ className, ...props }: LucideProps) {
  return (
    <Loader2
      className={cn(
        "animate-spin size-4 md:size-5 2xl:size-6 3xl:size-8",
        className,
      )}
      {...props}
    />
  );
}
