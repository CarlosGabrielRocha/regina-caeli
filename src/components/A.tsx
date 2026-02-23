import DefaultProps from "./props/DefaultProps";
import Link from "next/link";
import Text from "./Text";
import { cn } from "@/lib/utils";

interface LinkProps extends DefaultProps {
  href: string;
  target?: string;
  size?: "small" | "medium" | "big";
}

export default function A({ href, children, className, target, size = "medium" }: LinkProps) {
  return (
    <Link
      href={href}
      target={target}
      className={cn("hover:text-highlight transition-colors", className)}
    >
      <Text type="span" size={size}>
        {children}
      </Text>
    </Link>
  );
}
