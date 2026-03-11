"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Text from "../Text";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  { label: "Pelo menos 8 caracteres", test: (pwd) => pwd.length >= 8 },
  { label: "Uma letra maiúscula", test: (pwd) => /[A-Z]/.test(pwd) },
  { label: "Uma letra minúscula", test: (pwd) => /[a-z]/.test(pwd) },
  { label: "Um número", test: (pwd) => /[0-9]/.test(pwd) },
  { label: "Um símbolo", test: (pwd) => /[^a-zA-Z0-9]/.test(pwd) },
];

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const metRequirements = requirements.filter((req) =>
    req.test(password)
  ).length;
  const strength = (metRequirements / requirements.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-3 mt-3"
    >
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <Text>Força da senha</Text>
          <Text
            className={cn(
              "font-medium",
              strength < 50 && "text-red-700",
              strength >= 50 && strength < 100 && "text-yellow-500",
              strength === 100 && "text-green-500"
            )}
          >
            {strength < 50 ? "Fraca" : strength < 100 ? "Média" : "Forte"}
          </Text>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${strength}%` }}
            transition={{ duration: 0.3 }}
            className={cn(
              "h-full rounded-full transition-colors",
              strength < 50 && "bg-red-700",
              strength >= 50 && strength < 100 && "bg-yellow-500",
              strength === 100 && "bg-green-500"
            )}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        <AnimatePresence mode="popLayout">
          {requirements.map((req, index) => {
            const isMet = req.test(password);
            return (
              <motion.div
                key={req.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 text-xs"
              >
                <div
                  className={cn(
                    "rounded-full p-0.5",
                    isMet ? "bg-green-500/20" : "bg-red-700/20"
                  )}
                >
                  {isMet ? (
                    <Check className="size-4 2xl:size-5 3xl:size-6 text-green-500" />
                  ) : (
                    <X className="size-4 2xl:size-5 3xl:size-6 text-red-700" />
                  )}
                </div>
                <Text
                  className={cn(
                    "transition-colors",
                    isMet ? "text-green-500" : "text-muted-foreground"
                  )}
                >
                  {req.label}
                </Text>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
