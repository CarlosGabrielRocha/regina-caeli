import {
  GetPropertyReturn,
  GetSimilarPropertiesParams,
  SearchFilter,
  SearchPropertiesReturn,
} from "./types";
import { Pagination } from "@/actions/types/Modals";
import refreshAction from "@/actions/auth/refresh";
import { redirect } from "next/navigation";
import { Property } from "@/actions/property/types";

export const getProperty = async (
  id?: string,
  launch?: boolean,
): Promise<GetPropertyReturn> => {
  try {
    const url = new URL(
      `${process.env.BACKEND_URL}/properties/${id ? id : launch ? "launch" : ""}`,
    );
    if (launch) {
      url.searchParams.append("launch", "true");
    }

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    if (response.status === 404) {
      return {
        status: "error",
        message: "Imóvel não encontrado",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message: "Um erro inesperado ocorreu ao buscar o imóvel",
      };
    }
    const data = (await response.json()) as Property;

    const formattedData = {
      ...data,
      formattedPrice: new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(data.price),
    };
    return {
      status: "success",
      data: formattedData,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Um erro inesperado ocorreu ao buscar o imóvel",
    };
  }
};

export const getProperties = async (
  params: SearchFilter,
): Promise<SearchPropertiesReturn> => {
  const url = new URL(`${process.env.BACKEND_URL}/properties`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = (await response.json()) as {
      data: Property[];
      pagination?: Pagination;
    };

    const formattedData = responseJson.data.map((property) => ({
      ...property,
      formattedPrice: new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(property.price),
    }));

    return {
      ...responseJson,
      data: formattedData,
      status: "ok",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao buscar imóveis",
    };
  }
};

export const getSimilarProperties = async (
  params: GetSimilarPropertiesParams,
): Promise<SearchPropertiesReturn> => {
  const { id } = params;
  const url = new URL(`${process.env.BACKEND_URL}/properties/similar/${id}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString());
    const responseJson = (await response.json()) as {
      data: Property[];
      pagination?: Pagination;
    };

    const formattedData = responseJson.data.map((property) => ({
      ...property,
      formattedPrice: new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(property.price),
    }));

    return {
      ...responseJson,
      data: formattedData,
      status: "ok",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao buscar imóveis similares",
    };
  }
};

export const setLaunchProperty = async (
  propertyId: string,
): Promise<{ status: "success" | "error"; message: string }> => {
  const url = `${process.env.BACKEND_URL}/properties/launch`;
  const { accessToken } = await refreshAction();

  if (!accessToken) {
    redirect("/auth");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ propertyId }),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Erro ao tentar definir lançamento",
      };
    }

    return {
      status: "success",
      message: "Lançamento definido com sucesso!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erro ao definir lançamento",
    };
  }
};
