"use server";

import tokenConfig from "../../token.config";
import { cookies } from "next/headers";

export default async function setTokensAction(tokens: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookieStore = await cookies();

  cookieStore.set("refresh", tokens.refreshToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: tokenConfig.refreshToken.maxAge,
  });

  cookieStore.set("access", tokens.accessToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: tokenConfig.accessToken.maxAge,
  });
}
