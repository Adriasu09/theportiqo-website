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
          const checkClosed = setInterval(() => {
            if (authWindow.closed) {
              clearInterval(checkClosed)
              // After popup closes, get the user data from callback
              this.handleAuthCallback()
                .then(resolve)
                .catch(reject)
            }
          }, 1000)

          // Timeout after 5 minutes
          setTimeout(() => {
            clearInterval(checkClosed)
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
    signOut,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}