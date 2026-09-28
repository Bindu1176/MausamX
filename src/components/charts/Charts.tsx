import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart,
  ScatterChart, Scatter
} from 'recharts';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-card rounded-xl border border-[var(--border-theme)] p-5 ${className}`}>
      <div className="mb-4">
        <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">{title}</h3>
        {subtitle && <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// Rainfall Probability Chart
export function RainfallProbabilityChart({ data }: { data: { day: number; rainfallProbability: number; confidence: number }[] }) {
  return (
    <ChartCard title="Rainfall Probability" subtitle="30-day probabilistic outlook (Demonstration Data)">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="probGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1976D2" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1976D2" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-theme)" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} label={{ value: 'Days', position: 'insideBottom', offset: -5, fontSize: 11, fill: 'var(--text-muted)' }} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} domain={[0, 100]} label={{ value: 'Probability %', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'var(--text-muted)' }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border-theme)', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="rainfallProbability" name="Rainfall Probability" stroke="#1976D2" fill="url(#probGrad)" strokeWidth={2} />
          <Line type="monotone" dataKey="confidence" name="Confidence" stroke="var(--text-muted)" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// Rainfall Trend Chart
export function RainfallTrendChart({ data }: { data: { month: string; actual: number; predicted: number; normal: number }[] }) {
  return (
    <ChartCard title="Rainfall Trend" subtitle="Historical vs forecast (Demonstration Data)">
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-theme)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} label={{ value: 'mm', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'var(--text-muted)' }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border-theme)', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="actual" name="Actual" fill="#1976D2" radius={[3, 3, 0, 0]} barSize={18} />
          <Line type="monotone" dataKey="predicted" name="Predicted" stroke="#7257C7" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="normal" name="Normal" stroke="var(--text-muted)" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// Risk Distribution Chart
export function RiskDistributionChart({ onset, drySpell, heavyRain }: { onset: number; drySpell: number; heavyRain: number }) {
  const data = [
    { name: 'Onset', value: onset, fill: '#2E9B63' },
    { name: 'Dry Spell', value: drySpell, fill: '#F2B84B' },
    { name: 'Heavy Rain', value: heavyRain, fill: '#E45757' },
  ];
  return (
    <ChartCard title="Risk Distribution" subtitle="Current probability assessment">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-theme)" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-primary)', fontWeight: 500 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border-theme)', fontSize: 12 }} formatter={(v: any) => [`${v}%`, 'Probability']} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
            {data.map((entry, i) => (
              <rect key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// Forecast Timeline Chart
export function ForecastTimelineChart({ data }: { data: { day: number; onsetProbability: number; drySpellProbability: number; heavyRainProbability: number }[] }) {
  const timelineData = data.filter(d => [7, 14, 21, 30].includes(d.day));
  return (
    <ChartCard title="Forecast Timeline" subtitle="Probability at key forecast horizons">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-theme)" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} tickFormatter={(v) => `${v} Days`} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} domain={[0, 100]} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border-theme)', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="onsetProbability" name="Onset" fill="#2E9B63" radius={[3, 3, 0, 0]} barSize={16} />
          <Bar dataKey="drySpellProbability" name="Dry Spell" fill="#F2B84B" radius={[3, 3, 0, 0]} barSize={16} />
          <Bar dataKey="heavyRainProbability" name="Heavy Rain" fill="#E45757" radius={[3, 3, 0, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// Calibration Curve
export function CalibrationChart({ data }: { data: { predicted: number; observed: number }[] }) {
  const perfectLine = [{ predicted: 0, observed: 0 }, { predicted: 1, observed: 1 }];
  return (
    <ChartCard title="Reliability / Calibration Curve" subtitle="Predicted vs observed frequency (Demonstration)">
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-theme)" />
          <XAxis dataKey="predicted" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} domain={[0, 1]} name="Predicted" label={{ value: 'Predicted Probability', position: 'insideBottom', offset: -5, fontSize: 11, fill: 'var(--text-muted)' }} />
          <YAxis dataKey="observed" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} domain={[0, 1]} name="Observed" label={{ value: 'Observed Frequency', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'var(--text-muted)' }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border-theme)', fontSize: 12 }} />
          <Scatter data={data} fill="#1976D2" line={{ stroke: '#1976D2', strokeWidth: 2 }} />
          <Scatter data={perfectLine} fill="transparent" line={{ stroke: 'var(--text-muted)', strokeDasharray: '5 5', strokeWidth: 1 }} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// Rainfall Intensity Chart
export function RainfallIntensityChart({ data }: { data: { day: string; light: number; moderate: number; heavy: number; veryHeavy: number }[] }) {
  return (
    <ChartCard title="Rainfall Intensity Distribution" subtitle="Expected intensity categories (Demonstration Data)">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-theme)" />
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border-theme)' }} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border-theme)', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="light" name="Light" stackId="a" fill="#4DA3FF" barSize={20} />
          <Bar dataKey="moderate" name="Moderate" stackId="a" fill="#1976D2" />
          <Bar dataKey="heavy" name="Heavy" stackId="a" fill="#F2B84B" />
          <Bar dataKey="veryHeavy" name="Very Heavy" stackId="a" fill="#E45757" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
