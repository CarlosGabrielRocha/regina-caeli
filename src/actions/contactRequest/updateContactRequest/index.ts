"use server";

import refreshAction from "../../auth/refresh";
import {
  UpdateContactRequestData,
  UpdateContactRequestParams,
  UpdateContactRequestReturn,
} from "./types";

export default async function updateContactRequestAction(
  params: UpdateContactRequestParams,
): Promise<UpdateContactRequestReturn> {
  const { contactReqId, data } = params;

  const { accessToken, authenticated, message } = await refreshAction();

  if (!authenticated) {
    return {
      status: "error",
      authenticated: false,
      message,
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/contact-requests/${contactReqId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (response.status === 409) {
      return {
        status: "error",
        message:
          "Apenas solicitações de contato pendentes podem ser atualizadas!",
      };
    }

    if (response.status === 404) {
      return {
        status: "error",
        message: "Solicitação de contato não encontrada!",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message: "Erro ao atualizar a solicitação de contato",
      };
    }

    const responseData = (await response.json()) as UpdateContactRequestData;

    return {
      status: "success",
      message: "Solicitação de contato atualizada com sucesso!",
      data: responseData,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao atualizar a solicitação de contato",
    };
  }
}
