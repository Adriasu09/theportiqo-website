import { CreateAccountPage } from "@/src/components/auth/components/create-account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/create-account")({
  component: CreateAccountPage,
});
