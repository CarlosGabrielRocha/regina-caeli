import { z } from "zod";
import { validatePhoneFormat } from "./validators/phone-validator";

export const profileInfoSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string("Número de telefone inválido")
    .refine(
      validatePhoneFormat,
      "Formato inválido, use o formato E164 (exemplo: +5581999999999)"
    )
    .optional(),
});

export const profilePasswordSchema = z
  .string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um símbolo");

export const profileSecuritySchema = z
  .object({
    password: profilePasswordSchema,
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ProfileInfoFormData = z.infer<typeof profileInfoSchema>;
export type ProfileSecurityFormData = z.infer<typeof profileSecuritySchema>;
