"use server";

import { UpdateUserData, UpdateUserParams } from "./types";
import refreshAction from "../../auth/refresh";

export default async function updateUserAction(params: UpdateUserParams) {
  const { accessToken, authenticated, message } = await refreshAction();

  if (!authenticated) {
    return {
      status: "error",
      message,
    };
  }
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(params),
    });

    if (response.status === 409) {
      return {
        status: "conflict",
        message: "Já existe um usuário com esse email!",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message: "Erro ao atualizar usuário",
      };
    }

    const data = (await response.json()) as UpdateUserData;

    return {
      status: "ok",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao atualizar usuário",
    };
  }
}
