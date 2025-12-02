import { User, JWTPayload, TokenResponse } from "../types/auth.types";

export class TokenService {
  /**
   * Extracts token from backend response
   * Tries multiple possible token field names
   */
  static extractToken(tokenData: TokenResponse): string {
    const token = tokenData.access_token || tokenData.token || tokenData.jwt;
    
    if (!token) {
      throw new Error("No access token found in response");
    }
    
    return token;
  }

  /**
   * Decodes JWT token payload
   * Returns null if decoding fails
   */
  static decodeJWT(token: string): JWTPayload | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (error) {
      console.warn("Failed to decode JWT:", error);
      return null;
    }
  }

  /**
   * Extracts user information from JWT payload
   */
  static extractUserFromPayload(payload: JWTPayload, token: string, backendData: any): User {
    return {
      id: payload.sub || payload.id || payload.user_id || "",
      email: payload.email || backendData.user?.email || "",
      name: payload.name || payload.full_name || backendData.user?.name || "User",
      given_name: payload.given_name || backendData.user?.given_name,
      family_name: payload.family_name || backendData.user?.family_name,
      picture: payload.picture || payload.avatar || backendData.user?.picture,
      role: payload.role || backendData.user?.role,
      token,
      backendData,
    };
  }

  /**
   * Extracts user information from backend response data
   * Used as fallback when JWT decoding fails
   */
  static extractUserFromResponse(tokenData: TokenResponse, token: string): User {
    return {
      id: tokenData.user?.id || tokenData.id || "",
      email: tokenData.user?.email || tokenData.email || "Unknown",
      name: tokenData.user?.name || tokenData.name || "User",
      given_name: tokenData.user?.given_name || tokenData.given_name,
      family_name: tokenData.user?.family_name || tokenData.family_name,
      picture: tokenData.user?.picture || tokenData.picture,
      role: tokenData.user?.role || tokenData.role,
      token,
      backendData: tokenData,
    };
  }

  /**
   * Processes token response from backend and extracts user information
   * Main method to convert backend response to User object
   */
  static processTokenResponse(tokenData: TokenResponse): User {
    const token = this.extractToken(tokenData);
    const payload = this.decodeJWT(token);

    let userInfo: User;

    if (payload) {
      console.log("🔍 JWT Payload:", payload);
      console.log("🔍 Backend Response:", tokenData);
      userInfo = this.extractUserFromPayload(payload, token, tokenData);
    } else {
      console.log("🔍 Using backend data directly:", tokenData);
      userInfo = this.extractUserFromResponse(tokenData, token);
    }

    console.log("👤 Final User Info:", userInfo);
    return userInfo;
  }
}
