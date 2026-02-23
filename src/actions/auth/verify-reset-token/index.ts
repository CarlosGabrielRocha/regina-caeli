"use server"

import { VerifyResetTokenReturn } from "./types";

export async function verifyResetTokenAction(token: string): Promise<VerifyResetTokenReturn> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/verify-reset-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { status: "invalid", message: "Token inválido" }
    }

    return { status: "ok", data: { token: data.token } }
  } catch (error) {
    return { status: "invalid", message: "Token inválido" }
  }
}