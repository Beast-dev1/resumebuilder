import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
}

function FileUpload({ onUpload, isUploading }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['application/pdf', 'application/json', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const allowedExtensions = ['.pdf', '.json', '.doc', '.docx'];

  const validateFile = (file: File): boolean => {
    const isValidType = allowedTypes.includes(file.type) || 
      allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!isValidType) {
      setError('Invalid file type. Only PDF, JSON, DOC, and DOCX files are allowed.');
      return false;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('File size exceeds 10MB limit.');
      return false;
    }

    setError('');
    return true;
  };

  const handleFile = async (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    try {
      await onUpload(file);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragging 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.json,.doc,.docx"
          onChange={handleFileInput}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center gap-3">
          <div className="text-5xl">
            {isUploading ? '⏳' : isDragging ? '📤' : '📁'}
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              {isUploading 
                ? 'Uploading...' 
                : isDragging 
                ? 'Drop your file here' 
                : 'Drag & drop your resume here'
              }
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or <span className="text-purple-600 font-medium">click to browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supports PDF, JSON, DOC, DOCX (Max 10MB)
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}

export default FileUpload;

