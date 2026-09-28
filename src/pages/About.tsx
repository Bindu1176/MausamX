import React, { useState } from 'react';
import { Info, Database, Layers, Cpu, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

export default function About() {
  const [showTechnical, setShowTechnical] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-12">
      {/* Overview Card */}
      <div className="bg-card p-6 rounded-2xl border border-border-theme shadow-xs space-y-4">
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight flex items-center gap-2">
          <Info size={24} className="text-[#1976D2]" />
          About MausamX
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed font-medium">
          MausamX is a hyperlocal monsoon intelligence platform designed to bridge global climate signals with block and panchayat-level agricultural decision making.
        </p>
      </div>

      {/* Simple Product Value Visual */}
      <div className="bg-card p-6 rounded-2xl border border-border-theme shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">HOW MAUSAMX DELIVERS VALUE</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-card-elevated rounded-xl border border-border-theme">
            <div className="text-xs font-bold text-primary uppercase mb-1">1. Global Climate</div>
            <div className="text-sm font-bold text-text-primary">Signal Tracking</div>
            <div className="text-[11px] text-text-muted mt-1">ENSO, IOD, atmospheric wind patterns</div>
          </div>
          <div className="p-4 bg-card-elevated rounded-xl border border-border-theme">
            <div className="text-xs font-bold text-success uppercase mb-1">2. AI Localization</div>
            <div className="text-sm font-bold text-text-primary">Probabilistic Forecast</div>
            <div className="text-[11px] text-text-muted mt-1">Block & Panchayat 7-30 day resolution</div>
          </div>
          <div className="p-4 bg-card-elevated rounded-xl border border-border-theme">
            <div className="text-xs font-bold text-warning uppercase mb-1">3. Crop Decision</div>
            <div className="text-sm font-bold text-text-primary">Actionable Advisory</div>
            <div className="text-[11px] text-text-muted mt-1">Direct sowing & field advice</div>
          </div>
        </div>
      </div>

      {/* Hidden Collapsible Technical Details (System Insights) */}
      <div className="bg-card rounded-2xl border border-border-theme shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-text-primary">How does MausamX generate this outlook?</h3>
            <p className="text-xs text-text-muted font-medium">Technical intelligence pipeline details</p>
          </div>
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="px-4 py-2 rounded-xl bg-card-elevated hover:bg-slate-200 text-text-secondary text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            {showTechnical ? 'Hide System Insights' : 'View System Insights'}
            {showTechnical ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {showTechnical && (
          <div className="pt-4 border-t border-border-theme space-y-6 animate-fade-in-up">
            {/* Pipeline Flow Diagram */}
            <div className="bg-slate-900 text-white rounded-xl p-6 space-y-4">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider text-center">SYSTEM INTELLIGENCE PIPELINE</div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="font-bold text-blue-400">Signals</div>
                  <div className="text-[10px] text-text-muted">ENSO • IOD • MJO</div>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="font-bold text-purple-400">Regional</div>
                  <div className="text-[10px] text-text-muted">Temp • Humidity</div>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="font-bold text-emerald-400">Engine</div>
                  <div className="text-[10px] text-text-muted">XGBoost ML</div>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="font-bold text-amber-400">Outlook</div>
                  <div className="text-[10px] text-text-muted">Onset • Dry Spell</div>
                </div>
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700 col-span-2 sm:col-span-1">
                  <div className="font-bold text-red-400">Advisory</div>
                  <div className="text-[10px] text-text-muted">Crop Actions</div>
                </div>
              </div>
            </div>

            {/* Model Architecture Note */}
            <div className="p-4 bg-card-elevated border border-border-theme rounded-xl text-xs text-text-secondary space-y-1 font-medium">
              <div className="font-bold text-text-primary">Model Validation & Science</div>
              <p>MausamX incorporates XGBoost and LSTM ensemble models trained on historical IMD rainfall records and climate indices to provide probabilistic forecasts rather than deterministic predictions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
