import { NameEmailPage } from "@/src/components/auth/components/name-email";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/name-email")({
  component: NameEmailPage,
});
