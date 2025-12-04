export class ApiError extends Error {
  code?: string;
  statusCode?: number;
  timestamp?: string;
  path?: string;
  method?: string;

  constructor(message: string, data?: any) {
    super(message);
    this.name = "ApiError";
    if (data) {
      this.code = data.code;
      this.statusCode = data.statusCode;
      this.timestamp = data.timestamp;
      this.path = data.path;
      this.method = data.method;
    }
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  role?: string;
  token: string;
  backendData?: unknown;
}

export interface LoginResponse {
  mensage?: string;
  email?: string;
  requires_otp?: boolean;
  access_token?: string;
  user?: User;
}

export interface VerifyOtpResponse {
  access_token?: string;
  token?: string;
  jwt?: string;
  user?: User;
}

export interface TokenResponse {
  access_token?: string;
  token?: string;
  jwt?: string;
  user?: User;
  [key: string]: any;
}

export interface JWTPayload {
  sub?: string;
  id?: string;
  user_id?: string;
  email?: string;
  name?: string;
  full_name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

export type WaitingListData = {
  email: string;
  name: string;
  lists: number[];
  attribs?: Record<string, any>;
}
