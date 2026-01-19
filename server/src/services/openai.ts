import OpenAI from 'openai';

// Lazy initialization to ensure env vars are loaded
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (openai === null) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set. AI enhancement features will not work.');
      return null;
    }
    
    // Use Gemini API with OpenAI-compatible endpoint
    openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    });
  }
  
  return openai;
}

export type EnhancementType = 'summary' | 'description';

/**
 * Enhances text using Gemini API (via OpenAI-compatible endpoint) to make it more professional and polished
 * @param text - The original text to enhance
 * @param type - The type of text being enhanced ('summary' or 'description')
 * @returns Enhanced text
 */
// Request tracking for rate limit analysis
let requestCount = 0;
const requestTimestamps: number[] = [];

export async function enhanceText(text: string, type: EnhancementType): Promise<string> {
  // #region agent log
  const requestId = ++requestCount;
  const requestStartTime = Date.now();
  fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'openai.ts:33',message:'enhanceText called',data:{requestId,type,textLength:text?.length||0,requestCount,timestamp:requestStartTime},timestamp:requestStartTime,sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const client = getOpenAIClient();
  
  if (!client) {
    throw new Error('Gemini API key is not configured');
  }

  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  const prompt = getEnhancementPrompt(text, type);

  // #region agent log
  const timeSinceLastRequest = requestTimestamps.length > 0 ? requestStartTime - requestTimestamps[requestTimestamps.length - 1] : 0;
  requestTimestamps.push(requestStartTime);
  if (requestTimestamps.length > 10) requestTimestamps.shift(); // Keep last 10
  fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'openai.ts:44',message:'Before API call',data:{requestId,timeSinceLastRequest,recentRequestCount:requestTimestamps.length,concurrentRequests:requestTimestamps.filter(t => requestStartTime - t < 1000).length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  const apiCallStart = Date.now();
  try {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'openai.ts:47',message:'API call starting',data:{requestId,model:'gemini-2.0-flash-exp',apiCallStart},timestamp:apiCallStart,sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    const completion = await client.chat.completions.create({
      model: 'gemini-2.0-flash-exp',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume writing assistant. Your task is to enhance text to make it more professional, polished, and impactful while maintaining the original meaning and key information.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const apiCallEnd = Date.now();
    const apiCallDuration = apiCallEnd - apiCallStart;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'openai.ts:63',message:'API call success',data:{requestId,apiCallDuration,responseLength:completion.choices[0]?.message?.content?.length||0},timestamp:apiCallEnd,sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

    const enhancedText = completion.choices[0]?.message?.content?.trim() || '';

    // Fallback to original text if enhancement is empty
    return enhancedText || text;
  } catch (error: any) {
    const errorTime = Date.now();
    const errorDuration = errorTime - apiCallStart;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'openai.ts:67',message:'API call error',data:{requestId,errorStatus:error?.status,errorCode:error?.code,errorType:error?.type,errorMessage:error?.message,errorDuration,hasRetryAfter:!!error?.headers?.['retry-after'],retryAfter:error?.headers?.['retry-after'],recentRequestCount:requestTimestamps.filter(t => errorTime - t < 5000).length},timestamp:errorTime,sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    console.error('Gemini API error:', error);
    
    // Handle specific API errors
    if (error?.status === 429) {
      if (error?.code === 'insufficient_quota' || error?.error?.code === 'insufficient_quota') {
        throw new Error('QUOTA_EXCEEDED: Your Gemini API key has exceeded its quota. Please check your usage at https://aistudio.google.com/app/apikey');
      } else {
        throw new Error('RATE_LIMIT: Too many requests. Please wait a moment and try again.');
      }
    }
    
    if (error?.status === 401) {
      throw new Error('INVALID_API_KEY: Your Gemini API key is invalid. Please check your .env file and get a key from https://aistudio.google.com/app/apikey');
    }
    
    if (error?.status === 402 || error?.code === 'payment_required') {
      throw new Error('PAYMENT_REQUIRED: Payment required. Please check your Gemini API usage and billing settings.');
    }
    
    // Generic error fallback
    throw new Error('Failed to enhance text. Please try again.');
  }
}

/**
 * Generates an appropriate prompt based on the enhancement type
 */
function getEnhancementPrompt(text: string, type: EnhancementType): string {
  const baseInstructions = `
Guidelines:
- Maintain the original meaning and all key information
- Improve professionalism and polish
- Use strong action verbs
- Include quantifiable achievements where possible
- Keep the same approximate length or slightly expand (max 20% longer)
- Ensure ATS-friendly formatting
- Make it concise and impactful
- Avoid generic phrases and clichés
`;

  if (type === 'summary') {
    return `${baseInstructions}

This is a professional summary for a resume. Enhance it to be compelling and highlight the candidate's value proposition.

Original text:
${text}

Provide only the enhanced version without any additional commentary or explanation.`;
  } else {
    return `${baseInstructions}

This is a job description/experience description for a resume. Enhance it to better showcase responsibilities and achievements.

Original text:
${text}

Provide only the enhanced version without any additional commentary or explanation.`;
  }
}

