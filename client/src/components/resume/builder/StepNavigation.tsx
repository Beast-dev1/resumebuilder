import { TOTAL_STEPS } from '../../../constants/resume'

interface StepNavigationProps {
  currentStep: number
  onPrevious: () => void
  onNext: () => void
}

export default function StepNavigation({
  currentStep,
  onPrevious,
  onNext,
}: StepNavigationProps) {
  return (
    <>
      <div className="flex-1" />
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-1 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Previous</span>
      </button>
      <button
        onClick={onNext}
        disabled={currentStep === TOTAL_STEPS}
        className="flex items-center gap-1 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        <span>Next</span>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </>
  )
}

