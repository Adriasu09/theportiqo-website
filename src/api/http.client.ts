/**
 * HTTP Client
 * Centralized HTTP client with error handling and base configuration
 */

import { ApiError } from "../types/auth.types";

export interface RequestConfig {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

export class HttpClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  }

  // Builds headers for the request
  private buildHeaders(config: RequestConfig): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    if (config.token) {
      headers.Authorization = `Bearer ${config.token}`;
    }

    return headers;
  }

  // Makes HTTP request with error handling
  async request<T = any>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const method = config.method || "GET";
      const headers = this.buildHeaders(config);

      const options: RequestInit = {
        method,
        headers,
      };

      if (config.body && method !== "GET") {
        options.body = JSON.stringify(config.body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `Request failed: ${response.status}`,
          errorData
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("HTTP Client error:", error);
      throw error;
    }
  }

  // Convenience methods
  
  async get<T = any>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T = any>(endpoint: string, body?: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "POST", body });
  }

  async patch<T = any>(endpoint: string, body?: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "PATCH", body });
  }

  async put<T = any>(endpoint: string, body?: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "PUT", body });
  }

  async delete<T = any>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

// Export singleton instance
export const httpClient = new HttpClient();
