import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/landing/simulator')({
  component: LandingSimulator,
})

function LandingSimulator() {
  return <div>Hello "/landing/simulator"!</div>
}
