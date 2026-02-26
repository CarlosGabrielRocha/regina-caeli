import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  matcher: "/dashboard/:path*",
};

export interface DecodedAccess {
  sub: string;
  roles: ["client" | "agent" | "representative"];
  type: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access");
  const refreshToken = req.cookies.get("refresh");

  if (!refreshToken) {

    return NextResponse.redirect(new URL("/auth", req.url));
  }
  if (!accessToken) {
    const redirectUrl = new URL("/api/auth/refresh", req.url);
    redirectUrl.searchParams.set("redirect_to", req.url);
    return NextResponse.redirect(redirectUrl);
  }
  const decodedAccessToken = jwt.decode(
    accessToken?.value || "",
  ) as DecodedAccess;

  if (accessToken && !decodedAccessToken?.roles?.includes("agent")) {

    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
