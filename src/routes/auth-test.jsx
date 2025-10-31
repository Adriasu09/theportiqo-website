import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BackendSignIn } from '../components/BackendSignIn'
import { GoogleSignIn } from '../components/GoogleSignIn'
import { GoogleOneTap } from '../components/GoogleOneTap'

export const AuthTestPage = () => {
  const { user, signOut, isAuthenticated } = useAuth()
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
        <h3>⚡ Google One Tap</h3>
        <p>Seamless sign-in experience (should appear automatically if not signed in)</p>
        <GoogleOneTap 
          onSuccess={handleSignInSuccess}
          onError={handleSignInError}
          disabled={isAuthenticated()}
        />
        {!isAuthenticated() && (
          <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
            One Tap should appear as a popup overlay. If not, check console logs.
          </p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(100, 108, 255, 0.1)', 
          borderRadius: '8px',
          border: '1px solid rgba(100, 108, 255, 0.3)'
        }}>
          <h3>🔐 Backend Authentication</h3>
          <p>Test the backend OAuth flow</p>
          <BackendSignIn 
            onSuccess={handleSignInSuccess}
            onError={handleSignInError}
          />
        </div>

        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(100, 108, 255, 0.1)', 
          borderRadius: '8px',
          border: '1px solid rgba(100, 108, 255, 0.3)'
        }}>
          <h3>🔗 Direct Google Sign-In</h3>
          <p>Test direct Google authentication</p>
          <GoogleSignIn 
            onSuccess={handleSignInSuccess}
            onError={handleSignInError}
          />
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