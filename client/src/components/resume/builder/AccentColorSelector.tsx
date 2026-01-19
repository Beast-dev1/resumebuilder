import { ACCENT_COLORS } from '../../../constants/resume'

interface AccentColorSelectorProps {
  accentColor: string
  onSelectColor: (color: string) => void
  showMenu: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

export default function AccentColorSelector({
  accentColor,
  onSelectColor,
  showMenu,
  onToggleMenu,
  onCloseMenu,
}: AccentColorSelectorProps) {
  return (
    <div className="flex flex-col text-sm relative">
      <button
        onClick={() => {
          onToggleMenu()
        }}
        className="peer w-full text-left px-3 py-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 focus:outline-none flex items-center gap-2 transition-colors"
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        <span className="font-medium">Accent</span>
      </button>

      {showMenu && (
        <div className="absolute z-10 top-full left-0 w-48 bg-white border border-gray-300 rounded shadow-md mt-2 p-3">
          <div className="grid grid-cols-4 gap-2">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onSelectColor(color)
                  onCloseMenu()
                }}
                className={`w-8 h-8 rounded-full border-2 ${
                  accentColor === color
                    ? 'border-gray-800'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

