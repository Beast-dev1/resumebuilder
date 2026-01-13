import { Link } from '@tanstack/react-router'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <Link
              to="/builder"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600 transition-all duration-200 shadow-md"
            >
              Create New Resume
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="font-semibold text-gray-800 mb-2">My Resumes</h3>
              <p className="text-gray-600 text-sm">View and manage your saved resumes</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-800 mb-2">Templates</h3>
              <p className="text-gray-600 text-sm">Browse available resume templates</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-800 mb-2">Settings</h3>
              <p className="text-gray-600 text-sm">Manage your account settings</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

