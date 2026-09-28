import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudRain, MapPin, ArrowRight, Sprout, ShieldCheck } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1F33] text-white flex flex-col justify-between">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between z-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1976D2] flex items-center justify-center shadow-lg">
            <CloudRain size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide">MausamX</span>
        </div>
        <button 
          onClick={() => navigate('/home')}
          className="px-5 py-2.5 rounded-xl bg-card/10 hover:bg-card/20 text-white text-xs font-semibold transition-all border border-white/20"
        >
          Explore Dashboard
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 my-12">
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1976D2]/20 text-[#4DA3FF] border border-[#1976D2]/30 text-xs font-semibold mb-6 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#4DA3FF] animate-pulse" />
            Monsoon Intelligence Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            From Climate Signals <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA3FF] to-[#34A853]">
              to Crop Decisions
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
            Hyperlocal monsoon intelligence for smarter farming decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/location')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1976D2] hover:bg-[#1565C0] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <MapPin size={20} />
              Explore My Location
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-card/10 hover:bg-card/15 text-white font-semibold text-base transition-all border border-white/10"
            >
              How MausamX Works
            </button>
          </div>
        </div>

        {/* 1 Simple Process Visual */}
        <div className="mt-16 max-w-3xl w-full bg-card/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center items-center">
            <div className="p-3">
              <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Signals</div>
              <div className="text-sm font-semibold text-white">Climate Data</div>
            </div>
            <div className="p-3 border-l border-white/10">
              <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Engine</div>
              <div className="text-sm font-semibold text-[#4DA3FF]">MausamX AI</div>
            </div>
            <div className="p-3 border-l border-white/10">
              <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Outlook</div>
              <div className="text-sm font-semibold text-emerald-400">Local Monsoon</div>
            </div>
            <div className="p-3 border-l border-white/10">
              <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Action</div>
              <div className="text-sm font-semibold text-amber-300">Crop Advisory</div>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified 3 Value Cards */}
      <footer className="px-8 pb-12 z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card/5 border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={20} className="text-[#4DA3FF]" />
            <h3 className="text-base font-bold">HYPERLOCAL</h3>
          </div>
          <p className="text-text-muted text-xs leading-relaxed">
            Block & Panchayat scale outlooks tailored specifically for local agricultural needs.
          </p>
        </div>

        <div className="bg-card/5 border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <CloudRain size={20} className="text-emerald-400" />
            <h3 className="text-base font-bold">DECISION-FIRST</h3>
          </div>
          <p className="text-text-muted text-xs leading-relaxed">
            Clear probabilities for onset, dry spells, and heavy rain without complex technical jargon.
          </p>
        </div>

        <div className="bg-card/5 border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Sprout size={20} className="text-amber-300" />
            <h3 className="text-base font-bold">ACTIONABLE</h3>
          </div>
          <p className="text-text-muted text-xs leading-relaxed">
            Directly translates climate forecasts into practical crop recommendations.
          </p>
        </div>
      </footer>
    </div>
  );
}
