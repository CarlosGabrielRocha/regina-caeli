export interface UpdatePropertyParams {
  id: string;
  formData: FormData;
}

export interface UpdatePropertyReturn {
  status: "ok" | "error";
  message?: string;
}
