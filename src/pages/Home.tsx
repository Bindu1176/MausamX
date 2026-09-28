import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CloudRain, 
  Sun, 
  CloudLightning, 
  Droplets, 
  Sprout, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Printer,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../hooks/useApp';
import LocationMap from '../components/common/LocationMap';

export default function Home() {
  const { selectedLocation } = useApp();
  const navigate = useNavigate();
  const [showInsights, setShowInsights] = useState(false);

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
      {/* Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Good Morning,</div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', margin: '2px 0 0', letterSpacing: '-0.5px' }}>
            Your Monsoon Outlook
          </h1>
        </div>
        <button
          onClick={() => window.print()}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', background: 'var(--card)', border: '1px solid var(--border-theme)',
            borderRadius: '10px', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)',
            cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
          }}
        >
          <Printer size={14} color="#94A3B8" />
          Print Report
        </button>
      </div>

      {/* Main Content: Left (wider) + Right (narrower) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
          
          {/* 1. Hero Forecast Card */}
          <div style={{ background: 'var(--card)', borderRadius: '20px', border: '1px solid var(--border-theme)', overflow: 'hidden' }}>
            {/* Sky Banner — light: soft blue gradient | dark: deep navy surface */}
            <div className="hero-banner" style={{
              position: 'relative', height: '160px', padding: '20px 24px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(180deg, transparent, rgba(21,128,61,0.10))' }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="monsoon-badge" style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>
                  Monsoon Outlook
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="hero-icon-wrap" style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--primary)', flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  <CloudRain size={28} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '42px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-1px', lineHeight: 1 }}>
                      {selectedLocation.onsetProbability}%
                    </span>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>Monsoon Onset Likely</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: 700, marginTop: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)' }}>
                      <CheckCircle2 size={13} /> Next 7–30 days
                    </span>
                    <span style={{ color: 'var(--primary)' }}>High confidence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Summary Indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--border-theme)' }}>
              {[
                { icon: <Sun size={18} />, lightBg: '#FEF3C7', darkBg: 'rgba(245,184,75,0.12)', color: '#D97706', darkColor: '#F5B84B', label: 'Dry Spell', value: `${selectedLocation.drySpellProbability}%`, sub: 'Low possibility' },
                { icon: <CloudLightning size={18} />, lightBg: '#F3E8FF', darkBg: 'rgba(147,51,234,0.12)', color: '#9333EA', darkColor: '#C084FC', label: 'Heavy Rain', value: `${selectedLocation.heavyRainProbability}%`, sub: 'Moderate possibility' },
                { icon: <Droplets size={18} />, lightBg: '#ECFDF5', darkBg: 'rgba(53,201,138,0.12)', color: 'var(--success)', darkColor: 'var(--success)', label: 'Rainfall', value: 'Favorable', sub: 'Conditions', valueColor: 'var(--success)' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                  borderRight: i < 2 ? '1px solid var(--border-theme)' : 'none'
                }}>
                  <div className={`summary-icon-${i}`} style={{ width: '38px', height: '38px', borderRadius: '10px', background: item.lightBg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: (item as any).valueColor || 'var(--text-primary)', lineHeight: 1.1, marginTop: '1px' }}>{item.value}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '1px' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Farm Advisory Card */}
          <div className="farm-advisory-card" style={{ borderRadius: '20px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sprout size={16} color="#FFFFFF" />
              </div>
              <h3 className="farm-advisory-heading" style={{ fontSize: '14px', fontWeight: 800, margin: 0 }}>What this means for your farm</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div className="farm-advisory-icon" style={{
                width: '48px', height: '48px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', flexShrink: 0
              }}>
                🌾
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Ragi</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>• Pre-sowing</span>
                  <span className="favorable-badge" style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 800 }}>Favorable</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, margin: '0 0 10px' }}>
                  Conditions are becoming favorable for sowing.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  {[
                    { icon: <CheckCircle2 size={14} color="var(--success)" />, text: 'Prepare your field', isWarning: false },
                    { icon: <CheckCircle2 size={14} color="var(--success)" />, text: 'Check soil moisture', isWarning: false },
                    { icon: <CheckCircle2 size={14} color="var(--success)" />, text: 'Keep quality seeds ready', isWarning: false },
                    { icon: <span style={{ fontSize: '13px' }}>⚠️</span>, text: 'Monitor rainfall persistence', isWarning: true },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: item.isWarning ? 'var(--warning)' : 'var(--text-primary)' }}>
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/advisory')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '9px 18px', background: 'var(--primary)', borderRadius: '50px',
                    color: '#FFFFFF', fontSize: '12px', fontWeight: 700, border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  View Full Advisory
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. 7-Day Rainfall Outlook */}
          <div style={{ background: 'var(--card)', borderRadius: '20px', border: '1px solid var(--border-theme)', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <CloudRain size={16} color="#0284C7" />
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>7-Day Rainfall Outlook</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center' }}>
              {[
                { day: 'Mon', icon: '🌧️', prob: '82%', status: 'Likely' },
                { day: 'Tue', icon: '🌧️', prob: '78%', status: 'Likely' },
                { day: 'Wed', icon: '☁️', prob: '45%', status: 'Possible' },
                { day: 'Thu', icon: '🌧️', prob: '85%', status: 'Likely' },
                { day: 'Fri', icon: '🌧️', prob: '90%', status: 'Likely' },
                { day: 'Sat', icon: '☀️', prob: '20%', status: 'Low' },
                { day: 'Sun', icon: '🌧️', prob: '75%', status: 'Likely' },
              ].map((d, i) => (
                <div key={i} style={{ padding: '4px 0', borderRight: i < 6 ? '1px solid var(--border-theme)' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>{d.day}</span>
                  <span style={{ fontSize: '20px', margin: '2px 0' }}>{d.icon}</span>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-primary)' }}>{d.prob}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary)' }}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - 280px fixed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px', flexShrink: 0 }}>
          
          {/* A. Your Location */}
          <div style={{ background: 'var(--card)', borderRadius: '20px', border: '1px solid var(--border-theme)', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <MapPin size={12} color="#0284C7" /> Your Location
              </div>
              <button
                onClick={() => navigate('/location')}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: 'var(--card-elevated)', borderRadius: '20px', border: 'none', color: 'var(--primary)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                <RefreshCw size={11} /> Change
              </button>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>{selectedLocation.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>Kanakapura, Karnataka</div>
            </div>

            {/* Real Interactive Map */}
            <div style={{ marginBottom: '12px' }}>
              <LocationMap location={selectedLocation} height={200} />
            </div>

            {/* Location hierarchy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Panchayat', value: selectedLocation.name, badge: 'Selected' },
                { label: 'Block', value: 'Kanakapura' },
                { label: 'District', value: 'Ramanagara' },
                { label: 'State', value: 'Karnataka' },
              ].map((row, i, arr) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border-theme)' : 'none' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>{row.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{row.value}</span>
                    {row.badge && (
                      <span style={{ padding: '1px 6px', borderRadius: '10px', background: 'rgba(53,201,138,0.15)', color: 'var(--success)', fontSize: '9px', fontWeight: 800 }}>{row.badge}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                onClick={() => navigate('/location')}
                style={{ flex: 1, padding: '9px', borderRadius: '10px', border: '1px solid var(--border-theme)', background: 'var(--card)', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                Change Location <ChevronRight size={13} />
              </button>
              <button
                onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${selectedLocation.lat}&mlon=${selectedLocation.lng}#map=13/${selectedLocation.lat}/${selectedLocation.lng}`, '_blank')}
                title="Open in OpenStreetMap"
                style={{ padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-theme)', background: 'var(--card-elevated)', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* B. Local Alerts */}
          <div style={{ background: 'var(--card)', borderRadius: '20px', border: '1px solid var(--border-theme)', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>🔔 Local Alerts</span>
              <button onClick={() => navigate('/alerts')} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
            </div>
            <div style={{ padding: '12px', background: 'rgba(53,201,138,0.08)', borderRadius: '12px', border: '1px solid rgba(53,201,138,0.25)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '1px' }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>No major alerts</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '2px', lineHeight: 1.4 }}>
                  Conditions are currently favorable for farming activities.
                </div>
              </div>
            </div>
          </div>

          {/* C. How MausamX Works */}
          <div style={{ background: 'var(--card)', borderRadius: '20px', border: '1px solid var(--border-theme)', padding: '18px' }}>
            <button
              onClick={() => setShowInsights(!showInsights)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>💡 How MausamX works</span>
              <ChevronDown size={15} color="#94A3B8" style={{ transform: showInsights ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {showInsights && (
              <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-theme)', paddingTop: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', textAlign: 'center' }}>
                  {[
                    { icon: '🌐', label: 'Climate' },
                    { icon: '🌧️', label: 'Weather' },
                    { icon: '🧠', label: 'AI' },
                    { icon: '🌱', label: 'Advisory' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--card-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                        {item.icon}
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/about')}
                  style={{ marginTop: '10px', fontSize: '11px', fontWeight: 700, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                >
                  View System Insights <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
