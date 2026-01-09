import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Upload, FileText, Pill, Sparkles, CheckCircle, Brain, Zap, Shield, ArrowLeft, ExternalLink, AlertTriangle, CalendarHeart } from 'lucide-react';
import { analyzeMedicalDocument } from './services/geminiService';
import { AppMode } from './types';

// --- UI Components ---

function ElegantShape({ className, delay = 0, width = 400, height = 100, rotate = 0, gradient = "from-white/[0.08]" }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`} />
      </motion.div>
    </motion.div>
  );
}

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/20 backdrop-blur-md">
           <Zap className="w-5 h-5 text-indigo-400" />
        </div>
        <span className="font-bold text-lg tracking-tight text-white">Ancure AI</span>
      </div>
      
      <a 
        href="https://ancurehealth.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 transition-all text-sm font-medium text-white/80"
      >
        <CalendarHeart className="w-4 h-4" />
        <span className="hidden sm:inline">Menstrual & PCOS Tracker</span>
        <span className="sm:hidden">PCOS Tracker</span>
        <ExternalLink className="w-3 h-3 opacity-50 ml-1" />
      </a>
    </nav>
  );
}

function HeroSection({ onStart }: { onStart: (type: 'prescription' | 'report') => void }) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] }
    })
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-indigo-500/[0.15]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-rose-500/[0.15]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-violet-500/[0.15]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
      </div>

      <Navbar />

      <div className="relative z-10 container mx-auto px-4 md:px-6 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <div className="h-2 w-2 rounded-full bg-rose-500/80" />
            <span className="text-sm text-white/60 tracking-wide">AI-Powered Medical Analysis</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Ancure AI
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Medical Intelligence
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-12 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              Decode prescriptions and analyze medical reports with advanced AI. 
              Transform handwritten notes into clear, actionable insights instantly.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => onStart('prescription')}
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Pill className="w-5 h-5" />
                Decode Prescription
              </span>
            </button>
            <button 
              onClick={() => onStart('report')}
              className="group relative px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-full text-white font-medium backdrop-blur-sm transition-all hover:bg-white/[0.05] hover:border-white/[0.15] hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Analyze Report
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/[0.05] to-rose-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-rose-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-8 h-8 text-indigo-300" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-white/60 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function UploadSection({ type, onUpload, isProcessing }: { type: 'prescription' | 'report', onUpload: (file: File) => void, isProcessing: boolean }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !isProcessing) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && !isProcessing) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative p-12 rounded-3xl border-2 border-dashed transition-all duration-300 ${
        dragActive 
          ? 'border-indigo-500/50 bg-indigo-500/[0.05]' 
          : 'border-white/[0.15] bg-white/[0.02]'
      }`}
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-rose-500/20 flex items-center justify-center">
          <Upload className="w-10 h-10 text-indigo-300" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3">
          {type === 'prescription' ? 'Upload Prescription' : 'Upload Medical Report'}
        </h3>
        <p className="text-white/60 mb-6">
          Drag and drop your {type === 'prescription' ? 'prescription image' : 'medical report'} here, or click to browse
        </p>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white font-medium cursor-pointer hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-5 h-5" />
          Choose File
        </button>
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleChange} 
        />
      </div>
    </motion.div>
  );
}

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'prescription' | 'report'>('home');
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const mode = activeTab === 'prescription' ? AppMode.PRESCRIPTION : AppMode.REPORT;
      const analysisResult = await analyzeMedicalDocument(uploadedFile, mode);
      setResult(analysisResult);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  const goHome = () => {
    setActiveTab('home');
    resetAnalysis();
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100">
      {activeTab === 'home' && <HeroSection onStart={(type) => setActiveTab(type)} />}
      
      <div className={`relative bg-[#030303] transition-colors duration-1000 ${activeTab !== 'home' ? 'min-h-screen' : ''}`}>
        {/* Background Gradients for the content area */}
        {activeTab !== 'home' && (
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-[#030303] to-[#030303] pointer-events-none" />
        )}
        
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
          
          {/* Landing Page Features */}
          {activeTab === 'home' && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Advanced <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">Medical AI</span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  Leverage cutting-edge artificial intelligence to transform healthcare documentation
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-24">
                <FeatureCard
                  icon={Brain}
                  title="AI-Powered Analysis"
                  description="Advanced machine learning models trained on millions of medical documents for accurate interpretation"
                  delay={0.1}
                />
                <FeatureCard
                  icon={Zap}
                  title="Instant Results"
                  description="Get comprehensive analysis in seconds, not hours. Real-time processing with 99%+ accuracy"
                  delay={0.2}
                />
                <FeatureCard
                  icon={Shield}
                  title="Secure & Private"
                  description="Your medical data is processed securely. We prioritize privacy and data protection in every interaction"
                  delay={0.3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTab('prescription')}
                  className="group cursor-pointer p-12 rounded-3xl bg-gradient-to-br from-indigo-500/[0.08] to-indigo-500/[0.02] border border-indigo-500/[0.15] hover:border-indigo-500/[0.3] transition-all duration-500 hover:scale-105"
                >
                  <Pill className="w-16 h-16 text-indigo-300 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-3xl font-bold text-white mb-4">Prescription Decoder</h3>
                  <p className="text-white/60 text-lg mb-6">
                    Transform handwritten prescriptions into clear, digital format. Identify medications, dosages, and instructions instantly.
                  </p>
                  <div className="flex items-center gap-2 text-indigo-300 font-medium">
                    <span>Start Decoding</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTab('report')}
                  className="group cursor-pointer p-12 rounded-3xl bg-gradient-to-br from-rose-500/[0.08] to-rose-500/[0.02] border border-rose-500/[0.15] hover:border-rose-500/[0.3] transition-all duration-500 hover:scale-105"
                >
                  <FileText className="w-16 h-16 text-rose-300 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-3xl font-bold text-white mb-4">Report Analyzer</h3>
                  <p className="text-white/60 text-lg mb-6">
                    Extract insights from medical reports, lab results, and diagnostic documents with AI-powered analysis.
                  </p>
                  <div className="flex items-center gap-2 text-rose-300 font-medium">
                    <span>Analyze Report</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {/* Analysis View */}
          {(activeTab === 'prescription' || activeTab === 'report') && (
            <div className="max-w-4xl mx-auto">
              <Navbar />
              
              <div className="mb-8 mt-8">
                <button
                  onClick={goHome}
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>
              </div>

              {!result && !analyzing && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {activeTab === 'prescription' ? 'Prescription Decoder' : 'Report Analyzer'}
                  </h2>
                  <p className="text-white/60 text-lg">
                    Upload your {activeTab === 'prescription' ? 'prescription image' : 'medical report'} for instant AI analysis
                  </p>
                </motion.div>
              )}

              {/* Upload State */}
              {!file && <UploadSection type={activeTab} onUpload={handleFileUpload} isProcessing={analyzing} />}

              {/* Analyzing State */}
              {file && analyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] text-center min-h-[400px] flex flex-col items-center justify-center"
                >
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-rose-500/20 flex items-center justify-center animate-pulse">
                      <Sparkles className="w-10 h-10 text-indigo-300" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-[spin_3s_linear_infinite] border-t-transparent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Analyzing Document...</h3>
                  <p className="text-white/60">Ancure AI is decoding the medical details</p>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-3xl bg-red-500/[0.05] border border-red-500/[0.2] text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
                  <p className="text-white/60 mb-6">{error}</p>
                  <button
                    onClick={resetAnalysis}
                    className="px-6 py-3 bg-white/[0.1] hover:bg-white/[0.2] rounded-full text-white font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {/* Result State */}
              {result && !analyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-green-500/[0.08] to-green-500/[0.02] border border-green-500/[0.15]">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-8 h-8 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Analysis Complete</h3>
                        <p className="text-white/60 text-lg">
                          {activeTab === 'prescription' 
                            ? "Prescription decoded successfully. Please review the medicines and dosages below." 
                            : "Medical report analyzed. Key findings have been extracted below."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
                    <article className="prose prose-invert prose-headings:text-indigo-200 prose-p:text-white/70 prose-strong:text-white prose-li:text-white/70 max-w-none">
                      <ReactMarkdown>{result}</ReactMarkdown>
                    </article>
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                     <button
                      onClick={resetAnalysis}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                    >
                      Analyze Another Document
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}