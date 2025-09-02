# BizModelAI - AI-Powered Business Model Discovery

Discover your perfect business model with AI-powered analysis. Get personalized recommendations, detailed insights, and actionable strategies tailored to your goals and skills.

## 🚀 Deploy to Render

This project is configured for easy deployment to Render. Follow these steps:

### 1. Prerequisites

- A Render account
- A PostgreSQL database (Render PostgreSQL or external)
- Environment variables configured

### 2. Deploy to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `bizmodelai` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `yarn install && yarn build`
   - **Start Command**: `yarn start`
   - **Root Directory**: Leave empty (root of repo)

### 3. Set Environment Variables

In your Render service dashboard, go to Environment → Environment Variables and add:

**Required:**

- `DATABASE_URL` - Your PostgreSQL database connection string
- `SESSION_SECRET` - A random secret for session management
- `NODE_ENV` - Set to `production`

**Optional (for full functionality):**

- `OPENAI_API_KEY` - For AI-powered insights
- `RESEND_API_KEY` - For email functionality
- `STRIPE_SECRET_KEY` - For payment processing
- `STRIPE_PUBLISHABLE_KEY` - For Stripe frontend
- `STRIPE_WEBHOOK_SECRET` - For Stripe webhook verification
- `PAYPAL_CLIENT_ID` - For PayPal payment processing
- `PAYPAL_CLIENT_SECRET` - For PayPal payment processing
- `VITE_STRIPE_PUBLISHABLE_KEY` - Client-side Stripe key
- `VITE_PAYPAL_CLIENT_ID` - Client-side PayPal key

### 4. Database Setup

The app uses PostgreSQL. You can use:

- **Render PostgreSQL**: Create a new PostgreSQL service in Render
- **Supabase**: Free tier available
- **Neon**: Serverless PostgreSQL
- **PlanetScale**: MySQL-compatible option
- **Railway**: Simple database hosting

### 5. Deploy

Click "Create Web Service" and Render will automatically deploy your application.

## 📁 Project Structure

```
BizModelAI/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── data/           # Static data
├── server/                 # Express backend
│   ├── services/           # Business logic
│   └── routes.ts           # API routes
├── shared/                 # Shared types and utilities
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ Local Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Development Ports

- **Backend (API server):** Always runs on [http://localhost:9000](http://localhost:9000)
- **Frontend (Vite dev server):** Always runs on [http://localhost:5173](http://localhost:5173)

If you see an error like `EADDRINUSE: address already in use`, another process is using that port. Kill it with:

```
lsof -i :9000 # or :5173
kill -9 <PID>
```

There is no fallback or auto-increment logic. The server will fail if the port is in use.

## 📋 Features

- **AI-Powered Analysis**: Personalized business model recommendations
- **Comprehensive Quiz**: Multi-round personality and preference assessment
- **Interactive Results**: Visual business model comparisons
- **Payment Integration**: Stripe-powered premium features
- **Email Reports**: Automated report delivery
- **Responsive Design**: Works on all devices
