import { UnverifiedEmailPage } from "@/src/components/auth/components/unverified-email";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/unverified-email")({
  component: UnverifiedEmailPage,
});
