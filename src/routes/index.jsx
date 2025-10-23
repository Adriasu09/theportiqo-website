import { Link } from '@tanstack/react-router'

export function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to ThePortiqo</h1>
      <p>Official website for ThePortiqo - Built with React and TanStack</p>
      <div className="navigation">
        <Link to="/about" className="nav-link">
          Learn More About Us
        </Link>
        <Link to="/portfolio" className="nav-link">
          View Our Portfolio
        </Link>
      </div>
    </div>
  )
}
