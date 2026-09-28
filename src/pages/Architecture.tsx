import React from 'react';
import { Network, Database, BrainCircuit, LineChart, MessageSquare, MapPin, Layers, Server } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2">
          <Network size={32} className="text-[#1976D2]" />
        </div>
        <h2 className="text-[32px] font-extrabold text-[var(--text-primary)] tracking-tight">Technical Architecture</h2>
        <p className="text-[var(--text-muted)] text-[16px] max-w-2xl mx-auto leading-relaxed">
          The end-to-end data pipeline from global climate signals to hyperlocal farmer advisories.
        </p>
      </div>

      <div className="relative bg-card rounded-3xl border border-[var(--border-theme)] shadow-xl p-8 md:p-12 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
          
          {/* 1. Data Sources */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-[var(--card-elevated)] border-2 border-[var(--border-theme)] rounded-xl p-4 shadow-sm hover:border-[#7257C7] transition-colors relative flow-connector-bottom">
              <div className="text-[11px] font-extrabold text-[#7257C7] uppercase tracking-widest mb-2">Global Signals</div>
              <div className="text-[14px] font-bold text-[var(--text-primary)]">ENSO • IOD • MJO</div>
            </div>
            
            <div className="bg-[var(--card-elevated)] border-2 border-[var(--border-theme)] rounded-xl p-4 shadow-sm hover:border-[#159A9C] transition-colors relative flow-connector-bottom">
              <div className="text-[11px] font-extrabold text-[#159A9C] uppercase tracking-widest mb-2">Atmospheric Data</div>
              <div className="text-[14px] font-bold text-[var(--text-primary)]">Rainfall • Temp • Humidity</div>
              <div className="text-[12px] font-semibold text-[var(--text-muted)] mt-1">Pressure • Wind</div>
            </div>

            <div className="bg-[var(--card-elevated)] border-2 border-[var(--border-theme)] rounded-xl p-4 shadow-sm hover:border-[#F2B84B] transition-colors relative flow-connector-bottom">
              <div className="text-[11px] font-extrabold text-[#F2B84B] uppercase tracking-widest mb-2">Historical Data</div>
              <div className="text-[14px] font-bold text-[var(--text-primary)]">Rainfall • Patterns</div>
              <div className="text-[12px] font-semibold text-[var(--text-muted)] mt-1">Crop Data</div>
            </div>
          </div>

          {/* Merge Lines */}
          <div className="w-full h-12 relative">
            <div className="absolute top-0 left-1/6 w-[33%] h-1/2 border-l-2 border-b-2 border-[var(--border-theme)] rounded-bl-lg" />
            <div className="absolute top-0 right-1/6 w-[33%] h-1/2 border-r-2 border-b-2 border-[var(--border-theme)] rounded-br-lg" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-1/2 bg-[var(--border-theme)] -translate-x-1/2" />
          </div>

          {/* 2. Processing & Engineering */}
          <div className="w-full max-w-md bg-card border-2 border-[var(--border-theme)] rounded-2xl p-5 shadow-sm text-center relative z-10">
            <div className="flex items-center justify-center gap-2 text-[var(--text-primary)] font-extrabold text-[15px] mb-3">
              <Database size={18} className="text-[var(--text-muted)]" /> DATA PROCESSING
            </div>
            <div className="text-[13px] font-medium text-[var(--text-muted)]">Cleaning • Integration • Spatial Alignment</div>
            
            <div className="w-0.5 h-6 bg-[var(--border-theme)] mx-auto my-4" />
            
            <div className="flex items-center justify-center gap-2 text-[var(--text-primary)] font-extrabold text-[15px] mb-3">
              <Layers size={18} className="text-[var(--text-muted)]" /> FEATURE ENGINEERING
            </div>
            <div className="text-[13px] font-medium text-[var(--text-muted)]">Climate Features • Lag Features • Anomalies</div>
          </div>

          <div className="w-0.5 h-8 bg-[#1976D2] mx-auto relative opacity-50">
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#1976D2] rotate-45 -translate-x-1/2 translate-y-1/2" />
          </div>

          {/* 3. ML Engine */}
          <div className="w-full max-w-lg bg-[#0B1F33] rounded-2xl p-6 shadow-xl text-center relative z-10 border border-[#1976D2]/30">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1976D2] to-[#4DA3FF] rounded-2xl opacity-20 blur-sm pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-center gap-3 text-white font-extrabold text-[18px] mb-2 tracking-wide">
                <BrainCircuit size={24} className="text-[#4DA3FF]" /> PREDICTION ENGINE
              </div>
              <div className="text-[14px] font-semibold text-[#4DA3FF] mb-4">XGBoost • Random Forest • LSTM</div>
              
              <div className="bg-card/10 rounded-xl p-3 border border-white/10 text-white font-bold text-[15px]">
                7–30 DAY PROBABILISTIC FORECAST
              </div>
            </div>
          </div>

          <div className="w-0.5 h-8 bg-[#1976D2] mx-auto relative opacity-50">
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#1976D2] rotate-45 -translate-x-1/2 translate-y-1/2" />
          </div>

          {/* 4. Output Generation */}
          <div className="w-full max-w-md bg-card border-2 border-[#1976D2] rounded-2xl p-5 shadow-md text-center relative z-10">
            <div className="flex items-center justify-center gap-2 text-[#1976D2] font-extrabold text-[15px] mb-3">
              <MapPin size={18} /> HYPERLOCALIZATION
            </div>
            <div className="text-[13px] font-bold text-[var(--text-primary)] mb-4">District → Block → Panchayat</div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--card-elevated)] rounded-lg p-3 border border-[var(--border-theme)]">
                <div className="text-[11px] font-extrabold text-[#E45757] uppercase tracking-wider mb-1">Risk Map</div>
                <div className="text-[11px] font-semibold text-[var(--text-primary)]">Onset • Dry Spell • Heavy Rain</div>
              </div>
              <div className="bg-[var(--card-elevated)] rounded-lg p-3 border border-[var(--border-theme)]">
                <div className="text-[11px] font-extrabold text-[#16845B] uppercase tracking-wider mb-1">Advisory Engine</div>
                <div className="text-[11px] font-semibold text-[var(--text-primary)]">Crop + Location + Forecast</div>
              </div>
            </div>
          </div>

          <div className="w-0.5 h-8 bg-[#2E9B63] mx-auto relative opacity-50">
             <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#2E9B63] rotate-45 -translate-x-1/2 translate-y-1/2" />
          </div>

          {/* 5. Delivery */}
          <div className="w-full max-w-lg bg-[var(--card-elevated)] border-2 border-[#2E9B63]/30 rounded-2xl p-6 shadow-sm text-center relative z-10">
            <div className="flex items-center justify-center gap-2 text-[#2E9B63] font-extrabold text-[15px] mb-3">
              <MessageSquare size={18} /> COMMUNICATION
            </div>
            <div className="text-[14px] font-bold text-[var(--text-primary)] mb-5">Web Dashboard • WhatsApp • SMS</div>

            <div className="flex justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow border border-[var(--border-theme)]">
                  <span className="text-[20px]">👨‍🌾</span>
                </div>
                <div className="text-[12px] font-bold text-[var(--text-primary)] uppercase tracking-wider">Farmers</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow border border-[var(--border-theme)]">
                  <span className="text-[20px]">👨‍💼</span>
                </div>
                <div className="text-[12px] font-bold text-[var(--text-primary)] uppercase tracking-wider">Agri Officers</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="text-center text-[13px] text-[var(--text-muted)] bg-card p-4 rounded-xl border border-[var(--border-theme)] shadow-sm flex items-center justify-center gap-3">
        <Server size={18} className="text-[#1976D2]" />
        <strong>Note:</strong> This architecture demonstrates the end-to-end processing pipeline for climate signal analysis.
      </div>
    </div>
  );
}
