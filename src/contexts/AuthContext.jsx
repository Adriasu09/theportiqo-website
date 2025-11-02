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
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  // Login with email and password
  const login = async (email, password) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

      const response = await fetch(`${backendUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Login failed: ${response.status}`)
      }

      const data = await response.json()
      return await processTokenFromBackend(data)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Register new user (returns success message, not user data)
  const register = async (email, password, name) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

      const response = await fetch(`${backendUrl}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Registration failed: ${response.status}`)
      }

      const data = await response.json()
      // Return the response data (should contain confirmation message)
      // Do not log the user in automatically
      return data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  // Confirm email verification
  const confirmEmail = async (token) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

      const response = await fetch(`${backendUrl}/api/users/confirm-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Email confirmation failed: ${response.status}`)
      }

      const data = await response.json()
      // If verification includes login token, process it
      if (data.access_token || data.token || data.jwt) {
        return await processTokenFromBackend(data)
      }
      
      return data
    } catch (error) {
      console.error('Email verification error:', error)
      throw error
    }
  }

  // Forgot password - request reset
  const forgotPassword = async (email) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

      const response = await fetch(`${backendUrl}/api/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Request failed: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Forgot password error:', error)
      throw error
    }
  }

  // Change password (when user is authenticated)
  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (!user?.token) {
        throw new Error('User not authenticated')
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

      const response = await fetch(`${backendUrl}/api/users/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Password change failed: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Change password error:', error)
      throw error
    }
  }

  // Reset password (with token from email)
  const resetPassword = async (token, newPassword) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

      const response = await fetch(`${backendUrl}/api/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Password reset failed: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Reset password error:', error)
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
      localStorage.setItem('user', JSON.stringify(userInfo))
      return userInfo
    } catch (error) {
      console.error('Error processing token from backend:', error)
      throw error
    }
  }



  const signOut = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const isAuthenticated = () => {
    return !!user
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    confirmEmail,
    forgotPassword,
    changePassword,
    resetPassword,
    signOut,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}