import { ConfirmEmailPage } from "@/src/components/auth/components/confirm-email";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const confirmEmailSchema = z.object({
  token: z.string(),
});

export const Route = createFileRoute("/auth/confirm-email")({
  validateSearch: (search) => confirmEmailSchema.parse(search),
  component: () => {
    const { token } = Route.useSearch();
    return <ConfirmEmailPage token={token} />;
  },
});
