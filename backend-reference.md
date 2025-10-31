# Backend API Reference

This file shows how the frontend integrates with your backend API endpoints.

## Your Current API Endpoints

### 1. Login Endpoint
```bash
curl -X 'GET' \
  '${VITE_BACKEND_URL}/api/users/google/login' \
  -H 'accept: application/json'
```

**Expected Response:**
```json
{
  "url": "https://accounts.google.com/oauth2/auth?client_id=...",
  "authUrl": "https://accounts.google.com/oauth2/auth?client_id=..."
}
```

### 2. Callback Endpoint  
```bash
curl -X 'GET' \
  '${VITE_BACKEND_URL}/api/users/google/callback' \
  -H 'accept: application/json'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456789",
    "email": "user@example.com", 
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/..."
  }
}
```

## Frontend Integration Flow

1. **User clicks "Sign in with Google (Backend)"**
2. **Frontend calls** `GET ${VITE_BACKEND_URL}/api/users/google/login`
3. **Backend returns** Google OAuth URL
4. **Frontend opens** OAuth URL in popup window
5. **User completes** Google authentication
6. **Backend redirects** to callback handler
7. **Frontend processes** JWT token from callback
8. **Frontend stores** token and user data locally

## Handling the JWT Response

The frontend now supports multiple ways to receive the JWT token:

### Method 1: JSON Response Page (Current Issue)
- Backend shows JSON like `{"access_token":"eyJ..."}`
- Frontend automatically detects and parses this JSON
- Works with current backend implementation

### Method 2: URL Parameters (Recommended)
- Backend redirects to: `http://localhost:5173/auth/callback?access_token={token}`
- Cleaner user experience
- Easier to implement

### Method 3: PostMessage
- Backend sends `window.opener.postMessage({access_token: "..."}, origin)`
- Most seamless integration
- Requires backend modification

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