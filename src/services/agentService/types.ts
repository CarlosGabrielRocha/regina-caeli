import {
  ContactRequest,
  DoneContactRequest,
  Pagination,
} from "../../actions/types/Modals";

export interface GetAgentParams {
  page?: number;
  pageSize?: number;
  createdAt?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface GetAgentData {
  agent: {
    id: string;
    userId: string;
    user: {
      name: string;
      email: string;
    };
  };
  inProgressContactReqs: {
    data: ContactRequest[];
    pagination: Pagination;
  };
  doneContactReqs: {
    data: DoneContactRequest[];
    pagination: Pagination;
  };
}

export interface GetAgentReturn {
  data?: GetAgentData;
  status: "ok" | "error";
  message?: string;
}
