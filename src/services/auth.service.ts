import { httpClient } from "../api/http.client.ts";
import { LoginResponse, TokenResponse } from "../types/auth.types";
import {
  LoginFormType,
  OtpFormType,
  SignInWithGoogleData,
} from "../components/auth/schemas/login.schema";
import {
  NameEmailFormType,
  PersonalDataFormType,
  AddressFormType,
} from "../components/auth/schemas/register.schema";

export class AuthService {
  static async login(loginForm: LoginFormType): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>("/api/users/login", loginForm);
  }

  static async verifyOtp(otpForm: OtpFormType): Promise<TokenResponse> {
    return httpClient.post<TokenResponse>("/api/users/verify-otp", otpForm);
  }

  static async resendOtp(email: string, device_fingerprint: string): Promise<any> {
    return httpClient.post("/api/users/resend-otp", {
      email,
      device_fingerprint,
    });
  }

  static async register(userData: NameEmailFormType): Promise<any> {
    return httpClient.post("/api/users/register", userData);
  }

  static async confirmEmail(token: string): Promise<TokenResponse> {
    return httpClient.post<TokenResponse>("/api/users/confirm-email", { token });
  }

  static async resendConfirmationEmail(email: string): Promise<any> {
    return httpClient.post("/api/users/resend-confirmation", { email });
  }

  static async signInWithGoogle(
    signInWithGoogleData: SignInWithGoogleData
  ): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>(
      "/api/users/google/verify-token",
      signInWithGoogleData
    );
  }

  static async forgotPassword(email: string): Promise<any> {
    return httpClient.post("/api/users/forgot-password", { email });
  }

  static async changePassword(
    currentPassword: string,
    newPassword: string,
    token: string
  ): Promise<any> {
    return httpClient.post(
      "/api/users/change-password",
      { currentPassword, newPassword },
      { token }
    );
  }

  static async resetPassword(token: string, newPassword: string): Promise<any> {
    return httpClient.post("/api/users/reset-password", { token, newPassword });
  }

  static async updatePersonalInfo(
    userId: string,
    personalData: PersonalDataFormType,
    token: string
  ): Promise<any> {
    return httpClient.patch(
      `/api/users/${userId}/personal-info`,
      personalData,
      { token }
    );
  }

  static async updateAddress(
    userId: string,
    addressData: AddressFormType,
    token: string
  ): Promise<any> {
    return httpClient.patch(
      `/api/users/${userId}/address`,
      addressData,
      { token }
    );
  }
}
