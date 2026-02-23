"use server";

import { RegisterUserParams, RegisterUserReturn } from "./types";

export default async function registerUserAction(
  data: RegisterUserParams
): Promise<RegisterUserReturn> {
  const { name, email, phone, password } = data;

  let response: Response;
  try {
    response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password }),
    });
  } catch (error) {
    return {
      message: "Erro ao registrar usuário! Por favor, tente novamente.",
      ok: false,
    };
  }

  if (!response.ok) {
    if (response.status === 409) {
      return {
        message: "Já existe um usuário com esse email!",
        ok: false,
        field: "email",
      };
    }
    return {
      message: "Erro ao registrar usuário! Por favor, tente novamente.",
      ok: false,
    };
  }

  return {
    message:
      "Usuário registrado com sucesso! Confira seu email para confirmar a conta.",
    ok: true,
  };
}
