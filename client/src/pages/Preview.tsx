import { Link } from '@tanstack/react-router'
import ResumePreview from '../components/resume/ResumePreview'

function Preview() {
  // Using dummy data for preview - in a real app, this would come from state/API
  const dummyData = {
    personal_info: {
      full_name: 'prakash rai',
      email: 'prakashrai@gmail.com',
      phone: '9876545672',
      location: 'Kathmandu',
      profession: 'Web Developer',
      linkedin: 'www.linkedin/prakashin',
      website: 'https://prakash-os-portfolio.vercel.app/desktop',
      image: null,
    },
    professional_summary:
      'im a full stack deveoper with react and node js',
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
    skills: [],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Resume Preview</h1>
            <div className="flex gap-2">
              <button className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md">
                Download PDF
              </button>
              <Link
                to="/builder"
                search={{ resumeId: undefined }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 transition-all duration-200 shadow-md"
              >
                Edit Resume
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <ResumePreview
              data={dummyData}
              templateId="classic"
              accentColor="#3B82F6"
            />
          </div>

          <div className="text-center">
            <Link to="/builder" search={{ resumeId: undefined }} className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Builder
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
