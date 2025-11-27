/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AccountFormType } from "../components/auth/schemas/account.schema";
import {
  LoginFormType,
  OtpFormType,
} from "../components/auth/schemas/login.schema";

export interface User {
  id: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  role?: string;
  token: string;
  backendData?: any;
}

export interface LoginResponse {
  mensage?: string;
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

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (loginForm: LoginFormType) => Promise<LoginResponse | User>;
  verifyOtp: (otpForm: OtpFormType) => Promise<User>;
  resendOtp: (email: string, device_fingerprint: string) => Promise<unknown>;
  register: (userData: AccountFormType) => Promise<any>;
  signInWithGoogle: (googleCredential: string) => Promise<User>;
  confirmEmail: (token: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
  signOut: () => void;
  isAuthenticated: () => boolean;
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

  useEffect(() => {
    // Check if user is already signed in (from sessionStorage)
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        sessionStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login with email and password
  const login = async (
    loginForm: LoginFormType,
  ): Promise<LoginResponse | User> => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(`${backendUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed: ${response.status}`,
        );
      }

      const responseData = await response.json();

      if (!responseData.requires_otp) {
        return await processTokenFromBackend(responseData);
      }

      return responseData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const verifyOtp = async (otpForm: OtpFormType): Promise<User> => {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    try {
      const response = await fetch(`${backendUrl}/api/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpForm),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed: ${response.status}`,
        );
      }

      const responseData = await response.json();
      return await processTokenFromBackend(responseData);
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  const resendOtp = async (
    email: string,
    device_fingerprint: string,
  ): Promise<unknown> => {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    try {
      const response = await fetch(`${backendUrl}/api/users/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          device_fingerprint,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Resend OTP failed: ${response.status}`,
        );
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  };

  // Register new user (returns success message, not user data)
  const register = async (userData: AccountFormType) => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(`${backendUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Registration failed: ${response.status}`,
        );
      }

      const data = await response.json();
      // Return the response data (should contain confirmation message)
      // Do not log the user in automatically
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Confirm email verification
  const confirmEmail = async (token: string) => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(`${backendUrl}/api/users/confirm-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Email confirmation failed: ${response.status}`,
        );
      }

      const data = await response.json();
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

  // Sign in with Google One Tap credential
  const signInWithGoogle = async (googleCredential: string): Promise<User> => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      // Send the Google JWT credential to backend for verification
      const response = await fetch(
        `${backendUrl}/api/users/google/verify-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: googleCredential,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Google token verification failed: ${response.status}`,
        );
      }

      const data = await response.json();

      // Process the new JWT token from backend and login user
      return await processTokenFromBackend(data);
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  // Forgot password - request reset
  const forgotPassword = async (email: string) => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(`${backendUrl}/api/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed: ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  };

  // Change password (when user is authenticated)
  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(`${backendUrl}/api/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Password change failed: ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  };

  // Reset password (with token from email)
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const response = await fetch(`${backendUrl}/api/users/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Password reset failed: ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  const processTokenFromBackend = async (tokenData: any): Promise<User> => {
    try {
      const token = tokenData.access_token || tokenData.token || tokenData.jwt;

      if (!token) {
        throw new Error("No access token found in response");
      }

      // Try to decode JWT token to get user information
      let userInfo;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("🔍 JWT Payload:", payload);
        console.log("🔍 Backend Response:", tokenData);

        userInfo = {
          id: payload.sub || payload.id || payload.user_id,
          email: payload.email || tokenData.user?.email,
          name: payload.name || payload.full_name || tokenData.user?.name,
          given_name: payload.given_name || tokenData.user?.given_name,
          family_name: payload.family_name || tokenData.user?.family_name,
          picture: payload.picture || payload.avatar || tokenData.user?.picture,
          role: payload.role || tokenData.user?.role,
          token: token,
          backendData: tokenData,
        };
      } catch {
        // If JWT decoding fails, use backend response data directly
        console.log("🔍 Using backend data directly:", tokenData);
        userInfo = {
          token: token,
          backendData: tokenData,
          id: tokenData.user?.id || tokenData.id,
          email: tokenData.user?.email || tokenData.email || "Unknown",
          name: tokenData.user?.name || tokenData.name || "User",
          given_name: tokenData.user?.given_name || tokenData.given_name,
          picture: tokenData.user?.picture || tokenData.picture,
        };
      }

      console.log("👤 Final User Info:", userInfo);
      setUser(userInfo);
      sessionStorage.setItem("user", JSON.stringify(userInfo));
      return userInfo;
    } catch (error) {
      console.error("Error processing token from backend:", error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

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
    forgotPassword,
    changePassword,
    resetPassword,
    signOut,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
