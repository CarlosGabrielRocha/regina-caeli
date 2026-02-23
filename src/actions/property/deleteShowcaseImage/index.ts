"use server";

import refreshAction from "../../auth/refresh";
import { redirect } from "next/navigation";
import { DeleteShowcaseImageParams, DeleteShowcaseImageReturn } from "./types";
import verifyRoles from "../../auth/tokens/verifyRoles";

export async function deleteShowcaseImageAction(
  params: DeleteShowcaseImageParams,
): Promise<DeleteShowcaseImageReturn> {
  const { accessToken } = await refreshAction();
  if (!accessToken) {
    redirect("/auth");
  }
  verifyRoles(accessToken, ["agent", "representative"]);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/properties/${params.propertyId}/showcase-images/${params.imageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 409) {
      return {
        message:
          "Não é permitido que uma propriedade fique sem imagens de demonstração!",
        status: "error",
      };
    }

    if (!response.ok) {
      return {
        message: "Erro ao tentar deletar imagem!",
        status: "error",
      };
    }

    return {
      status: "ok",
      message: "Imagem deletada com sucesso!",
    };
  } catch (error) {
    return {
      message: "Erro ao tentar deletar imagem!",
      status: "error",
    };
  }
}
