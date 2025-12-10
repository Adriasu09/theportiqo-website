import { PrivacyPolicityPage } from "@/src/components/landing/components/legal/privacy-policity";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/landing/_legal/privacy-policity")({
  component: PrivacyPolicityPage,
});
