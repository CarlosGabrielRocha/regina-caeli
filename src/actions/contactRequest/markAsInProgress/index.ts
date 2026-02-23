"use server";

import refreshAction from "../../auth/refresh";

import { MarkAsInProgressReturn } from "./types";
import { redirect } from "next/navigation";
import verifyRoles from "../../auth/tokens/verifyRoles";

export async function markAsInProgressAction(
  id: string,
): Promise<MarkAsInProgressReturn> {
  const { accessToken } = await refreshAction();
  if (!accessToken) {
    redirect("/auth");
  }
  verifyRoles(accessToken, ["agent"]);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/contact-requests/${id}/in-progress`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 409) {
      return {
        message:
          "Você não pode ter mais de 10 solicitações de contato em andamento!",
        status: "error",
      };
    }

    if (!response.ok) {
      return {
        message:
          "Erro ao tentar marcar a solicitação de contato como em andamento.",
        status: "error",
      };
    }

    return {
      status: "ok",
    };
  } catch (error) {
    return {
      message:
        "Erro ao tentar marcar a solicitação de contato como em andamento.",
      status: "error",
    };
  }
}
