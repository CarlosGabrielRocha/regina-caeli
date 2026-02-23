import { ContactRequest } from "../../types/Modals";

export interface UpdateContactRequestParams {
  contactReqId: string;
  data: {
    description?: string;
  };
}

export interface UpdateContactRequestData extends ContactRequest {
  message?: string;
}

export interface UpdateContactRequestReturn {
  authenticated?: boolean;
  status: "success" | "error";
  message: string;
  data?: UpdateContactRequestData;
}
