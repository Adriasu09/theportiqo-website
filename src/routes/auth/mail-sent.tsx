import { MailSentPage } from "@/src/components/auth/components/mail-sent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/mail-sent")({
  component: MailSentPage,
});
