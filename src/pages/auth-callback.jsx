export const AuthCallbackPage = () => {
  // This page is no longer needed for Google One Tap authentication
  // One Tap handles authentication directly in the callback function
  // Keeping this file as a placeholder in case you need OAuth flow in the future

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
        <h2>Authentication</h2>
        <p>This page is not currently in use.</p>
        <p>Google One Tap handles authentication directly.</p>
        <button onClick={() => window.location.href = '/'}>Go to Home</button>
      </div>
    </div>
  )
}