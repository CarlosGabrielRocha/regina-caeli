"use client"

import Image from "next/image";
import DefaultProps from "../props/DefaultProps";
import { cn } from "@/lib/utils";

export enum IconSize {
  smaller = "size-4.5",
  small = "size-5",
  medium = "size-7",
  big = "size-10",
}

export interface IconProps extends DefaultProps {
  src: string;
  alt: string;
  size?: "smaller" | "small" | "medium" | "big";
  responsive?: boolean;
}

const Icon: React.FC<IconProps> = ({
  src,
  alt,
  size = 'small',
  responsive = false,
  className = "",
}) => {
  let width: string;
  if (responsive) {
    width = "size-5 sm:size-6 2xl:size-7";
  } else width = IconSize[size];

  return (
    <div className={cn(width, "relative drop-shadow-md", className)}>
      <Image fill src={src} alt={alt} sizes="8rem" />
    </div>
  );
};

export default Icon;
