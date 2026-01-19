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
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentStep === TOTAL_STEPS}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </>
  )
}

