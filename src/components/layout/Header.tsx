import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Globe, MapPin, ChevronDown, User, Moon, Sun } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { locations, getLocationPath } from '../../data/locations';
import { languages } from '../../utils/translations';
import SearchModal from '../common/SearchModal';
import NotificationPanel from '../common/NotificationPanel';

export default function Header() {
  const { selectedLocation, setSelectedLocationId, searchOpen, setSearchOpen, language, setLanguage, notificationsOpen, setNotificationsOpen, theme, setTheme } = useApp();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const locationPath = getLocationPath(selectedLocation.id);
  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      <header style={{
        height: '64px',
        minHeight: '64px',
        background: 'var(--sidebar)',
        borderBottom: '1px solid var(--border-theme)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        gap: '16px',
        zIndex: 20,
        flexShrink: 0,
      }}>
        {/* Left - Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(2,132,199,0.1)', color: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <MapPin size={18} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {selectedLocation.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '1px' }}>
              {locationPath[locationPath.length - 2]?.name || 'Kanakapura'}, Karnataka
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div
          onClick={() => setSearchOpen(true)}
          style={{
            flex: 1, maxWidth: '480px', display: 'flex', alignItems: 'center', gap: '10px',
            padding: '9px 16px', background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
            borderRadius: '50px', cursor: 'pointer', transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#CBD5E1')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
        >
          <Search size={15} color="#94A3B8" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>
            Search location...
          </span>
        </div>

        {/* Right - Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Language */}
          <div style={{ position: 'relative' }} ref={langRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 12px', background: 'var(--sidebar)', border: '1px solid var(--border-theme)',
                borderRadius: '50px', cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                color: 'var(--text-primary)', transition: 'background 0.15s ease',
              }}
            >
              <Globe size={14} color="#0284C7" />
              <span>{currentLang.code.toUpperCase()}</span>
              <ChevronDown size={12} color="#94A3B8" />
            </button>

            {langDropdownOpen && (
              <div style={{
                position: 'absolute', right: 0, top: '44px',
                background: 'var(--sidebar)', border: '1px solid var(--border-theme)',
                borderRadius: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.10)',
                padding: '8px', width: '180px', zIndex: 50,
              }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '4px 10px 6px' }}>
                  Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangDropdownOpen(false); }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '8px 10px',
                      borderRadius: '8px', fontSize: '12px', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontWeight: language === lang.code ? 700 : 500,
                      background: language === lang.code ? 'var(--primary)' : 'transparent',
                      color: language === lang.code ? 'var(--sidebar)' : 'var(--text-primary)',
                    }}
                  >
                    <span>{lang.nativeName}</span>
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title="Toggle Theme"
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--sidebar)', border: '1px solid var(--border-theme)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-secondary)',
              transition: 'background 0.15s ease',
            }}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            title="Notifications"
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--sidebar)', border: '1px solid var(--border-theme)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative', color: 'var(--text-secondary)',
            }}
          >
            <Bell size={17} />
            <span style={{
              position: 'absolute', top: '8px', right: '8px',
              width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E',
            }} />
          </button>

          {/* User Avatar */}
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--text-primary)', color: 'var(--sidebar)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, cursor: 'pointer',
          }}>
            <User size={17} />
          </div>
        </div>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      {notificationsOpen && <NotificationPanel onClose={() => setNotificationsOpen(false)} />}
    </>
  );
}
