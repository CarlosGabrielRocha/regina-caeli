"use client";

import Image from "next/image";
import DefaultProps from "../props/DefaultProps";
import { cn } from "@/lib/utils";

export enum IconSize {
  smaller = "size-4.5 2xl:size-5.5 3xl:size-7",
  small = "size-5 2xl:size-6 3xl:size-8",
  medium = "size-7 2xl:size-8 3xl:size-10",
  big = "size-10 2xl:size-11 3xl:size-13",
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
  size = "small",
  responsive = false,
  className = "",
}) => {
  let width: string;
  if (responsive) {
    width = "size-6 2xl:size-7 3xl:size-9";
  } else width = IconSize[size];

  return (
    <div className={cn(width, "relative drop-shadow-md", className)}>
      <Image fill src={src} alt={alt} sizes="8rem" />
    </div>
  );
};

export default Icon;
