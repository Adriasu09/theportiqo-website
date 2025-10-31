import { useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'

export const GoogleOneTap = ({ onSuccess, onError, disabled = false }) => {
  const { signIn, isAuthenticated } = useAuth()
  const initialized = useRef(false)

  const handleCredentialResponse = useCallback(async (response) => {
    try {
      const user = await signIn(response.credential)
      if (onSuccess) {
        onSuccess(user)
      }
    } catch (error) {
      console.error('One Tap sign-in error:', error)
      if (onError) {
        onError(error)
      }
    }
  }, [signIn, onSuccess, onError])

  const initializeOneTap = useCallback(() => {
    if (initialized.current) return
    initialized.current = true

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      context: 'signin'
    })

    // Display the One Tap prompt
    window.google.accounts.id.prompt((notification) => {
      console.log('Google One Tap notification:', notification)
      
      if (notification.isNotDisplayed()) {
        console.log('One Tap not displayed:', notification.getNotDisplayedReason())
      } else if (notification.isSkippedMoment()) {
        console.log('One Tap skipped:', notification.getSkippedReason())
      } else if (notification.isDismissedMoment()) {
        console.log('One Tap dismissed:', notification.getDismissedReason())
      }
    })
  }, [handleCredentialResponse])

  useEffect(() => {
    // Don't show One Tap if user is already authenticated or disabled
    if (isAuthenticated() || disabled) {
      return
    }

    // Don't initialize twice
    if (initialized.current) {
      return
    }

    if (window.google?.accounts?.id) {
      initializeOneTap()
    } else {
      // Wait for Google GSI to load
      const checkGoogle = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(checkGoogle)
          initializeOneTap()
        }
      }, 100)

      return () => clearInterval(checkGoogle)
    }
  }, [isAuthenticated, disabled, initializeOneTap])

  // One Tap doesn't render anything visible - it's a popup/overlay
  return null
}