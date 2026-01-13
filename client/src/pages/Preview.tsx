import { Link } from '@tanstack/react-router'

function Preview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Resume Preview</h1>
            <div className="flex gap-2">
              <button className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md">
                Download PDF
              </button>
              <Link
                to="/builder"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 transition-all duration-200 shadow-md"
              >
                Edit Resume
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Your Resume Preview</h2>
              <p className="text-gray-600">Resume content will appear here</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/builder" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Builder
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview

