import { EnterAddressPage } from "@/src/components/auth/components/enter-address";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/enter-address")({
  component: EnterAddressPage,
});
