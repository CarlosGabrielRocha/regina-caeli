"use server";

import refreshAction from "../refresh";
import deleteTokensAction from "../tokens/deleteTokens";
import { LogoutReturn } from "./types";

export default async function LogoutAction(): Promise<LogoutReturn> {
  const { accessToken, authenticated, message, deviceId } =
    await refreshAction();

  if (!authenticated) {
    return {
      status: "error",
      message,
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ deviceId }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          status: "error",
          message: "Usuário ou dispositivo não encontrado!",
        };
      }

      return {
        status: "error",
        message: "Erro ao fazer logout",
      };
    }

    await deleteTokensAction();
    return {
      status: "ok",
      message: "Logout realizado com sucesso!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao fazer logout",
    };
  }
}
