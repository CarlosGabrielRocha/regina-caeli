import { User } from "../../types/Modals";

export interface UpdateUserParams {
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
  twoSteps?: boolean;
}

export interface UpdateUserData {
  verifyEmail: boolean;
  updatedUser: User;
}

export interface UpdateUserReturn {
  status: "ok" | "error" | "conflict";
  message?: string;
  data?: UpdateUserData;
}
