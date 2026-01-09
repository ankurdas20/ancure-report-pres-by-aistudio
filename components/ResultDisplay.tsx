import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AlertTriangle, CheckCircle2, Copy } from 'lucide-react';

interface ResultDisplayProps {
  result: string | null;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error }) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start space-x-3 text-red-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-lg mb-1">Analysis Failed</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
           <CheckCircle2 className="w-6 h-6" />
           <h2 className="font-bold text-lg">Analysis Complete</h2>
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(result)}
          className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6 prose prose-slate max-w-none prose-headings:text-teal-800 prose-a:text-teal-600">
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>

      <div className="bg-orange-50 border-t border-orange-100 p-4 text-xs text-orange-800 flex items-start space-x-2">
         <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
         <p>
           <strong>Disclaimer:</strong> This is an educational explanation only based on OCR-based interpretation with the help of Ancure AI. Verify with the original prescription or lab report. This is not a medical diagnosis or medical advice. Please consult a qualified doctor or pharmacist before making any medical decisions.
         </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
