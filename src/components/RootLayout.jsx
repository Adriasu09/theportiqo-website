import { Outlet, Link } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'

export function RootLayout() {
  const { isAuthenticated, user, signOut } = useAuth()

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h2>ThePortiqo</h2>
          
          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/portfolio" className="nav-link">Portfolio</Link>
            {isAuthenticated() && (
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            )}
          </nav>

          <div className="auth-section">
            {isAuthenticated() ? (
              <div className="user-menu">
                <span className="user-greeting">Hello, {user?.name?.split(' ')[0]}!</span>
                <button onClick={signOut} className="sign-out-btn">Sign Out</button>
              </div>
            ) : (
              <Link to="/dashboard" className="sign-in-link">Sign In</Link>
            )}
          </div>
        </div>
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
