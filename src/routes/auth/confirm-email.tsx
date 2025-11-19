import { ConfirmEmailPage } from "@/src/components/auth/components/confirm-email";
// import { ConfirmEmailPage } from "@/src/components/confirm-email";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/confirm-email")({
  component: ConfirmEmailPage,
});
