import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-highlight text-white hover:bg-highlight/90 hover:text-white/80 focus-visible:ring-highlight/20",
        destructive:
          "bg-red-800 text-white hover:bg-red-900 hover:text-white/80 focus-visible:ring-red-800/20",
        outline:
          "border bg-linear-to-r from-primary to-secondary shadow-xs hover:translate-y-0.5 transition-all",
        secondary:
          "bg-secondary text-white hover:bg-secondary/80 hover:text-white/80 focus-visible:ring-secondary/20",
        modify:
          "bg-amber-600 text-white hover:bg-amber-700 hover:text-white/80 focus-visible:ring-amber-600/20",
        ghost: "hover:bg-highlight hover:text-white focus-visible:ring-highlight/20",
        link: "text-primary underline-offset-4 hover:underline",
        sky: "text-white bg-sky-700 hover:bg-sky-800 hover:text-white/80 focus-visible:ring-sky-700/20",
        confirm: "text-white bg-lime-700 hover:bg-lime-800 hover:text-white/80 focus-visible:ring-lime-700/20"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
