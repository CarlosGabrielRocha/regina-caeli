import { NextRequest, NextResponse } from "next/server";
import refreshAction from "../../../../actions/auth/refresh";

async function handleRefresh(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirect_to") || "/";

  try {
    const result = await refreshAction();

    if (result.authenticated) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    } else {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const GET = handleRefresh;
export const POST = handleRefresh;
