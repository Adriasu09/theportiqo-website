import { ExistingAccountPage } from "@/src/components/auth/components/existing-account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/existing-account")({
  component: ExistingAccountPage,
});
