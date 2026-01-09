import React from 'react';
import { FileText, Pill } from 'lucide-react';
import { AppMode } from '../types';

interface ModeSelectorProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  disabled?: boolean;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange, disabled }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Select Document Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onModeChange(AppMode.PRESCRIPTION)}
          disabled={disabled}
          className={`relative flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
            currentMode === AppMode.PRESCRIPTION
              ? 'border-teal-500 bg-teal-50 text-teal-800'
              : 'border-slate-200 hover:border-teal-200 text-slate-600 hover:bg-slate-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`p-3 rounded-full mr-4 ${currentMode === AppMode.PRESCRIPTION ? 'bg-teal-200' : 'bg-slate-100'}`}>
            <Pill className={`w-6 h-6 ${currentMode === AppMode.PRESCRIPTION ? 'text-teal-700' : 'text-slate-500'}`} />
          </div>
          <div className="text-left">
            <span className="block font-bold">Prescription</span>
            <span className="text-xs opacity-80">Understand medicines & dosage</span>
          </div>
          {currentMode === AppMode.PRESCRIPTION && (
            <div className="absolute top-3 right-3 w-3 h-3 bg-teal-500 rounded-full animate-pulse" />
          )}
        </button>

        <button
          onClick={() => onModeChange(AppMode.REPORT)}
          disabled={disabled}
          className={`relative flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
            currentMode === AppMode.REPORT
              ? 'border-teal-500 bg-teal-50 text-teal-800'
              : 'border-slate-200 hover:border-teal-200 text-slate-600 hover:bg-slate-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`p-3 rounded-full mr-4 ${currentMode === AppMode.REPORT ? 'bg-teal-200' : 'bg-slate-100'}`}>
            <FileText className={`w-6 h-6 ${currentMode === AppMode.REPORT ? 'text-teal-700' : 'text-slate-500'}`} />
          </div>
          <div className="text-left">
            <span className="block font-bold">Lab Report</span>
            <span className="text-xs opacity-80">Analyze test results</span>
          </div>
          {currentMode === AppMode.REPORT && (
             <div className="absolute top-3 right-3 w-3 h-3 bg-teal-500 rounded-full animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;
