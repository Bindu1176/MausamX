import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { forecastData, forecastKeyDays } from '../data/forecasts';
import { RainfallProbabilityChart, RiskDistributionChart, ForecastTimelineChart, RainfallIntensityChart } from '../components/charts/Charts';
import { dailyRainfallIntensity } from '../data/rainfall';
import { Info } from 'lucide-react';

type FilterType = 'probability' | 'rainfall' | 'anomaly';

export default function Forecasts() {
  const { selectedLocation } = useApp();
  const [activeFilter, setActiveFilter] = useState<FilterType>('probability');

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="bg-card p-6 rounded-2xl border border-[var(--border-theme)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--text-primary)] uppercase tracking-tight">7–30 Day Probabilistic Forecast</h2>
          <p className="text-[var(--text-muted)] text-[14px]">Detailed outlook for {selectedLocation.name} {selectedLocation.type}</p>
        </div>
        
        <div className="flex bg-[var(--card-elevated)] border border-[var(--border-theme)] rounded-lg p-1 text-[13px] font-medium">
          <button 
            onClick={() => setActiveFilter('probability')}
            className={`px-4 py-2 rounded-md transition-colors ${activeFilter === 'probability' ? 'bg-card shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            Probability
          </button>
          <button 
            onClick={() => setActiveFilter('rainfall')}
            className={`px-4 py-2 rounded-md transition-colors ${activeFilter === 'rainfall' ? 'bg-card shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            Rainfall Amount
          </button>
          <button 
            onClick={() => setActiveFilter('anomaly')}
            className={`px-4 py-2 rounded-md transition-colors ${activeFilter === 'anomaly' ? 'bg-card shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            Anomaly
          </button>
        </div>
      </div>

      {/* Forecast Interpretation Warning */}
      <div className="bg-[#1976D2]/5 border border-[#1976D2]/20 rounded-xl p-4 flex items-start gap-3">
        <Info size={20} className="text-[#1976D2] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[13px] font-bold text-[var(--text-primary)] mb-1 uppercase tracking-wider">Forecast Interpretation</h4>
          <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
            Probability indicates the likelihood of the event occurring within the selected forecast window. <strong>It is not a deterministic prediction.</strong> Values above 70% suggest high confidence of occurrence, while values below 30% suggest low likelihood.
          </p>
        </div>
      </div>

      {/* Main Probability Outlook */}
      <div className="bg-card rounded-xl border border-[var(--border-theme)] p-5 shadow-sm">
        <RainfallProbabilityChart data={forecastData} />
      </div>

      {/* Forecast Timeline Table */}
      <div className="bg-card rounded-xl border border-[var(--border-theme)] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border-theme)]">
          <h3 className="text-[16px] font-bold text-[var(--text-primary)]">Forecast Timeline Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--card-elevated)] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                <th className="px-6 py-3 border-b border-[var(--border-theme)]">Day</th>
                <th className="px-6 py-3 border-b border-[var(--border-theme)]">Date</th>
                <th className="px-6 py-3 border-b border-[var(--border-theme)]">Rainfall Prob.</th>
                <th className="px-6 py-3 border-b border-[var(--border-theme)]">Amount</th>
                <th className="px-6 py-3 border-b border-[var(--border-theme)]">Onset Prob.</th>
                <th className="px-6 py-3 border-b border-[var(--border-theme)]">Confidence</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[var(--text-primary)]">
              {forecastKeyDays.map(day => {
                const fd = forecastData.find(f => f.day === day);
                if (!fd) return null;
                return (
                  <tr key={day} className="border-b border-[var(--border-theme)] hover:bg-[var(--card-elevated)] transition-colors">
                    <td className="px-6 py-4 font-medium">Day {day}</td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">{new Date(fd.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8">{fd.rainfallProbability}%</span>
                        <div className="w-16 h-1.5 bg-[var(--border-theme)] rounded-full overflow-hidden">
                          <div className="h-full bg-[#1976D2]" style={{ width: `${fd.rainfallProbability}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{fd.rainfallAmount} mm</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-semibold ${fd.onsetProbability > 70 ? 'bg-success/10 text-[#2E9B63]' : fd.onsetProbability > 40 ? 'bg-warning/10 text-[#F2B84B]' : 'bg-danger/10 text-[#E45757]'}`}>
                        {fd.onsetProbability}%
                      </span>
                    </td>
                    <td className="px-6 py-4">{fd.confidence}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
