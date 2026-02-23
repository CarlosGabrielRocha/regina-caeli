export type PropertyType = "apartment" | "house" | "condominium";

export interface Property {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  bedrooms: number;
  area: number;
  bathrooms: number;
  type: PropertyType;
  address: {
    id: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  createdAt: string;
  coverImg: {
    id: string;
    url: string;
  };
  showcaseImgs?: { id: string; url: string }[];
  isLaunch?: boolean;
}
