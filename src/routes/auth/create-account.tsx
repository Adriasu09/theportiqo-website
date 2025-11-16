import { CreateAccountPage } from "@/src/components/auth/create-account/create-account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/create-account")({
  component: CreateAccountPage,
});
