import { continueLaterPage } from "@/src/components/auth/components/continue-later";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/continue-later")({
  component: continueLaterPage,
});
