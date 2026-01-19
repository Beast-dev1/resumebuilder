import React, { useEffect, useState } from 'react'
import { useAIGeneration } from '../../../hooks/useAIGeneration'

interface AIEnhancementModalProps {
  isOpen: boolean
  onClose: () => void
  originalText: string
  type: 'summary' | 'description'
  onAccept: (enhancedText: string) => void
}

export default function AIEnhancementModal({
  isOpen,
  onClose,
  originalText,
  type,
  onAccept,
}: AIEnhancementModalProps) {
  const { enhanceTextWithAI, isLoading, error, clearError } = useAIGeneration()
  const [enhancedText, setEnhancedText] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && originalText.trim()) {
      // Automatically fetch enhancement when modal opens with text
      handleEnhance()
    } else if (isOpen) {
      // Reset state if modal opens without text
      setEnhancedText(null)
      clearError()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleEnhance = async () => {
    clearError()
    setEnhancedText(null)
    const result = await enhanceTextWithAI(originalText, type)
    if (result) {
      setEnhancedText(result)
    }
  }

  const handleAccept = () => {
    if (enhancedText) {
      onAccept(enhancedText)
      onClose()
    }
  }

  const handleClose = () => {
    setEnhancedText(null)
    clearError()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">AI Enhancement</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && !enhancedText && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-gray-600">Enhancing your text with AI...</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
              <button
                onClick={handleEnhance}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          {enhancedText && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Original
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[200px] max-h-[400px] overflow-y-auto">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {originalText}
                  </p>
                </div>
              </div>

              {/* Enhanced Text */}
              <div>
                <label className="block text-sm font-semibold text-purple-700 mb-2">
                  Enhanced
                </label>
                <div className="border-2 border-purple-300 rounded-lg p-4 bg-purple-50 min-h-[200px] max-h-[400px] overflow-y-auto">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {enhancedText}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !enhancedText && !error && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Ready to enhance your text</p>
              <button
                onClick={handleEnhance}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Generate Enhancement
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          {enhancedText && (
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
            >
              Accept Enhancement
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

