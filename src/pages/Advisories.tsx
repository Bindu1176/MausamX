import React, { useState, useMemo } from 'react';
import { Leaf, Filter, MapPin, CheckCircle2, AlertTriangle, Info, ChevronDown } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { advisories, cropOptions, cropStages } from '../data/advisories';
import type { CropType, CropStage } from '../types';
import { riskColors, riskBgColors, riskTextColors, riskBorderColors } from '../utils';

export default function Advisories() {
  const { selectedLocation } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<CropType | 'all'>('all');
  const [selectedStage, setSelectedStage] = useState<CropStage | 'all'>('all');

  const filteredAdvisories = useMemo(() => {
    return advisories.filter(a => {
      const matchCrop = selectedCrop === 'all' || a.crop === selectedCrop;
      const matchStage = selectedStage === 'all' || a.cropStage === selectedStage;
      // In a real app we'd filter by location too, but for demo we show relevant ones
      return matchCrop && matchStage;
    });
  }, [selectedCrop, selectedStage]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="bg-card p-6 rounded-2xl border border-[var(--border-theme)] shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--text-primary)] uppercase tracking-tight flex items-center gap-2">
            <Leaf size={24} className="text-[#16845B]" />
            Crop Advisory Engine
          </h2>
          <p className="text-[var(--text-muted)] text-[14px] mt-1">Decision support recommendations based on forecast probabilities</p>
        </div>
        
        {/* Current Outlook Summary box */}
        <div className="bg-[var(--card-elevated)] border border-[var(--border-theme)] rounded-xl p-4 flex gap-6 w-full md:w-auto shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Current Outlook</div>
            <div className="text-[13px] font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <MapPin size={14} className="text-[#1976D2]" /> {selectedLocation.name}
            </div>
          </div>
          
          <div className="flex gap-4">
            <div>
              <div className="text-[11px] text-[var(--text-muted)]">Onset</div>
              <div className={`text-[14px] font-bold ${selectedLocation.onsetProbability >= 70 ? 'text-[#2E9B63]' : 'text-[#F2B84B]'}`}>{selectedLocation.onsetProbability}%</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-muted)]">Dry Spell</div>
              <div className={`text-[14px] font-bold ${selectedLocation.drySpellProbability > 30 ? 'text-[#F2B84B]' : 'text-[#2E9B63]'}`}>{selectedLocation.drySpellProbability}%</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-muted)]">Heavy Rain</div>
              <div className={`text-[14px] font-bold ${selectedLocation.heavyRainProbability > 30 ? 'text-[#E45757]' : 'text-[#2E9B63]'}`}>{selectedLocation.heavyRainProbability}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Engine Logic Visual */}
      <div className="bg-card rounded-xl border border-[var(--border-theme)] p-4 flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider shadow-sm">
        <span className="bg-primary/10 text-[#1976D2] px-3 py-1.5 rounded-lg border border-[#1976D2]/20">Forecast</span>
        <span>+</span>
        <span className="bg-[#7257C7]/10 text-[#7257C7] px-3 py-1.5 rounded-lg border border-[#7257C7]/20">Location</span>
        <span>+</span>
        <span className="bg-[#16845B]/10 text-[#16845B] px-3 py-1.5 rounded-lg border border-[#16845B]/20">Crop</span>
        <span>+</span>
        <span className="bg-warning/10 text-[#F2B84B] px-3 py-1.5 rounded-lg border border-[#F2B84B]/20">Stage</span>
        <span className="mx-2">→</span>
        <span className="bg-[var(--text-primary)] text-white px-4 py-1.5 rounded-lg">Recommendation</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-xl border border-[var(--border-theme)] shadow-sm">
        <div className="flex items-center gap-2 text-[var(--text-muted)] px-2 font-medium text-[13px]">
          <Filter size={16} /> Filters:
        </div>
        
        <div className="relative flex-1 sm:max-w-xs">
          <select 
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value as any)}
            className="w-full appearance-none bg-[var(--card-elevated)] border border-[var(--border-theme)] text-[var(--text-primary)] text-[13px] font-medium rounded-lg px-4 py-2.5 pr-10 outline-none focus:border-[#16845B] transition-colors"
          >
            <option value="all">All Crops</option>
            {cropOptions.map(c => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <select 
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value as any)}
            className="w-full appearance-none bg-[var(--card-elevated)] border border-[var(--border-theme)] text-[var(--text-primary)] text-[13px] font-medium rounded-lg px-4 py-2.5 pr-10 outline-none focus:border-[#16845B] transition-colors"
          >
            <option value="all">All Stages</option>
            {cropStages.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
        </div>
      </div>

      {/* Advisories List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAdvisories.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[var(--text-muted)] bg-card rounded-xl border border-[var(--border-theme)]">
            <Leaf size={32} className="mx-auto mb-3 opacity-20" />
            <p className="text-[14px] font-medium">No advisories found for the selected filters.</p>
          </div>
        ) : (
          filteredAdvisories.map((advisory, idx) => {
            const cropInfo = cropOptions.find(c => c.value === advisory.crop);
            const stageInfo = cropStages.find(s => s.value === advisory.cropStage);
            
            return (
              <div 
                key={advisory.id} 
                className={`bg-card rounded-xl border ${riskBorderColors[advisory.riskLevel]} shadow-sm overflow-hidden flex flex-col card-hover animate-fade-in-up`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Card Header */}
                <div className={`px-6 py-4 border-b border-[var(--border-theme)] flex items-center justify-between ${riskBgColors[advisory.riskLevel]}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cropInfo?.icon}</span>
                    <div>
                      <h3 className="text-[16px] font-bold text-[var(--text-primary)] uppercase tracking-tight">
                        {cropInfo?.label} — {stageInfo?.label}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] font-medium mt-0.5">
                        <MapPin size={12} /> {advisory.location}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-card ${riskTextColors[advisory.riskLevel]} border ${riskBorderColors[advisory.riskLevel]}`}>
                    {advisory.riskLevel} Risk
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  
                  {/* Primary Advisory */}
                  <div className="bg-[var(--card-elevated)] rounded-lg p-4 border border-[var(--border-theme)] mb-5 relative">
                    <Info size={18} className="absolute left-4 top-4 text-[#1976D2]" />
                    <p className="text-[14px] font-medium text-[var(--text-primary)] pl-8 leading-relaxed">
                      {advisory.advisory}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex-1 mb-5">
                    <h4 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">Recommended Actions</h4>
                    <ul className="space-y-2.5">
                      {advisory.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${advisory.riskLevel === 'high' ? 'text-[#E45757]' : 'text-[#2E9B63]'}`} />
                          <span className="text-[13px] text-[var(--text-primary)] leading-snug">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Context Metrics */}
                  <div className="pt-4 border-t border-[var(--border-theme)] grid grid-cols-4 gap-2">
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] font-medium">Confidence</div>
                      <div className="text-[13px] font-bold text-[var(--text-primary)]">{advisory.confidence}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] font-medium">Onset</div>
                      <div className={`text-[13px] font-bold ${advisory.onsetProbability >= 70 ? 'text-[#2E9B63]' : 'text-[#F2B84B]'}`}>{advisory.onsetProbability}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] font-medium">Dry Spell</div>
                      <div className={`text-[13px] font-bold ${advisory.drySpellProbability > 30 ? 'text-[#F2B84B]' : 'text-[#2E9B63]'}`}>{advisory.drySpellProbability}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] font-medium">Heavy Rain</div>
                      <div className={`text-[13px] font-bold ${advisory.heavyRainProbability > 30 ? 'text-[#E45757]' : 'text-[#2E9B63]'}`}>{advisory.heavyRainProbability}%</div>
                    </div>
                  </div>
                  
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="text-center text-[12px] text-[var(--text-muted)]">
        <p><strong>Note:</strong> Advisories are decision-support recommendations based on model probabilities, not absolute instructions.</p>
      </div>
    </div>
  );
}
