import { useAuth } from '../contexts/AuthContext'
import { GoogleSignIn } from '../components/GoogleSignIn'
import { BackendSignIn } from '../components/BackendSignIn'

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
          <p>Please sign in with your Google account to access this content.</p>
          
          <div className="signin-options">
            <div className="signin-option">
              <h3>Backend Authentication</h3>
              <p>Sign in using the backend API (recommended)</p>
              <BackendSignIn />
            </div>
            
            <div className="signin-divider">OR</div>
            
            <div className="signin-option">
              <h3>Direct Google Sign-In</h3>
              <p>Sign in directly with Google (fallback)</p>
              <GoogleSignIn />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
}