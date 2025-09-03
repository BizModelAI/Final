import 'dotenv/config';
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import { registerRoutes } from "./routes.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 9000;

// CORS middleware - updated for production
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://www.bizmodelai.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ].filter(Boolean);
  
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Stripe webhook requires the raw body for signature verification
// Apply raw parser only for the webhook route before JSON body parsing
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }) as any);

// Add middleware for parsing request bodies for all other routes
// Skip JSON/urlencoded parsing for Stripe webhook to preserve raw body
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/api/stripe/webhook') return next();
  return (express.json() as any)(req, res, next);
});
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/api/stripe/webhook') return next();
  return (express.urlencoded({ extended: true }) as any)(req, res, next);
});

// Session middleware configuration
app.use(session({
  secret: process.env.SESSION_SECRET || (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SESSION_SECRET environment variable is required in production');
    }
    return 'dev-secret-only';
  })(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}) as any);

(async () => {
  try {
    await registerRoutes(app);
    
    if (process.env.NODE_ENV === "production") {
      // Serve static files from the client build directory
      const clientDistPath = path.join(__dirname, "../client/dist");
      app.use(express.static(clientDistPath) as any);
      
      // Catch all handler for SPA routing
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
      });
    }
    
    app.listen(Number(port), '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📊 Health check available at: http://localhost:${port}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})(); 
