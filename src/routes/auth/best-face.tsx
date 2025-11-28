import { BestFacePage } from "@/src/components/auth/components/best-face";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/best-face")({
  component: BestFacePage,
});
