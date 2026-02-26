"use server";
import refreshAction from "../../auth/refresh";
import { redirect } from "next/navigation";
import { UploadShowcaseImagesReturn } from "./types";
import verifyRoles from "../../auth/tokens/verifyRoles";

export async function uploadShowcaseImagesAction(
  formData: FormData,
): Promise<UploadShowcaseImagesReturn> {
  const propertyId = formData.get("propertyId") as string;
  formData.delete("propertyId");
  const { accessToken } = await refreshAction();
  if (!accessToken) {
    redirect("/auth");
  }
  verifyRoles(accessToken, ["agent", "representative"]);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/properties/${propertyId}/showcase-images`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || "Erro ao tentar enviar imagens!",
        status: "error",
      };
    }

    const data = await response.json();

    return {
      status: "ok",
      message: "Imagens enviadas com sucesso!",
      data,
    };
  } catch (error) {
    return {
      message: "Erro ao tentar enviar imagens!",
      status: "error",
    };
  }
}
