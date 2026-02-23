import { Property, PropertyType } from "../../actions/property/types";
import { Pagination } from "../../actions/types/Modals";

export interface FormattedProperty extends Property {
  formattedPrice: string;
}

export interface GetPropertyReturn {
  status: "success" | "error";
  data?: FormattedProperty;
  message?: string;
}

export interface SearchFilter {
  title?: string;
  maxPrice?: string;
  minPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  propertyType?: PropertyType;
  city?: string;
  state?: string;
  sortBy?:
    | "title"
    | "price"
    | "bedrooms"
    | "bathrooms"
    | "state"
    | "city"
    | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface SearchPropertiesReturn {
  data?: FormattedProperty[];

  pagination?: Pagination;
  status: "ok" | "error";
  message?: string;
  try?: number;
}

export interface GetSimilarPropertiesParams {
  id: string;
  type?: string;
  city?: string;
  state?: string;
  bedrooms?: string | number;
  sortBy?:
    | "title"
    | "price"
    | "bedrooms"
    | "bathrooms"
    | "state"
    | "city"
    | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}
