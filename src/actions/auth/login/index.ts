"use server";

import { LoginData, LoginUserParams, LoginUserReturn } from "./types";
import { v4 as uuid } from "uuid";
import setTokensAction from "../tokens/setTokens";
import tokenConfig from "../../token.config";
import { cookies } from "next/headers";

export default async function loginUserAction(
  params: LoginUserParams,
): Promise<LoginUserReturn> {
  const { email, password } = params;
  let response: Response;
  const cookieStore = await cookies();
  let deviceId: string = uuid();

  cookieStore.set("deviceId", deviceId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: tokenConfig.deviceId.maxAge,
  });

  try {
    response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, deviceId }),
    });
  } catch (error) {
    return {
      message: "Erro ao fazer login! Por favor, tente novamente.",
      status: "invalid",
    };
  }

  if (response.status === 403) {
    return {
      message: "Confira o seu email! Depois, tente fazer login novamente.",
      status: "unconfirmed",
    };
  }

  if (response.status === 400) {
    return {
      message: "Credenciais incorretas!",
      status: "invalid",
    };
  }

  if (!response.ok) {
    return {
      message: "Erro ao fazer login! Por favor, tente novamente.",
      status: "invalid",
    };
  }

  const { accessToken, refreshToken, twoSteps, message } =
    (await response.json()) as LoginData;

  if (!accessToken || !refreshToken) {
    return {
      message: "Enviamos um link para o seu email!",
      status: "ok",
      twoSteps: true,
    };
  }

  await setTokensAction({ accessToken, refreshToken });

  return {
    status: "ok",
  };
}
