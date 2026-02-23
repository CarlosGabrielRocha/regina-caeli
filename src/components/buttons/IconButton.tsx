import { cn } from "@/lib/utils";
import Icon, { IconProps } from "../icons/Icon";

interface IconButtonProps extends IconProps {
  onClick?: () => void;
}

export default function IconButton({
  src,
  alt,
  className,
  onClick,
}: IconButtonProps) {
  return (
    <button className={cn("bg-linear-to-b from-primary to-secondary p-1 2xl:p-2 rounded-md hover:translate-y-0.5 transition-all")} onClick={onClick}>
      <Icon
        src={src}
        alt={alt}
        responsive={true}
        className={cn("shadow-sm", className)}
      />
    </button>
  );
}
