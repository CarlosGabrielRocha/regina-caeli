import DefaultProps from "./props/DefaultProps";
import { cn } from "@/lib/utils";

export interface TextProps extends DefaultProps {
  type?: "p" | "span" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "address";
  size?: "smaller" | "small" | "medium" | "big" | "bigger";
  htmlFor?: string;
}

const sizeClasses = {
  smaller: "text-[10px] 2xl:text-xs",
  small: "text-xs md:text-sm 2xl:text-md",
  medium: "text-sm 2xl:text-lg",
  big: "text-base md:text-md 2xl:text-xl",
  bigger: "text-md md:text-lg 2xl:text-2xl",
};

const Text: React.FC<TextProps> = ({
  type,
  size = "small",
  className = "",
  htmlFor,
  children,
}) => {
  const Tag = type || "p";
  return <Tag className={cn(sizeClasses[size],"not-italic", className)} htmlFor={htmlFor}>{children}</Tag>;
};

export default Text;
