import { TOTAL_STEPS } from '../../../constants/resume'

interface ResumeBuilderProgressBarProps {
  currentStep: number
}

export default function ResumeBuilderProgressBar({
  currentStep,
}: ResumeBuilderProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-xl">
      <div
        className="bg-blue-600 h-1 rounded-t-xl transition-all duration-300"
        style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
      />
    </div>
  )
}

