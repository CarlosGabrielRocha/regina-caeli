"use client";

import updateUserAction from "../../../actions/user/updateUser";
import { Button } from "../../../components/ui/button";
import { useNotification } from "../../../contexts/NotificationContext";
import { Loader } from "../../../components/ui/loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileInfoSchema,
  type ProfileInfoFormData,
} from "../../../schemas/profile-schemas";
import { FormInput } from "../../../components/form/FormInput";
import { toast } from "sonner";
import { useUser } from "../../../contexts/UserContext";

interface ProfileTabProps {
  name?: string;
  email?: string;
  phone?: string;
}

export default function ProfileTab(props: ProfileTabProps) {
  const { showNotification } = useNotification();
  const { getUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
  } = useForm<ProfileInfoFormData>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      name: props.name || "",
      email: props.email || "",
      phone: props.phone || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileInfoFormData) => {
    const payload: any = {};

    if (dirtyFields.name) payload.name = data.name;
    if (dirtyFields.email) payload.email = data.email;
    if (dirtyFields.phone) payload.phone = data.phone;

    const res = await updateUserAction(payload);
    await getUser({ load: false });

    if (res.status === "ok" && res.data) {
      if (res.data?.verifyEmail)
        showNotification(
          "Enviamos um link de confirmação para o novo email!",
          "info",
        );
      reset({
        name: res.data.updatedUser.name || "",
        email: res.data.updatedUser.email || "",
        phone: res.data.updatedUser.phone || "",
      });
    }

    if (res.status === "conflict") {
      toast.warning("Email já cadastrado!", {
        closeButton: true,
        duration: 2000,
      });
    }

    if (res.status === "error") {
      toast.error(res.message, {
        closeButton: true,
        duration: 2000,
      });
    }
  };

  return (
    <form
      id="profileForm"
      name="profileForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center space-y-7"
    >
      <div className="w-full space-y-5">
        <FormInput
          label="Nome de Usuário"
          name="name"
          placeholder="Seu nome"
          register={register}
          error={errors.name}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="seu@email.com"
          register={register}
          error={errors.email}
        />
        <FormInput
          label="Telefone"
          type="tel"
          name="phone"
          placeholder="+55 11 99999-9999"
          register={register}
          error={errors.phone}
        />
      </div>
      <Button
        variant="outline"
        className="2xl:py-5 3xl:py-6 2xl:px-8 3xl:px-10 2xl:text-lg 3xl:text-xl"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? <Loader className="text-white" /> : "Salvar Alterações"}
      </Button>
    </form>
  );
}
