import refreshAction from "../../actions/auth/refresh";
import {
  GetContactRequestData,
  GetContactRequestParams,
  GetContactRequestReturn,
  GetContactRequestsData,
  GetContactRequestsParams,
  GetContactRequestsReturn,
} from "./types";
import { redirect } from "next/navigation";

export const getContactRequests = async (
  params: GetContactRequestsParams,
): Promise<GetContactRequestsReturn> => {
  const url = new URL(`${process.env.BACKEND_URL}/contact-requests`);

  const { accessToken, authenticated } = await refreshAction();
  if (!authenticated) {
    redirect("/auth");
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return {
        message: "Erro ao buscar solicitações de contato.",
        status: "error",
      };
    }

    const data = (await response.json()) as GetContactRequestsData;

    return {
      data,
      status: "ok",
    };
  } catch (error) {
    return {
      message: "Erro ao buscar solicitações de contato.",
      status: "error",
    };
  }
};

export const getContactRequest = async (
  params: GetContactRequestParams,
): Promise<GetContactRequestReturn> => {
  const { accessToken, authenticated } = await refreshAction();
  if (!authenticated) {
    redirect("/auth");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/contact-requests/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 404) {
      return {
        message: "Solicitação de contato não encontrada.",
        status: "error",
      };
    }

    if (!response.ok) {
      return {
        message: "Erro ao buscar solicitação de contato.",
        status: "error",
      };
    }

    const data = (await response.json()) as any;

    if (data.interests) {
      data.interests = data.interests.map((interest: any) => {
        if (interest.property) {
          return {
            ...interest,
            property: {
              ...interest.property,
              shortDescription:
                interest.property.shortDescription ||
                interest.property.description ||
                "Sem descrição",
              longDescription:
                interest.property.longDescription ||
                interest.property.description ||
                "Sem descrição",
              formattedPrice: interest.property.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }),
              address: interest.property.address || {
                city: "",
                state: "",
                street: "",
                number: "",
                neighborhood: "",
                cep: "",
              },
              coverImg: interest.property.coverImg || {
                url: "/images/placeholder.jpg",
                id: "",
              },
            },
          };
        } else {
          return {
            ...interest,
            property: {
              id: interest.propertyId || "unavailable",
              title: "Imóvel Indisponível",
              shortDescription: "Este imóvel não está mais disponível.",
              longDescription: "",
              price: 0,
              formattedPrice: "Indisponível",
              bedrooms: 0,
              area: 0,
              bathrooms: 0,
              type: "apartment",
              address: {
                id: "",
                street: "",
                number: "",
                complement: "",
                neighborhood: "",
                city: "-",
                state: "-",
                cep: "",
              },
              createdAt: new Date().toISOString(),
              coverImg: {
                id: "placeholder",
                url: "/images/placeholder.jpg",
              },
            },
          };
        }
      });
    }

    const typedData = data as GetContactRequestData;

    return {
      data: typedData,
      status: "ok",
    };
  } catch (error) {
    return {
      message: "Erro ao buscar solicitação de contato.",
      status: "error",
    };
  }
};
