import { CreatePasswordPage } from "@/src/components/auth/components/create-password";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/create-password")({
  component: CreatePasswordPage,
});
