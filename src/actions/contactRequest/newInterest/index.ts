"use server";

import refreshAction from "../../auth/refresh";
import { NewInterestData, NewInterestParams, NewInterestReturn } from "./types";

export default async function newInterestAction(
  params: NewInterestParams,
): Promise<NewInterestReturn> {
  const { accessToken, authenticated, message } = await refreshAction();

  if (!authenticated) {
    return {
      status: "error",
      authenticated: false,
      message,
    };
  }

  const { propertyId, contactReqId } = params;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/contact-requests/${contactReqId}/interest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ propertyId }),
      },
    );

    const data = (await response.json()) as NewInterestData;

    if (response.status === 409) {
      if (data.error === "Interest for this property is already added!") {
        return {
          status: "error",
          message: "Interesse para esta propriedade já foi adicionado!",
        };
      }

      if (data.error === "limit of interests reached!") {
        return {
          status: "error",
          message: "Limite de interesses por solicitação atingido!",
        };
      }

      if (
        data.error === "Can only add interests to pending contact requests!"
      ) {
        return {
          status: "error",
          message:
            "Apenas interesses para solicitações pendentes podem ser adicionados!",
        };
      }
    }

    if (!response.ok) {
      return {
        status: "error",
        message: "Erro ao tentar adicionar um novo interesse",
      };
    }

    return {
      status: "success",
      message: "Interesse adicionado com sucesso!",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao tentar adicionar um novo interesse",
    };
  }
}
