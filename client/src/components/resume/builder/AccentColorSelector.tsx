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
        className="peer w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none flex items-center justify-between"
      >
        <span>Accent</span>
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

