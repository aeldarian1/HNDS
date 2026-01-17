import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple in-memory rate limiter
 * For production, use Redis or a similar distributed cache
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL = 60000; // 1 minute
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
    lastCleanup = now;
  }
}

export interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
  /** Custom identifier function */
  identifier?: (req: NextRequest) => string;
  /** Custom response when rate limited */
  message?: string;
  /** Skip rate limiting for certain conditions */
  skip?: (req: NextRequest) => boolean;
}

const defaultConfig: RateLimitConfig = {
  limit: 10,
  windowMs: 60000, // 1 minute
  message: 'Too many requests. Please try again later.',
};

/**
 * Get client identifier from request
 */
function getIdentifier(req: NextRequest): string {
  // Try to get real IP from headers (for proxied requests)
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfIp = req.headers.get('cf-connecting-ip');
  
  // Use the first available IP
  const ip = cfIp || realIp || forwarded?.split(',')[0]?.trim() || 'unknown';
  
  // Combine with path for more granular limiting
  const path = new URL(req.url).pathname;
  
  return `${ip}:${path}`;
}

/**
 * Check rate limit and return result
 */
export function checkRateLimit(
  req: NextRequest,
  config: Partial<RateLimitConfig> = {}
): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
} {
  cleanup();
  
  const { limit, windowMs, identifier, skip } = { ...defaultConfig, ...config };
  
  // Skip rate limiting if condition is met
  if (skip && skip(req)) {
    return { success: true, limit, remaining: limit, reset: 0 };
  }
  
  const key = identifier ? identifier(req) : getIdentifier(req);
  const now = Date.now();
  
  let entry = rateLimitStore.get(key);
  
  // Create new entry if doesn't exist or has expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, entry);
  }
  
  // Increment count
  entry.count++;
  
  const remaining = Math.max(0, limit - entry.count);
  const reset = entry.resetTime;
  
  return {
    success: entry.count <= limit,
    limit,
    remaining,
    reset,
  };
}

/**
 * Rate limit middleware for API routes
 */
export function rateLimit(config: Partial<RateLimitConfig> = {}) {
  const { message } = { ...defaultConfig, ...config };
  
  return async function rateLimitMiddleware(
    req: NextRequest
  ): Promise<NextResponse | null> {
    const result = checkRateLimit(req, config);
    
    // Add rate limit headers
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', result.limit.toString());
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', result.reset.toString());
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: message,
          retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers,
        }
      );
    }
    
    return null;
  };
}

/**
 * Higher-order function to wrap API route handlers with rate limiting
 */
export function withRateLimit<T extends (...args: unknown[]) => Promise<NextResponse>>(
  handler: T,
  config: Partial<RateLimitConfig> = {}
) {
  return async function rateLimitedHandler(
    req: NextRequest,
    ...args: unknown[]
  ): Promise<NextResponse> {
    const rateLimitMiddleware = rateLimit(config);
    const rateLimitResponse = await rateLimitMiddleware(req);
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    const response = await handler(req, ...args);
    
    // Add rate limit headers to successful response
    const result = checkRateLimit(req, config);
    response.headers.set('X-RateLimit-Limit', result.limit.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set('X-RateLimit-Reset', result.reset.toString());
    
    return response;
  };
}

/**
 * Preset configurations for common use cases
 */
export const rateLimitPresets = {
  /** Strict: 5 requests per minute */
  strict: { limit: 5, windowMs: 60000 },
  /** Standard: 20 requests per minute */
  standard: { limit: 20, windowMs: 60000 },
  /** Relaxed: 60 requests per minute */
  relaxed: { limit: 60, windowMs: 60000 },
  /** Form submission: 3 requests per 5 minutes */
  form: { limit: 3, windowMs: 300000 },
  /** Search: 30 requests per minute */
  search: { limit: 30, windowMs: 60000 },
  /** Authentication: 5 requests per 15 minutes */
  auth: { limit: 5, windowMs: 900000 },
} as const;

/**
 * Example usage in API route:
 * 
 * import { withRateLimit, rateLimitPresets } from '@/lib/rate-limit';
 * 
 * async function handler(req: NextRequest) {
 *   // Your API logic
 *   return NextResponse.json({ success: true });
 * }
 * 
 * export const POST = withRateLimit(handler, rateLimitPresets.form);
 */
