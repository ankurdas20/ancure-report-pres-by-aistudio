import React, { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';
import { AppMode, AnalysisState, UploadedFile } from './types';
import { analyzeMedicalDocument } from './services/geminiService';

function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.PRESCRIPTION);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isLoading: false,
    result: null,
    error: null,
  });

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setAnalysis({ isLoading: true, result: null, error: null });

    try {
      const result = await analyzeMedicalDocument(uploadedFile.file, mode);
      setAnalysis({ isLoading: false, result, error: null });
    } catch (err: any) {
      setAnalysis({
        isLoading: false,
        result: null,
        error: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setAnalysis({ isLoading: false, result: null, error: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        {!analysis.result && !analysis.isLoading && (
          <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Decode Your Medical Documents
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto">
              Upload a clear photo of your prescription or lab report. Ancure AI will explain the details in simple language.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Input Section - Hide if results are shown to keep focus on content, or show minimized */}
          {!analysis.result && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <ModeSelector 
                currentMode={mode} 
                onModeChange={setMode} 
                disabled={analysis.isLoading}
              />

              <FileUpload 
                uploadedFile={uploadedFile} 
                onFileSelect={setUploadedFile} 
                disabled={analysis.isLoading}
              />

              <button
                onClick={handleAnalyze}
                disabled={!uploadedFile || analysis.isLoading}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-2
                  ${!uploadedFile || analysis.isLoading 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                    : 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
              >
                {analysis.isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Analyzing Document...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Decode Document</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Result Section */}
          <ResultDisplay result={analysis.result} error={analysis.error} />

          {/* Reset Button (Only visible when result is shown) */}
          {(analysis.result || analysis.error) && (
             <div className="flex justify-center pt-6 pb-12">
               <button
                 onClick={handleReset}
                 className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-full font-semibold transition-colors shadow-sm"
               >
                 Analyze Another Document
               </button>
             </div>
          )}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400">
            Powered by Ancure Health & Gemini 2.0 Flash
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
