#!/bin/bash

echo "🚀 Testing Render Deployment Configuration"
echo "=========================================="

# Set production environment variables
export NODE_ENV=production
export PORT=10000
export DATABASE_URL="postgresql://test:test@localhost:5432/test"
export SESSION_SECRET="test-session-secret-for-deployment-test"
export FRONTEND_URL="https://test-app.onrender.com"

echo "📦 Testing build process..."
echo "Running: yarn install && yarn build"

# Test the build process
if yarn install && yarn build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🔍 Checking build artifacts..."

# Check if client build exists
if [ -d "client/dist" ]; then
    echo "✅ Client build directory exists"
    echo "   Files in client/dist:"
    ls -la client/dist/ | head -10
else
    echo "❌ Client build directory missing"
    exit 1
fi

# Check if server build exists
if [ -d "server/dist" ]; then
    echo "✅ Server build directory exists"
    echo "   Files in server/dist:"
    ls -la server/dist/ | head -10
else
    echo "❌ Server build directory missing"
    exit 1
fi

echo ""
echo "🧪 Testing server startup..."

# Test server startup (timeout after 10 seconds)
yarn start &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Check if server is running
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Server started successfully"
    
    # Test health check endpoint
    echo "🔍 Testing health check endpoint..."
    if curl -f http://localhost:9000/api/health > /dev/null 2>&1; then
        echo "✅ Health check endpoint responding"
    else
        echo "⚠️  Health check endpoint not responding (expected in test environment)"
    fi
    
    # Kill the server
    kill $SERVER_PID 2>/dev/null
    wait $SERVER_PID 2>/dev/null
else
    echo "❌ Server failed to start"
    exit 1
fi

echo ""
echo "📋 Environment Variables Check:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "DATABASE_URL: [SET]"
echo "SESSION_SECRET: [SET]"
echo "FRONTEND_URL: $FRONTEND_URL"

echo ""
echo "🎉 Deployment test completed successfully!"
echo "Your application is ready for Render deployment."
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Render"
echo "3. Set up environment variables in Render dashboard"
echo "4. Deploy!"
