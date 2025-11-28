import { PersonalDataPage } from "@/src/components/auth/components/personal-data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/personal-data")({
  component: PersonalDataPage,
});
