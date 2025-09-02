import jwt from 'jsonwebtoken';
import type { Response } from 'express-serve-static-core';

// Lazy validation - don't throw at module load
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
};

const JWT_EXPIRES_IN = '7d';
const COOKIE_NAME = 'auth_token';

export interface AuthPayload {
  userId: number;
  email: string;
  isPaid?: boolean;
}

export function signToken(payload: AuthPayload): string {
  const JWT_SECRET = getJwtSecret();
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    const JWT_SECRET = getJwtSecret();
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as AuthPayload;
  } catch (e) {
    return null;
  }
}

// Helper to set the cookie (for traditional hosting, use Set-Cookie header)
export const setCookie = (res: Response, name: string, value: string, options: any = {}) => {
  // For traditional hosting: res.setHeader('Set-Cookie', ...)
  const cookieValue = `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;
  res.setHeader('Set-Cookie', cookieValue);
};

export function getTokenFromRequest(req: any): string | null {
  // Try cookie first
  const cookie = req.headers?.cookie;
  if (cookie) {
    const match = cookie.match(/auth_token=([^;]+)/);
    if (match) return match[1];
  }
  // Try Authorization header (Bearer)
  const auth = req.headers?.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice(7);
  }
  return null;
} 