import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already signed in (from localStorage or session)
    const savedUser = localStorage.getItem('gsi_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('gsi_user')
      }
    }
    setIsLoading(false)
  }, [])

  const signInWithBackend = async () => {
    try {
      // First, get the login URL from your backend
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      const loginResponse = await fetch(`${backendUrl}/api/users/google/login`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
        credentials: 'include' // Include cookies if your backend uses them
      })

      if (!loginResponse.ok) {
        throw new Error('Failed to get login URL from backend')
      }

      const loginData = await loginResponse.json()
      
      // If your backend returns a redirect URL, open it in a popup
      if (loginData.url || loginData.authUrl) {
        const authUrl = loginData.url || loginData.authUrl
        const authWindow = window.open(
          authUrl,
          'google-auth',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        )

        // Listen for the popup to close or receive a message
        return new Promise((resolve, reject) => {
          // Listen for messages from the popup
          const messageListener = (event) => {
            // Accept messages from our own origin or backend origin
            const allowedOrigins = [
              window.location.origin,
              new URL(import.meta.env.VITE_BACKEND_URL).origin
            ]
            
            if (!allowedOrigins.includes(event.origin)) {
              return // Ignore messages from other origins
            }

            if (event.data && (event.data.type === 'AUTH_SUCCESS' || event.data.access_token)) {
              window.removeEventListener('message', messageListener)
              clearInterval(checkClosed)
              
              if (event.data.access_token) {
                // Direct token from backend
                processTokenFromBackend(event.data)
                  .then(resolve)
                  .catch(reject)
              } else if (event.data.type === 'AUTH_SUCCESS') {
                // Success message from callback page, get token from callback endpoint
                handleAuthCallback()
                  .then(resolve)
                  .catch(reject)
              }
            } else if (event.data && event.data.type === 'AUTH_ERROR') {
              window.removeEventListener('message', messageListener)
              clearInterval(checkClosed)
              reject(new Error(event.data.error || 'Authentication failed'))
            }
          }

          window.addEventListener('message', messageListener)

          // Also check if popup URL changes to detect token in URL or page content
          const checkClosed = setInterval(() => {
            try {
              // Check if popup is closed
              if (authWindow.closed) {
                clearInterval(checkClosed)
                window.removeEventListener('message', messageListener)
                // Try to get token from callback endpoint
                this.handleAuthCallback()
                  .then(resolve)
                  .catch(reject)
                return
              }

              // Try to read the popup URL/content if same-origin
              try {
                // Check if we can access the popup URL
                authWindow.location.href
                const popupDoc = authWindow.document

                // Check if the page contains JSON with access_token
                if (popupDoc && popupDoc.body) {
                  const bodyText = popupDoc.body.innerText || popupDoc.body.textContent
                  
                  // Try to parse JSON from the page content
                  if (bodyText.includes('access_token')) {
                    try {
                      const tokenData = JSON.parse(bodyText)
                      if (tokenData.access_token) {
                        clearInterval(checkClosed)
                        window.removeEventListener('message', messageListener)
                        authWindow.close()
                        
                        this.processTokenFromBackend(tokenData)
                          .then(resolve)
                          .catch(reject)
                        return
                      }
                    } catch {
                      // If it's not valid JSON, continue checking
                    }
                  }
                }
              } catch {
                // Can't access popup content due to CORS, continue checking
              }
            } catch {
              // Popup might be closed or inaccessible, continue
            }
          }, 1000)

          // Timeout after 5 minutes
          setTimeout(() => {
            clearInterval(checkClosed)
            window.removeEventListener('message', messageListener)
            if (!authWindow.closed) {
              authWindow.close()
            }
            reject(new Error('Authentication timeout'))
          }, 300000)
        })
      } else {
        throw new Error('No auth URL received from backend')
      }
    } catch (error) {
      console.error('Backend sign-in error:', error)
      throw error
    }
  }

  const processTokenFromBackend = async (tokenData) => {
    try {
      const token = tokenData.access_token || tokenData.token || tokenData.jwt
      
      if (!token) {
        throw new Error('No access token found in response')
      }

      // Try to decode JWT token to get user information
      let userInfo
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        userInfo = {
          id: payload.sub || payload.id || payload.user_id,
          email: payload.email,
          name: payload.name || payload.full_name,
          picture: payload.picture || payload.avatar,
          role: payload.role,
          token: token,
          backendData: tokenData
        }
      } catch {
        // If JWT decoding fails, use minimal user info
        userInfo = {
          token: token,
          backendData: tokenData,
          email: tokenData.email || 'Unknown',
          name: tokenData.name || 'User'
        }
      }
      
      setUser(userInfo)
      localStorage.setItem('gsi_user', JSON.stringify(userInfo))
      return userInfo
    } catch (error) {
      console.error('Error processing token from backend:', error)
      throw error
    }
  }

  const handleAuthCallback = async () => {
    try {
      // Call the callback endpoint to get the JWT token
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      const callbackResponse = await fetch(`${backendUrl}/api/users/google/callback`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
        credentials: 'include' // Include cookies if your backend uses them
      })

      if (!callbackResponse.ok) {
        throw new Error('Failed to get user data from callback')
      }

      const userData = await callbackResponse.json()
      
      // If your backend returns a JWT token, decode it for user info
      let userInfo
      if (userData.token || userData.jwt) {
        const token = userData.token || userData.jwt
        try {
          // Decode JWT token to get user information
          const payload = JSON.parse(atob(token.split('.')[1]))
          userInfo = {
            id: payload.sub || payload.id || payload.user_id,
            email: payload.email,
            name: payload.name || payload.full_name,
            picture: payload.picture || payload.avatar,
            token: token,
            backendData: userData
          }
        } catch {
          // If JWT decoding fails, use the raw user data from backend
          userInfo = {
            ...userData,
            token: token,
            backendData: userData
          }
        }
      } else {
        // Use the user data directly from backend response
        userInfo = {
          ...userData,
          backendData: userData
        }
      }
      
      setUser(userInfo)
      localStorage.setItem('gsi_user', JSON.stringify(userInfo))
      return userInfo
    } catch (error) {
      console.error('Error handling auth callback:', error)
      throw error
    }
  }

  const signIn = async (credential) => {
    // This method is for direct Google Sign-In integration (fallback)
    try {
      const payload = JSON.parse(atob(credential.split('.')[1]))
      const userInfo = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        credential: credential,
        offline: true // Flag to indicate this is local auth
      }
      
      setUser(userInfo)
      localStorage.setItem('gsi_user', JSON.stringify(userInfo))
      return userInfo
    } catch (error) {
      console.error('Error decoding credential:', error)
      throw new Error('Authentication failed')
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('gsi_user')
    
    // Sign out from Google
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect()
    }
  }

  const isAuthenticated = () => {
    return !!user
  }

  const value = {
    user,
    isLoading,
    signIn,
    signInWithBackend,
    handleAuthCallback,
    processTokenFromBackend,
    signOut,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}