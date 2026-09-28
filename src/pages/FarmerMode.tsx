import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Globe, CloudRain, ShieldAlert, ArrowLeft, Leaf, Droplets, SunMedium } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { t, languages } from '../utils/translations';
import { advisories } from '../data/advisories';

export default function FarmerMode() {
  const { selectedLocation, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // For demo, get the first ragi advisory
  const advisory = advisories.find(a => a.crop === 'ragi') || advisories[0];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-card shadow-xl animate-fade-in-up pb-20">
      {/* App Bar */}
      <header className="bg-[#1B3022] text-white px-4 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/overview')} className="p-1 -ml-1 text-white/80 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <div className="font-bold tracking-wide">MAUSAMX</div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-card/10 px-2 py-1 rounded-full text-[12px]">
            <MapPin size={12} />
            <span className="max-w-[80px] truncate">{selectedLocation.name}</span>
          </div>
          
          <div className="relative">
            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="p-1">
              <Globe size={18} />
            </button>
            
            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-card rounded-xl shadow-xl overflow-hidden z-50 py-1">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-[13px] ${language === lang.code ? 'bg-primary/10 text-[#1976D2] font-bold' : 'text-[var(--text-primary)]'}`}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4 bg-[var(--card-elevated)]">
        
        {/* Weather Summary */}
        <div className="bg-gradient-to-br from-[#2E6F40] to-[#4E9F64] rounded-2xl p-5 text-white shadow-md">
          <div className="text-[12px] font-medium text-white/80 uppercase tracking-wider mb-2">
            {t('rainOutlook', language)}
          </div>
          <div className="flex items-end gap-3 mb-4">
            <CloudRain size={40} className="text-white" />
            <div className="text-[20px] font-bold leading-tight">
              {t('rainLikely', language)}
            </div>
          </div>
          
          <div className="flex bg-card/20 rounded-xl p-2 gap-2 mt-4">
            <div className="flex-1 text-center border-r border-white/20">
              <div className="text-[10px] text-white/70">{t('crop', language)}</div>
              <div className="text-[14px] font-bold flex items-center justify-center gap-1">🌱 Ragi</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-[10px] text-white/70">{t('risk', language)}</div>
              <div className="text-[14px] font-bold text-[#F2B84B]">{t('moderateRisk', language)}</div>
            </div>
          </div>
        </div>

        {/* Primary Action Card */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-[var(--border-theme)]">
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-3 border-b border-[var(--border-theme)] pb-2">
            {t('whatShouldIDo', language)}
          </h2>
          
          <div className="bg-[var(--card-elevated)] border border-[var(--border-theme)] rounded-xl p-4 mb-4 relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#16845B]" />
             <p className="text-[16px] font-medium text-[var(--text-primary)] leading-snug">
               {t('prepareField', language)}
             </p>
          </div>

          <div className="space-y-3">
            {advisory.actions.slice(0, 3).map((action, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-[#16845B]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#16845B] text-[12px] font-bold">{i+1}</span>
                </div>
                <div className="text-[14px] text-[var(--text-primary)]">{action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast Mini */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-[var(--border-theme)]">
           <h2 className="text-[14px] font-bold text-[var(--text-primary)] mb-3">7-Day Forecast</h2>
           <div className="flex justify-between items-end pb-2">
             {[1,2,3,4,5,6,7].map(day => (
               <div key={day} className="flex flex-col items-center gap-1">
                 <div className="text-[10px] text-[var(--text-muted)]">D{day}</div>
                 {day < 4 ? <CloudRain size={16} className="text-[#1976D2]" /> : <SunMedium size={16} className="text-[#F2B84B]" />}
                 <div className={`w-8 rounded-t-sm ${day < 4 ? 'bg-[#1976D2]' : 'bg-[var(--border-theme)]'}`} style={{ height: day < 4 ? '24px' : '8px' }} />
               </div>
             ))}
           </div>
        </div>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-[var(--border-theme)] px-6 py-3 flex justify-between max-w-md mx-auto z-40">
        <button className="flex flex-col items-center gap-1 text-[#1976D2]">
          <Leaf size={24} />
          <span className="text-[10px] font-bold">{t('advisory', language)}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <Droplets size={24} />
          <span className="text-[10px] font-bold">{t('forecast', language)}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ShieldAlert size={24} />
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
      </nav>
    </div>
  );
}
