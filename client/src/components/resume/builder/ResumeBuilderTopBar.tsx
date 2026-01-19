import { Link } from '@tanstack/react-router'

interface ResumeBuilderTopBarProps {
  isPublic: boolean
  onTogglePublic: () => void
  onDownload: () => void
  isDownloading: boolean
}

export default function ResumeBuilderTopBar({
  isPublic,
  onTogglePublic,
  onDownload,
  isDownloading,
}: ResumeBuilderTopBarProps) {
  return (
    <div className="w-full flex items-center justify-between mb-4">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onTogglePublic}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition ${
            isPublic
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-purple-50 text-purple-700 border-purple-200'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isPublic ? (
              <>
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                <circle cx="12" cy="12" r="3" />
              </>
            ) : (
              <>
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21 21 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.04 21.04 0 0 1-3.17 4.47" />
                <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
                <path d="M1 1l22 22" />
              </>
            )}
          </svg>
          {isPublic ? 'Public' : 'Private'}
        </button>

        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="M7 10l5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
          {isDownloading ? 'Downloading...' : 'Download'}
        </button>
      </div>
    </div>
  )
}

