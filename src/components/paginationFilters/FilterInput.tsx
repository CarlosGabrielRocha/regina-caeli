import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Text from "../Text";
import { Button } from "../ui/button";
import { FilterInputProps } from "./types";

export function FilterInput({
  id,
  label,
  placeholder,
  type,
  open,
  setOpen,
}: FilterInputProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const activeParams = useSearchParams();
  const params = new URLSearchParams(activeParams);
  const [value, setValue] = useState(activeParams.get(id) || "");

  const handleApply = () => {
    params.set(id, String(value));
    if (params.get("initial")) {
      params.delete("initial");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
    setOpen(false);
  };

  useEffect(() => {
    setValue(activeParams.get(id) || "");
  }, [activeParams]);

  return (
    <div
      className={cn(
        "absolute -top-40 max-md:left-0 md:top-0 md:-right-65 flex-col gap-5 w-55 md:w-60 bg-tertiary px-3 py-5 rounded-sm border shadow-md z-40",
        open ? "flex" : "hidden",
      )}
    >
      <div className="flex flex-col gap-4">
        <Text size="small" type="label" htmlFor={id}>
          {label}
        </Text>
        <div className="relative">
          {type === "price" && (
            <Text
              type="span"
              size="small"
              className="absolute left-2 top-1/2 -translate-y-1/2 font-light text-white/70 pointer-events-none"
            >
              R$
            </Text>
          )}
          <input
            id={id}
            type={type === "price" ? "number" : type || "text"}
            placeholder={placeholder}
            className={cn(
              "border border-white rounded-sm py-1 px-2 bg-neutral-950 w-full text-xs md:text-sm font-light",
              type === "price" && "pl-8",
            )}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-fit ms-auto"
        onClick={handleApply}
      >
        <Text className="text-xs">Aplicar</Text>
      </Button>
    </div>
  );
}
