import { createLazyFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@layouts/auth-layout";

export const Route = createLazyFileRoute("/auth")({
  component: AuthLayout,
});
