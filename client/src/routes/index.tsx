import { Link } from '@tanstack/react-router'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Resume Builder
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-600 transition-all duration-200 transform hover:scale-105 shadow-md text-center"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-purple-600 border-2 border-purple-500 font-semibold py-3 px-6 rounded-lg hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 shadow-md text-center"
          >
            Sign Up
          </Link>
        </div>
        
        <div className="text-center">
          <Link
            to="/builder"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Start Building Your Resume
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

