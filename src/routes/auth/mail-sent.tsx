import { MailSentPage } from "@/src/components/auth/components/mail-sent";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const mailSentSearchSchema = z.object({
  email: z.email().optional(),
});

export const Route = createFileRoute("/auth/mail-sent")({
  validateSearch: (search) => mailSentSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const { email } = Route.useSearch();

  return <MailSentPage email={email} />;
}
