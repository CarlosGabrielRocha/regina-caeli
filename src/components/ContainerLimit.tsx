import { cn } from "@/lib/utils";
import DefaultProps from "./props/DefaultProps";

export interface ContainerLimitProps extends DefaultProps {
  size: "smaller" | "small" | "medium" | "big";
}

const ContainerSize = {
  smaller: "max-w-[1600px]",
  small: "max-w-[1920px]",
  medium: "max-w-[2560px]",
  big: "max-w-[3840px]",
};

export default function ContainerLimit({
  children,
  size,
  className,
}: ContainerLimitProps) {
  return (
    <div className={cn(ContainerSize[size], "mx-auto", className)}>
      {children}
    </div>
  );
}
