import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { getResumes, uploadResume, deleteResume } from '../utils/api';
import ResumeCard from '../components/dashboard/ResumeCard';
import FileUpload from '../components/dashboard/FileUpload';
import { removeToken } from '../utils/auth';

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

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] via-[#FDFEFF] to-[#ECFDF5] p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your resumes</p>
              </div>
              <button
                onClick={() => {
                  removeToken();
                  navigate({ to: '/login' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Create Resume Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Resume</h2>
                <p className="text-gray-600">Build a professional resume from scratch using our builder</p>
              </div>
              <Link
                to="/builder"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md whitespace-nowrap"
              >
                ✨ Create Resume
              </Link>
            </div>
          </div>

          {/* Upload Existing Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Existing Resume</h2>
            <p className="text-gray-600 mb-4">Upload your existing resume file (PDF, JSON, DOC, DOCX)</p>
            <FileUpload onUpload={handleFileUpload} isUploading={isUploading} />
          </div>

          {/* Your Resumes Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Resumes</h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <p className="text-gray-600 mt-4">Loading resumes...</p>
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-gray-600 text-lg">No resumes yet</p>
                <p className="text-gray-500 text-sm mt-2">Create a new resume or upload an existing one to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
