import Image from "next/image";
import DefaultProps from "../props/DefaultProps";
import { cn } from "@/lib/utils";

export enum IconSize {
  small = "size-5",
  medium = "size-7",
  big = "size-10",
}

export interface IconProps extends DefaultProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "big";
  responsive?: boolean;
}

const Icon: React.FC<IconProps> = ({
  src,
  alt,
  size,
  responsive = true,
  className = "",
}) => {
  let width: string;
  if (!size || responsive) {
    width = "size-4 sm:size-5 2xl:size-7";
  } else width = IconSize[size];

  return (
    <div className={cn(width, "relative", className)}>
      <Image fill src={src} alt={alt} sizes="8rem" />
    </div>
  );
};

export default Icon;
