import { useEffect, useState } from 'react'
import { getResume } from '../utils/api'
import { ResumeData } from '../types/resume'

interface UseResumeLoaderProps {
  searchResumeId: string | undefined
  resumeId: string | null
  onResumeLoaded: (data: {
    resumeId: string
    template?: string
    accentColor?: string
    isPublic?: boolean
    resumeData: ResumeData
  }) => void
}

export const useResumeLoader = ({
  searchResumeId,
  resumeId,
  onResumeLoaded,
}: UseResumeLoaderProps) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadResumeData = async () => {
      if (searchResumeId && resumeId !== searchResumeId) {
        try {
          setIsLoading(true)
          const response = await getResume(searchResumeId)
          if (response.success && response.data) {
            const data = response.data

            // Set resume data
            if (data.resumeData || data.personal_info || data.professional_summary) {
              const resumeData: ResumeData = {
                personal_info: {
                  full_name: data.resumeData?.personal_info?.full_name || data.personal_info?.full_name || '',
                  email: data.resumeData?.personal_info?.email || data.personal_info?.email || '',
                  phone: data.resumeData?.personal_info?.phone || data.personal_info?.phone || '',
                  location: data.resumeData?.personal_info?.location || data.personal_info?.location || '',
                  profession: data.resumeData?.personal_info?.profession || data.personal_info?.profession || '',
                  linkedin: data.resumeData?.personal_info?.linkedin || data.personal_info?.linkedin || '',
                  website: data.resumeData?.personal_info?.website || data.personal_info?.website || '',
                  image: data.resumeData?.personal_info?.image || data.personal_info?.image || null,
                },
                professional_summary: data.resumeData?.professional_summary || data.professional_summary || '',
                experience: data.resumeData?.experience || data.experience || [{
                  company: '',
                  position: '',
                  start_date: '',
                  end_date: '',
                  is_current: false,
                  description: '',
                }],
                education: data.resumeData?.education || data.education || [{
                  institution: '',
                  degree: '',
                  field: '',
                  graduation_date: '',
                  gpa: '',
                }],
                project: data.resumeData?.project || data.project || [{
                  name: '',
                  type: '',
                  description: '',
                }],
                skills: data.resumeData?.skills || data.skills || [],
              }

              onResumeLoaded({
                resumeId: data._id,
                template: data.template,
                accentColor: data.accent_color,
                isPublic: data.public,
                resumeData,
              })
            } else {
              onResumeLoaded({
                resumeId: data._id,
                template: data.template,
                accentColor: data.accent_color,
                isPublic: data.public,
                resumeData: {
                  personal_info: {
                    full_name: '',
                    email: '',
                    phone: '',
                    location: '',
                    profession: '',
                    linkedin: '',
                    website: '',
                    image: null,
                  },
                  professional_summary: '',
                  experience: [],
                  education: [],
                  project: [],
                  skills: [],
                },
              })
            }
          }
        } catch (error) {
          console.error('Error loading resume data:', error)
          alert('Failed to load resume data. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadResumeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResumeId])

  return { isLoading }
}

