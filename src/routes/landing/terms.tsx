import { TermsPage } from "@/src/components/landing/components/terms";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/landing/terms")({
  component: TermsPage,
});
