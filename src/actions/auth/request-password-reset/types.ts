export type ResetPasswordRequestStatus = "ok" | "invalid";

export type ResetPasswordRequestReturn = {
  status: ResetPasswordRequestStatus;
  message?: string;
}
