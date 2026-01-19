import { TEMPLATES } from '../../../constants/resume'

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
  showMenu: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  showMenu,
  onToggleMenu,
  onCloseMenu,
}: TemplateSelectorProps) {
  return (
    <div className="flex flex-col text-sm relative">
      <button
        onClick={() => {
          onToggleMenu()
        }}
        className="peer w-full text-left px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none flex items-center gap-2 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
          />
        </svg>
        <span className="font-medium">
          {TEMPLATES.find((t) => t.id === selectedTemplate)?.name || 'Template'}
        </span>
      </button>

      {showMenu && (
        <ul className="absolute z-10 top-full overflow-hidden left-0 w-40 bg-white border border-gray-300 rounded shadow-md mt-2 py-1">
          {TEMPLATES.map((template) => (
            <li
              key={template.id}
              onClick={() => {
                onSelectTemplate(template.id)
                onCloseMenu()
              }}
              className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
            >
              {template.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

