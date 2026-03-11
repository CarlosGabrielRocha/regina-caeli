"use client";

import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { UseFormRegister, FieldError } from "react-hook-form";
import InputError from "./components/InputError";

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  isValid?: boolean;
  onChange?: () => void;
  className?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
}

export function FormTextarea({
  label,
  placeholder,
  name,
  register,
  error,
  isValid = false,
  onChange,
  className,
  required = false,
  maxLength,
  minLength,
}: FormTextareaProps) {
  const { onChange: registerOnChange, ...registerProps } = register(name);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    registerOnChange(e); // Call react-hook-form's onChange
    onChange?.(); // Call custom onChange if provided
  };

  return (
    <div className="space-y-2 w-full">
      <label
        htmlFor={name}
        className="block font-medium text-foreground text-xs md:text-sm 2xl:text-base 3xl:text-xl"
      >
        {label} {required && <span className="text-highlight">*</span>}
      </label>
      <div className="relative">
        <Textarea
          id={name}
          placeholder={placeholder}
          {...registerProps}
          onChange={handleChange}
          className={cn(
            "focus:border-secondary focus:ring-highlight",
            error && "border-red-700",
            isValid && "border-green-700",
            "font-light resize-none text-xs md:text-sm 2xl:text-lg 3xl:text-2xl",
            className,
          )}
          maxLength={maxLength}
          minLength={minLength}
        />
      </div>
      <InputError>{error?.message}</InputError>
    </div>
  );
}
