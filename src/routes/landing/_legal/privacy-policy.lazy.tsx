import { PrivacyPolicityPage } from "@/src/components/landing/components/legal/privacy-policy";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/landing/_legal/privacy-policy")({
  component: PrivacyPolicityPage,
});
