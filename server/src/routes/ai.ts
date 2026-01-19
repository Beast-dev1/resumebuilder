import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { sendError, sendSuccess } from '../utils/errors';
import { enhanceText, EnhancementType } from '../services/openai';

const router = express.Router();

// POST /api/ai/enhance - Enhance text using Gemini API (via OpenAI-compatible endpoint)
router.post('/enhance', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { text, type } = req.body;

    // Validate input
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      sendError(res, 400, 'Text is required and must be a non-empty string');
      return;
    }

    if (!type || (type !== 'summary' && type !== 'description')) {
      sendError(res, 400, 'Type must be either "summary" or "description"');
      return;
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      sendError(res, 503, 'AI enhancement service is not configured. Please set GEMINI_API_KEY in your .env file. Get your key from https://aistudio.google.com/app/apikey');
      return;
    }

    // #region agent log
    const routeStartTime = Date.now();
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ai.ts:31',message:'Route handler before enhanceText',data:{type,textLength:text?.trim()?.length||0,userEmail:req.user?.email},timestamp:routeStartTime,sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    // Enhance the text
    const enhanced = await enhanceText(text.trim(), type as EnhancementType);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ai.ts:33',message:'Route handler after enhanceText success',data:{enhancedLength:enhanced?.length||0,routeDuration:Date.now()-routeStartTime},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
    // #endregion

    // Return enhanced text (keeping structure for future multi-suggestion support)
    sendSuccess(
      res,
      200,
      {
        enhanced,
        suggestions: [enhanced], // For future multi-suggestion support
      },
      'Text enhanced successfully'
    );
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ai.ts:44',message:'Route handler error caught',data:{errorMessage:error instanceof Error?error.message:String(error),errorType:error instanceof Error?error.constructor.name:'unknown',isRateLimit:error instanceof Error&&error.message.includes('RATE_LIMIT')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    // #endregion
    console.error('AI enhancement error:', error);
    
    if (error instanceof Error) {
      // Check for specific error messages
      if (error.message.includes('API key') || error.message.includes('INVALID_API_KEY')) {
        sendError(res, 503, 'AI enhancement service is not configured. Please check your GEMINI_API_KEY in the .env file. Get your key from https://aistudio.google.com/app/apikey');
        return;
      }
      if (error.message.includes('QUOTA_EXCEEDED')) {
        sendError(res, 402, error.message.replace('QUOTA_EXCEEDED: ', ''));
        return;
      }
      if (error.message.includes('RATE_LIMIT')) {
        sendError(res, 429, error.message.replace('RATE_LIMIT: ', ''));
        return;
      }
      if (error.message.includes('PAYMENT_REQUIRED')) {
        sendError(res, 402, error.message.replace('PAYMENT_REQUIRED: ', ''));
        return;
      }
      if (error.message.includes('empty')) {
        sendError(res, 400, error.message);
        return;
      }
    }
    
    sendError(res, 500, 'Failed to enhance text. Please try again.');
  }
});

export default router;

