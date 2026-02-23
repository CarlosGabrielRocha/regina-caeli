export interface RegisterUserParams {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterUserReturn {
  ok: boolean;
  message?: string;
  field?: string;
}
