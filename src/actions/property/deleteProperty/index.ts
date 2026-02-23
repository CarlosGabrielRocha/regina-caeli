"use server";

import refreshAction from "../../auth/refresh";
import { redirect } from "next/navigation";
import { DeletePropertyParams, DeletePropertyReturn } from "./types";
import verifyRoles from "../../auth/tokens/verifyRoles";

export async function deletePropertyAction(
  params: DeletePropertyParams,
): Promise<DeletePropertyReturn> {
  const { accessToken } = await refreshAction();
  if (!accessToken) {
    redirect("/auth");
  }
  verifyRoles(accessToken, ["agent", "representative"]);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/properties/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 404) {
      return {
        message: "Propriedade não encontrada.",
        status: "error",
      };
    }

    if (!response.ok) {
      return {
        message: "Erro ao tentar deletar propriedade!",
        status: "error",
      };
    }

    return {
      status: "ok",
      message: "Propriedade deletada com sucesso!",
    };
  } catch (error) {
    return {
      message: "Erro ao tentar deletar propriedade!",
      status: "error",
    };
  }
}
