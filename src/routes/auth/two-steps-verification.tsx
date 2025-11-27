import { TwoStepsVerificationPage } from "@/src/components/auth/components/two-steps-verification";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/two-steps-verification")({
  component: TwoStepsVerificationPage,
});
