import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { RootLayout } from './components/RootLayout'
import { HomePage } from './routes/index'
import { AboutPage } from './routes/about'
import { PortfolioPage } from './routes/portfolio'
import { DashboardPage } from './routes/dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'

// Define routes
const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: PortfolioPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
})

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, portfolioRoute, dashboardRoute])

// Create the router
export const router = createRouter({ routeTree })
