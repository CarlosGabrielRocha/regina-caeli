"use server";

import refreshAction from "../../auth/refresh";

import { MarkAsDoneReturn } from "./types";
import { redirect } from "next/navigation";
import verifyRoles from "../../auth/tokens/verifyRoles";

export async function markAsDoneAction(id: string): Promise<MarkAsDoneReturn> {
  const { accessToken } = await refreshAction();
  if (!accessToken) {
    redirect("/auth");
  }
  verifyRoles(accessToken, ["agent"]);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/contact-requests/${id}/done`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      return {
        message:
          "Erro ao tentar marcar a solicitação de contato como concluída.",
        status: "error",
      };
    }

    return {
      status: "ok",
    };
  } catch (error) {
    return {
      message: "Erro ao tentar marcar a solicitação de contato como concluída.",
      status: "error",
    };
  }
}
