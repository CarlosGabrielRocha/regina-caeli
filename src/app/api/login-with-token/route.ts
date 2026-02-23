import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { VerifyLoginTokenBody } from "./types";
import setTokensAction from "../../../actions/auth/tokens/setTokens";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    const cookieStore = await cookies();
    let deviceId: string = uuid();

    cookieStore.set("deviceId", deviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/verify-login-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, deviceId }),
      },
    );

    if (!response.ok) {
      return NextResponse.redirect(
        new URL("/auth/login-with-token/error", request.url),
      );
    }

    const { accessToken, refreshToken } =
      (await response.json()) as VerifyLoginTokenBody;

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(
        new URL("/auth/login-with-token/error", request.url),
      );
    }

    await setTokensAction({ accessToken, refreshToken });

    const successUrl = new URL("/auth/login-with-token", request.url);

    return NextResponse.redirect(successUrl);
  } catch (error) {
    return NextResponse.redirect(
      new URL("/auth/login-with-token/error", request.url),
    );
  }
}
