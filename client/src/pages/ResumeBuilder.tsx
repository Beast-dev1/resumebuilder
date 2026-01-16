import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import Header from '../components/ui/Header'

function ResumeBuilder() {
  const [isPublic, setIsPublic] = useState(false)
  const [copyLabel, setCopyLabel] = useState('Copy link')
  const resumeUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/preview` : ''

  const handleShare = async () => {
    if (!resumeUrl) return

    try {
      await navigator.clipboard.writeText(resumeUrl)
      setCopyLabel('Copied')
      window.setTimeout(() => setCopyLabel('Copy link'), 2000)
    } catch {
      setCopyLabel('Copy failed')
      window.setTimeout(() => setCopyLabel('Copy link'), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        username="Guest"
        recentResumes={0}
        isLoading={false}
        onLogout={() => {}}
      />
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-100 shadow-sm px-4 md:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPublic((prev) => !prev)}
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

            {isPublic && (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 transition"
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
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.59 13.51 15.42 17.49" />
                  <path d="M15.41 6.51 8.59 10.49" />
                </svg>
                {copyLabel}
              </button>
            )}

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition"
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
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder

