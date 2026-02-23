"use server";

import { ResetPasswordRequestReturn } from "./types";

export default async function requestPasswordResetAction(email: string): Promise<ResetPasswordRequestReturn> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/request-password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const result = await response.json();
    return { status: "ok" };
  } catch (error) {
    return { status: "invalid" };
  }
}
