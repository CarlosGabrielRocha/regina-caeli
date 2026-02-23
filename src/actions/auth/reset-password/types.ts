type ResetPasswordStatus = "ok" | "error"

export interface ResetPasswordReturn {
  status: ResetPasswordStatus
  message?: string
}