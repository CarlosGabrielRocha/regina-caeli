"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps {
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

export function FormInput({
  label,
  type = "text",
  placeholder,
  name,
  register,
  error,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <Input
          type={inputType}
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            error
              ? "border-red-700 focus-visible:ring-red-700"
              : "border-border",
            isPasswordField && "pr-10"
          )}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-700 font-medium"
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
}
