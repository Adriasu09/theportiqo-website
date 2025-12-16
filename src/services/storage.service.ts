import { User } from "../types/auth.types";

const USER_STORAGE_KEY = "user";

export class StorageService {
  
  // Save user to sessionStorage
  static saveUser(user: User): void {
    try {
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user to storage:", error);
    }
  }

  // Get user from sessionStorage
  static getUser(): User | null {
    try {
      const savedUser = sessionStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("Error parsing saved user:", error);
      this.removeUser();
    }
    return null;
  }

  // Remove user from sessionStorage
  static removeUser(): void {
    try {
      sessionStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error("Error removing user from storage:", error);
    }
  }

  // Check if user exists in storage
  static hasUser(): boolean {
    return sessionStorage.getItem(USER_STORAGE_KEY) !== null;
  }
}
