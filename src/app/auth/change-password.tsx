"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/form/FormInput";
import { AuthNavigationButton } from "@/components/AuthNavigationButton";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "@/schemas/auth-schemas";

type AuthView = "login" | "register" | "forgot-password";

interface ChangePasswordPageProps {
  onNavigate: (view: AuthView) => void;
}

export default function ChangePasswordPage({
  onNavigate,
}: ChangePasswordPageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const { showNotification } = useNotification();

  // Timer para habilitar o botão de reenvio após 30 segundos
  useEffect(() => {
    if (isSubmitted && !canResend) {
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSubmitted, canResend]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    // TODO: Implement password reset logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedEmail(data.email);
    setIsSubmitted(true);
    setCanResend(false);
    setResendTimer(30);
    showNotification("Link de redefinição enviado!", "success");
  };

  const handleResendLink = async () => {
    setIsResending(true);
    // TODO: Implement resend password reset logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCanResend(false);
    setResendTimer(30);
    setIsResending(false);
    showNotification("Link reenviado com sucesso!", "success");
  };

  return (
    <Card className="w-full max-w-md border-none shadow-xl sm:border-border">
      <CardHeader className="space-y-1 text-center">
        <CardTitle>Redefinir senha</CardTitle>
        <CardDescription>
          {isSubmitted
            ? "Verifique seu email para o link de redefinição"
            : "Insira seu endereço de email e enviaremos um link de redefinição"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isSubmitted ? (
          <div className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Enviamos um link de redefinição de senha para{" "}
                <span className="font-medium text-foreground">
                  {submittedEmail}
                </span>
                .
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={handleResendLink}
                disabled={!canResend || isResending}
                className="w-full"
              >
                {isResending
                  ? "Reenviando..."
                  : canResend
                  ? "Reenviar Link"
                  : `Aguarde ${resendTimer}s para reenviar`}
              </Button>
              {!canResend && (
                <p className="text-xs text-muted-foreground">
                  Não recebeu o email? Verifique a pasta de spam.
                </p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Email"
              type="email"
              placeholder="nome@exemplo.com"
              name="email"
              register={register}
              error={errors.email}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando link..." : "Enviar Link de Redefinição"}
            </Button>
          </form>
        )}
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
