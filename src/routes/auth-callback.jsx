import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export const AuthCallbackPage = () => {
  const { processTokenFromBackend } = useAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have token data in the URL params
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('access_token') || urlParams.get('token')
        
        if (token) {
          // Process token from URL parameters
          await processTokenFromBackend({ access_token: token })
        } else {
          // Check if the page body contains JSON with token
          const bodyText = document.body.innerText || document.body.textContent
          
          if (bodyText.includes('access_token')) {
            try {
              const tokenData = JSON.parse(bodyText)
              await processTokenFromBackend(tokenData)
            } catch (error) {
              console.error('Failed to parse token from page content:', error)
            }
          }
        }

        // Close the popup window if we're in one
        if (window.opener) {
          // Send message to parent window with success
          window.opener.postMessage({ 
            type: 'AUTH_SUCCESS',
            success: true 
          }, window.location.origin)
          window.close()
        } else {
          // Redirect to dashboard if not in popup
          window.location.href = '/dashboard'
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        
        if (window.opener) {
          // Send error message to parent window
          window.opener.postMessage({ 
            type: 'AUTH_ERROR',
            error: error.message 
          }, window.location.origin)
          window.close()
        } else {
          // Show error on page
          document.body.innerHTML = `
            <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
              <h2>Authentication Error</h2>
              <p>There was an error processing your authentication. Please try again.</p>
              <button onclick="window.close()">Close</button>
            </div>
          `
        }
      }
    }

    handleAuthCallback()
  }, [processTokenFromBackend])

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <div>
        <h2>🔐 Processing Authentication...</h2>
        <p>Please wait while we complete your sign-in.</p>
        <div style={{ 
          margin: '20px auto',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #646cff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}