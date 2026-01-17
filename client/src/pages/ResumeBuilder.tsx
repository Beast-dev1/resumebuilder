import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import Header from '../components/ui/Header'
import ResumePreview from '../components/resume/ResumePreview'

const TOTAL_STEPS = 6

const TEMPLATES = [
  { id: 'classic', name: 'Classic' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'modern', name: 'Modern' },
  { id: 'minimal-image', name: 'Minimal Image' },
]

const ACCENT_COLORS = [
  '#3B82F6', // blue
  '#10B981', // emerald
  '#8B5CF6', // purple
  '#F59E0B', // amber
  '#EF4444', // red
  '#06B6D4', // cyan
  '#EC4899', // pink
  '#6366F1', // indigo
]

function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [accentColor, setAccentColor] = useState('#3B82F6')
  const [isPublic, setIsPublic] = useState(false)
  const [copyLabel, setCopyLabel] = useState('Copy link')
  const [showTemplateMenu, setShowTemplateMenu] = useState(false)
  const [showAccentMenu, setShowAccentMenu] = useState(false)

  const [resumeData, setResumeData] = useState({
    personal_info: {
      full_name: 'prakash rai',
      email: 'prakashrai@gmail.com',
      phone: '9876545672',
      location: 'Kathmandu',
      profession: 'Web Developer',
      linkedin: 'www.linkedin/prakashin',
      website: 'https://prakash-os-portfolio.vercel.app/desktop',
      image: null as File | string | null,
    },
    professional_summary: 'im a full stack deveoper with react and node js',
    experience: [
      {
        company: 'aweb',
        position: 'full stack',
        start_date: '2026-02',
        end_date: '2026-06',
        is_current: false,
        description: '',
      },
    ],
    education: [
      {
        institution: 'CAB',
        degree: 'bachelor',
        field: 'Csit',
        graduation_date: '2026-02',
        gpa: '3.4',
      },
    ],
    project: [
      {
        name: 'hotal mang system',
        type: '',
        description: '',
      },
    ],
    skills: [] as string[],
  })

  const [newSkill, setNewSkill] = useState('')

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

  const updatePersonalInfo = (field: string, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        [field]: value,
      },
    }))
  }

  const updateExperience = (index: number, field: string, value: any) => {
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

  const updateEducation = (index: number, field: string, value: any) => {
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

  const updateProject = (index: number, field: string, value: any) => {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updatePersonalInfo('image', file)
    }
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return ''
    if (dateStr.includes('-') && dateStr.length === 7) {
      return dateStr + '-01'
    }
    return dateStr
  }

  const formatDateForState = (dateStr: string) => {
    if (!dateStr) return ''
    return dateStr.substring(0, 7)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Personal Information
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Get Started with the personal information
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload User Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {resumeData.personal_info.image ? (
                      <img
                        src={
                          typeof resumeData.personal_info.image === 'string'
                            ? resumeData.personal_info.image
                            : URL.createObjectURL(resumeData.personal_info.image)
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700">
                      Choose Image
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={resumeData.personal_info.full_name}
                  onChange={(e) =>
                    updatePersonalInfo('full_name', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={resumeData.personal_info.email}
                  onChange={(e) =>
                    updatePersonalInfo('email', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={resumeData.personal_info.phone}
                  onChange={(e) =>
                    updatePersonalInfo('phone', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={resumeData.personal_info.location}
                  onChange={(e) =>
                    updatePersonalInfo('location', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  value={resumeData.personal_info.profession}
                  onChange={(e) =>
                    updatePersonalInfo('profession', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={resumeData.personal_info.linkedin}
                  onChange={(e) =>
                    updatePersonalInfo('linkedin', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Website
                </label>
                <input
                  type="url"
                  value={resumeData.personal_info.website}
                  onChange={(e) =>
                    updatePersonalInfo('website', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-5 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Add summary for your resume here
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium text-sm">
                  AI Enhance
                </button>
              </div>

              <div>
                <textarea
                  value={resumeData.professional_summary}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      professional_summary: e.target.value,
                    }))
                  }
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your professional background..."
                />
              </div>

              <p className="text-sm text-gray-500">
                Tip: Keep it concise (3-4 sentences) and focus on your most
                relevant achievements and skills.
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-5 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Professional Experience
              </h2>
              <p className="text-sm md:text-base text-gray-600">Add your job experience</p>
            </div>

            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      Experience #{index + 1}
                    </h3>
                    {resumeData.experience.length > 1 && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(index, 'company', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(index, 'position', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={formatDateForInput(exp.start_date)}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'start_date',
                            formatDateForState(e.target.value)
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={formatDateForInput(exp.end_date)}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'end_date',
                            formatDateForState(e.target.value)
                          )
                        }
                        disabled={exp.is_current}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={exp.is_current}
                      onChange={(e) => {
                        updateExperience(index, 'is_current', e.target.checked)
                        if (e.target.checked) {
                          updateExperience(index, 'end_date', '')
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor={`current-${index}`}
                      className="text-sm text-gray-700"
                    >
                      Currently working here
                    </label>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Job Description
                      </label>
                      <button className="text-sm text-purple-600 hover:text-purple-700">
                        Enhance with AI
                      </button>
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(index, 'description', e.target.value)
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your key responsibilities and achievements..."
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addExperience}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
              >
                + Add Experience
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-5 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Education
              </h2>
              <p className="text-sm md:text-base text-gray-600">Add your education details</p>
            </div>

            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      Education #{index + 1}
                    </h3>
                    {resumeData.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, 'institution', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, 'degree', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(index, 'field', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Graduation Date
                      </label>
                      <input
                        type="month"
                        value={formatDateForInput(edu.graduation_date)}
                        onChange={(e) =>
                          updateEducation(
                            index,
                            'graduation_date',
                            formatDateForState(e.target.value)
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPA
                      </label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) =>
                          updateEducation(index, 'gpa', e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3.4"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addEducation}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
              >
                + Add Education
              </button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-5 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Projects
              </h2>
              <p className="text-sm md:text-base text-gray-600">Add your projects</p>
            </div>

            <div className="space-y-6">
              {resumeData.project.map((proj, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      Project #{index + 1}
                    </h3>
                    {resumeData.project.length > 1 && (
                      <button
                        onClick={() => removeProject(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) =>
                        updateProject(index, 'name', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <input
                      type="text"
                      value={proj.type}
                      onChange={(e) =>
                        updateProject(index, 'type', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Web Application, Mobile App, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={proj.description}
                      onChange={(e) =>
                        updateProject(index, 'description', e.target.value)
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your project..."
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addProject}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
              >
                + Add Project
              </button>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-5 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Skills</h2>
              <p className="text-sm md:text-base text-gray-600">
                Add your technical and soft skills
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                  placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addSkill}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add
                </button>
              </div>

              {resumeData.skills.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 mb-2">No skills added yet.</p>
                  <p className="text-sm text-gray-400">
                    Add your technical and soft skills above.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                    >
                      <span className="text-sm">{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-500">
                Tip: Add 8-12 relevant skills. Include both technical skills
                (programming languages, tools) and soft skills (leadership,
                communication).
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        username="prakash"
        recentResumes={0}
        isLoading={false}
        onLogout={() => {}}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-100 shadow-sm px-4 md:px-6 py-4 md:py-6 mb-4 md:mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium mb-4"
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

          <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
            <div className="flex flex-col w-full sm:w-40 text-sm relative">
              <button
                onClick={() => {
                  setShowTemplateMenu(!showTemplateMenu)
                  setShowAccentMenu(false)
                }}
                className="peer w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none flex items-center justify-between"
              >
                <span>
                  {TEMPLATES.find((t) => t.id === selectedTemplate)?.name ||
                    'Template'}
                </span>
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

              {showTemplateMenu && (
                <ul className="absolute z-10 top-full overflow-hidden right-0 w-40 bg-white border border-gray-300 rounded shadow-md mt-2 py-1">
                  {TEMPLATES.map((template) => (
                    <li
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setShowTemplateMenu(false)
                      }}
                      className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    >
                      {template.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col w-full sm:w-40 text-sm relative">
              <button
                onClick={() => {
                  setShowAccentMenu(!showAccentMenu)
                  setShowTemplateMenu(false)
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

              {showAccentMenu && (
                <div className="absolute z-10 top-full right-0 w-48 bg-white border border-gray-300 rounded shadow-md mt-2 p-3">
                  <div className="grid grid-cols-4 gap-2">
                    {ACCENT_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setAccentColor(color)
                          setShowAccentMenu(false)
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

            <div className="flex-1" />

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

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / TOTAL_STEPS) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-3 pt-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === TOTAL_STEPS}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-250px)]">
            {renderStepContent()}
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
            <div className="h-full">
              <ResumePreview
                data={resumeData}
                templateId={selectedTemplate}
                accentColor={accentColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
