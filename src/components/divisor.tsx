import DefaultProps from "./props/DefaultProps";
import { cn } from "@/lib/utils";

export default function Divisor({
  className,
}: DefaultProps) {
  return <div className={cn("h-full w-px bg-white", className)} />;
}
