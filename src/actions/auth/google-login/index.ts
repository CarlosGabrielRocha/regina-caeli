"use server";

import { v4 as uuid } from "uuid";
import { LoginGoogleUserParams } from "./types";
import setTokensAction from "../tokens/setTokens";
import { LoginData, LoginUserReturn } from "../login/types";
import tokenConfig from "../../token.config";
import { cookies } from "next/headers";

export default async function loginGoogleUserAction(
  params: LoginGoogleUserParams,
): Promise<LoginUserReturn> {
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
    response = await fetch(`${process.env.BACKEND_URL}/auth/google-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: params.credential, deviceId }),
    });
  } catch (error) {
    return {
      message: "Erro ao fazer login com Google! Por favor, tente novamente.",
      status: "invalid",
    };
  }

  if (!response.ok) {
    return {
      message: "Erro ao fazer login! Por favor, tente novamente.",
      status: "invalid",
    };
  }

  const { accessToken, refreshToken, message } =
    (await response.json()) as LoginData;

  if (!accessToken || !refreshToken) {
    return {
      message: message || "Erro desconhecido",
      status: "invalid",
    };
  }

  await setTokensAction({ accessToken, refreshToken });

  return {
    status: "ok",
  };
}
