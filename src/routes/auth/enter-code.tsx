import { EnterCodePage } from "@/src/components/auth/components/enter-code";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/enter-code")({
  component: EnterCodePage,
});
