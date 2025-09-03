# 🚀 Render Deployment Guide for BizModelAI

This guide will help you deploy your BizModelAI application to Render successfully.

## ✅ Pre-Deployment Checklist

Your application has been prepared for deployment with the following fixes:
- ✅ Build configuration updated
- ✅ Environment variables documented
- ✅ Health check endpoint configured
- ✅ CORS settings updated for production
- ✅ Static file serving configured
- ✅ Database schema ready

## 🚀 Quick Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your repository

### 3. Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:

**Basic Settings:**
- **Name**: `bizmodelai` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Deploy:**
- **Build Command**: `yarn install && yarn build`
- **Start Command**: `yarn start`
- **Root Directory**: Leave empty (root of repo)

### 4. Create PostgreSQL Database
1. In Render Dashboard, click "New +" → "PostgreSQL"
2. Configure:
   - **Name**: `bizmodelai-db`
   - **Database**: `bizmodelai`
   - **User**: Auto-generated
   - **Region**: Same as your web service

3. **Copy the connection string** - you'll need this for environment variables

### 5. Configure Environment Variables

In your web service dashboard, go to **Environment** → **Environment Variables**:

**Required Variables:**
```
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=your-super-secret-random-string-here
NODE_ENV=production
PORT=10000
```

**Optional Variables (for full functionality):**
```
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_PAYPAL_CLIENT_ID=...
```

### 6. Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. You'll get a URL like `https://your-app.onrender.com`

## 🔍 Troubleshooting

### Common Issues

**Build Failures:**
- Ensure all dependencies are in `package.json`
- Check that `yarn.lock` is committed
- Verify Node.js version compatibility

**Database Connection Issues:**
- Check `DATABASE_URL` format
- Ensure database is in same region
- Verify database credentials

**Port Issues:**
- Render automatically sets `PORT` environment variable
- Don't hardcode port numbers in your code

**CORS Issues:**
- Update `FRONTEND_URL` to match your Render domain
- Check CORS configuration in `server/index.ts`

### Health Check

Your app includes a health check endpoint at `/api/health`. Use this to verify deployment:

```bash
curl https://your-app.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "database": "healthy",
  "environment": "production"
}
```

## 📊 Monitoring

Render provides:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, and response time
- **Alerts**: Automatic notifications for issues
- **Uptime**: Service availability monitoring

## 🔄 Updates

To update your deployment:
1. Push changes to your GitHub repository
2. Render automatically detects changes
3. Triggers new build and deployment
4. Zero-downtime updates

## 💰 Costs

**Free Tier:**
- Web Service: 750 hours/month
- PostgreSQL: 90 days free trial
- Automatic sleep after 15 minutes of inactivity

**Paid Plans:**
- Web Service: $7/month (always on)
- PostgreSQL: $7/month
- Custom domains: $5/month

## 🆘 Support

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Community**: [community.render.com](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com)

## 🎯 Next Steps

After successful deployment:

1. **Test all features** - quiz, payments, email
2. **Set up custom domain** (optional)
3. **Configure monitoring** and alerts
4. **Set up CI/CD** for automatic deployments
5. **Monitor performance** and optimize

---

**Happy Deploying! 🚀**

Your BizModelAI application is now ready to help entrepreneurs discover their perfect business model!
