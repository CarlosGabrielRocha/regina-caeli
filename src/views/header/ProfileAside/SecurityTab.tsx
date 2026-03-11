"use client";

import { useState } from "react";
import { Lock, Shield } from "lucide-react";
import { Loader } from "../../../components/ui/loader";
import { cn } from "@/lib/utils";
import Text from "../../../components/Text";
import { Button } from "../../../components/ui/button";
import IconBadge from "../../../components/icons/IconBadge";
import { useNotification } from "../../../contexts/NotificationContext";
import updateUserAction from "../../../actions/user/updateUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSecuritySchema,
  type ProfileSecurityFormData,
} from "../../../schemas/profile-schemas";
import { FormInput } from "../../../components/form/FormInput";
import { toast } from "sonner";
import { useUser } from "../../../contexts/UserContext";

interface SecurityTabProps {
  twoFactorInitialValue: boolean;
}

export default function SecurityTab({
  twoFactorInitialValue,
}: SecurityTabProps) {
  const { showNotification } = useNotification();
  const [isLoading2FA, setIsLoading2FA] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    twoFactorInitialValue,
  );
  const { getUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSecurityFormData>({
    resolver: zodResolver(profileSecuritySchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileSecurityFormData) => {
    const res = await updateUserAction({
      password: data.password,
    });

    if (res.status === "ok") {
      await getUser({ load: false });
      showNotification("Senha atualizada com sucesso!", "success");
      reset();
    } else {
      toast.error(res.message, {
        closeButton: true,
        duration: 2000,
      });
    }
  };

  const handleTwoFactorToggle = async () => {
    setIsLoading2FA(true);
    try {
      const res = await updateUserAction({
        twoSteps: !twoFactorEnabled,
      });

      if (res.data) {
        setTwoFactorEnabled(res.data.updatedUser.twoSteps);
        getUser({ load: false });
      } else {
        toast.error("Erro ao atualizar usuário");
      }
    } catch (error) {
      toast.error("Erro ao atualizar usuário");
    } finally {
      setIsLoading2FA(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <form
        id="securityForm"
        name="securityForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-7 items-center"
      >
        <div className="flex items-center gap-2 mb-4 px-1">
          <IconBadge icon={Lock} />
          <Text size="medium" className="font-semibold">
            Alterar Senha
          </Text>
        </div>
        <div className="space-y-3 w-full">
          <FormInput
            label="Nova senha"
            placeholder="Nova senha"
            type="password"
            name="password"
            register={register}
            error={errors.password}
          />
          <FormInput
            label="Confirmar nova senha"
            placeholder="Confirmar nova senha"
            type="password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />
        </div>
        <Button
          variant="outline"
          className="2xl:py-5 3xl:py-6 2xl:px-8 3xl:px-10 2xl:text-lg 3xl:text-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader className="text-white" /> : "Atualizar Senha"}
        </Button>
      </form>

      <div className="h-px bg-border my-4 opacity-50" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2 px-1">
          <IconBadge icon={Shield} />
          <Text size="medium" className="font-semibold">
            Autenticação de Dois Fatores
          </Text>
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-card hover:border-primary/30 transition-colors">
          <div className="flex flex-col gap-1">
            <Text className="font-medium">Verificação em 2 etapas</Text>
            <Text className="text-muted-foreground">
              Adicione uma camada extra de segurança
            </Text>
          </div>
          {/* Simple Toggle Switch */}
          <button
            onClick={handleTwoFactorToggle}
            disabled={isLoading2FA}
            className={cn(
              "w-12 h-7 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed",
              twoFactorEnabled ? "bg-primary" : "bg-input",
            )}
          >
            <span
              className={cn(
                "size-5 2xl:size-6 3xl:size-7 bg-white rounded-full absolute top-1 transition-all shadow-sm flex items-center justify-center",
                twoFactorEnabled ? "left-6" : "left-1",
              )}
            >
              {isLoading2FA && <Loader className="size-3 2xl:size-4 3xl:size-5 text-primary" />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
