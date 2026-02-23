import { Property } from "../types";

export interface UploadShowcaseImagesParams {
  propertyId: string;
  formData: FormData;
}

export interface UploadShowcaseImagesReturn {
  status: "ok" | "error";
  message: string;
  data?: Property;
}
