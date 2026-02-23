"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { FormInput } from "../../../components/form/FormInput";
import { AuthNavigationButton } from "../../../components/AuthNavigationButton";
import {
  resetPasswordWithTokenSchema,
  type ResetPasswordWithTokenFormData,
} from "../../../schemas/auth-schemas";
import resetPasswordAction from "../../../actions/auth/reset-password/index";
import { useNotification } from "../../../contexts/NotificationContext";
import { PasswordStrengthIndicator } from "../../../components/form/PasswordStrengthIndicator";

interface ResetPasswordFormProps {
  resetToken: string;
}

export default function ResetPasswordForm({
  resetToken,
}: ResetPasswordFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordWithTokenFormData>({
    resolver: zodResolver(resetPasswordWithTokenSchema),
  });

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordWithTokenFormData) => {
    const result = await resetPasswordAction(resetToken, data.password);

    if (result.status === "ok") {
      setIsSuccess(true);
    } else {
      showNotification(result.message || "Erro ao redefinir senha", "error");
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md border-none shadow-xl sm:border-border">
        <CardHeader className="text-center">
          <CardTitle>Senha Alterada!</CardTitle>
          <CardDescription>
            Sua senha foi redefinida com sucesso.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button onClick={() => router.push("/auth")} className="w-full">
            Ir para Login agora
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md px-4 py-7 border-none shadow-xl sm:border-border">
      <CardHeader className="text-center">
        <CardTitle>Criar nova senha</CardTitle>
        <CardDescription>
          Digite sua nova senha abaixo para redefinir o acesso.
        </CardDescription>
      </CardHeader>
      <form
        id="resetPasswordForm"
        name="resetPasswordForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardContent className="space-y-4 mb-4">
          <FormInput
            label="Nova Senha"
            type="password"
            name="password"
            placeholder="••••••••"
            register={register}
            error={errors.password}
          />
          <FormInput
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            register={register}
            error={errors.confirmPassword}
          />
          <PasswordStrengthIndicator password={password} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
          </Button>
          <div className="flex justify-center">
            <AuthNavigationButton
              onClick={() => router.push("/auth")}
              className="text-sm"
              type="button"
            >
              Voltar para o Login
            </AuthNavigationButton>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
