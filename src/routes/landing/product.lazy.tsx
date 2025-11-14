import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/landing/product')({
  component: ProductComponent,
})

function ProductComponent() {
  return <div>Hello "/landing/product"!</div>
}
