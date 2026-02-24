"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { loginSchema, type LoginFormData } from "../../schemas/auth-schemas";
import loginUserAction from "../../actions/auth/login/index";
import { AuthPageProps } from "./types";
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "../../contexts/UserContext";
import { toast } from "sonner";

export default function LoginPage({ onNavigate }: AuthPageProps) {
  const router = useRouter();
  const { getUser, googleLogin } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await loginUserAction({ ...data });
    if (res.status === "invalid") {
      resetField("password");
      return toast.error(res.message ?? "Erro ao fazer login");
    }

    if (res.status === "unconfirmed") {
      return onNavigate("message", {
        data: data.email,
        title: "Confirmação de email",
        description: "Por favor, verifique seu email para confirmar sua conta.",
        dataDescription: `Enviamos um email para`,
        footerText: "Não recebeu o email? Verifique a pasta de spam.",
      });
    }

    if (res.twoSteps) {
      return onNavigate("message", {
        data: data.email,
        title: "Autenticação em duas etapas",
        description: "Por favor, verifique o link enviado para o seu email.",
        dataDescription: `Enviamos um email para`,
        footerText: "Não recebeu o email? Verifique a pasta de spam.",
      });
    }

    if (res.status === "ok") {
      await getUser({ load: false });
      reset();
      router.push("/");
    }
  };

  const handleGoogleSuccess = async (response: any) => {
    if (!response.credential) {
      toast.error("Erro ao fazer login com Google", { duration: 5000 });
      return;
    }
    await googleLogin(response.credential);
    router.push("/");
  };

  return (
    <Card className="w-full max-w-md 2xl:max-w-2xl min-h-fit border-none shadow-lg sm:border-border">
      <CardHeader className="space-y-2 2xl:space-y-3 text-center mb-3 2xl:mb-7">
        <CardTitle>Bem-vindo(a) de volta</CardTitle>
        <CardDescription>
          Insira suas credenciais para acessar sua conta
        </CardDescription>
      </CardHeader>
      <form id="loginForm" name="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="nome@exemplo.com"
            name="email"
            register={register}
            error={errors.email}
          />
          <div className="space-y-2">
            <FormInput
              label="Senha"
              type="password"
              autoComplete="current-password"
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
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <GoogleLogin onSuccess={handleGoogleSuccess} />
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
