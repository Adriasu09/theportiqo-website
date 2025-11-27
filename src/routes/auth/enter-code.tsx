import { EnterCodePage } from "@/src/components/auth/components/enter-code";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const resetPasswordSearchSchema = z.object({
  email: z.string(),
});

export const Route = createFileRoute("/auth/enter-code")({
  validateSearch: (search) => resetPasswordSearchSchema.parse(search),
  component: () => {
    const { email } = Route.useSearch();
    return <EnterCodePage email={email} />;
  },
});
