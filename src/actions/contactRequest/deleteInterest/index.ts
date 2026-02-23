"use server";

import refreshAction from "../../auth/refresh";
import { deleteInterestParams, deleteInterestReturn } from "./types";

export default async function deleteInterestAction(
  params: deleteInterestParams,
): Promise<deleteInterestReturn> {
  const { accessToken, authenticated, message } = await refreshAction();

  if (!authenticated) {
    return {
      status: "error",
      authenticated: false,
      message,
    };
  }

  const { contactReqId, interestId } = params;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/contact-requests/${contactReqId}/interests/${interestId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 409) {
      return {
        status: "error",
        message:
          "Apenas interesses por solicitações pendentes podem ser removidos!",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message: "Erro ao tentar remover interesse",
      };
    }

    return {
      status: "success",
      message: "Interesse removido com sucesso!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao tentar remover interesse",
    };
  }
}
