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
        className="peer w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none flex items-center justify-between"
      >
        <span>
          {TEMPLATES.find((t) => t.id === selectedTemplate)?.name || 'Template'}
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
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

