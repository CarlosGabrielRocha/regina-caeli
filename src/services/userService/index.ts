import refreshAction from "../../actions/auth/refresh";
import { User } from "../../actions/types/Modals";
import { redirect } from "next/navigation";
import { GetUserReturn } from "./types";

export const getUser = async (id: string): Promise<GetUserReturn> => {
  const { accessToken, authenticated } = await refreshAction();
  if (!authenticated) {
    redirect("/auth");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 404) {
      return {
        message: "Usuário não encontrado",
        status: "error",
      };
    }

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const data = (await response.json()) as User;
    return {
      status: "ok",
      data,
    };
  } catch (error) {
    return {
      message: "Erro ao buscar usuário",
      status: "error",
    };
  }
};
