import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/index";
import { AboutPage } from "./pages/about";
import { PortfolioPage } from "./pages/portfolio";
import { DashboardPage } from "./pages/dashboard";
import { AuthCallbackPage } from "./pages/auth-callback";
import { AuthTestPage } from "./pages/auth-test";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ConfirmEmailPage } from "./pages/confirm-email";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { ResetPasswordPage } from "./pages/reset-password";
import { ChangePasswordPage } from "./pages/change-password";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LandingPage } from "./pages/landing";
import { LandingLayout } from "@layout/landingPage/landingLayout";

// Define routes
const rootRoute = createRootRoute({
  component: LandingLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: PortfolioPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const authCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/callback",
  component: AuthCallbackPage,
});

const authTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/test",
  component: AuthTestPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const confirmEmailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/confirm-email",
  component: ConfirmEmailPage,
  validateSearch: (search) => ({
    token: search.token || "",
  }),
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/reset-password",
  component: ResetPasswordPage,
  validateSearch: (search) => ({
    token: search.token || "",
  }),
});

const changePasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/change-password",
  component: () => (
    <ProtectedRoute>
      <ChangePasswordPage />
    </ProtectedRoute>
  ),
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  portfolioRoute,
  dashboardRoute,
  authCallbackRoute,
  authTestRoute,
  loginRoute,
  registerRoute,
  confirmEmailRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  changePasswordRoute,
]);

// Create the router
export const router = createRouter({ routeTree });
