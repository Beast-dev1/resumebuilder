import { ResumeData, Project } from '../../../types/resume'

interface ProjectsStepProps {
  resumeData: ResumeData
  onUpdateProject: (index: number, field: keyof Project, value: any) => void
  onAddProject: () => void
  onRemoveProject: (index: number) => void
  onSave: () => Promise<void>
  isSaving: boolean
}

export default function ProjectsStep({
  resumeData,
  onUpdateProject,
  onAddProject,
  onRemoveProject,
  onSave,
  isSaving,
}: ProjectsStepProps) {
  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Projects
        </h2>
        <p className="text-sm md:text-base text-gray-600">Add your projects</p>
      </div>

      <div className="space-y-6">
        {resumeData.project.map((proj, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">
                Project #{index + 1}
              </h3>
              {resumeData.project.length > 1 && (
                <button
                  onClick={() => onRemoveProject(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => onUpdateProject(index, 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type
              </label>
              <input
                type="text"
                value={proj.type}
                onChange={(e) => onUpdateProject(index, 'type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Web Application, Mobile App, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={proj.description}
                onChange={(e) => onUpdateProject(index, 'description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your project..."
              />
            </div>
          </div>
        ))}

        <button
          onClick={onAddProject}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
        >
          + Add Project
        </button>
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

