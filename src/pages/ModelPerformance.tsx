import React from 'react';
import { Activity, ShieldCheck, Database } from 'lucide-react';
import { modelMetrics, calibrationData, probabilityDistribution, historicalVsPredicted, modelDetails } from '../data/modelMetrics';
import { CalibrationChart } from '../components/charts/Charts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

export default function ModelPerformance() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <div className="bg-card p-6 rounded-2xl border border-[var(--border-theme)] shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--text-primary)] uppercase tracking-tight flex items-center gap-2">
            <Activity size={24} className="text-[#7257C7]" />
            Model Performance
          </h2>
          <p className="text-[var(--text-muted)] text-[14px] mt-1">Evaluation of probabilistic forecasts using historical validation</p>
        </div>
        
        <div className="bg-[#7257C7]/5 border border-[#7257C7]/20 rounded-xl p-3 flex items-center gap-2 max-w-sm">
          <ShieldCheck size={20} className="text-[#7257C7] shrink-0" />
          <p className="text-[11px] text-[var(--text-primary)] leading-tight">
            <strong>Prototype Note:</strong> These metrics demonstrate how the system evaluates probabilistic forecasts. Do not treat these as live real-world accuracy claims.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {modelMetrics.map((metric, i) => (
          <div key={i} className="bg-card rounded-xl border border-[var(--border-theme)] p-4 shadow-sm text-center">
            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">{metric.name}</div>
            <div className="text-[24px] font-bold text-[var(--text-primary)] mb-1">{metric.value}</div>
            <div className="text-[10px] text-[var(--text-muted)]/80 px-2 leading-tight">{metric.category}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalibrationChart data={calibrationData} />
        
        <div className="bg-card rounded-xl border border-[var(--border-theme)] p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Probability Distribution</h3>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Predicted vs Observed Frequency</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={probabilityDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-theme)" vertical={false} />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border-theme)', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="predicted" name="Predicted" fill="#1976D2" radius={[2, 2, 0, 0]} />
              <Bar dataKey="observed" name="Observed" fill="#2E9B63" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-[var(--border-theme)] p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Historical vs Predicted Rainfall (Validation)</h3>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Annual total rainfall (mm)</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={historicalVsPredicted}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-theme)" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border-theme)', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="historical" name="Historical Actual" fill="var(--border-theme)" radius={[2, 2, 0, 0]} barSize={30} />
              <Line type="monotone" dataKey="predicted" name="Model Prediction" stroke="#1976D2" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="step" dataKey="normal" name="Normal (LPA)" stroke="var(--text-muted)" strokeDasharray="4 4" strokeWidth={1} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-[var(--border-theme)] p-5 shadow-sm flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <Database size={18} className="text-[var(--text-primary)]" />
            <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Model Specifications</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            <div>
              <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Ensemble Models</div>
              <div className="flex flex-wrap gap-2">
                {modelDetails.models.map(m => (
                  <span key={m} className="px-2 py-1 bg-[var(--card-elevated)] border border-[var(--border-theme)] rounded text-[12px] font-medium text-[var(--text-primary)]">{m}</span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Key Features</div>
              <div className="text-[12px] text-[var(--text-primary)] leading-relaxed pl-3 border-l-2 border-[#1976D2]">
                {modelDetails.features.join(', ')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Spatial Res.</div>
                <div className="text-[12px] font-semibold text-[var(--text-primary)]">{modelDetails.spatialResolution}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-1">Temporal Res.</div>
                <div className="text-[12px] font-semibold text-[var(--text-primary)]">{modelDetails.temporalResolution}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
