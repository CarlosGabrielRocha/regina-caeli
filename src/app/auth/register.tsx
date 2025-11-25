"use client";

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
import registerUserAction from "@/actions/auth/registerUser";
import { registerSchema, type RegisterFormData } from "@/schemas/auth-schemas";
import { PasswordStrengthIndicator } from "@/components/form/PasswordStrengthIndicator";

type AuthView = "login" | "register" | "forgot-password";

interface RegisterPageProps {
  onNavigate: (view: AuthView) => void;
}

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);

    await registerUserAction(formData);
    showNotification(
      "Verifique o seu email para concluir o cadastro!",
      "success"
    );
    reset(); // Limpa o formulário após o envio
  };

  return (
    <Card className="w-full max-w-md border-none shadow-xl sm:border-border">
      <CardHeader className="space-y-1 text-center">
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>Insira suas informações para começar</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormInput
            label="Nome Completo"
            type="text"
            placeholder="João Silva"
            name="name"
            register={register}
            error={errors.name}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="nome@exemplo.com"
            register={register}
            error={errors.email}
          />
          <FormInput
            label="Telefone"
            type="tel"
            name="phone"
            placeholder="+5511999999999"
            register={register}
            error={errors.phone}
          />
          <div>
            <FormInput
              name="password"
              label="Senha"
              type="password"
              placeholder="••••••••"
              register={register}
              error={errors.password}
            />
            <PasswordStrengthIndicator password={password} />
          </div>
          <FormInput
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            register={register}
            error={errors.confirmPassword}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full my-5"
            variant={"default"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando conta..." : "Cadastrar"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <AuthNavigationButton onClick={() => onNavigate("login")}>
              Entrar
            </AuthNavigationButton>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
