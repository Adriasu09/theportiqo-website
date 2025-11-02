# Backend API Reference - Simplified Google One Tap Integration

This file shows the simplified authentication flow using only Google One Tap.

## Required Backend Endpoint

### Google OAuth Login Endpoint
```bash
curl -X 'GET' \
  '${VITE_BACKEND_URL}/api/users/google/login?redirect_uri=http://localhost:5173/auth/callback' \
  -H 'accept: application/json'
```

**What this endpoint should do:**
1. Accept the `redirect_uri` parameter
2. Redirect user to Google OAuth with your client credentials
3. Set the redirect_uri to the provided callback URL

## Frontend Integration Flow

1. **User triggers Google One Tap** (automatically or manually)
2. **Frontend opens popup** to `${VITE_BACKEND_URL}/api/users/google/login?redirect_uri=http://localhost:5173/auth/callback`
3. **Backend redirects** user to Google OAuth
4. **User completes** Google authentication 
5. **Google redirects** back to your backend callback
6. **Backend processes** Google OAuth response
7. **Backend redirects** to: `http://localhost:5173/auth/callback?access_token={jwt_token}`
8. **Frontend extracts** JWT token from URL
9. **Frontend closes** popup and authenticates user

## Critical Backend Implementation

Your backend needs to:

### 1. Accept redirect_uri parameter:
```javascript
app.get('/api/users/google/login', (req, res) => {
  const redirectUri = req.query.redirect_uri;
  
  // Build Google OAuth URL with this redirect_uri
  const googleOAuthUrl = `https://accounts.google.com/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid email profile`;
  
  res.redirect(googleOAuthUrl);
});
```

### 2. Handle Google callback and redirect with JWT:
```javascript
app.get('/api/users/google/callback', async (req, res) => {
  const { code } = req.query;
  
  // Exchange code for tokens with Google
  // Get user info from Google
  // Create your JWT token
  
  const jwtToken = createJWT(userData);
  
  // Redirect back to frontend with token
  res.redirect(`http://localhost:5173/auth/callback?access_token=${jwtToken}`);
});
```

## Expected JWT Token Format

Your JWT should contain:
```json
{
  "sub": "user-id", 
  "email": "user@example.com",
  "name": "User Name",
  "picture": "https://...",
  "role": "USER",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## Expected Backend Behavior

### Login Endpoint (`GET /api/users/google/login`)
- Returns Google OAuth authorization URL
- Should include redirect_uri pointing to your callback handler
- **Recommended redirect_uri**: `${FRONTEND_URL}/auth/callback` for better UX
- May include state parameter for security

### Callback Endpoint (`GET /api/users/google/callback`) 
- Processes the OAuth callback from Google
- Exchanges authorization code for access token
- Retrieves user information from Google
- Generates your own JWT token
- **Option 1**: Returns JWT token and user data as JSON
- **Option 2**: Redirects to `${FRONTEND_URL}/auth/callback?access_token={token}`

## CORS Configuration Required

Your backend needs to allow requests from `http://localhost:5173`:

```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## Environment Variables

```env
GOOGLE_CLIENT_ID=639125160298-bgr12tqd5ira2cb6kgkj4c9ds1iqrcdu.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
```