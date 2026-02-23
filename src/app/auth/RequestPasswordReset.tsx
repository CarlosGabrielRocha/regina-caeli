"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "../../contexts/NotificationContext";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FormInput } from "../../components/form/FormInput";
import { AuthNavigationButton } from "../../components/AuthNavigationButton";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../../schemas/auth-schemas";
import { AuthPageProps } from "./types";
import requestPasswordResetAction from "../../actions/auth/request-password-reset";

export default function RequestPasswordReset({ onNavigate }: AuthPageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [canSend, setCanSend] = useState(true);
  const [sendTimer, setSendTimer] = useState(30);
  const { showNotification } = useNotification();

  // Timer para habilitar o botão de envio após 30 segundos
  useEffect(() => {
    if (isSubmitted && !canSend) {
      const interval = setInterval(() => {
        setSendTimer((prev) => {
          if (prev <= 1) {
            setCanSend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSubmitted, canSend]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    const result = await requestPasswordResetAction(data.email);
    setSubmittedEmail(data.email);
    setIsSubmitted(true);
    setCanSend(false);
    setSendTimer(30);
    if (result.status === "ok") {
      showNotification("Link de redefinição enviado!", "success");
    } else {
      showNotification("Erro ao enviar link de redefinição!", "error");
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-xl sm:border-border">
      <CardHeader className="space-y-1 text-center">
        <CardTitle>Redefinir senha</CardTitle>
        <CardDescription>
          {!isSubmitted &&
            "Insira seu endereço de email e enviaremos um link de redefinição"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            {isSubmitted && (
              <p>
                Enviamos um link de redefinição de senha para{" "}
                <span className="font-medium text-foreground">
                  {submittedEmail}
                </span>
                .
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <form
              id="requestPasswordResetForm"
              name="requestPasswordResetForm"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormInput
                label="Email"
                type="email"
                placeholder="nome@exemplo.com"
                name="email"
                register={register}
                error={errors.email}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !canSend}
              >
                {isSubmitting
                  ? "Enviando link..."
                  : canSend
                    ? "Enviar Link"
                    : `Aguarde ${sendTimer}s para reenviar`}
              </Button>
            </form>
            {!canSend && (
              <p className="text-xs text-muted-foreground">
                Não recebeu o email? Verifique a pasta de spam.
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <AuthNavigationButton
          onClick={() => onNavigate("login")}
          className="text-sm"
        >
          Voltar para o Login
        </AuthNavigationButton>
      </CardFooter>
    </Card>
  );
}
