#!/bin/bash

# Docker build script for ThePortiqo Website
# Usage: ./docker-build.sh [environment]
# Examples:
#   ./docker-build.sh dev      # Uses .env
#   ./docker-build.sh prod     # Uses .env.production
#   ./docker-build.sh          # Uses .env (default)

set -e

# Determine environment file
ENV_FILE=".env"
TAG_SUFFIX=""

if [ "$1" = "prod" ] || [ "$1" = "production" ]; then
    ENV_FILE=".env.production"
    TAG_SUFFIX=":production"
elif [ "$1" = "staging" ]; then
    ENV_FILE=".env.staging"
    TAG_SUFFIX=":staging"
fi

# Check if environment file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Environment file $ENV_FILE not found!"
    echo "📝 Please create it from the example:"
    if [ "$ENV_FILE" = ".env.production" ]; then
        echo "   cp .env.production.example .env.production"
    else
        echo "   cp .env.example $ENV_FILE"
    fi
    exit 1
fi

# Load environment variables
echo "📦 Loading environment from: $ENV_FILE"
source "$ENV_FILE"

# Validate required variables
if [ -z "$VITE_GOOGLE_CLIENT_ID" ]; then
    echo "❌ VITE_GOOGLE_CLIENT_ID is required in $ENV_FILE"
    exit 1
fi

if [ -z "$VITE_BACKEND_URL" ]; then
    echo "❌ VITE_BACKEND_URL is required in $ENV_FILE"
    exit 1
fi

# Build Docker image
echo "🔨 Building Docker image..."
echo "   Google Client ID: $VITE_GOOGLE_CLIENT_ID"
echo "   Backend URL: $VITE_BACKEND_URL"

docker build \
  --build-arg VITE_GOOGLE_CLIENT_ID="$VITE_GOOGLE_CLIENT_ID" \
  --build-arg VITE_BACKEND_URL="$VITE_BACKEND_URL" \
  -t theportiqo-website${TAG_SUFFIX} \
  .

echo "✅ Docker image built successfully: theportiqo-website${TAG_SUFFIX}"
echo "🚀 To run: docker run -p 80:80 theportiqo-website${TAG_SUFFIX}"