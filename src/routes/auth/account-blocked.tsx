import { AccountBlockedPage } from "@/src/components/auth/components/account-blocked";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/account-blocked")({
  component: AccountBlockedPage,
});
