import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    // #region agent log
    const fs14 = require('fs'); const logPath14 = 'c:\\Users\\user\\Desktop\\resume\\.cursor\\debug.log'; fs14.appendFileSync(logPath14, JSON.stringify({location:'database.ts:14',message:'MongoDB connection failed',data:{errorMessage:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})+'\n');
    // #endregion
    console.error('❌ MongoDB connection error:', error);
    console.error('⚠️  Server will start but database operations will fail. Please ensure MongoDB is running.');
    // Don't exit - allow server to start and handle DB errors gracefully in routes
    // process.exit(1); // Removed to allow server to start
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});

