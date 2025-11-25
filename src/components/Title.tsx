import { cn } from "@/lib/utils";
import { TitleTypes } from "./types";

interface TitleProps {
  children?: React.ReactNode;
  type?: TitleTypes;
  className?: string;
  size?: "sm" | "md" | "lg";
}

enum Size {
  sm = "text-3xl 2xl:text-4xl",
  md = "text-4xl 2xl:text-5xl",
  lg = "text-5xl 2xl:text-6xl",
}

const Title: React.FC<TitleProps> = ({
  children,
  type,
  className = "",
  size = "md",
}) => {
  const styles = "rochester " + Size[size];
  const Tag = type || "h1";
  return <Tag className={cn(`${styles} ${className}`)}>{children}</Tag>;
};

export default Title;
