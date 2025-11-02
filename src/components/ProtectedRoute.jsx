import { Link } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return (
      <div className="auth-required-container">
        <div className="auth-card">
          <h2>Authentication Required</h2>
          <p>Please log in to access this content.</p>

          <div className="signin-option">
            <p>Click the button below to log in to your account.</p>
            <Link
              to="/login"
              className="manual-signin-button"
            >
              🔐 Log In
            </Link>
          </div>

          <div className="auth-links">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </Link>
            <Link to="/register" className="register-link">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return children
}