import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { UploadedFile } from '../types';

interface FileUploadProps {
  uploadedFile: UploadedFile | null;
  onFileSelect: (file: UploadedFile | null) => void;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ uploadedFile, onFileSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      onFileSelect({ file, previewUrl });
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Upload Image</h2>
      
      {!uploadedFile ? (
        <div 
          onClick={handleClick}
          className={`border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-teal-50 hover:border-teal-300'
          }`}
        >
          <div className="bg-teal-50 p-4 rounded-full mb-3">
             <Upload className="w-8 h-8 text-teal-600" />
          </div>
          <p className="text-slate-700 font-medium mb-1">Click to upload photo</p>
          <p className="text-xs text-slate-500">Supports JPG, PNG (Max 5MB)</p>
          <p className="text-xs text-orange-600 mt-2 font-medium">Please upload a clear, HD photo for best results.</p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <img 
            src={uploadedFile.previewUrl} 
            alt="Preview" 
            className="w-full h-64 object-contain"
          />
          {!disabled && (
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-red-50 text-slate-600 hover:text-red-500 transition-colors"
              title="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 text-white text-xs flex items-center">
             <ImageIcon className="w-3 h-3 mr-2" />
             <span className="truncate">{uploadedFile.file.name}</span>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default FileUpload;
