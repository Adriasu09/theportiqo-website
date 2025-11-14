import { ThreeStepsPage } from '@/src/pages/auth/three-steps'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/three-steps')({
  component: ThreeStepsPage,
})
