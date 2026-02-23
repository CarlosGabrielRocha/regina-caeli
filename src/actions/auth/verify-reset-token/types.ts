type VerifyResetTokenStatus = "ok" | "invalid";

export interface VerifyResetTokenReturn {
  status: VerifyResetTokenStatus;
  message?: string;
  data?: {
    token: string;
  }
}
