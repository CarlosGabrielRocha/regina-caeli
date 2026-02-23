"use server";

import refreshAction from "../../auth/refresh";
import { redirect } from "next/navigation";
import { UpdatePropertyParams, UpdatePropertyReturn } from "./types";
import verifyRoles from "../../auth/tokens/verifyRoles";

export async function updatePropertyAction(
  params: UpdatePropertyParams,
): Promise<UpdatePropertyReturn> {
  const { accessToken } = await refreshAction();
  if (!accessToken) {
    redirect("/auth");
  }
  verifyRoles(accessToken, ["agent", "representative"]);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/properties/${params.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: params.formData,
      },
    );

    if (!response.ok) {
      const data = (await response.json()) as { message: string };
      if (data?.message?.includes("CEP")) {
        return {
          message: "CEP inválido!",
          status: "error",
        };
      }
      return {
        message: "Erro ao tentar atualizar propriedade!",
        status: "error",
      };
    }

    return {
      status: "ok",
      message: "Propriedade atualizada com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Erro ao tentar atualizar propriedade!",
      status: "error",
    };
  }
}
