import { useState } from 'react'
import { ResumeData, Experience } from '../../../types/resume'
import { formatDateForInput, formatDateForState } from '../../../utils/resume'
import AIEnhancementModal from './AIEnhancementModal'

interface ExperienceStepProps {
  resumeData: ResumeData
  onUpdateExperience: (index: number, field: keyof Experience, value: any) => void
  onAddExperience: () => void
  onRemoveExperience: (index: number) => void
  onSave: () => Promise<void>
  isSaving: boolean
}

export default function ExperienceStep({
  resumeData,
  onUpdateExperience,
  onAddExperience,
  onRemoveExperience,
  onSave,
  isSaving,
}: ExperienceStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [enhancingIndex, setEnhancingIndex] = useState<number | null>(null)

  const handleOpenEnhancement = (index: number) => {
    setEnhancingIndex(index)
    setIsModalOpen(true)
  }

  const handleAcceptEnhancement = (enhancedText: string) => {
    if (enhancingIndex !== null) {
      onUpdateExperience(enhancingIndex, 'description', enhancedText)
    }
    setIsModalOpen(false)
    setEnhancingIndex(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEnhancingIndex(null)
  }
  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Professional Experience
        </h2>
        <p className="text-sm md:text-base text-gray-600">Add your job experience</p>
      </div>

      <div className="space-y-6">
        {resumeData.experience.map((exp, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">
                Experience #{index + 1}
              </h3>
              {resumeData.experience.length > 1 && (
                <button
                  onClick={() => onRemoveExperience(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => onUpdateExperience(index, 'company', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => onUpdateExperience(index, 'position', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={formatDateForInput(exp.start_date)}
                  onChange={(e) =>
                    onUpdateExperience(
                      index,
                      'start_date',
                      formatDateForState(e.target.value)
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={formatDateForInput(exp.end_date)}
                  onChange={(e) =>
                    onUpdateExperience(
                      index,
                      'end_date',
                      formatDateForState(e.target.value)
                    )
                  }
                  disabled={exp.is_current}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${index}`}
                checked={exp.is_current}
                onChange={(e) => {
                  onUpdateExperience(index, 'is_current', e.target.checked)
                  if (e.target.checked) {
                    onUpdateExperience(index, 'end_date', '')
                  }
                }}
                className="w-4 h-4"
              />
              <label
                htmlFor={`current-${index}`}
                className="text-sm text-gray-700"
              >
                Currently working here
              </label>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <button
                  onClick={() => handleOpenEnhancement(index)}
                  className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Enhance with AI
                </button>
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => onUpdateExperience(index, 'description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your key responsibilities and achievements..."
              />
            </div>
          </div>
        ))}

        <button
          onClick={onAddExperience}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
        >
          + Add Experience
        </button>
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>

      {enhancingIndex !== null && (
        <AIEnhancementModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          originalText={resumeData.experience[enhancingIndex]?.description || ''}
          type="description"
          onAccept={handleAcceptEnhancement}
        />
      )}
    </div>
  )
}

