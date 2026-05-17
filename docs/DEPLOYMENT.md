# Deployment Guide

Complete guide for deploying Ticket Inteli to production.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [AWS Amplify](#aws-amplify)
  - [Docker](#docker)
  - [Self-Hosted](#self-hosted)
- [Production Considerations](#production-considerations)
- [Monitoring & Logging](#monitoring--logging)
- [Performance Optimization](#performance-optimization)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## Overview

Ticket Inteli is a Next.js application that can be deployed to various platforms. This guide covers the most common deployment scenarios.

**Recommended Platform:** Vercel (built by Next.js creators)

**Deployment Time:** 5-10 minutes  
**Difficulty:** Easy

## Prerequisites

Before deploying, ensure you have:

- ✅ Git repository (GitHub, GitLab, or Bitbucket)
- ✅ Production-ready code (all tests passing)
- ✅ Environment variables configured
- ✅ Domain name (optional)
- ✅ SSL certificate (handled by platforms)

## Environment Variables

### Required Variables

Currently, no environment variables are strictly required for the MVP version.

### Optional Variables

```bash
# Application Configuration
NEXT_PUBLIC_APP_NAME=Ticket Inteli
NEXT_PUBLIC_APP_VERSION=0.1.0

# Feature Flags
NEXT_PUBLIC_USE_MOCK_API=true

# Analytics (Future)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Error Tracking (Future)
SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Future Variables (watsonx.ai Integration)

```bash
# IBM watsonx.ai
WATSONX_API_KEY=your_api_key_here
WATSONX_PROJECT_ID=your_project_id
WATSONX_URL=https://us-south.ml.cloud.ibm.com

# API Configuration
API_RATE_LIMIT=100
API_TIMEOUT=30000
```

### Setting Environment Variables

**Local Development (.env.local):**
```bash
# Create .env.local file
touch .env.local

# Add variables
echo "NEXT_PUBLIC_APP_NAME=Ticket Inteli" >> .env.local
```

**Production (Platform-specific):**
- See platform sections below

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Why Vercel?

- ✅ Built by Next.js creators
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant rollbacks
- ✅ Preview deployments
- ✅ Free tier available

#### Deployment Steps

**Method 1: GitHub Integration (Recommended)**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Add Environment Variables** (if needed)
   - Click "Environment Variables"
   - Add variables from [Environment Variables](#environment-variables)
   - Select environments: Production, Preview, Development

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

6. **Get Your URL**
   ```
   https://your-project.vercel.app
   ```

**Method 2: Vercel CLI**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # First deployment
   vercel
   
   # Production deployment
   vercel --prod
   ```

4. **Follow Prompts**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: ticket-inteli
   - Directory: ./
   - Override settings: No

#### Custom Domain

1. **Add Domain in Vercel**
   - Go to Project Settings
   - Click "Domains"
   - Add your domain
   - Follow DNS configuration instructions

2. **Update DNS Records**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for Propagation**
   - Usually 5-10 minutes
   - Vercel handles SSL automatically

#### Continuous Deployment

Every push to `main` branch automatically deploys to production.

**Preview Deployments:**
- Every pull request gets a unique preview URL
- Test changes before merging
- Share with team for review

---

### Netlify

Alternative platform with similar features to Vercel.

#### Deployment Steps

1. **Push to Git**
   ```bash
   git push origin main
   ```

2. **Import to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository

3. **Configure Build**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** (leave empty)

4. **Add Environment Variables**
   - Go to Site Settings > Build & Deploy > Environment
   - Add variables

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

#### Custom Domain

1. **Add Domain**
   - Go to Domain Settings
   - Add custom domain
   - Follow DNS instructions

2. **Enable HTTPS**
   - Automatic with Let's Encrypt
   - Usually takes 5-10 minutes

---

### AWS Amplify

Deploy to AWS infrastructure.

#### Prerequisites

- AWS account
- AWS CLI installed
- IAM user with appropriate permissions

#### Deployment Steps

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Configure Amplify**
   ```bash
   amplify configure
   ```

3. **Initialize Project**
   ```bash
   amplify init
   ```

4. **Add Hosting**
   ```bash
   amplify add hosting
   ```
   - Select: Hosting with Amplify Console
   - Choose: Manual deployment

5. **Deploy**
   ```bash
   amplify publish
   ```

#### Continuous Deployment

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Click "Connect app"
   - Select your Git provider
   - Choose repository and branch

2. **Configure Build**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Deploy**
   - Amplify automatically deploys on push

---

### Docker

Containerize the application for any platform.

#### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment
ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Set environment variable for port
ENV PORT=3000

# Start application
CMD ["node", "server.js"]
```

#### .dockerignore

Create `.dockerignore`:

```
node_modules
.next
.git
.gitignore
README.md
.env*.local
npm-debug.log
```

#### Build and Run

```bash
# Build image
docker build -t ticket-inteli .

# Run container
docker run -p 3000:3000 ticket-inteli

# Run with environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_APP_NAME="Ticket Inteli" \
  ticket-inteli
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_NAME=Ticket Inteli
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

### Self-Hosted

Deploy to your own server.

#### Prerequisites

- Linux server (Ubuntu 20.04+ recommended)
- Node.js 18+ installed
- Nginx or Apache
- SSL certificate (Let's Encrypt)
- Domain name

#### Deployment Steps

1. **Prepare Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Clone Repository**
   ```bash
   cd /var/www
   git clone <your-repo-url> ticket-inteli
   cd ticket-inteli
   ```

3. **Install Dependencies**
   ```bash
   npm ci --production
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Start with PM2**
   ```bash
   pm2 start npm --name "ticket-inteli" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**

   Create `/etc/nginx/sites-available/ticket-inteli`:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ticket-inteli /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

8. **Setup Auto-Updates** (Optional)
   ```bash
   # Create update script
   cat > /var/www/ticket-inteli/update.sh << 'EOF'
   #!/bin/bash
   cd /var/www/ticket-inteli
   git pull
   npm ci --production
   npm run build
   pm2 restart ticket-inteli
   EOF
   
   chmod +x /var/www/ticket-inteli/update.sh
   ```

## Production Considerations

### Build Optimization

1. **Enable Output Standalone**

   Update `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'standalone',
     // ... other config
   };
   ```

2. **Optimize Images**
   - Use Next.js Image component
   - Configure image domains
   - Enable image optimization

3. **Enable Compression**
   ```typescript
   const nextConfig = {
     compress: true,
     // ... other config
   };
   ```

### Caching Strategy

1. **Static Assets**
   - Automatically cached by Next.js
   - Cache-Control headers set

2. **API Routes**
   - Implement caching for analysis results
   - Use Redis for distributed caching (future)

3. **CDN Configuration**
   - Vercel/Netlify handle automatically
   - For self-hosted, use Cloudflare

### Database Considerations (Future)

When adding persistence:

1. **Choose Database**
   - PostgreSQL (recommended)
   - MongoDB
   - MySQL

2. **Connection Pooling**
   - Use connection pooling
   - Set appropriate pool size

3. **Backups**
   - Automated daily backups
   - Point-in-time recovery
   - Test restore procedures

## Monitoring & Logging

### Application Monitoring

**Vercel Analytics** (Recommended for Vercel)
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Google Analytics**
```typescript
// Add to app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### Error Tracking

**Sentry** (Recommended)

1. **Install Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure**
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

3. **Add DSN**
   ```bash
   SENTRY_DSN=your_dsn_here
   ```

### Logging

**Production Logging**

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'production') {
      // Send to logging service
      console.log(JSON.stringify({ level: 'info', message, data }));
    } else {
      console.log(message, data);
    }
  },
  error: (message: string, error?: Error) => {
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking
      console.error(JSON.stringify({ level: 'error', message, error }));
    } else {
      console.error(message, error);
    }
  }
};
```

### Health Checks

Create health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0'
  });
}
```

## Performance Optimization

### Build Performance

1. **Analyze Bundle**
   ```bash
   npm install @next/bundle-analyzer
   ```

   ```typescript
   // next.config.ts
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   });
   
   module.exports = withBundleAnalyzer(nextConfig);
   ```

   Run analysis:
   ```bash
   ANALYZE=true npm run build
   ```

2. **Code Splitting**
   - Use dynamic imports
   - Lazy load components
   - Split by route

### Runtime Performance

1. **Enable React Strict Mode**
   ```typescript
   // next.config.ts
   const nextConfig = {
     reactStrictMode: true,
   };
   ```

2. **Optimize Fonts**
   ```typescript
   // app/layout.tsx
   import { Inter } from 'next/font/google';
   
   const inter = Inter({ subsets: ['latin'] });
   ```

3. **Implement ISR** (Incremental Static Regeneration)
   - For static content
   - Reduces server load
   - Improves response time

## Security

### Security Headers

Add to `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

### Environment Security

1. **Never commit secrets**
   - Use `.env.local` for local secrets
   - Add to `.gitignore`
   - Use platform environment variables

2. **Rotate API keys regularly**
   - Set expiration dates
   - Monitor usage
   - Revoke unused keys

3. **Implement rate limiting** (Future)
   - Prevent abuse
   - Protect API endpoints
   - Use Redis for distributed limiting

## Troubleshooting

### Common Issues

#### Build Fails

**Error:** `Module not found`
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

#### Port Already in Use

**Error:** `Port 3000 is already in use`
```bash
# Solution: Use different port
PORT=3001 npm start

# Or kill process on port 3000
lsof -ti:3000 | xargs kill
```

#### Out of Memory

**Error:** `JavaScript heap out of memory`
```bash
# Solution: Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### Deployment Timeout

**Error:** `Build exceeded maximum duration`
```bash
# Solution: Optimize build
# 1. Remove unused dependencies
# 2. Enable caching
# 3. Reduce bundle size
```

### Platform-Specific Issues

**Vercel:**
- Check build logs in dashboard
- Verify environment variables
- Check function size limits

**Netlify:**
- Review deploy logs
- Check build settings
- Verify redirects configuration

**Docker:**
- Check container logs: `docker logs <container-id>`
- Verify port mapping
- Check environment variables

## Rollback Procedures

### Vercel

1. Go to Deployments
2. Find previous successful deployment
3. Click "..." menu
4. Select "Promote to Production"

### Git-Based Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

### Docker Rollback

```bash
# List images
docker images

# Run previous version
docker run -p 3000:3000 ticket-inteli:<previous-tag>
```

## Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Build succeeds locally
- [ ] Performance tested
- [ ] Security headers configured
- [ ] Error tracking setup
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Rollback procedure tested
- [ ] Documentation updated
- [ ] Team notified
- [ ] Domain configured
- [ ] SSL certificate active

---

**Deployment Guide Version:** 1.0  
**Last Updated:** May 17, 2026  
**Status:** Production Ready