"use server"

import { ResetPasswordReturn } from "./types";


export default async function resetPasswordAction(
  token: string,
  newPassword: string
): Promise<ResetPasswordReturn> {

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { status: "error", message: "Erro ao tentar resetar senha" };
    }

    return { status: "ok" };
  } catch (error) {
    return { status: "error", message: "Erro ao tentar resetar senha" };
  }
}
