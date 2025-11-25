import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    phone: z
      .string()
      .min(1, "Telefone é obrigatório")
      .regex(
        /^\+[1-9]\d{1,14}$/,
        "Telefone inválido. Use o formato E164 (exemplo: +5511999999999)"
      ),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um símbolo"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z.object({
  email: z.email("Email inválido"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
