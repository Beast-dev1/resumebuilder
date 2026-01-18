import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignUp,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})

const builderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/builder',
  component: ResumeBuilder,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      resumeId: (search.resumeId as string) || undefined,
    }
  },
})

const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview',
  component: Preview,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signUpRoute,
  dashboardRoute,
  builderRoute,
  previewRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

