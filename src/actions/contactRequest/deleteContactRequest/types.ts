export interface DeleteContactRequestParams {
  id: string;
}

export interface DeleteContactRequestReturn {
  status: "ok" | "error";
  message: string;
}
