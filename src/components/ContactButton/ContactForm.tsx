"use client";

import newContactRequestAction from "../../actions/contactRequest/newContactRequest/index";

import updateUserAction from "../../actions/user/updateUser";
import { Button } from "../ui/button";
import { useNotification } from "../../contexts/NotificationContext";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileInfoSchema } from "../../schemas/profile-schemas";
import { FormInput } from "../form/FormInput";
import { FormTextarea } from "../form/FormTextarea";
import { toast } from "sonner";
import { useEffect } from "react";
import { z } from "zod";
import { useUser } from "../../contexts/UserContext";
import Text from "../Text";

const contactFormSchema = profileInfoSchema.omit({ email: true }).extend({
  description: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  name?: string;
  phone?: string;
  propertyId: string;
  onSuccess: () => void;
}

export default function ContactForm({
  name,
  phone,
  propertyId,
  onSuccess,
}: ContactFormProps) {
  const { showNotification } = useNotification();
  const { getUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: name || "",
      phone: phone || "",
      description: "",
    },
    mode: "onChange",
  });

  // Update form default values when props change
  useEffect(() => {
    reset({
      name: name || "",
      phone: phone || "",
      description: "",
    });
  }, [name, phone, reset]);

  const updateUserInfo = async (data: ContactFormData) => {
    const payload: any = {};
    payload.name = data.name;
    payload.phone = data.phone;

    const res = await updateUserAction(payload);

    if (res.status === "ok") {
      return true;
    } else if (res.status === "conflict") {
      toast.warning("Email já cadastrado!", {
        closeButton: true,
        duration: 2000,
      });
      return false;
    } else {
      toast.error(res.message || "Erro ao atualizar perfil", {
        closeButton: true,
        duration: 2000,
      });
      return false;
    }
  };

  const submitContactRequest = async (data: ContactFormData) => {
    const hasUpdates = data.name !== name || data.phone !== phone;

    if (hasUpdates) {
      await updateUserInfo(data);
    }

    const payload: any = {
      propertyId,
      description: data.description,
    };

    try {
      const res = await newContactRequestAction(payload);

      if (res.status === "ok") {
        showNotification(
          "Solicitação de contato enviada com sucesso!",
          "success",
        );
        onSuccess();
        await getUser({ load: false });
      } else {
        toast.error(res.message || "Erro ao enviar solicitação", {
          closeButton: true,
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar a solicitação.", {
        closeButton: true,
        duration: 2000,
      });
    }
  };

  return (
    <form
      id="contactForm"
      name="contactForm"
      onSubmit={handleSubmit(submitContactRequest)}
      className="flex flex-col items-center space-y-7 animate-in fade-in slide-in-from-right-4 duration-300 w-full"
    >
      <div className="w-full space-y-5 text-left">
        <FormInput
          label="Nome"
          name="name"
          placeholder="Seu nome"
          register={register}
          error={errors.name}
        />
        <FormInput
          label="Telefone"
          type="tel"
          name="phone"
          placeholder="+55 11 99999-9999"
          register={register}
          error={errors.phone}
        />
        <FormTextarea
          label="Possui alguma dúvida? Deixe uma descrição prévia do que você precisa."
          name="description"
          placeholder="Deixe uma descrição prévia para os nossos promotores."
          register={register}
          error={errors.description}
          className="min-h-[100px]"
          maxLength={200}
          minLength={20}
        />
      </div>
      <Button
        variant="default"
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-secondary hover:bg-secondary/90 3xl:p-4 text-white"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 2xl:size-6 3xl:size-8 animate-spin text-white" />
        ) : (
          <Text>
            Confirmar e Enviar
          </Text>
        )}
      </Button>
    </form>
  );
}
