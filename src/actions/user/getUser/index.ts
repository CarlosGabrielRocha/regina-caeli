"use server";

import refreshAction from "../../auth/refresh";
import { getUserData, getUserReturn } from "./types";

export default async function getUserAction(): Promise<getUserReturn> {
  const { accessToken, authenticated, message } = await refreshAction();

  if (!authenticated) {
    return {
      authenticated: false,
      message,
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return {
        message: "Erro ao buscar usuário",
        authenticated: false,
      };
    }

    const data = (await response.json()) as getUserData;
    return {
      authenticated: true,
      data,
    };
  } catch (error) {
    return {
      message: "Erro ao buscar usuário",
      authenticated: false,
    };
  }
}
