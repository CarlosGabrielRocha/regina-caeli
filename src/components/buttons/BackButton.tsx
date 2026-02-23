"use client";

import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  className?: string;
}

export default function BackButton({ href, className }: BackButtonProps) {
  const router = useRouter();

  const handleNavigation = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleNavigation}
      className={cn(
        "p-2 hover:bg-highlight hover:text-white rounded-full transition-colors",
        className,
      )}
      type="button"
    >
      <ArrowLeft className="size-6" />
    </button>
  );
}
