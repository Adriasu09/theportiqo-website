import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "@layouts/app-layout";

export const Route = createFileRoute("/app")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated()) {
      throw redirect( {to: "/auth/login" } );
    }
  },
  component: AppLayout,
});
