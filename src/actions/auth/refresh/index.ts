"use server";

import getTokensAction from "../tokens/getTokens";
import setTokensAction from "../tokens/setTokens";
import { RefreshData, RefreshReturn } from "./types";

import { cookies } from "next/headers";

export default async function refreshAction(): Promise<RefreshReturn> {
  const cookieStore = await cookies();
  const deviceId = cookieStore.get("deviceId")?.value;

  if (!deviceId) {
    return {
      message: "Dispositivo não identificado",
      authenticated: false,
    };
  }
  const { accessToken, refreshToken } = await getTokensAction();

  if (!refreshToken) {
    return {
      message: "Sessão expirada!",
      authenticated: false,
    };
  }

  if (accessToken) {
    return {
      message: "Usuário autenticado!",
      authenticated: true,
      accessToken,
      deviceId,
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken, deviceId }),
    });

    if (!response.ok) {
      return {
        message: "Erro ao renovar tokens",
        authenticated: false,
      };
    }

    const data = (await response.json()) as RefreshData;
    await setTokensAction({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    return {
      message: "Tokens renovados com sucesso!",
      authenticated: true,
      accessToken: data.accessToken,
      deviceId,
    };
  } catch (error) {
    return {
      message: "Você não está logado!",
      authenticated: false,
    };
  }
}
