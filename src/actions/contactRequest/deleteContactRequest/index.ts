"use server";

import refreshAction from "../../auth/refresh";
import {
  DeleteContactRequestParams,
  DeleteContactRequestReturn,
} from "./types";
import { revalidatePath } from "next/cache";

export default async function deleteContactRequestAction(
  params: DeleteContactRequestParams,
): Promise<DeleteContactRequestReturn> {
  const { accessToken, authenticated, message } = await refreshAction();

  if (!authenticated) {
    return {
      status: "error",
      message,
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/contact-requests/${params.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 404) {
      return {
        status: "error",
        message: "Solicitação de contato não encontrada!",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message: "Erro ao deletar solicitação de contato!",
      };
    }

    revalidatePath("/");

    return {
      status: "ok",
      message: "Solicitação de contato deletada com sucesso!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao deletar solicitação de contato!",
    };
  }
}
