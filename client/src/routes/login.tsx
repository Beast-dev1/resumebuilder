import { Link } from '@tanstack/react-router'

function Login() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] via-[#FDFEFF] to-[#ECFDF5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Login</h1>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition outline-none"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition outline-none"
                placeholder="Enter your password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-medium py-3 px-6 rounded-full hover:bg-green-700 transition shadow-md"
            >
              Login
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:text-green-700 transition font-medium">
              Sign Up
            </Link>
          </p>
          
          <div className="text-center">
            <Link to="/" className="text-gray-500 hover:text-green-600 transition text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

