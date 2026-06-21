'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ─── Connect Database then Start Server ─────────────────────────────────────
// connectDB is async — we must await it before accepting requests

// ─── Security Headers (Helmet) ────────────────────────────────────────────────
// Sets strong HTTP headers to prevent common attack vectors (XSS, clickjacking,
// MIME-sniffing, etc.)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        // Allow inline styles required by TailwindCSS v4 (which injects styles at runtime)
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://qtbeoephtgmwbljnzfmd.supabase.co'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
  })
);

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Only allow requests from the configured frontend origin.
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., server-to-server, Postman in dev)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin '${origin}' not allowed.`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ─── Body Parsers (with size limits) ─────────────────────────────────────────
// Limiting JSON and URL-encoded body sizes prevents DoS via oversized payloads.
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// ─── HTTP Parameter Pollution Prevention ─────────────────────────────────────
// Prevents attackers from sending duplicate query parameters to bypass validation.
app.use(hpp());

// ─── Request Logging ──────────────────────────────────────────────────────────
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
// Prevents brute-force and DoS attacks by limiting requests per IP.
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,                  // max 200 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});
app.use(globalLimiter);

// ─── Strict Rate Limiter for Write Operations ──────────────────────────────────
// Admin write routes are further protected with a tighter rate limit.
const adminWriteLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50,                   // max 50 admin writes per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many admin requests. Slow down and try again.',
  },
});

// ─── Disable Fingerprinting ───────────────────────────────────────────────────
app.disable('x-powered-by'); // Already done by helmet, but explicit is better

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Platinum Smile Cleaning API is online.',
    version: '2.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api', apiRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found.`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Catches all unhandled errors and returns a safe generic response in production.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Handle CORS errors specifically
  if (err.message && err.message.startsWith('CORS policy')) {
    return res.status(403).json({ success: false, message: err.message });
  }

  // Log full error in development; suppress in production
  if (NODE_ENV === 'development') {
    console.error('❌ Unhandled Error:', err.stack);
  } else {
    console.error(`❌ Server Error [${new Date().toISOString()}]: ${err.message}`);
  }

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      NODE_ENV === 'production'
        ? 'An unexpected error occurred. Please try again later.'
        : err.message || 'Internal Server Error',
  });
});

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
// Start only after DB is connected
let server;

(async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`🔒 Security: Helmet, CORS, Rate-Limiting, HPP, Body-Size limits, JWT Auth active`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database. Server not started.', err.message);
    process.exit(1);
  }
})();

const gracefulShutdown = (signal) => {
  console.log(`\n⚡ ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('✅ HTTP server closed cleanly.');
    process.exit(0);
  });

  // Force shutdown if graceful close takes > 10 seconds
  setTimeout(() => {
    console.error('⏰ Force shutdown after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Promise Rejection at:', promise, 'Reason:', reason);
  // Don't exit — let the error handler deal with individual requests
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err.message);
  gracefulShutdown('uncaughtException');
});

module.exports = app;
