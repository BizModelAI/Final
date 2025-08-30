import 'dotenv/config';
import express from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";
import session from "express-session";
import { registerRoutes } from "./routes";
import { serveStatic } from "./vite";

const app = express();
const port = process.env.PORT || 9000;

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Add middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

(async () => {
  await registerRoutes(app);
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  }
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})(); 