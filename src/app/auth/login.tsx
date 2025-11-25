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
import { loginSchema, type LoginFormData } from "@/schemas/auth-schemas";

type AuthView = "login" | "register" | "forgot-password";

interface LoginPageProps {
  onNavigate: (view: AuthView) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // TODO: Implement login logic
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    showNotification("Login realizado com sucesso!", "success");
  };

  return (
    <Card className="w-full max-w-md border-none shadow-lg sm:border-border">
      <CardHeader className="space-y-2 text-center mb-10">
        <CardTitle>Bem-vindo(a) de volta</CardTitle>
        <CardDescription>
          Insira suas credenciais para acessar sua conta
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            placeholder="nome@exemplo.com"
            name="email"
            register={register}
            error={errors.email}
          />
          <div className="space-y-2">
            <FormInput
              label="Senha"
              type="password"
              name="password"
              placeholder="••••••••"
              register={register}
              error={errors.password}
            />
            <div className="flex justify-end my-5">
              <AuthNavigationButton
                onClick={() => onNavigate("forgot-password")}
                className="text-sm"
              >
                Esqueceu a senha?
              </AuthNavigationButton>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            variant={"default"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          <div className="text-center text-sm text-muted-foreground my-5">
            Não tem uma conta?{" "}
            <AuthNavigationButton onClick={() => onNavigate("register")}>
              Cadastre-se
            </AuthNavigationButton>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
