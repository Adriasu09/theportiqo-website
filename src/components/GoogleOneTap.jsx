import { useEffect, useRef, useCallback } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'

export const GoogleOneTap = ({ onSuccess, onError, disabled = false }) => {
  const { signInWithOneTap, isAuthenticated } = useAuth()
  const location = useLocation()
  const googleInitialized = useRef(false)

  const handleCredentialResponse = useCallback(async (response) => {
    try {
      // response.credential contains the JWT token from Google One Tap
      const user = await signInWithOneTap(response.credential)
      if (onSuccess) {
        onSuccess(user)
      }
    } catch (error) {
      console.error('One Tap sign-in error:', error)
      if (onError) {
        onError(error)
      }
    }
  }, [signInWithOneTap, onSuccess, onError])

  const showOneTapPrompt = useCallback(() => {
    if (!window.google?.accounts?.id) return

    // Initialize Google accounts if not already done
    if (!googleInitialized.current) {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
          context: 'signin',
          use_fedcm_for_prompt: false
        })
        googleInitialized.current = true
        console.log('✅ Google One Tap initialized successfully')
      } catch (error) {
        console.error('❌ Google One Tap initialization failed:', error)
      }
    }

    // Display the One Tap prompt on this page
    window.google.accounts.id.prompt((notification) => {
      if (notification) {
        console.log('Google One Tap notification:', notification)

        // Check notification status (traditional flow)
        if (notification.isNotDisplayed && notification.isNotDisplayed()) {
          console.log('One Tap not displayed:', notification.getNotDisplayedReason?.())
        } else if (notification.isSkippedMoment && notification.isSkippedMoment()) {
          console.log('One Tap skipped:', notification.getSkippedReason?.())
        } else if (notification.isDismissedMoment && notification.isDismissedMoment()) {
          console.log('One Tap dismissed - will show again on next page:', notification.getDismissedReason?.())
        } else {
          console.log('One Tap prompt displayed successfully')
        }
      }
    })
  }, [handleCredentialResponse])

  useEffect(() => {
    // Don't show One Tap if user is already authenticated or disabled
    if (isAuthenticated() || disabled) {
      return
    }

    // Show One Tap on every page navigation regardless of previous dismissal
    // It will show until user logs in
    console.log('Showing Google One Tap on page:', location.pathname)

    // Show One Tap on every page navigation
    if (window.google?.accounts?.id) {
      showOneTapPrompt()
    } else {
      // Wait for Google GSI to load
      const checkGoogle = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(checkGoogle)
          showOneTapPrompt()
        }
      }, 100)

      return () => clearInterval(checkGoogle)
    }
  }, [location.pathname, isAuthenticated, disabled, showOneTapPrompt])

  // One Tap doesn't render anything visible - it's a popup/overlay
  return null
}