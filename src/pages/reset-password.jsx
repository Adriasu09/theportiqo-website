import { useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import "../styles/auth.css";

export const ResetPasswordPage = () => {
  const { resetPassword, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { token } = useSearch({ from: "/auth/reset-password" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null); // null = checking, true = valid, false = invalid
  const [resetSuccess, setResetSuccess] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: "/dashboard" });
      return;
    }

    // Validate token exists
    if (!token) {
      setTokenValid(false);
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    // Token exists, assume it's valid for now (backend will validate)
    setTokenValid(true);
  }, [token, isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, password);
      setResetSuccess(true);
    } catch (err) {
      setError(
        err.message ||
          "Password reset failed. The link may be expired or invalid.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while checking token
  if (tokenValid === null) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-loading">
            <div className="loading-spinner">🔄</div>
            <h1 className="auth-title">Validating Reset Link</h1>
            <p className="auth-subtitle">
              Please wait while we validate your password reset link...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (tokenValid === false) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-error-state">
            <div className="error-icon">❌</div>
            <h1 className="auth-title">Invalid Reset Link</h1>

            <div className="auth-error">{error}</div>

            <div className="confirmation-message">
              <p>This could happen if:</p>
              <ul>
                <li>The reset link has expired</li>
                <li>The link has already been used</li>
                <li>There was an error with the link</li>
              </ul>
            </div>

            <Link to="/forgot-password" className="btn-primary">
              Request New Reset Link
            </Link>

            <div className="auth-divider">
              <span>Remember your password?</span>
            </div>

            <Link to="/login" className="btn-secondary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (resetSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-success">
            <div className="success-icon">✅</div>
            <h1 className="auth-title">Password Reset Successful!</h1>
            <p className="auth-subtitle">
              Your password has been successfully updated.
            </p>

            <div className="confirmation-message">
              <p>You can now sign in with your new password.</p>
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
    );
  }

  // Reset password form
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Reset Your Password</h1>
        <p className="auth-subtitle">Enter your new password below</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              disabled={isLoading}
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
              placeholder="Confirm your new password"
              required
              disabled={isLoading}
              autoComplete="new-password"
              minLength={8}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <div className="auth-divider">
          <span>Remember your password?</span>
        </div>

        <Link to="/login" className="btn-secondary">
          Back to Login
        </Link>
      </div>
    </div>
  );
};
