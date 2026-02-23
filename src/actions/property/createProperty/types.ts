
export interface CreatePropertyParams {
  formData: FormData;
}

export interface CreatePropertyReturn {
  status: "ok" | "error";
  message: string;
}
