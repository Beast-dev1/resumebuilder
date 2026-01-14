import { Link } from '@tanstack/react-router';

interface ResumeCardProps {
  id: string;
  title: string;
  updatedAt: string;
  fileType?: string;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

function ResumeCard({ id, title, updatedAt, fileType, onDelete, isDeleting }: ResumeCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileTypeIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'json':
        return '📝';
      case 'docx':
      case 'doc':
        return '📘';
      default:
        return '📋';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getFileTypeIcon(fileType)}</span>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg group-hover:text-purple-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Updated {formatDate(updatedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        <Link
          to="/builder"
          search={{ resumeId: id }}
          className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(id)}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-red-200"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

export default ResumeCard;

