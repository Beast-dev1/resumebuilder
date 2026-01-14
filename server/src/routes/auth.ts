import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import { validateSignUp, validateLogin } from '../utils/validation';
import { sendError, sendSuccess } from '../utils/errors';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  // #region agent log
  const fs = require('fs'); const logPath = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs.appendFileSync(logPath, JSON.stringify({location:'auth.ts:12',message:'Signup route entry',data:{method:req.method,url:req.url,hasBody:!!req.body,bodyKeys:req.body?Object.keys(req.body):[],headers:Object.keys(req.headers)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})+'\n');
  // #endregion
  try {
    const { name, email, password } = req.body;

    // #region agent log
    const fs2 = require('fs'); const logPath2 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs2.appendFileSync(logPath2, JSON.stringify({location:'auth.ts:15',message:'Request body extracted',data:{hasName:!!name,nameLength:name?.length,hasEmail:!!email,email,hasPassword:!!password,passwordLength:password?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})+'\n');
    // #endregion

    // Validate input
    const validation = validateSignUp(name, email, password);

    // #region agent log
    const fs3 = require('fs'); const logPath3 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs3.appendFileSync(logPath3, JSON.stringify({location:'auth.ts:18',message:'Validation result',data:{isValid:validation.isValid,errors:validation.errors},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})+'\n');
    // #endregion
    if (!validation.isValid) {
      sendError(res, 400, 'Validation failed', validation.errors);
      return;
    }

    // Check if user already exists
    // #region agent log
    const fs4 = require('fs'); const logPath4 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs4.appendFileSync(logPath4, JSON.stringify({location:'auth.ts:24',message:'Before database check',data:{email:email.toLowerCase(),mongooseReadyState:mongoose.connection.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})+'\n');
    // #endregion
    
    // Check if MongoDB is connected (readyState: 0 = disconnected, 1 = connected)
    if (mongoose.connection.readyState !== 1) {
      // #region agent log
      const fs15 = require('fs'); const logPath15 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs15.appendFileSync(logPath15, JSON.stringify({location:'auth.ts:27',message:'Database not connected',data:{readyState:mongoose.connection.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})+'\n');
      // #endregion
      sendError(res, 503, 'Database service unavailable. Please ensure MongoDB is running.');
      return;
    }
    
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    // #region agent log
    const fs5 = require('fs'); const logPath5 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs5.appendFileSync(logPath5, JSON.stringify({location:'auth.ts:33',message:'Database check result',data:{existingUserFound:!!existingUser},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})+'\n');
    // #endregion
    if (existingUser) {
      sendError(res, 409, 'User with this email already exists');
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    // #region agent log
    const fs6 = require('fs'); const logPath6 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs6.appendFileSync(logPath6, JSON.stringify({location:'auth.ts:35',message:'Before user create',data:{name:name.trim(),email:email.toLowerCase().trim(),hasHashedPassword:!!hashedPassword},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})+'\n');
    // #endregion
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });
    // #region agent log
    const fs7 = require('fs'); const logPath7 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs7.appendFileSync(logPath7, JSON.stringify({location:'auth.ts:39',message:'User created',data:{userId:user._id?.toString(),email:user.email},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})+'\n');
    // #endregion

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      sendError(res, 500, 'Server configuration error');
      return;
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Return success response with token
    sendSuccess(
      res,
      201,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      'User created successfully'
    );
  } catch (error) {
    // #region agent log
    const fs8 = require('fs'); const logPath8 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs8.appendFileSync(logPath8, JSON.stringify({location:'auth.ts:69',message:'Signup catch error',data:{errorMessage:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:'unknown',errorStack:error instanceof Error?error.stack:undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})+'\n');
    // #endregion
    console.error('Signup error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validation = validateLogin(email, password);
    if (!validation.isValid) {
      sendError(res, 400, 'Validation failed', validation.errors);
      return;
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      sendError(res, 401, 'Invalid email or password');
      return;
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      sendError(res, 401, 'Invalid email or password');
      return;
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      sendError(res, 500, 'Server configuration error');
      return;
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Return success response with token
    sendSuccess(
      res,
      200,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      'Login successful'
    );
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

// GET /api/auth/me (protected route)
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      sendError(res, 404, 'User not found');
      return;
    }

    sendSuccess(
      res,
      200,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      'User retrieved successfully'
    );
  } catch (error) {
    console.error('Get user error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

export default router;

