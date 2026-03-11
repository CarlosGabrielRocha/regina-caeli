"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import InputError from "./components/InputError";

interface FormInputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  isValid?: boolean;
  onChange?: () => void;
  maxLength?: number;
  required?: boolean;
}

export function FormInput({
  label,
  type = "text",
  autoComplete,
  placeholder,
  disabled,
  name,
  register,
  error,
  isValid = false,
  onChange,
  className,
  maxLength,
  required = false,
  ...props
}: FormInputProps & { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const { onChange: registerOnChange, ...registerProps } = register(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerOnChange(e); // Call react-hook-form's onChange
    onChange?.(); // Call custom onChange if provided
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block font-medium text-foreground text-xs md:text-sm 2xl:text-base"
      >
        {label} {required && <span className="text-highlight">*</span>}
      </label>
      <div className="relative">
        <Input
          id={name}
          type={inputType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={maxLength}
          {...registerProps}
          onChange={handleChange}
          className={cn(
            "focus:border-secondary focus:ring-highlight",
            error && "border-red-700",
            isValid && "border-green-700",
            isPasswordField && "pr-10",
            "font-light text-xs md:text-sm 2xl:text-base 2xl:h-12 3xl:text-xl 3xl:h-15",
            className,
          )}
          disabled={disabled}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="size-4 2xl:size-5 3xl:size-6" />
            ) : (
              <Eye className="size-4 2xl:size-5 3xl:size-6" />
            )}
          </button>
        )}
      </div>
      <InputError>
        {error?.message}
      </InputError>
    </div>
  );
}
