import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import '../styles/auth.css'

export const ConfirmEmailPage = () => {
  const { confirmEmail, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { token } = useSearch({ from: '/auth/confirm-email' })
  const [status, setStatus] = useState('verifying') // 'verifying', 'success', 'error'
  const [error, setError] = useState('')

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated()) {
      navigate({ to: '/dashboard' })
      return
    }
    const verifyToken = async () => {
      try {
        // Check if token exists
        if (!token) {
          setStatus('error')
          setError('Invalid confirmation link. Please check your email for the correct link.')
          return
        }

        // Confirm the email token
        const result = await confirmEmail(token)
        console.log('Email confirmation successful:', result)
        
        setStatus('success')
        
        // Auto redirect to dashboard after 3 seconds if user was logged in
        if (result.access_token || result.token || result.jwt) {
          setTimeout(() => {
            navigate({ to: '/dashboard' })
          }, 3000)
        }
      } catch (err) {
        setStatus('error')
        setError(err.message || 'Email verification failed. The link may be expired or invalid.')
      }
    }

    verifyToken()
  }, [token, confirmEmail, navigate, isAuthenticated])

  if (status === 'verifying') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-loading">
            <div className="loading-spinner">🔄</div>
            <h1 className="auth-title">Verifying Email</h1>
            <p className="auth-subtitle">Please wait while we verify your email address...</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-success">
            <div className="success-icon">✅</div>
            <h1 className="auth-title">Email Verified!</h1>
            <p className="auth-subtitle">
              Your email address has been successfully verified.
            </p>
            
            <div className="confirmation-message">
              <p>Your account is now active and ready to use.</p>
              <p>You can now sign in with your email and password.</p>
            </div>

            <Link to="/login" className="btn-primary">
              Sign In Now
            </Link>
            
            <div className="auth-divider">
              <span>Or explore the site</span>
            </div>

            <Link to="/" className="btn-secondary">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-error-state">
          <div className="error-icon">❌</div>
          <h1 className="auth-title">Verification Failed</h1>
          
          <div className="auth-error">
            {error}
          </div>
          
          <div className="confirmation-message">
            <p>This could happen if:</p>
            <ul>
              <li>The verification link has expired</li>
              <li>The link has already been used</li>
              <li>There was an error with the link</li>
            </ul>
          </div>

          <Link to="/register" className="btn-primary">
            Try Registering Again
          </Link>
          
          <div className="auth-divider">
            <span>Need help?</span>
          </div>

          <Link to="/login" className="btn-secondary">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}