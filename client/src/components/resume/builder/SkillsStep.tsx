import { ResumeData } from '../../../types/resume'

interface SkillsStepProps {
  resumeData: ResumeData
  newSkill: string
  onNewSkillChange: (value: string) => void
  onAddSkill: () => void
  onRemoveSkill: (index: number) => void
  onSave: () => Promise<void>
  isSaving: boolean
}

export default function SkillsStep({
  resumeData,
  newSkill,
  onNewSkillChange,
  onAddSkill,
  onRemoveSkill,
  onSave,
  isSaving,
}: SkillsStepProps) {
  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-sm md:text-base text-gray-600">
          Add your technical and soft skills
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => onNewSkillChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onAddSkill()
              }
            }}
            placeholder="Enter a skill (e.g., JavaScript, Project Management)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={onAddSkill}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add
          </button>
        </div>

        {resumeData.skills.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-2">No skills added yet.</p>
            <p className="text-sm text-gray-400">
              Add your technical and soft skills above.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                <span className="text-sm">{skill}</span>
                <button
                  onClick={() => onRemoveSkill(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-500">
          Tip: Add 8-12 relevant skills. Include both technical skills
          (programming languages, tools) and soft skills (leadership,
          communication).
        </p>
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

