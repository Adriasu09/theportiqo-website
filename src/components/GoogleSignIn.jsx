import { useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

export const GoogleSignIn = ({ onSuccess, onError }) => {
  const { signIn } = useAuth()
  const buttonRef = useRef(null)

  useEffect(() => {
    if (window.google?.accounts?.id) {
      initializeGoogleSignIn()
    } else {
      // Wait for Google GSI to load
      const checkGoogle = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(checkGoogle)
          initializeGoogleSignIn()
        }
      }, 100)

      return () => clearInterval(checkGoogle)
    }
  }, [])

  const initializeGoogleSignIn = () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: false,
      ux_mode: 'popup'
    })

    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        shape: 'rectangular',
        width: 250
      })
    }
  }

  const handleCredentialResponse = async (response) => {
    try {
      const user = await signIn(response.credential)
      if (onSuccess) {
        onSuccess(user)
      }
    } catch (error) {
      console.error('Sign-in error:', error)
      if (onError) {
        onError(error)
      }
    }
  }

  return (
    <div className="google-signin-container">
      <div ref={buttonRef} className="google-signin-button"></div>
    </div>
  )
}