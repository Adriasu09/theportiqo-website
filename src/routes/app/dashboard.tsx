import { DashboardPage } from '@/src/components/app/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard')({
  component: DashboardPage,
})
