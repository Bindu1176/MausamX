import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Leaf, BarChart3, Bell, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SearchResult } from '../../types';

const searchResults: SearchResult[] = [
  { id: 's1', title: 'Kanakapura', category: 'location', description: 'Block — Ramanagara, Karnataka', link: '/overview' },
  { id: 's2', title: 'Ramanagara', category: 'location', description: 'District — Karnataka', link: '/map' },
  { id: 's3', title: 'Channapatna', category: 'location', description: 'Block — Ramanagara', link: '/overview' },
  { id: 's4', title: 'Magadi', category: 'location', description: 'Block — Ramanagara', link: '/overview' },
  { id: 's5', title: 'Kodihalli', category: 'location', description: 'Panchayat — Kanakapura', link: '/overview' },
  { id: 's6', title: 'Ragi (Finger Millet)', category: 'crop', description: 'Crop Advisory Available', link: '/advisories' },
  { id: 's7', title: 'Rice (Paddy)', category: 'crop', description: 'Crop Advisory Available', link: '/advisories' },
  { id: 's8', title: 'Maize', category: 'crop', description: 'Crop Advisory Available', link: '/advisories' },
  { id: 's9', title: 'Heavy Rain Risk', category: 'forecast', description: '34% probability — Moderate risk', link: '/forecasts' },
  { id: 's10', title: 'Monsoon Onset', category: 'forecast', description: '82% probability — Favorable', link: '/forecasts' },
  { id: 's11', title: 'Dry Spell Risk', category: 'forecast', description: '18% probability — Low risk', link: '/forecasts' },
  { id: 's12', title: 'Heavy Rainfall Warning', category: 'alert', description: 'Kanakapura Block', link: '/alerts' },
  { id: 's13', title: 'Sowing Advisory — Ragi', category: 'advisory', description: 'Pre-sowing recommendations', link: '/advisories' },
];

const categoryIcons: Record<string, React.ReactNode> = {
  location: <MapPin size={14} />,
  crop: <Leaf size={14} />,
  forecast: <BarChart3 size={14} />,
  advisory: <FileText size={14} />,
  alert: <Bell size={14} />,
};

const categoryColors: Record<string, string> = {
  location: 'text-[#1976D2] bg-primary/10',
  crop: 'text-[#16845B] bg-[#16845B]/10',
  forecast: 'text-[#7257C7] bg-[#7257C7]/10',
  advisory: 'text-[#159A9C] bg-[#159A9C]/10',
  alert: 'text-[#E45757] bg-danger/10',
};

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const filtered = query.length > 0
    ? searchResults.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchResults.slice(0, 6);

  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-[560px] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 h-14 border-b border-[var(--border-theme)]">
          <Search size={18} className="text-[var(--text-muted)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search locations, crops, forecasts, advisories..."
            className="flex-1 text-[14px] outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60"
          />
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {Object.keys(grouped).length === 0 ? (
            <div className="py-12 text-center text-[var(--text-muted)] text-[13px]">
              No results found for "{query}"
            </div>
          ) : (
            Object.entries(grouped).map(([category, results]) => (
              <div key={category} className="mb-2">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  {category}s
                </div>
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => { navigate(result.link); onClose(); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--card-elevated)] transition-colors text-left"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${categoryColors[result.category]}`}>
                      {categoryIcons[result.category]}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-[var(--text-primary)]">{result.title}</div>
                      <div className="text-[11px] text-[var(--text-muted)]">{result.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        <div className="border-t border-[var(--border-theme)] px-5 py-3 text-[11px] text-[var(--text-muted)]">
          Press <kbd className="px-1.5 py-0.5 bg-[var(--card-elevated)] rounded border border-[var(--border-theme)] text-[10px]">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
}
