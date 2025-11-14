import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/landing/product')({
  component: ProductComponent,
})

function ProductComponent() {
  return <div>Hello "/landing/product"!</div>
}
