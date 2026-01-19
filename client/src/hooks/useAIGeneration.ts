import { useState } from 'react'
import { enhanceText } from '../utils/api'

export const useAIGeneration = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const enhanceTextWithAI = async (
    text: string,
    type: 'summary' | 'description'
  ): Promise<string | null> => {
    if (!text || text.trim().length === 0) {
      setError('Text cannot be empty')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await enhanceText(text, type)
      // Response structure: { success: true, data: { enhanced: string, suggestions: string[] } }
      return response.data?.data?.enhanced || null
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to enhance text. Please try again.'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    enhanceTextWithAI,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}

