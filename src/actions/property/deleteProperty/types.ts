export interface DeletePropertyParams {
  id: string;
}

export interface DeletePropertyReturn {
  status: "ok" | "error";
  message: string;
}
