import { cn } from "@/lib/utils";
import { TitleTypes } from "./types";

interface TitleProps {
  children?: React.ReactNode;
  type?: TitleTypes;
  className?: string;
  size?: "sm" | "md" | "lg";
}

enum Size {
  sm = "text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl text-shadow-md",
  md = "text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl text-shadow-lg",
  lg = "text-4xl md:text-6xl 2xl:text-7xl 3xl:text-8xl text-shadow-xl",
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
