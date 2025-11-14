import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/landing/simulator')({
  component: LandingSimulator,
})

function LandingSimulator() {
  return <div>Hello "/landing/simulator"!</div>
}
