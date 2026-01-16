import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { getResumes, uploadResume, deleteResume } from '../utils/api';
import ResumeCard from '../components/dashboard/ResumeCard';
import FileUpload from '../components/dashboard/FileUpload';
import Header from '../components/ui/Header';
import { getToken, removeToken } from '../utils/auth';

interface Resume {
  _id: string;
  title: string;
  updatedAt: string;
  fileType?: string;
  fileUrl?: string;
  resumeData?: Record<string, any>;
}

function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getResumes();
      if (response.success && response.data) {
        setResumes(response.data);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        // Token expired or invalid
        removeToken();
        navigate({ to: '/login' });
      } else {
        setError('Failed to load resumes. Please try again.');
        console.error('Error fetching resumes:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setError('');
      const response = await uploadResume(file);
      if (response.success) {
        // Refresh resumes list
        await fetchResumes();
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Upload failed. Please try again.';
      setError(errorMessage);
      throw err; // Re-throw so FileUpload can handle it
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      setDeletingId(id);
      setError('');
      const response = await deleteResume(id);
      if (response.success) {
        // Remove from local state
        setResumes(resumes.filter(r => r._id !== id));
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete resume. Please try again.');
      console.error('Error deleting resume:', err);
    } finally {
      setDeletingId(null);
    }
  };

  // Calculate statistics
  const totalResumes = resumes.length;
  const recentResumes = resumes.filter(r => {
    const daysSinceUpdate = (Date.now() - new Date(r.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate <= 7;
  }).length;
  const getUsernameFromToken = (): string => {
    const token = getToken();
    if (!token) return 'User';
    const parts = token.split('.');
    if (parts.length < 2) return 'User';

    try {
      const normalized = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padding = normalized.length % 4 ? '='.repeat(4 - (normalized.length % 4)) : '';
      const decoded = atob(normalized + padding);
      const payload = JSON.parse(decoded);
      const rawName =
        payload?.name ||
        payload?.username ||
        payload?.user?.name ||
        payload?.email ||
        payload?.user?.email;
      if (typeof rawName !== 'string' || rawName.length === 0) return 'User';
      return rawName.includes('@') ? rawName.split('@')[0] : rawName;
    } catch {
      return 'User';
    }
  };
  const username = getUsernameFromToken();

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <Header
          username={username}
          recentResumes={recentResumes}
          isLoading={isLoading}
          onLogout={() => {
            removeToken();
            navigate({ to: '/login' });
          }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Enhanced Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-red-50/50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-xl mb-6 shadow-md transition-all duration-300 flex items-center gap-3 animate-pulse">
              <span className="text-xl">⚠️</span>
              <p className="flex-1">{error}</p>
              <button
                onClick={() => setError('')}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Create Resume Card */}
            <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-3xl shadow-xl border border-emerald-100/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-3xl">✨</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Resume</h2>
                  <p className="text-gray-600 mb-4">Build a professional resume from scratch using our intuitive builder</p>
                  <Link
                    to="/builder"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span>Create Resume</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Upload Resume Card */}
            <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-3xl shadow-xl border border-emerald-100/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-3xl">📤</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Existing</h2>
                  <p className="text-gray-600 ">Upload your existing resume file to get started quickly</p>
                  <p className="text-gray-600 text-sm mb-4">Supported formats: PDF, DOCX, DOC Max 10MB</p>
                  <FileUpload
                    onUpload={handleFileUpload}
                    isUploading={isUploading}
                    variant="button"
                    buttonLabel="Upload Resume"

                  />
                </div>
              </div>
            </div>
          </div>

          {/* Your Resumes Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-emerald-100/40 p-8 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">📄</span>
                  Your Resumes
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {totalResumes === 0 
                    ? 'No resumes yet' 
                    : `${totalResumes} ${totalResumes === 1 ? 'resume' : 'resumes'} total`
                  }
                </p>
              </div>
              {resumes.length > 0 && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-600 text-sm">Sort:</span>
                  <select className="text-sm text-gray-700 bg-transparent border-none outline-none cursor-pointer">
                    <option>Recently Updated</option>
                    <option>Alphabetical</option>
                    <option>Oldest First</option>
                  </select>
                </div>
              )}
            </div>
            
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-500 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading your resumes...</p>
                <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 mb-6">
                  <span className="text-5xl animate-bounce">📄</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No resumes yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Get started by creating a new resume or uploading an existing one
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/builder"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <span>✨ Create Resume</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume._id}
                    id={resume._id}
                    title={resume.title}
                    updatedAt={resume.updatedAt}
                    fileType={resume.fileType}
                    onDelete={handleDelete}
                    isDeleting={deletingId === resume._id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
