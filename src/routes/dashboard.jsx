import { useAuth } from '../contexts/AuthContext'
import { UserProfile } from '../components/UserProfile'

export const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <UserProfile />
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Personal Information</h2>
          <div className="info-card">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Auth Method:</strong> {user?.offline ? '🔴 Direct Google (Fallback)' : user?.token ? '🟢 Backend JWT' : '� Backend Connected'}</p>
            {user?.token && (
              <p><strong>JWT Token:</strong> ✅ Available</p>
            )}
            {user?.backendData && (
              <p><strong>Backend Data:</strong> ✅ Received</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Protected Content</h2>
          <div className="protected-content">
            <p>This is a protected section that only authenticated users can see.</p>
            <p>You can add any sensitive or user-specific content here.</p>
            
            <div className="feature-list">
              <h3>Available Features:</h3>
              <ul>
                <li>✅ Secure Authentication with Google</li>
                <li>✅ Protected Routes</li>
                <li>✅ User Profile Management</li>
                <li>✅ Session Persistence</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-button">
              Update Profile
            </button>
            <button className="action-button">
              View Settings
            </button>
            <button className="action-button">
              Download Data
            </button>
            <button className="action-button">
              Contact Support
            </button>
          </div>
        </div>

        {user?.backendData && (
          <div className="dashboard-section">
            <h2>Backend Response (Debug)</h2>
            <div className="debug-info">
              <pre>{JSON.stringify(user.backendData, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}