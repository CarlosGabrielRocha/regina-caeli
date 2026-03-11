import DefaultProps from "@/components/props/DefaultProps";
import { cn } from "@/lib/utils";

export default function InputError({ className, children }: DefaultProps) {
  return (
    <p
      className={cn(
        "text-xs 2xl:text-sm 3xl:text-md h-1 2xl:h-2 3xl:h-4 text-red-500 font-light",
        className,
      )}
    >
      {" "}
      {children}
    </p>
  );
}
