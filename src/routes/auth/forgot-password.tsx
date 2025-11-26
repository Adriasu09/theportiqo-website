import { ForgotPasswordPage } from "@/src/components/auth/components/forgot-password";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPasswordPage,
});
