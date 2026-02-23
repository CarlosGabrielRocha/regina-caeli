import { NextRequest, NextResponse } from "next/server";
import refreshAction from "../../../../actions/auth/refresh";
import { getUserData } from "../../../../actions/user/getUser/types";

export async function GET(request: NextRequest) {
  try {
    const refreshResult = await refreshAction();

    if (!refreshResult.authenticated || !refreshResult.accessToken) {
      return NextResponse.json({
        authenticated: false,
        message: refreshResult.message,
      });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshResult.accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({
        message: "Erro ao buscar usuário",
        authenticated: false,
      });
    }

    const data = (await response.json()) as getUserData;
    return NextResponse.json({
      authenticated: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor",
        authenticated: false,
      },
      { status: 500 },
    );
  }
}
