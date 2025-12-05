import { TermsPage } from "@/src/components/landing/components/legal/terms";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/landing/_legal/terms")({
  component: TermsPage,
});
