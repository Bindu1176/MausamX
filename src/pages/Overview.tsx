import React from 'react';
import { CloudRain, SunMedium, CloudLightning, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import KPICard from '../components/cards/KPICard';
import { RainfallProbabilityChart, RiskDistributionChart, RainfallTrendChart, ForecastTimelineChart } from '../components/charts/Charts';
import { forecastData, forecastSummary } from '../data/forecasts';
import { monthlyRainfall } from '../data/rainfall';

export default function Overview() {
  const { selectedLocation } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-card p-6 rounded-2xl border border-[var(--border-theme)] shadow-sm">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--text-primary)] mb-1">Monsoon Intelligence</h2>
          <p className="text-[var(--text-muted)] text-[14px]">Hyperlocal probabilistic outlook for agricultural decision-making</p>
        </div>
        
        <div className="flex gap-4 text-[12px]">
          <div className="bg-[var(--card-elevated)] px-4 py-2 rounded-lg border border-[var(--border-theme)]">
            <div className="text-[var(--text-muted)] font-medium mb-0.5">Forecast Horizon</div>
            <div className="text-[var(--text-primary)] font-semibold">{forecastSummary.horizon}</div>
          </div>
          <div className="bg-[var(--card-elevated)] px-4 py-2 rounded-lg border border-[var(--border-theme)]">
            <div className="text-[var(--text-muted)] font-medium mb-0.5">Last Updated</div>
            <div className="text-[var(--text-primary)] font-semibold">{forecastSummary.lastUpdated}</div>
          </div>
          <div className="bg-[var(--card-elevated)] px-4 py-2 rounded-lg border border-[var(--border-theme)]">
            <div className="text-[var(--text-muted)] font-medium mb-0.5">System</div>
            <div className="text-[#2E9B63] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B63]"></span>
              {forecastSummary.system}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Monsoon Onset"
          value={selectedLocation.onsetProbability}
          status={selectedLocation.onsetProbability >= 70 ? 'Favorable' : 'Monitor'}
          statusColor="#2E9B63"
          icon={CloudRain}
          description="Probability of sustained monsoon establishment in the region."
          delay={0}
        />
        <KPICard
          title="Dry Spell"
          value={selectedLocation.drySpellProbability}
          status={selectedLocation.drySpellProbability > 30 ? 'Elevated' : 'Low Risk'}
          statusColor={selectedLocation.drySpellProbability > 30 ? '#F2B84B' : '#2E9B63'}
          icon={SunMedium}
          description="Probability of a prolonged rainfall gap affecting crops."
          delay={100}
        />
        <KPICard
          title="Heavy Rain"
          value={selectedLocation.heavyRainProbability}
          status={selectedLocation.heavyRainProbability > 30 ? 'Moderate Risk' : 'Low Risk'}
          statusColor={selectedLocation.heavyRainProbability > 30 ? '#F2B84B' : '#2E9B63'}
          icon={CloudLightning}
          description="Probability of heavy rainfall causing potential waterlogging."
          delay={200}
        />
        <KPICard
          title="Forecast Confidence"
          value={selectedLocation.confidence}
          status={selectedLocation.confidence > 75 ? 'Medium–High' : 'Medium'}
          statusColor="#7257C7"
          icon={ShieldCheck}
          description="Model confidence based on historical validation."
          delay={300}
        />
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RainfallProbabilityChart data={forecastData} />
        </div>
        <div className="lg:col-span-1 flex flex-col justify-between">
          <RiskDistributionChart 
            onset={selectedLocation.onsetProbability} 
            drySpell={selectedLocation.drySpellProbability} 
            heavyRain={selectedLocation.heavyRainProbability} 
          />
        </div>
      </div>

      {/* Recommended Action Card */}
      <div className="bg-card rounded-xl border border-[var(--border-theme)] p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Crop Decision Support</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xl">
            Rainfall conditions indicate a favorable probability of monsoon establishment. Review localized crop advisories before sowing operations.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={() => navigate('/advisories')}
            className="px-4 py-2 bg-[#16845B] hover:bg-[#126b49] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            Crop Advisories <ArrowRight size={14} />
          </button>
          <button 
            onClick={() => navigate('/map')}
            className="px-4 py-2 bg-card-elevated hover:bg-slate-200 text-text-primary rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            Risk Map <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
