# theportiqo-website

Official website for ThePortiqo - Built with React and TanStack

## Tech Stack

- **React 19** - Modern UI framework
- **TanStack Query** - Powerful asynchronous state management
- **TanStack Router** - Type-safe routing
- **Vite** - Next generation frontend tooling

## Features

- ⚡️ Fast development with Vite HMR
- 🎯 Type-safe routing with TanStack Router
- 🔄 Efficient data fetching with TanStack Query
- 🔐 Google Sign-In authentication with protected routes
- 👤 User profile management and session persistence
- 🎨 Modern, responsive design
- 📦 Optimized production builds

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Google Sign-In:
   - The Google Client ID is already configured: `639125160298-bgr12tqd5ira2cb6kgkj4c9ds1iqrcdu.apps.googleusercontent.com`
   - Backend URL is configurable via `VITE_BACKEND_URL` (defaults to `http://localhost:3000`)
   - Frontend origin: `http://localhost:5173`

3. Environment variables are pre-configured:
```bash
# .env file is already created with the correct configuration
VITE_GOOGLE_CLIENT_ID=639125160298-bgr12tqd5ira2cb6kgkj4c9ds1iqrcdu.apps.googleusercontent.com
VITE_BACKEND_URL=http://localhost:3000
```

4. Backend Setup (Optional):
   - The frontend works with or without the backend
   - If backend is unavailable, authentication falls back to local JWT decoding
   - See `backend-reference.md` for backend implementation example

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Docker Deployment

### Build Docker Image

```bash
# Build with current environment variables
docker build \
  --build-arg VITE_GOOGLE_CLIENT_ID="639125160298-bgr12tqd5ira2cb6kgkj4c9ds1iqrcdu.apps.googleusercontent.com" \
  --build-arg VITE_BACKEND_URL="http://localhost:3000" \
  -t theportiqo-website .
```

### Run Docker Container

```bash
# Run the container
docker run -p 80:80 theportiqo-website
```

### Docker Compose (Recommended)

```bash
# Using docker-compose with environment file
docker-compose up -d

# Build and run
docker-compose up --build
```

### Production Deployment

1. Copy production environment template:
```bash
cp .env.production.example .env.production
```

2. Edit `.env.production` with your production values:
```bash
VITE_GOOGLE_CLIENT_ID=your_production_client_id
VITE_BACKEND_URL=https://your-production-api.com
```

3. Build for production:
```bash
docker build \
  --build-arg VITE_GOOGLE_CLIENT_ID="$(grep VITE_GOOGLE_CLIENT_ID .env.production | cut -d '=' -f2)" \
  --build-arg VITE_BACKEND_URL="$(grep VITE_BACKEND_URL .env.production | cut -d '=' -f2)" \
  -t theportiqo-website:production .
```

## Protected Routes

The application includes a protected dashboard route at `/dashboard` that requires Google authentication:

- **Public Routes**: `/`, `/about`, `/portfolio` 
- **Protected Routes**: `/dashboard` (requires authentication)

When users try to access protected routes without being authenticated, they'll be prompted to sign in with their Google account. Once authenticated, users can access the dashboard and their session will persist across browser sessions.

## Authentication Features

- ⚡ **Google One Tap** - Seamless sign-in experience with backend integration
- 🔐 Google OAuth 2.0 integration
- 🔒 Protected route components  
- 💾 Session persistence in localStorage
- 👤 User profile display
- 🚪 Secure sign-out functionality
- � Mobile-optimized authentication flow

## Project Structure

```
src/
├── routes/          # Page components
│   ├── index.jsx    # Home page
│   ├── about.jsx    # About page
│   └── portfolio.jsx # Portfolio page
├── components/      # Reusable components
├── router.jsx       # Router configuration
├── App.jsx          # Main App component
└── main.jsx         # Application entry point
```

## Available Routes

- `/` - Home page
- `/about` - About ThePortiqo
- `/portfolio` - Portfolio showcase (demonstrates TanStack Query)

## CI/CD Pipelines

The project includes GitHub Actions workflows for automated deployment:

### **Development Pipeline** (`develop.yaml`)
- **Triggers**: Push to `develop` branch
- **Environment**: Development
- **Backend URL**: `https://gw.dev.theportiqo.com`
- **Tag**: `dev-{git-sha}`

### **Staging Pipeline** (`staging.yaml`)
- **Triggers**: Push to `staging` or `release/*` branches
- **Environment**: Staging
- **Backend URL**: `https://gw.staging.theportiqo.com`
- **Tag**: `staging-{git-sha}`

### **Production Pipeline** (`production.yaml`)
- **Triggers**: Push to `main`/`master` branch or release publication
- **Environment**: Production
- **Backend URL**: `https://gw.theportiqo.com`
- **Tag**: `prod-{git-sha}` or release tag

### **Pipeline Features:**
- 🐳 **Automated Docker builds** with proper environment variables
- 📦 **Push to Amazon ECR** registry
- 🚀 **ArgoCD integration** for GitOps deployment
- 💾 **Build caching** for faster subsequent builds
- 🔒 **Concurrent deployment protection**

### **Required GitHub Secrets:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `ARGOCD_REPO_TOKEN`

## License

Private

