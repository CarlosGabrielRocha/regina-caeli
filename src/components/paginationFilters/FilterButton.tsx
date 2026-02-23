import { cn } from "@/lib/utils";
import Icon from "../icons/Icon";
import Text from "../Text";
import { Button } from "../ui/button";
import { FilterButtonProps } from "./types";

export function FilterButton({ className, onClick, props }: FilterButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("flex items-center", className)}
      onClick={onClick}
      {...props}
    >
      <Text size="small">Filtrar Por</Text>
      <Icon
        size="small"
        src="/icons/arrow-down-icon.svg"
        alt="Seta para baixo"
      />
    </Button>
  );
}
