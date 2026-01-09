import React from 'react';
import { Activity, CalendarHeart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-teal-600 p-2 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">Ancure AI</h1>
            <p className="text-xs text-slate-500 font-medium">Report & Prescription Decoder</p>
          </div>
        </div>
        
        <a 
          href="https://ancurehealth.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-2 rounded-full transition-colors text-xs sm:text-sm font-semibold shadow-sm"
          title="Switch to Menstrual and PCOS Tracker"
        >
          <CalendarHeart className="w-4 h-4" />
          <span className="hidden sm:inline">Menstrual & PCOS Tracker</span>
          <span className="sm:hidden">PCOS Tracker</span>
        </a>
      </div>
    </header>
  );
};

export default Header;