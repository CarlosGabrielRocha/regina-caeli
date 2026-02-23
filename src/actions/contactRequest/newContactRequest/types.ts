export interface NewContactRequestParams {
  description?: string;
  propertyId: string;
}

export interface NewContactRequestReturn {
  status: "ok" | "error";
  message?: string;
}
