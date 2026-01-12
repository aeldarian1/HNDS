#!/bin/bash

# HNDS Website - Quick Start Guide
# This script helps you get started with the modern HNDS website

echo "🚀 HNDS Split - Ultra-Modern Website"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.17 or later from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🎯 Quick Start Options:"
echo ""
echo "1. Start Development Server"
echo "   npm run dev"
echo ""
echo "2. Build for Production"
echo "   npm run build"
echo ""
echo "3. Start Production Server"
echo "   npm run start"
echo ""
echo "4. Run Linter"
echo "   npm run lint"
echo ""
echo "📚 Documentation:"
echo "   - README_MODERN.md - Feature overview and setup"
echo "   - DEPLOYMENT.md - Deployment guide and configuration"
echo ""
echo "🌐 Website URLs when running:"
echo "   - Home: http://localhost:3000"
echo "   - About: http://localhost:3000/about"
echo "   - Gallery: http://localhost:3000/gallery"
echo "   - Contact: http://localhost:3000/contact"
echo ""
echo "🚀 To get started, run:"
echo "   npm run dev"
echo ""
