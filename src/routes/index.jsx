import { Link } from '@tanstack/react-router'

export function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to ThePortiqo</h1>
      <p>Official website for ThePortiqo - Built with React and TanStack</p>
      <p className="feature-highlight">
        🔐 Now featuring secure Google authentication with protected user areas!
      </p>
      <div className="navigation">
        <Link to="/about" className="nav-link">
          Learn More About Us
        </Link>
        <Link to="/portfolio" className="nav-link">
          View Our Portfolio
        </Link>
        <Link to="/dashboard" className="nav-link">
          Access Dashboard
        </Link>
      </div>
    </div>
  )
}
