"use server";

import refreshAction from "../../auth/refresh";
import { redirect } from "next/navigation";
import verifyRoles from "../../auth/tokens/verifyRoles";
import { setLaunchProperty } from "../../../services/propertyService";

export async function setLaunchPropertyAction(
  propertyId: string,
): Promise<{ status: "success" | "error"; message: string }> {
  const { accessToken } = await refreshAction();
  if (!accessToken) {
    redirect("/auth");
  }
  verifyRoles(accessToken, ["agent"]);

  return await setLaunchProperty(propertyId);
}
