import { useState } from 'react'
import { ResumeData } from '../../../types/resume'
import AIEnhancementModal from './AIEnhancementModal'

interface ProfessionalSummaryStepProps {
  resumeData: ResumeData
  onUpdateSummary: (value: string) => void
  onSave: () => Promise<void>
  isSaving: boolean
}

export default function ProfessionalSummaryStep({
  resumeData,
  onUpdateSummary,
  onSave,
  isSaving,
}: ProfessionalSummaryStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAcceptEnhancement = (enhancedText: string) => {
    onUpdateSummary(enhancedText)
  }

  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Professional Summary
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Add summary for your resume here
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium text-sm transition-colors"
          >
            AI Enhance
          </button>
        </div>

        <div>
          <textarea
            value={resumeData.professional_summary}
            onChange={(e) => onUpdateSummary(e.target.value)}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Describe your professional background..."
          />
        </div>

        <p className="text-sm text-gray-500">
          Tip: Keep it concise (3-4 sentences) and focus on your most
          relevant achievements and skills.
        </p>
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>

      <AIEnhancementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        originalText={resumeData.professional_summary}
        type="summary"
        onAccept={handleAcceptEnhancement}
      />
    </div>
  )
}

