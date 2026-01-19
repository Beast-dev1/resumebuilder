import { useState } from 'react'
import { ResumeData, PersonalInfo, Experience, Education, Project } from '../types/resume'

const initialResumeData: ResumeData = {
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
  experience: [
    {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
    },
  ],
  education: [
    {
      institution: '',
      degree: '',
      field: '',
      graduation_date: '',
      gpa: '',
    },
  ],
  project: [
    {
      name: '',
      type: '',
      description: '',
    },
  ],
  skills: [],
}

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [newSkill, setNewSkill] = useState('')

  const updatePersonalInfo = (field: keyof PersonalInfo, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        [field]: value,
      },
    }))
  }

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          position: '',
          start_date: '',
          end_date: '',
          is_current: false,
          description: '',
        },
      ],
    }))
  }

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }))
  }

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: '',
          degree: '',
          field: '',
          graduation_date: '',
          gpa: '',
        },
      ],
    }))
  }

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const updateProject = (index: number, field: keyof Project, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      project: prev.project.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      ),
    }))
  }

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      project: [
        ...prev.project,
        {
          name: '',
          type: '',
          description: '',
        },
      ],
    }))
  }

  const removeProject = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      project: prev.project.filter((_, i) => i !== index),
    }))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const updateProfessionalSummary = (value: string) => {
    setResumeData((prev) => ({
      ...prev,
      professional_summary: value,
    }))
  }

  const setResumeDataState = (data: ResumeData) => {
    setResumeData(data)
  }

  return {
    resumeData,
    newSkill,
    setNewSkill,
    updatePersonalInfo,
    updateExperience,
    addExperience,
    removeExperience,
    updateEducation,
    addEducation,
    removeEducation,
    updateProject,
    addProject,
    removeProject,
    addSkill,
    removeSkill,
    updateProfessionalSummary,
    setResumeDataState,
  }
}

