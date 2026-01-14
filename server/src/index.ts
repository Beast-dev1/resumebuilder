import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDatabase } from './config/database';
import authRoutes from './routes/auth';
import resumeRoutes from './routes/resumes';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use((req, res, next) => {
  // #region agent log
  console.log('[DEBUG] Request received:', { method: req.method, url: req.url, origin: req.headers.origin, referer: req.headers.referer });
  const fs11 = require('fs'); const logPath11 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs11.appendFileSync(logPath11, JSON.stringify({location:'index.ts:15',message:'Request received',data:{method:req.method,url:req.url,origin:req.headers.origin,referer:req.headers.referer},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})+'\n');
  // #endregion
  next();
});
app.use(cors({
  origin: function (origin, callback) {
    // #region agent log
    console.log('[DEBUG] CORS check:', { origin, CLIENT_URL, allowed: !origin || origin === CLIENT_URL });
    const fs13 = require('fs'); const logPath13 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs13.appendFileSync(logPath13, JSON.stringify({location:'index.ts:21',message:'CORS origin check',data:{origin,clientUrl:CLIENT_URL,allowed:!origin||origin===CLIENT_URL},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})+'\n');
    // #endregion
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || origin === CLIENT_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// #region agent log
const fs9 = require('fs'); const logPath9 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs9.appendFileSync(logPath9, JSON.stringify({location:'index.ts:22',message:'CORS configured',data:{clientUrl:CLIENT_URL,port:PORT},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})+'\n');
// #endregion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
// #region agent log
const fs10 = require('fs'); const logPath10 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs10.appendFileSync(logPath10, JSON.stringify({location:'index.ts:28',message:'Auth routes mounted',data:{path:'/api/auth'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n');
// #endregion

// 404 handler
app.use((req, res) => {
  // #region agent log
  const fs12 = require('fs'); const logPath12 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs12.appendFileSync(logPath12, JSON.stringify({location:'index.ts:43',message:'404 handler hit',data:{method:req.method,url:req.url,path:req.path,originalUrl:req.originalUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})+'\n');
  // #endregion
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 CORS enabled for: ${CLIENT_URL}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

