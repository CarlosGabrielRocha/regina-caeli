import React from "react";

interface AuthNavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AuthNavigationButton({
  children,
  className,
  ...props
}: AuthNavigationButtonProps) {
  return (
    <button
      type="button"
      className={`font-medium text-sm text-white hover:underline underline-offset-4 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
