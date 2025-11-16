import { LandingPage } from "@/src/components/landing/landing";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/landing/home")({
  component: LandingPage,
});
