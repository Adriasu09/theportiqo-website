/**
 * Manages authentication state and delegates API calls to services
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  AddressFormType,
  NameEmailFormType,
  PersonalDataFormType,
} from "../components/auth/schemas/register.schema";
import {
  LoginFormType,
  OtpFormType,
  SignInWithGoogleData,
} from "../components/auth/schemas/login.schema";
import { User, LoginResponse, ApiError } from "../types/auth.types";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { StorageService } from "../services/storage.service";

// Re-export for backward compatibility
export type { User, LoginResponse };
export { ApiError };

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (loginForm: LoginFormType) => Promise<LoginResponse | User>;
  verifyOtp: (otpForm: OtpFormType) => Promise<User>;
  resendOtp: (email: string, device_fingerprint: string) => Promise<unknown>;
  register: (userData: NameEmailFormType) => Promise<any>;
  signInWithGoogle: (
    signInWithGoogleData: SignInWithGoogleData,
  ) => Promise<LoginResponse | User>;
  confirmEmail: (token: string) => Promise<any>;
  resendConfirmationEmail: (email: string) => Promise<unknown>;
  forgotPassword: (email: string) => Promise<any>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
  signOut: () => void;
  isAuthenticated: () => boolean;
  processTokenFromBackend: (tokenData: any) => Promise<User>;
  updatePersonalInfo: (personalData: PersonalDataFormType) => Promise<unknown>;
  updateAddress: (addressData: AddressFormType) => Promise<unknown>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from storage on mount
  useEffect(() => {
    const savedUser = StorageService.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  // Helper to save user and update state
  const saveUserSession = (userData: User): User => {
    setUser(userData);
    StorageService.saveUser(userData);
    return userData;
  };

  // Process token response and save user session
  const processTokenFromBackend = async (tokenData: any): Promise<User> => {
    try {
      const userInfo = TokenService.processTokenResponse(tokenData);
      return saveUserSession(userInfo);
    } catch (error) {
      console.error("Error processing token from backend:", error);
      throw error;
    }
  };

  // Login with email and password
  const login = async (
    loginForm: LoginFormType,
  ): Promise<LoginResponse | User> => {
    try {
      const responseData = await AuthService.login(loginForm);

      if (!responseData.requires_otp) {
        return await processTokenFromBackend(responseData);
      }

      return responseData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Verify OTP
  const verifyOtp = async (otpForm: OtpFormType): Promise<User> => {
    try {
      const responseData = await AuthService.verifyOtp(otpForm);
      return await processTokenFromBackend(responseData);
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  // Resend OTP
  const resendOtp = async (
    email: string,
    device_fingerprint: string,
  ): Promise<unknown> => {
    try {
      return await AuthService.resendOtp(email, device_fingerprint);
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  };

  // Register new user
  const register = async (userData: NameEmailFormType) => {
    try {
      return await AuthService.register(userData);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Confirm email
  const confirmEmail = async (token: string) => {
    try {
      const data = await AuthService.confirmEmail(token);
      
      // If verification includes login token, process it
      if (data.access_token || data.token || data.jwt) {
        return await processTokenFromBackend(data);
      }

      return data;
    } catch (error) {
      console.error("Email verification error:", error);
      throw error;
    }
  };

  // Resend confirmation email
  const resendConfirmationEmail = async (email: string) => {
    try {
      return await AuthService.resendConfirmationEmail(email);
    } catch (error) {
      console.error("Resend confirmation email error:", error);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (
    signInWithGoogleData: SignInWithGoogleData,
  ): Promise<LoginResponse | User> => {
    try {
      const responseData = await AuthService.signInWithGoogle(
        signInWithGoogleData,
      );

      if (!responseData.requires_otp) {
        return await processTokenFromBackend(responseData);
      }

      return responseData;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  // Forgot password
  const forgotPassword = async (email: string) => {
    try {
      return await AuthService.forgotPassword(email);
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  };

  // Change password
  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      return await AuthService.changePassword(
        currentPassword,
        newPassword,
        user.token,
      );
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      return await AuthService.resetPassword(token, newPassword);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  // Update personal info
  const updatePersonalInfo = async (
    personalData: PersonalDataFormType,
  ): Promise<any> => {
    try {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      return await AuthService.updatePersonalInfo(
        user.id,
        personalData,
        user.token,
      );
    } catch (error) {
      console.error("Save personal info error:", error);
      throw error;
    }
  };

  // Update address
  const updateAddress = async (
    addressData: AddressFormType,
  ): Promise<unknown> => {
    try {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      return await AuthService.updateAddress(user.id, addressData, user.token);
    } catch (error) {
      console.error("Save address error:", error);
      throw error;
    }
  };

  // Sign out
  const signOut = () => {
    setUser(null);
    StorageService.removeUser();
  };

  // Check authentication
  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    isLoading,
    login,
    verifyOtp,
    resendOtp,
    register,
    signInWithGoogle,
    confirmEmail,
    resendConfirmationEmail,
    forgotPassword,
    changePassword,
    resetPassword,
    signOut,
    isAuthenticated,
    processTokenFromBackend,
    updatePersonalInfo,
    updateAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
