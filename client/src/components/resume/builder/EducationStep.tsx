import { ResumeData, Education } from '../../../types/resume'
import { formatDateForInput, formatDateForState } from '../../../utils/resume'

interface EducationStepProps {
  resumeData: ResumeData
  onUpdateEducation: (index: number, field: keyof Education, value: any) => void
  onAddEducation: () => void
  onRemoveEducation: (index: number) => void
  onSave: () => Promise<void>
  isSaving: boolean
}

export default function EducationStep({
  resumeData,
  onUpdateEducation,
  onAddEducation,
  onRemoveEducation,
  onSave,
  isSaving,
}: EducationStepProps) {
  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Education
        </h2>
        <p className="text-sm md:text-base text-gray-600">Add your education details</p>
      </div>

      <div className="space-y-6">
        {resumeData.education.map((edu, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">
                Education #{index + 1}
              </h3>
              {resumeData.education.length > 1 && (
                <button
                  onClick={() => onRemoveEducation(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => onUpdateEducation(index, 'institution', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => onUpdateEducation(index, 'degree', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => onUpdateEducation(index, 'field', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Date
                </label>
                <input
                  type="month"
                  value={formatDateForInput(edu.graduation_date)}
                  onChange={(e) =>
                    onUpdateEducation(
                      index,
                      'graduation_date',
                      formatDateForState(e.target.value)
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => onUpdateEducation(index, 'gpa', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="3.4"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={onAddEducation}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
        >
          + Add Education
        </button>
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

