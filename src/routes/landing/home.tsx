import { LandingHomePage } from "@/src/components/landing/components/home/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/landing/home")({
  component: LandingHomePage,
});
