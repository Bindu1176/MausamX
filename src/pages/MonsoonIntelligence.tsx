import React from 'react';
import { globalSignals, regionalSignals } from '../data/climateSignals';
import SignalCard from '../components/cards/SignalCard';
import { Globe, Wind, Database, Cpu, Network, Map, FileText } from 'lucide-react';

export default function MonsoonIntelligence() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="bg-card p-6 rounded-2xl border border-[var(--border-theme)] shadow-sm">
        <h2 className="text-[24px] font-bold text-[var(--text-primary)] mb-2 uppercase tracking-tight">Monsoon Intelligence</h2>
        <p className="text-[var(--text-muted)] text-[14px]">Climate signals driving the prediction models</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-[16px] font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Globe size={18} className="text-[#7257C7]" />
          Global Climate Signals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {globalSignals.map((signal) => (
            <SignalCard key={signal.id} {...signal} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[16px] font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Wind size={18} className="text-[#159A9C]" />
          Regional Atmospheric Conditions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionalSignals.map((signal) => (
            <SignalCard key={signal.id} {...signal} />
          ))}
        </div>
      </div>

      {/* Climate Signal Flow Diagram */}
      <div className="bg-card rounded-2xl border border-[var(--border-theme)] p-8 shadow-sm text-center">
        <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-8 uppercase tracking-wide">Prediction Data Flow</h3>
        
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          {/* Global Signals */}
          <div className="bg-[#7257C7]/10 border border-[#7257C7]/20 p-4 rounded-xl w-full flow-connector shadow-sm relative z-10">
            <div className="flex items-center justify-center gap-2 text-[#7257C7] font-bold text-[14px] mb-2">
              <Globe size={16} /> GLOBAL CLIMATE SIGNALS
            </div>
            <div className="text-[var(--text-primary)] text-[13px] font-medium">ENSO • IOD • MJO</div>
          </div>
          
          <div className="h-6 w-px bg-[var(--border-theme)]" />
          
          {/* Regional Conditions */}
          <div className="bg-[#159A9C]/10 border border-[#159A9C]/20 p-4 rounded-xl w-full flow-connector shadow-sm relative z-10">
             <div className="flex items-center justify-center gap-2 text-[#159A9C] font-bold text-[14px] mb-2">
              <Wind size={16} /> REGIONAL ATMOSPHERIC CONDITIONS
            </div>
            <div className="text-[var(--text-primary)] text-[13px] font-medium">Rainfall • Temperature • Humidity • Pressure • Wind</div>
          </div>

          <div className="h-6 w-px bg-[var(--border-theme)]" />
          
          {/* Historical Patterns */}
          <div className="bg-warning/10 border border-[#F2B84B]/20 p-4 rounded-xl w-full flow-connector shadow-sm relative z-10">
             <div className="flex items-center justify-center gap-2 text-[#F2B84B] font-bold text-[14px] mb-2">
              <Database size={16} /> HISTORICAL PATTERNS
            </div>
            <div className="text-[var(--text-primary)] text-[13px] font-medium">Past rainfall • Monsoon behaviour</div>
          </div>

          <div className="h-6 w-px bg-[var(--border-theme)]" />

          {/* Feature Engineering */}
          <div className="bg-[var(--text-primary)] p-4 rounded-xl w-full flow-connector shadow-sm relative z-10">
             <div className="flex items-center justify-center gap-2 text-white font-bold text-[14px]">
              <Network size={16} /> FEATURE ENGINEERING
            </div>
          </div>

          <div className="h-6 w-px bg-[var(--border-theme)]" />

          {/* ML Models */}
          <div className="bg-[var(--text-primary)] p-4 rounded-xl w-full flow-connector shadow-sm relative z-10">
             <div className="flex items-center justify-center gap-2 text-[#4DA3FF] font-bold text-[14px]">
              <Cpu size={16} /> ML + TIME-SERIES MODELS
            </div>
          </div>
          
          <div className="h-6 w-px bg-[var(--border-theme)]" />

          {/* Output layer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
             <div className="bg-card border-2 border-[#1976D2] p-4 rounded-xl shadow-sm relative z-10">
               <div className="flex items-center justify-center gap-2 text-[#1976D2] font-bold text-[14px] mb-2">
                <Map size={16} /> HYPERLOCAL RISK
              </div>
              <div className="text-[var(--text-muted)] text-[12px] font-medium">Block / Panchayat scale</div>
             </div>
             
             <div className="bg-card border-2 border-[#16845B] p-4 rounded-xl shadow-sm relative z-10">
               <div className="flex items-center justify-center gap-2 text-[#16845B] font-bold text-[14px] mb-2">
                <FileText size={16} /> PROBABILISTIC FORECAST
              </div>
              <div className="text-[var(--text-muted)] text-[12px] font-medium">7–30 day outlook</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
