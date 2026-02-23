"use server";

import refreshAction from "../../auth/refresh";
import { redirect } from "next/navigation";
import { CreatePropertyParams, CreatePropertyReturn } from "./types";
import verifyRoles from "../../auth/tokens/verifyRoles";

export async function createPropertyAction(
  params: CreatePropertyParams,
): Promise<CreatePropertyReturn> {
  const { accessToken } = await refreshAction();
  if (!accessToken) {
    redirect("/auth");
  }
  verifyRoles(accessToken, ["agent", "representative"]);

  try {
    const { formData } = params;

    const response = await fetch(`${process.env.BACKEND_URL}/properties`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const data = (await response.json()) as { message: string };
      console.log(data);
      if (data?.message?.includes("CEP")) {
        return {
          message: "CEP inválido!",
          status: "error",
        };
      }
      return {
        message: "Erro ao tentar criar propriedade!",
        status: "error",
      };
    }

    return {
      status: "ok",
      message: "Propriedade criada com sucesso!",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Erro ao tentar criar propriedade!",
      status: "error",
    };
  }
}
