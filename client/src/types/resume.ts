export interface PersonalInfo {
  full_name: string
  email: string
  phone: string
  location: string
  profession: string
  linkedin: string
  website: string
  image: File | string | null
}

export interface Experience {
  company: string
  position: string
  start_date: string
  end_date: string
  is_current: boolean
  description: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  graduation_date: string
  gpa: string
}

export interface Project {
  name: string
  type: string
  description: string
}

export interface ResumeData {
  personal_info: PersonalInfo
  professional_summary: string
  experience: Experience[]
  education: Education[]
  project: Project[]
  skills: string[]
}

