import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export const BackendSignIn = ({ onSuccess, onError }) => {
  const { signInWithBackend } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleBackendSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const user = await signInWithBackend()
      if (onSuccess) {
        onSuccess(user)
      }
    } catch (err) {
      const errorMessage = err.message || 'Authentication failed'
      setError(errorMessage)
      if (onError) {
        onError(err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="backend-signin-container">
      <button
        onClick={handleBackendSignIn}
        disabled={isLoading}
        className="backend-signin-button"
      >
        {isLoading ? (
          <span className="loading-text">
            🔄 Signing in with Google...
          </span>
        ) : (
          <span className="signin-text">
            🔐 Sign in with Google (Backend)
          </span>
        )}
      </button>
      
      {error && (
        <div className="signin-error">
          ❌ {error}
        </div>
      )}
    </div>
  )
}