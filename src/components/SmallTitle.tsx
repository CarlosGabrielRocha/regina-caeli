import DefaultProps from "./props/DefaultProps";
import { cn } from "@/lib/utils";

export interface TitleProps extends DefaultProps {
  type?: "h1" | "h2" | "h3";
}

const SmallTitle: React.FC<TitleProps> = ({
  children,
  type,
  className = "",
}) => {
  const styles = "text-sm md:text-md 2xl:text-lg 3xl:text-xl";
  const Tag = type || "h1";
  return <Tag className={cn(styles, className)}>{children}</Tag>;
};

export default SmallTitle;
