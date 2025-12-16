import { createFileRoute, redirect } from "@tanstack/react-router";
import { LandingLayout } from "@layouts/landing-layout";

export const Route = createFileRoute("/landing")({
  component: LandingLayout,
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/landing" || location.pathname === "/landing/") {
      throw redirect({ to: "/landing/home" });
    }
  },
});
