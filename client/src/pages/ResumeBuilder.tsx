import { useSearch } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import Header from '../components/ui/Header'
import ResumePreview from '../components/resume/ResumePreview'
import PersonalInfoStep from '../components/resume/builder/PersonalInfoStep'
import ProfessionalSummaryStep from '../components/resume/builder/ProfessionalSummaryStep'
import ExperienceStep from '../components/resume/builder/ExperienceStep'
import EducationStep from '../components/resume/builder/EducationStep'
import ProjectsStep from '../components/resume/builder/ProjectsStep'
import SkillsStep from '../components/resume/builder/SkillsStep'
import ResumeBuilderTopBar from '../components/resume/builder/ResumeBuilderTopBar'
import ResumeBuilderProgressBar from '../components/resume/builder/ResumeBuilderProgressBar'
import TemplateSelector from '../components/resume/builder/TemplateSelector'
import AccentColorSelector from '../components/resume/builder/AccentColorSelector'
import StepNavigation from '../components/resume/builder/StepNavigation'
import { useResumeData } from '../hooks/useResumeData'
import { useResumeLoader } from '../hooks/useResumeLoader'
import { useResumeSaver } from '../hooks/useResumeSaver'
import { usePDFDownload } from '../hooks/usePDFDownload'
import { TOTAL_STEPS } from '../constants/resume'

function ResumeBuilder() {
  const { resumeId: searchResumeId } = useSearch({ from: '/builder' })
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [accentColor, setAccentColor] = useState('#3B82F6')
  const [isPublic, setIsPublic] = useState(false)
  const [showTemplateMenu, setShowTemplateMenu] = useState(false)
  const [showAccentMenu, setShowAccentMenu] = useState(false)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const {
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
  } = useResumeData()

  useResumeLoader({
    searchResumeId,
    resumeId,
    onResumeLoaded: (data) => {
      setResumeId(data.resumeId)
      if (data.template) {
        setSelectedTemplate(data.template)
      }
      if (data.accentColor) {
        setAccentColor(data.accentColor)
      }
      if (data.isPublic !== undefined) {
        setIsPublic(data.isPublic)
      }
      setResumeDataState(data.resumeData)
    },
  })

  const { isSaving, handleSaveChanges } = useResumeSaver({
    resumeId,
    resumeData,
    selectedTemplate,
    accentColor,
    isPublic,
    currentStep,
    onResumeIdSet: setResumeId,
  })

  const { isDownloading, handleDownloadPDF } = usePDFDownload(previewRef, resumeData)

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            resumeData={resumeData}
            onUpdatePersonalInfo={updatePersonalInfo}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )

      case 2:
        return (
          <ProfessionalSummaryStep
            resumeData={resumeData}
            onUpdateSummary={updateProfessionalSummary}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )

      case 3:
        return (
          <ExperienceStep
            resumeData={resumeData}
            onUpdateExperience={updateExperience}
            onAddExperience={addExperience}
            onRemoveExperience={removeExperience}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )

      case 4:
        return (
          <EducationStep
            resumeData={resumeData}
            onUpdateEducation={updateEducation}
            onAddEducation={addEducation}
            onRemoveEducation={removeEducation}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )

      case 5:
        return (
          <ProjectsStep
            resumeData={resumeData}
            onUpdateProject={updateProject}
            onAddProject={addProject}
            onRemoveProject={removeProject}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )

      case 6:
        return (
          <SkillsStep
            resumeData={resumeData}
            newSkill={newSkill}
            onNewSkillChange={setNewSkill}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
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
        <ResumeBuilderTopBar
          isPublic={isPublic}
          onTogglePublic={() => setIsPublic((prev) => !prev)}
          onDownload={handleDownloadPDF}
          isDownloading={isDownloading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left column: 2/5 width (form area) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6 relative">
            <ResumeBuilderProgressBar currentStep={currentStep} />

            {/* Template, Accent, Previous, Next buttons on same row */}
            <div className="flex items-center gap-3 mb-4 pt-1">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
                showMenu={showTemplateMenu}
                onToggleMenu={() => {
                  setShowTemplateMenu(!showTemplateMenu)
                  setShowAccentMenu(false)
                }}
                onCloseMenu={() => setShowTemplateMenu(false)}
              />

              <AccentColorSelector
                accentColor={accentColor}
                onSelectColor={setAccentColor}
                showMenu={showAccentMenu}
                onToggleMenu={() => {
                  setShowAccentMenu(!showAccentMenu)
                  setShowTemplateMenu(false)
                }}
                onCloseMenu={() => setShowAccentMenu(false)}
              />

              <StepNavigation
                currentStep={currentStep}
                onPrevious={prevStep}
                onNext={nextStep}
              />
            </div>

            {renderStepContent()}
          </div>

          {/* Right column: 3/5 width (preview area) */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
            <div className="h-full" ref={previewRef}>
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
