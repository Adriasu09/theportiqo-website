import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import '../styles/auth.css'

export const ChangePasswordPage = () => {
  const { changePassword, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if not authenticated
  if (!isAuthenticated()) {
    navigate({ to: '/login' })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    // Validate password strength
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long')
      return
    }

    // Check that new password is different from current
    if (currentPassword === newPassword) {
      setError('New password must be different from current password')
      return
    }

    setIsLoading(true)

    try {
      await changePassword(currentPassword, newPassword)
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to change password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Change Password</h1>
        <p className="auth-subtitle">Update your account password</p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success">
            Password changed successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
              disabled={isLoading || success}
              autoComplete="current-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              disabled={isLoading || success}
              autoComplete="new-password"
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              disabled={isLoading || success}
              autoComplete="new-password"
              minLength={8}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || success}
          >
            {isLoading ? 'Changing password...' : 'Change Password'}
          </button>
        </form>

        <button
          onClick={() => navigate({ to: '/dashboard' })}
          className="btn-secondary"
          style={{ marginTop: '1rem' }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
