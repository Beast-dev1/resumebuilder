import OpenAI from 'openai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set. AI enhancement features will not work.');
}

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
}) : null;

export type EnhancementType = 'summary' | 'description';

/**
 * Enhances text using Gemini API (via OpenAI-compatible endpoint) to make it more professional and polished
 * @param text - The original text to enhance
 * @param type - The type of text being enhanced ('summary' or 'description')
 * @returns Enhanced text
 */
export async function enhanceText(text: string, type: EnhancementType): Promise<string> {
  if (!openai) {
    throw new Error('Gemini API key is not configured');
  }

  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  const prompt = getEnhancementPrompt(text, type);

  try {
    const completion = await openai.chat.completions.create({
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

    const enhancedText = completion.choices[0]?.message?.content?.trim() || '';

    // Fallback to original text if enhancement is empty
    return enhancedText || text;
  } catch (error) {
    console.error('Gemini API error:', error);
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

