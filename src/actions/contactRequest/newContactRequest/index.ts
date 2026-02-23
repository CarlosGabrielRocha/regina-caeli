"use server";

import refreshAction from "../../auth/refresh";
import { NewContactRequestParams, NewContactRequestReturn } from "./types";

export default async function newContactRequestAction(
  params: NewContactRequestParams,
): Promise<NewContactRequestReturn> {
  const { accessToken, authenticated, message } = await refreshAction();

  if (!authenticated) {
    return {
      status: "error",
      message,
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/contact-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(params),
      },
    );

    if (response.status === 409) {
      return {
        status: "error",
        message:
          "Você não pode submeter uma nova solicitação de contato enquanto uma está pendente!",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message: "Erro ao submeter a solicitação de contato!",
      };
    }

    return {
      status: "ok",
      message: "Solicitação de contato submetida com sucesso!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao submeter a solicitação de contato!",
    };
  }
}
