"use client";
import { authService, User } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Public routes that don't require authentication
const PUBLIC_PATHS = [
  '/signin',
  '/signup',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
  '/accept-invite'
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = useCallback((path: string) => {
    return PUBLIC_PATHS.some(p => path === p || path.startsWith(`${p}/`));
  }, []);

  const syncAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    // Case 1: No token
    if (!token) {
      setUser(null);
      if (!isPublicRoute(pathname)) {
        // If trying to access protected route without token, redirect to signin
        router.push("/signin");
        // Keep loading true to prevent flashing protected content
      } else {
        // If on public route, allow access
        setLoading(false);
      }
      return;
    }

    // Case 2: Token exists
    try {
      // If we already have user data and it matches the token (simplified check), maybe skip fetch?
      // But for safety, let's verify mostly.
      // Optimization: If user is already set in state, we might not need to fetch 'me' again?
      // But syncAuth depends on pathname, so it runs on navigation.
      // We should avoid refetching 'me' on every page load if we have user state valid.
      // However, for this task, let's stick to robust checking.

      const userData = await authService.me(token);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Optional: Redirect to dashboard if on public route and logged in? (User didn't strictly ask for this, but it's good practice)
      // if (isPublicRoute(pathname)) router.push("/dashboard");

    } catch (err) {
      console.error("Auth sync failed:", err);
      // Token invalid/expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);

      if (!isPublicRoute(pathname)) {
        router.push("/signin");
      }
    } finally {
      // Only set loading false if we didn't redirect (in the catch block or success block for public/protected logic)
      // But since router.push is client-side, execution continues.
      // We generally want to show content now.
      setLoading(false);
    }
  }, [pathname, router, isPublicRoute]);

  useEffect(() => {
    syncAuth();
  }, [syncAuth]);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setLoading(false);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await authService.logout(token);
      } catch (err) {
        console.error("Logout failed:", err);
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/signin");
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = await authService.me(token);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading CIMS...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, authenticated: !!user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
