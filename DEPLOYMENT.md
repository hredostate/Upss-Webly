# Deployment Guide for Hostinger

This guide covers deploying the UPSS school website to Hostinger hosting.

## Prerequisites

- Hostinger hosting account with Node.js support (for full-stack) OR standard Apache hosting (for frontend-only)
- Supabase project set up
- Domain configured in Hostinger

## Option 1: Full-Stack Deployment (with Node.js Backend)

### Step 1: Configure Environment Variables

Create a `.env` file with your production values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
NODE_ENV=production
VITE_API_BASE_URL=/api
ADMIN_SECRET_KEY=your_secret_key
```

### Step 2: Build the Project

```bash
npm install
npm run build
```

### Step 3: Upload Files

Upload to Hostinger's `public_html`:
- All contents from `/dist` folder
- `/server` folder
- `package.json`
- `.env` file
- `.htaccess` file

### Step 4: Configure Node.js in Hostinger

1. Log into Hostinger hPanel
2. Go to "Advanced" → "Node.js"
3. Create New Application:
   - Application root: `/public_html`
   - Application URL: Your domain
   - Application startup file: `server/index.js`
   - Node.js version: 18.x or 20.x
4. Click "Create"
5. Run: `npm install --production`
6. Click "Start Application"

## Option 2: Frontend-Only Deployment (Simpler)

If you don't need the Express backend and can use Supabase directly:

### Step 1: Build

```bash
npm install
npm run build
```

### Step 2: Upload

Upload to `public_html`:
- All contents from `/dist` folder
- `.htaccess` file

### Step 3: Configure Supabase

Update your Supabase project settings to allow your domain in the allowed URLs.

## Troubleshooting

### Error: ERR_CONNECTION_REFUSED

This means the API base URL is still pointing to localhost. Make sure:
1. You've updated `src/api/cmsClient.ts`
2. You've set `VITE_API_BASE_URL=/api` in `.env`
3. You've rebuilt the project: `npm run build`

### Error: Supabase 400 Bad Request

Check that your `.env` file has the correct Supabase credentials from your Supabase dashboard.

### 404 Errors on Page Refresh

Make sure `.htaccess` is uploaded and mod_rewrite is enabled on your server.

## Production Checklist

- [ ] Environment variables configured
- [ ] Project built successfully
- [ ] All files uploaded to Hostinger
- [ ] `.htaccess` file present
- [ ] Node.js application started (if using backend)
- [ ] Database migrations run on Supabase
- [ ] HTTPS enabled
- [ ] Domain DNS configured
- [ ] Test all major features

## Support

For issues, check the application logs in Hostinger's control panel under Node.js → Application → Logs.
