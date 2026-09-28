import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SignalCardProps {
  abbreviation: string;
  name: string;
  status: string;
  value: number;
  description: string;
  impact: string;
  category: string;
}

export default function SignalCard({ abbreviation, name, status, value, description, impact, category }: SignalCardProps) {
  const isGlobal = category === 'global';
  const accentColor = isGlobal ? '#7257C7' : '#159A9C';

  return (
    <div className="bg-card rounded-xl border border-[var(--border-theme)] p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
            {isGlobal ? 'Global Signal' : 'Regional Condition'}
          </div>
          <div className="text-[17px] font-bold text-[var(--text-primary)] mt-1">{abbreviation}</div>
        </div>
        <div
          className="px-3 py-1 rounded-full text-[11px] font-semibold"
          style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
        >
          {status}
        </div>
      </div>

      <div className="text-[13px] text-[var(--text-muted)] mb-3 leading-relaxed">{name}</div>

      <div className="bg-[var(--card-elevated)] rounded-lg p-3 mb-3">
        <div className="text-[12px] text-[var(--text-muted)] mb-1">Current Value</div>
        <div className="text-[22px] font-bold text-[var(--text-primary)]">{value}</div>
      </div>

      <p className="text-[12px] text-[var(--text-muted)] leading-relaxed mb-2">{description}</p>

      <div className="border-t border-[var(--border-theme)] pt-3 mt-3">
        <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Impact Assessment</div>
        <p className="text-[12px] text-[var(--text-primary)] leading-relaxed">{impact}</p>
      </div>

      <div className="mt-3 text-[10px] text-[var(--text-muted)]/60">Demonstration Data</div>
    </div>
  );
}
