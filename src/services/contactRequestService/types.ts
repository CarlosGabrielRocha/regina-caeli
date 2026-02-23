import {
  ContactRequest,
  Interest,
  Pagination,
} from "../../actions/types/Modals";

export interface GetContactRequestsData {
  data: ContactRequest[];
  pagination: Pagination;
}

export interface GetContactRequestsParams {
  page?: number;
  pageSize?: number;
  createdAt?: Date;
  status?: "pending" | "done" | "inProgress";
  order?: "asc" | "desc";
}

export interface GetContactRequestsReturn {
  data?: GetContactRequestsData;
  status: "ok" | "error";
  message?: string;
}

//

export interface GetContactRequestParams {
  id: string;
}

export interface GetContactRequestData extends ContactRequest {
  interests: Interest[];
  agent: {
    id: string;
    userId: string;
  };
  client: {
    id: string;
    userId: string;
  };
}

export interface GetContactRequestReturn {
  data?: GetContactRequestData;
  status: "ok" | "error";
  message?: string;
}

//
