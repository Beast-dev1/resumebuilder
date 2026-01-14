import { useState, FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import api from '../utils/api'
import { setToken } from '../utils/auth'

function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number'
    }
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    setSubmitError('')
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters'
    }

    // Email validation
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address'
    }

    // Password validation
    const passwordError = validatePassword(formData.password)
    if (passwordError) {
      newErrors.password = passwordError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUp.tsx:77',message:'handleSubmit entry',data:{name:formData.name,email:formData.email,passwordLength:formData.password.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    try {
      // #region agent log
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      console.log('[DEBUG] Before API call:', { url: '/api/auth/signup', baseURL: apiBaseUrl, fullUrl: `${apiBaseUrl}/api/auth/signup` });
      fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUp.tsx:88',message:'Before API call',data:{url:'/api/auth/signup',baseURL:apiBaseUrl,requestBody:{name:formData.name.trim(),email:formData.email.trim().toLowerCase(),passwordLength:formData.password.length}},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion

      const response = await api.post('/api/auth/signup', {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUp.tsx:93',message:'API call success',data:{status:response.status,hasSuccess:response.data.success,hasToken:!!response.data.data?.token},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      if (response.data.success && response.data.data.token) {
        setToken(response.data.data.token)
        navigate({ to: '/dashboard' })
      } else {
        setSubmitError('Sign up failed. Please try again.')
      }
    } catch (error: any) {
      // #region agent log
      console.error('[DEBUG] API call error:', error);
      console.error('[DEBUG] Error details:', { hasResponse: !!error.response, status: error.response?.status, statusText: error.response?.statusText, code: error.code, message: error.message });
      fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUp.tsx:100',message:'API call error',data:{hasResponse:!!error.response,status:error.response?.status,statusText:error.response?.statusText,hasData:!!error.response?.data,message:error.response?.data?.message,errors:error.response?.data?.errors,code:error.code,message2:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else if (error.response?.data?.message) {
        setSubmitError(error.response.data.message)
      } else {
        setSubmitError('An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] via-[#FDFEFF] to-[#ECFDF5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Sign Up</h1>
          
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {submitError}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition outline-none ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition outline-none ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition outline-none ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Create a password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white font-medium py-3 px-6 rounded-full hover:bg-green-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-700 transition font-medium">
              Login
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

export default SignUp

