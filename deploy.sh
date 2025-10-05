#!/bin/bash

# Configuration
REPO_URL="git@github.com:bidan-rifa/litstar.github.io.git"
BRANCH="main"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment to GitHub Pages...${NC}"

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    exit 1
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📦 Initializing git repository...${NC}"
    git init
    git remote add origin $REPO_URL
fi

# Add all files
echo -e "${BLUE}📝 Adding files...${NC}"
git add .

# Commit with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo -e "${BLUE}💾 Committing changes...${NC}"
git commit -m "Deploy: $TIMESTAMP"

# Push to GitHub
echo -e "${BLUE}☁️  Pushing to GitHub...${NC}"
git push -u origin $BRANCH --force

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Your site will be live at: https://yourusername.github.io${NC}"