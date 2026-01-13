import { Outlet } from '@tanstack/react-router'

function Layout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default Layout

