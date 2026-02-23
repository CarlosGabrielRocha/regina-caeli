import { z } from "zod";
import { cepValidator } from "./validators/cep-validator";

export const propertyFormSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  shortDescription: z.string().min(1, "A descrição curta é obrigatória"),
  longDescription: z.string().min(1, "A descrição longa é obrigatória"),
  price: z.string().min(0, "O preço deve ser um valor positivo"),
  bedrooms: z.string().min(0, "O número de quartos deve ser positivo"),
  bathrooms: z.string().min(0, "O número de banheiros deve ser positivo"),
  area: z.string().min(0, "A área deve ser positiva").optional(),
  type: z.enum(["apartment", "house", "condominium"], {
    error: "Selecione o tipo de imóvel",
  }),
  address: z.object({
    street: z.string().min(1, "A rua é obrigatória"),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "O bairro é obrigatório"),
    city: z.string().min(1, "A cidade é obrigatória"),
    state: z
      .string()
      .min(2, "A UF é obrigatória")
      .max(2, "A UF deve ter 2 letras"),
    cep: z
      .string()
      .optional()
      .refine(async (val) => {
        if (!val) return true;
        return await cepValidator(val);
      }, "CEP inválido"),
  }),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;
