import { User } from "../../actions/types/Modals";

export interface GetUserReturn {
  message?: string;
  status: "ok" | "error";
  data?: User;
}
