import React from 'react';
import { X, Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { alerts } from '../../data/alerts';
import { severityColors } from '../../utils';

const severityIcons: Record<string, React.ReactNode> = {
  high: <AlertTriangle size={14} />,
  advisory: <Bell size={14} />,
  information: <Info size={14} />,
  favorable: <CheckCircle size={14} />,
};

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const recentAlerts = alerts.slice(0, 5);

  return (
    <div className="fixed right-0 top-16 w-[380px] bg-card border-l border-[var(--border-theme)] shadow-xl z-40 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--border-theme)] shrink-0">
        <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Notifications</h3>
        <div className="flex items-center gap-2">
          <button className="text-[11px] text-[#1976D2] hover:underline">Mark all as read</button>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><X size={18} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {recentAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`px-5 py-4 border-b border-[var(--border-theme)] ${!alert.isRead ? 'bg-[var(--card-elevated)]' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${severityColors[alert.severity]}15`, color: severityColors[alert.severity] }}
              >
                {severityIcons[alert.severity]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[var(--text-primary)] mb-0.5">{alert.title}</div>
                <div className="text-[12px] text-[var(--text-muted)] line-clamp-2">{alert.message}</div>
                <div className="text-[10px] text-[var(--text-muted)]/70 mt-1.5">{alert.timestamp}</div>
              </div>
              {!alert.isRead && (
                <div className="w-2 h-2 bg-[#1976D2] rounded-full shrink-0 mt-2" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--border-theme)] p-3 text-center shrink-0">
        <span className="text-[11px] text-[var(--text-muted)]">Demonstration Data</span>
      </div>
    </div>
  );
}
