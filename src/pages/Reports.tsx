import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, ChevronRight, Map, BarChart3, CloudRain, ShieldCheck } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { forecastSummary } from '../data/forecasts';

export default function Reports() {
  const { selectedLocation } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <div className="bg-card p-6 rounded-2xl border border-[var(--border-theme)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--text-primary)] uppercase tracking-tight flex items-center gap-2">
            <FileText size={24} className="text-[#1976D2]" />
            Forecast & Agricultural Reports
          </h2>
          <p className="text-[var(--text-muted)] text-[14px] mt-1">Aggregated summaries and downloadable analytics</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-[#1976D2] hover:bg-[#1565C0] text-white text-[13px] font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <Download size={16} /> Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Report Sections Overview */}
        <div className="bg-card rounded-xl border border-[var(--border-theme)] p-5 shadow-sm card-hover">
           <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
             <BarChart3 size={20} className="text-[#1976D2]" />
           </div>
           <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-2">Forecast Summary</h3>
           <p className="text-[12px] text-[var(--text-muted)] mb-4 line-clamp-2">7–30 day probabilistic outlook for {selectedLocation.name}, including onset, dry spell, and heavy rain metrics.</p>
           <button className="text-[12px] font-bold text-[#1976D2] flex items-center gap-1 hover:underline">View Section <ChevronRight size={14}/></button>
        </div>
        
        <div className="bg-card rounded-xl border border-[var(--border-theme)] p-5 shadow-sm card-hover">
           <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-4">
             <Map size={20} className="text-[#2E9B63]" />
           </div>
           <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-2">Regional Risk</h3>
           <p className="text-[12px] text-[var(--text-muted)] mb-4 line-clamp-2">Spatial distribution of agricultural risk across blocks and panchayats in the selected district.</p>
           <button className="text-[12px] font-bold text-[#1976D2] flex items-center gap-1 hover:underline">View Section <ChevronRight size={14}/></button>
        </div>

        <div className="bg-card rounded-xl border border-[var(--border-theme)] p-5 shadow-sm card-hover">
           <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
             <CloudRain size={20} className="text-[#F2B84B]" />
           </div>
           <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-2">Rainfall Trends</h3>
           <p className="text-[12px] text-[var(--text-muted)] mb-4 line-clamp-2">Historical rainfall comparison against current probabilistic forecasts and seasonal anomalies.</p>
           <button className="text-[12px] font-bold text-[#1976D2] flex items-center gap-1 hover:underline">View Section <ChevronRight size={14}/></button>
        </div>

        <div className="bg-card rounded-xl border border-[var(--border-theme)] p-5 shadow-sm card-hover">
           <div className="w-10 h-10 rounded-lg bg-[#7257C7]/10 flex items-center justify-center mb-4">
             <ShieldCheck size={20} className="text-[#7257C7]" />
           </div>
           <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-2">Model Confidence</h3>
           <p className="text-[12px] text-[var(--text-muted)] mb-4 line-clamp-2">Evaluation metrics, calibration curves, and Brier scores for the current prediction window.</p>
           <button className="text-[12px] font-bold text-[#1976D2] flex items-center gap-1 hover:underline">View Section <ChevronRight size={14}/></button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-[var(--border-theme)] shadow-sm p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
        <FileText size={48} className="text-[var(--border-theme)] mb-4" />
        <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-2">Report Generation Dashboard</h3>
        <p className="text-[14px] text-[var(--text-muted)] max-w-md mx-auto mb-6">
          The full report generation module consolidates forecast data, spatial maps, and agricultural advisories into a single PDF document for offline use and official record-keeping.
        </p>
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-[var(--card-elevated)] border border-[var(--border-theme)] hover:border-[#1976D2] text-[var(--text-primary)] text-[13px] font-bold rounded-lg transition-colors"
        >
          Preview Example Report Format
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-[#1976D2]" />
            </div>
            <h3 className="text-[20px] font-bold text-[var(--text-primary)] text-center mb-2">Demo Feature</h3>
            <p className="text-[14px] text-[var(--text-muted)] text-center mb-6 leading-relaxed">
              PDF report generation is a demonstration feature in this prototype. In the real system, this would compile the current dashboard state into a downloadable document.
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-[#1976D2] text-white text-[14px] font-bold rounded-lg hover:bg-[#1565C0] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
