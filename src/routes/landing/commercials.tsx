import { CommercialsPage } from "@/src/components/landing/components/commercials";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/landing/commercials")({
  component: CommercialsPage,
});
