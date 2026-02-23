import { ContactRequest, User } from "../../types/Modals";

export interface getUserReturn {
  data?: getUserData;
  message?: string;
  authenticated: boolean;
}

export interface getUserData extends Omit<User, "client"> {
  client: {
    clientId: string;
    contactRequests: ContactRequest[];
  };
}
