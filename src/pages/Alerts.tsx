import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle2, Shield } from 'lucide-react';
import { useApp } from '../hooks/useApp';

export default function Alerts() {
  const { selectedLocation } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-12">
      {/* Header */}
      <div className="bg-card p-6 rounded-2xl border border-border-theme shadow-xs">
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight flex items-center gap-2">
          <Bell size={24} className="text-[#1976D2]" />
          Monsoon Alerts
        </h2>
        <p className="text-text-muted text-sm mt-1">
          📍 Active alerts for <span className="font-bold text-text-primary">{selectedLocation.name}</span> Panchayat
        </p>
      </div>

      {/* Simple Alert Cards List */}
      <div className="space-y-4">
        {/* Alert 1 */}
        <div className="bg-card rounded-2xl border border-amber-200 p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                Moderate Alert • Monsoon Update
              </span>
              <span className="text-xs text-text-muted font-medium">Updated 2 hours ago</span>
            </div>
            <h3 className="text-base font-bold text-text-primary">Monsoon Onset Probability Increased (82%)</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              Establishment of monsoon currents over {selectedLocation.name} is now 82% likely within the next 7 days. Sowing preparation is advised.
            </p>
          </div>
        </div>

        {/* Alert 2 */}
        <div className="bg-card rounded-2xl border border-blue-200 p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-[#1976D2] flex items-center justify-center shrink-0 mt-0.5">
            <Info size={20} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1976D2] text-[11px] font-bold">
                Information • Heavy Rain Advisory
              </span>
              <span className="text-xs text-text-muted font-medium">Updated Yesterday</span>
            </div>
            <h3 className="text-base font-bold text-text-primary">Heavy Rain Possible (Friday–Saturday)</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              34% chance of isolated heavy rainfall spells. Ensure proper field drainage channels are cleared to prevent waterlogging.
            </p>
          </div>
        </div>

        {/* Alert 3 */}
        <div className="bg-card rounded-2xl border border-emerald-200 p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 size={20} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-success/20 text-emerald-800 text-[11px] font-bold">
                Low Risk • Dry Spell
              </span>
              <span className="text-xs text-text-muted font-medium">3 days ago</span>
            </div>
            <h3 className="text-base font-bold text-text-primary">Low Dry Spell Risk (18%)</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              No immediate prolonged dry spell expected over the next 14 days. Sowing moisture risk remains minimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
