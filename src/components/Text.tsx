import DefaultProps from "./props/DefaultProps";
import { cn } from "@/lib/utils";

export interface TextProps extends DefaultProps {
  type?: "p" | "span";
}

const Text: React.FC<TextProps> = ({ type, className = "", children }) => {
  const Tag = type || "p";
  return (
    <Tag className={cn("text-xs sm:text-sm md:text-md 2xl:text-lg", className)}>
      {children}
    </Tag>
  );
};

export default Text;
