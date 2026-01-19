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
      sendError(res, 503, 'AI enhancement service is not configured. Please set GEMINI_API_KEY in your .env file.');
      return;
    }

    // Enhance the text
    const enhanced = await enhanceText(text.trim(), type as EnhancementType);

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
    console.error('AI enhancement error:', error);
    
    if (error instanceof Error) {
      // Check for specific error messages
      if (error.message.includes('API key')) {
        sendError(res, 503, 'AI enhancement service is not configured');
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

