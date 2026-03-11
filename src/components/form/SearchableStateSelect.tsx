"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, Search } from "lucide-react";
import { FieldError } from "react-hook-form";
import Text from "../Text";
import InputError from "./components/InputError";

const BRAZILIAN_STATES = [
  { value: "AC", label: "AC - Acre" },
  { value: "AL", label: "AL - Alagoas" },
  { value: "AM", label: "AM - Amazonas" },
  { value: "AP", label: "AP - Amapá" },
  { value: "BA", label: "BA - Bahia" },
  { value: "CE", label: "CE - Ceará" },
  { value: "DF", label: "DF - Distrito Federal" },
  { value: "ES", label: "ES - Espírito Santo" },
  { value: "GO", label: "GO - Goiás" },
  { value: "MA", label: "MA - Maranhão" },
  { value: "MG", label: "MG - Minas Gerais" },
  { value: "MS", label: "MS - Mato Grosso do Sul" },
  { value: "MT", label: "MT - Mato Grosso" },
  { value: "PA", label: "PA - Pará" },
  { value: "PB", label: "PB - Paraíba" },
  { value: "PE", label: "PE - Pernambuco" },
  { value: "PI", label: "PI - Piauí" },
  { value: "PR", label: "PR - Paraná" },
  { value: "RJ", label: "RJ - Rio de Janeiro" },
  { value: "RN", label: "RN - Rio Grande do Norte" },
  { value: "RO", label: "RO - Rondônia" },
  { value: "RR", label: "RR - Roraima" },
  { value: "RS", label: "RS - Rio Grande do Sul" },
  { value: "SC", label: "SC - Santa Catarina" },
  { value: "SE", label: "SE - Sergipe" },
  { value: "SP", label: "SP - São Paulo" },
  { value: "TO", label: "TO - Tocantins" },
];

interface SearchableStateSelectProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function SearchableStateSelect({
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = "Selecione o estado",
}: SearchableStateSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredStates = BRAZILIAN_STATES.filter(
    (state) =>
      state.value.toLowerCase().includes(search.toLowerCase()) ||
      state.label.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedState = BRAZILIAN_STATES.find((s) => s.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (stateValue: string) => {
    onChange(stateValue);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block font-medium text-foreground text-xs md:text-sm 2xl:text-base">
        {label} {required && <span className="text-highlight">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "font-light 2xl:h-12",
            error && "border-red-700",
            !value && "text-muted-foreground",
          )}
        >
          <Text type="span" size="small" className="truncate">
            {selectedState ? selectedState.value : placeholder}
          </Text>
          <ChevronDown
            className={cn(
              "size-4 2xl:size-5 opacity-50 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
            <div className="flex items-center border-b px-3 py-2 3xl:px-4 3xl:py-3">
              <Search className="size-5 2xl:size-6 3xl:size-8 shrink-0 opacity-50 mr-2" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar estado..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex h-7 3xl:h-9 w-full bg-transparent text-xs md:text-sm 2xl:text-base 3xl:text-xl outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="max-h-[200px] overflow-y-auto p-1">
              {filteredStates.length === 0 ? (
                <Text className="py-4 text-center 3xl:py-5 text-muted-foreground">
                  Nenhum estado encontrado.
                </Text>
              ) : (
                filteredStates.map((state) => (
                  <button
                    key={state.value}
                    type="button"
                    onClick={() => handleSelect(state.value)}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none hover:bg-highlight hover:text-white transition-colors",
                      value === state.value && "bg-highlight/10",
                    )}
                  >
                    <Text size="small" type="span" className="absolute left-2 flex size-3.5 2xl:size-4.5 3xl:size-5.5 items-center justify-center">
                      {value === state.value && (
                        <Check className="size-4 2xl:size-5 3xl:size-6 text-highlight" />
                      )}
                    </Text>
                    {state.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <InputError>{error?.message}</InputError>
    </div>
  );
}
