import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { createResume, updateResume } from '../utils/api'
import { ResumeData } from '../types/resume'
import { TOTAL_STEPS } from '../constants/resume'

interface UseResumeSaverProps {
  resumeId: string | null
  resumeData: ResumeData
  selectedTemplate: string
  accentColor: string
  isPublic: boolean
  currentStep: number
  onResumeIdSet: (id: string) => void
}

export const useResumeSaver = ({
  resumeId,
  resumeData,
  selectedTemplate,
  accentColor,
  isPublic,
  currentStep,
  onResumeIdSet,
}: UseResumeSaverProps) => {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true)

      // Prepare resume data for API
      // Note: File objects for images need separate upload handling
      // For now, we only save image URLs (strings), not File objects
      const personalInfoForSave = {
        ...resumeData.personal_info,
        image: typeof resumeData.personal_info.image === 'string' 
          ? resumeData.personal_info.image 
          : null, // Don't save File objects - they need to be uploaded separately
      }

      const resumePayload = {
        title: 'My Resume',
        personal_info: personalInfoForSave,
        professional_summary: resumeData.professional_summary,
        skills: resumeData.skills,
        experience: resumeData.experience,
        education: resumeData.education,
        project: resumeData.project,
        template: selectedTemplate,
        accent_color: accentColor,
        public: isPublic,
      }

      if (resumeId) {
        // Update existing resume
        await updateResume(resumeId, resumePayload)
      } else {
        // Create new resume
        const response = await createResume(resumePayload)
        if (response.success && response.data?._id) {
          onResumeIdSet(response.data._id)
        }
      }

      // On step 6, redirect to dashboard after saving
      if (currentStep === TOTAL_STEPS) {
        navigate({ to: '/dashboard' })
      }
    } catch (error: any) {
      console.error('Error saving resume:', error)
      alert(error.response?.data?.message || 'Failed to save resume. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return { isSaving, handleSaveChanges }
}

