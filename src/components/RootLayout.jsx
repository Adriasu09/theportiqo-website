import { Outlet } from '@tanstack/react-router'

export function RootLayout() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h2>ThePortiqo</h2>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>© 2025 ThePortiqo - Built with React and TanStack</p>
      </footer>
    </div>
  )
}
