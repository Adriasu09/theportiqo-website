import { CreateAccountPage } from "@/src/pages/auth/create-account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/create-account")({
  component: CreateAccountPage,
});
