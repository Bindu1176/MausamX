import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  MapPin,
  Sprout,
  Bell,
  Info,
  HelpCircle,
  Globe,
  Droplets
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { languages } from '../../utils/translations';

const primaryNav = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/location', label: 'My Location', icon: MapPin },
  { to: '/advisory', label: 'Advisory', icon: Sprout },
  { to: '/alerts', label: 'Alerts', icon: Bell },
];

export default function Sidebar() {
  const { language, setLanguage } = useApp();

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      maxWidth: '240px',
      height: '100vh',
      background: 'var(--sidebar)',
      borderRight: '1px solid var(--border-theme)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      overflow: 'hidden',
      zIndex: 30,
    }}>
      <div>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px', marginBottom: '28px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 2px 8px rgba(2,132,199,0.25)'
          }}>
            <Droplets size={18} color="var(--card)" />
          </div>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: 1 }}>
              MausamX
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '3px', letterSpacing: '0.2px' }}>
              Monsoon Intelligence
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                background: isActive ? 'var(--primary-hover)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              })}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={17} style={{ flexShrink: 0, color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--border-theme)', margin: '16px 0' }} />

        {/* Secondary Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <NavLink
            to="/about"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--card-elevated)' : 'transparent',
            })}
          >
            {({ isActive }) => (
              <>
                <Info size={15} style={{ flexShrink: 0, color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }} />
                <span>About MausamX</span>
              </>
            )}
          </NavLink>

          <a
            href="#help"
            onClick={(e) => {
              e.preventDefault();
              alert("MausamX Support:\nContact local agriculture officer or Krishi Vigyan Kendra helpline for field guidance.");
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 12px', borderRadius: '10px',
              fontSize: '12px', fontWeight: 500,
              textDecoration: 'none', color: 'var(--text-secondary)',
            }}
          >
            <HelpCircle size={15} style={{ flexShrink: 0, color: 'var(--text-muted)' }} />
            <span>Help & Support</span>
          </a>
        </div>
      </div>

      {/* Footer: Language Selector */}
      <div style={{ borderTop: '1px solid var(--border-theme)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <Globe size={13} color="#94A3B8" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Language</span>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          style={{
            width: '100%', background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
            borderRadius: '10px', padding: '8px 10px',
            fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)',
            outline: 'none', cursor: 'pointer',
          }}
        >
          {languages.map(l => (
            <option key={l.code} value={l.code}>{l.nativeName} ({l.code.toUpperCase()})</option>
          ))}
        </select>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', padding: '0 4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Live Data</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Simulated demo</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
