import { ContactRequest } from "../../types/Modals";

export interface NewInterestParams {
  propertyId: string;
  contactReqId: string;
}

export interface NewInterestReturn {
  authenticated?: boolean;
  status: "success" | "error";
  message: string;
  data?: ContactRequest;
}

export interface NewInterestData extends ContactRequest {
  error?: string;
}
