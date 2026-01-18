import { Link } from '@tanstack/react-router';
import Logo from './Logo';

interface HeaderProps {
  username: string;
  recentResumes: number;
  isLoading: boolean;
  onLogout: () => void;
}

function Header({ username, recentResumes, isLoading, onLogout }: HeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-none shadow-xl border border-emerald-100/40 p-2 md:p-3 mb-3 transition-all duration-500 w-full">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-gray-700 text-sm md:text-base">
              Hi, <span className="font-semibold text-gray-900">{username}</span>
            </span>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-all duration-200 hover:bg-gray-100 rounded-lg"
              >
                ← Home
              </Link>
              <button
                onClick={onLogout}
                className="px-5 py-2.5 text-gray-700 hover:text-gray-900 text-sm font-medium transition-all duration-200 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {!isLoading && recentResumes > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-100">
              <span className="text-green-600 font-semibold">{recentResumes}</span>
              <span className="text-gray-600 text-sm">Updated This Week</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;








