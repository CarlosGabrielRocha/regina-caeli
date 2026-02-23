export interface LoginUserParams {
  email: string;
  password: string;
}

type userCredentialsStatus = "ok" | "invalid" | "unconfirmed";

export interface LoginUserReturn {
  status: userCredentialsStatus;
  message?: string;
  twoSteps?: boolean;
  deviceId?: string;
}

export interface LoginData {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  twoSteps?: boolean;
}
