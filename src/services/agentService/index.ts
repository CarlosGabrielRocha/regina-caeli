import { GetAgentData, GetAgentParams, GetAgentReturn } from "./types";
import refreshAction from "../../actions/auth/refresh";
import { redirect } from "next/navigation";

export const getAgent = async (
  params: GetAgentParams = {},
): Promise<GetAgentReturn> => {
  const url = new URL(`${process.env.BACKEND_URL}/agent/me`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, String(value));
    }
  });

  const { accessToken, authenticated } = await refreshAction();
  if (!authenticated) {
    redirect("/auth");
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 404) {
      return {
        status: "error",
        message: "Agent não encontrado",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message: "Erro ao buscar agent",
      };
    }

    const data = (await response.json()) as GetAgentData;
    return {
      status: "ok",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao buscar agent",
    };
  }
};
