import { CommercialsPage } from "@/src/components/landing/components/legal/commercials";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/landing/_legal/commercials")({
  component: CommercialsPage,
});
