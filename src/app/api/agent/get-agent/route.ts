import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "../../../../services/agentService";

import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const deviceId = cookieStore.get("deviceId")?.value;

  if (!deviceId) {
    return NextResponse.json(
      { status: "error", message: "Device ID é obrigatório" },
      { status: 400 },
    );
  }

  try {
    const result = await getAgent();

    if (result.status === "error") {
      return NextResponse.json(
        { status: "error", message: result.message },
        { status: result.message?.includes("não encontrado") ? 404 : 400 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erro interno do servidor",
      },
      { status: 500 },
    );
  }
}
