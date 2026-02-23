export interface deleteInterestParams {
  contactReqId: string;
  interestId: string;
}

export interface deleteInterestReturn {
  authenticated?: boolean;
  status: "success" | "error";
  message: string;
}

export interface deleteInterestData {
  message?: string;
}
