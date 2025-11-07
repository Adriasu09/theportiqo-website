import { Link } from "@tanstack/react-router";

export function AboutPage() {
  return (
    <div className="about-page">
      <h1>About ThePortiqo</h1>
      <p>
        ThePortiqo is a modern web platform showcasing the power of React and
        TanStack.
      </p>
      <p>We leverage cutting-edge technologies including:</p>
      <ul>
        <li>React 19 for the UI framework</li>
        <li>TanStack Query for efficient data fetching</li>
        <li>TanStack Router for type-safe routing</li>
        <li>Vite for blazing-fast development</li>
      </ul>
      <Link to="/" className="nav-link">
        Back to Home
      </Link>
    </div>
  );
}
