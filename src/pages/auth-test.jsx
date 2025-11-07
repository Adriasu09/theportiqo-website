import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { GoogleOneTap } from '../components/GoogleOneTap'

export const AuthTestPage = () => {
  const { user, signOut, isAuthenticated, signInWithOneTap } = useAuth()
  const [logs, setLogs] = useState([])

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `[${timestamp}] ${message}`])
  }

  const handleSignInSuccess = (user) => {
    addLog(`✅ Sign-in successful: ${user.email}`)
  }

  const handleSignInError = (error) => {
    addLog(`❌ Sign-in error: ${error.message}`)
  }

  const handleManualSignIn = async () => {
    addLog('🔄 Starting manual Google Sign-In...')
    try {
      const user = await signInWithOneTap()
      addLog(`✅ Manual sign-in successful: ${user.email}`)
    } catch (error) {
      addLog(`❌ Manual sign-in error: ${error.message}`)
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 Authentication Test Page</h1>
      
      {isAuthenticated() ? (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(0, 255, 0, 0.1)', 
          border: '1px solid green',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3>✅ Authenticated</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Auth Method:</strong> {user?.offline ? 'Direct Google' : 'Backend'}</p>
          {user?.token && <p><strong>Has Token:</strong> ✅</p>}
          <button 
            onClick={signOut}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(255, 0, 0, 0.1)', 
          border: '1px solid red',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3>❌ Not Authenticated</h3>
          <p>Please sign in to test the authentication flow.</p>
        </div>
      )}

      <div style={{ 
        padding: '1rem', 
        backgroundColor: 'rgba(34, 197, 94, 0.1)', 
        borderRadius: '8px',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        marginBottom: '2rem'
      }}>
        <h3>⚡ Google One Tap Authentication</h3>
        <p>Seamless sign-in experience with backend integration</p>
        <GoogleOneTap 
          onSuccess={handleSignInSuccess}
          onError={handleSignInError}
          disabled={isAuthenticated()}
        />
        {!isAuthenticated() && (
          <div>
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic', marginBottom: '1rem' }}>
              One Tap should appear as a popup overlay. If not, try manual sign-in:
            </p>
            <button 
              onClick={handleManualSignIn}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4285f4',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              🔐 Manual Google Sign-In
            </button>
          </div>
        )}
      </div>

      <div style={{ 
        padding: '1rem', 
        backgroundColor: 'rgba(100, 108, 255, 0.1)', 
        borderRadius: '8px',
        border: '1px solid rgba(100, 108, 255, 0.3)',
        marginBottom: '2rem'
      }}>
        <h3>� Authentication Flow</h3>
        <div style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.6' }}>
          <p><strong>Expected Backend Behavior:</strong></p>
          <ol style={{ paddingLeft: '1.5rem' }}>
            <li>GET <code>/api/users/google/login?redirect_uri=http://localhost:5173/auth/callback</code></li>
            <li>Backend redirects to Google OAuth</li>
            <li>After Google auth, backend redirects to: <code>/auth/callback?access_token=&#123;jwt&#125;</code></li>
            <li>Frontend extracts token and authenticates user</li>
          </ol>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>📋 Authentication Logs</h3>
          <button 
            onClick={clearLogs}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Clear Logs
          </button>
        </div>
        <div style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          color: '#00ff00',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          height: '200px',
          overflowY: 'auto',
          border: '1px solid #333'
        }}>
          {logs.length === 0 ? (
            <div style={{ color: '#666' }}>No logs yet. Try signing in...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#ccc' }}>
        <h4>💡 Tips for Testing:</h4>
        <ul>
          <li>Open browser dev tools to see console logs</li>
          <li>Check Network tab to see API calls</li>
          <li>If popup gets stuck with JSON, the frontend should auto-parse it</li>
          <li>Backend should redirect to: <code>{window.location.origin}/auth/callback</code></li>
        </ul>
      </div>
    </div>
  )
}