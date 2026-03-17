"use client";

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
import registerUserAction from "../../actions/auth/registerUser";
import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/auth-schemas";
import { PasswordStrengthIndicator } from "../../components/form/PasswordStrengthIndicator";
import { AuthPageProps } from "./types";
import { useRouter } from "next/navigation";

export default function RegisterPage({ onNavigate }: AuthPageProps) {
  const { showNotification } = useNotification();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const password = watch("password", "");
  const name = watch("name", "");
  const email = watch("email", "");
  const phone = watch("phone", "");
  const confirmPassword = watch("confirmPassword", "");

  // Clear manual errors when user changes the input
  const handleInputChange = (fieldName: keyof RegisterFormData) => {
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
  };

  // Check if fields are valid (touched and no errors)
  const isFieldValid = (fieldName: keyof RegisterFormData, value: string) => {
    return (
      value.length > 0 &&
      !errors[fieldName] &&
      (touchedFields[fieldName] || dirtyFields[fieldName])
    );
  };

  // Disable submit if there are any errors
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data: RegisterFormData) => {
    const result = await registerUserAction(data);

    if (result.field === "email") {
      setError("email", {
        type: "manual",
        message: result.message,
      });
      return;
    }

    if (!result.ok) {
      return showNotification(result.message, "error");
    }

    reset();
    return router.refresh()
    /* return showNotification(result.message, "success"); */
  };

  return (
    <Card className="w-full max-w-md 2xl:max-w-2xl min-h-fit border-none shadow-xl sm:border-border">
      <CardHeader className="space-y-1 text-center">
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>Insira suas informações para começar</CardDescription>
      </CardHeader>
      <form
        id="registerForm"
        name="registerForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardContent className="space-y-4">
          <FormInput
            label="Nome"
            type="text"
            autoComplete="name"
            placeholder="João Silva"
            name="name"
            register={register}
            error={errors.name}
            isValid={isFieldValid("name", name)}
            onChange={() => handleInputChange("name")}
          />
          <FormInput
            label="Email"
            type="email"
            autoComplete="email"
            name="email"
            placeholder="nome@exemplo.com"
            register={register}
            error={errors.email}
            isValid={isFieldValid("email", email)}
            onChange={() => handleInputChange("email")}
          />
          <FormInput
            label="Telefone"
            type="tel"
            autoComplete="tel"
            name="phone"
            placeholder="+5511999999999"
            register={register}
            error={errors.phone}
            isValid={isFieldValid("phone", phone)}
            onChange={() => handleInputChange("phone")}
          />
          <div>
            <FormInput
              name="password"
              label="Senha"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              register={register}
              error={errors.password}
              isValid={isFieldValid("password", password)}
              onChange={() => handleInputChange("password")}
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
            isValid={isFieldValid("confirmPassword", confirmPassword)}
            onChange={() => handleInputChange("confirmPassword")}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full my-5"
            variant={"default"}
            disabled={isSubmitting || hasErrors}
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
