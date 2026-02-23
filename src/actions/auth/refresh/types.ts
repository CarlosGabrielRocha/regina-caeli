export interface RefreshParams {
  refreshToken: string;
}

export interface RefreshData {
  refreshToken: string;
  accessToken: string;
}

export interface RefreshReturn {
  accessToken?: string;
  authenticated: boolean;
  message: string;
  deviceId?: string;
}
