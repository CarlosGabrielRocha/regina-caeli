import { FormattedProperty } from "../../services/propertyService/types";

export interface User {
  name: string;
  email: string;
  password: string;
  phone?: string;
  twoSteps: boolean;
  createdAt: Date;
  updatedAt: Date;
  agent?: {
    agendId: string;
  };
  representative?: {
    representativeId: string;
  };
  client: {
    clientId: string;
    contactRequests?: ContactRequest[];
  };
}

export type UserRole = "agent" | "representative" | "client";

export interface ContactRequest {
  id: string;
  status: "pending" | "done" | "inProgress";
  description?: string;
  agentId: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  interests?: Interest[];
}

export interface DoneContactRequest {
  id: string;
  agentId: string;
  createdAt: Date;
  contactRequest?: ContactRequest;
}

export interface Interest {
  id: string;
  propertyId: string;
  property?: FormattedProperty;
}

export interface Property {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  area?: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: "apartment" | "house" | "condominium";
  representativeId: string;
  situation: "available" | "unavailable";
  createdAt: Date;
  updatedAt: Date;
  launch: boolean;
  address?: Address;
  coverImg?: {
    id: string;
    url: string;
  };
  showcaseImgs?: {
    id: string;
    url: string;
  }[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep?: string;
}
