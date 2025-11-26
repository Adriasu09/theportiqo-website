import { PasswordChangedPage } from '@/src/components/auth/components/password-changed';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/password-changed')({
  component: PasswordChangedPage,
});
