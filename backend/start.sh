#!/bin/bash

echo "🚀 Starting Smart Finance Hub Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Set environment variables
export PORT=5000
export NODE_ENV=development
export FRONTEND_URL=http://localhost:5174
export NEWS_API_KEY=demo_key

echo "🔧 Environment configured:"
echo "   PORT: $PORT"
echo "   NODE_ENV: $NODE_ENV"
echo "   FRONTEND_URL: $FRONTEND_URL"

# Start the server
echo "🌟 Starting server on port $PORT..."
npm run dev


