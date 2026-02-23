export interface DeleteShowcaseImageParams {
  propertyId: string;
  imageId: string;
}

export interface DeleteShowcaseImageReturn {
  status: "ok" | "error";
  message: string;
}
