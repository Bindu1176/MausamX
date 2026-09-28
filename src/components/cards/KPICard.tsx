import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  suffix?: string;
  status: string;
  statusColor: string;
  icon: LucideIcon;
  description: string;
  delay?: number;
}

export default function KPICard({ title, value, suffix = '%', status, statusColor, icon: Icon, description, delay = 0 }: KPICardProps) {
  return (
    <div
      className="bg-card rounded-xl border border-[var(--border-theme)] p-5 card-hover animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">{title}</div>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${statusColor}15` }}>
          <Icon size={18} style={{ color: statusColor }} />
        </div>
      </div>

      <div className="mb-2">
        <span className="text-[36px] font-bold text-[var(--text-primary)] leading-none">{value}</span>
        <span className="text-[20px] font-semibold text-[var(--text-muted)] ml-0.5">{suffix}</span>
      </div>

      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3"
        style={{ backgroundColor: `${statusColor}12`, color: statusColor }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
        {status}
      </div>

      <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{description}</p>
    </div>
  );
}
