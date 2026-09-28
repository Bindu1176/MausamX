import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Search, Check, ExternalLink, ChevronDown, X, AlertCircle, Info } from 'lucide-react';
import LocationMap from '../components/common/LocationMap';
import {
  getStates, getDistricts, getBlocks, getPanchayats, hasPanchayatData,
  getForecast, getBlockForecast, searchLocations,
  getStateById, getDistrictById, getBlockById, getPanchayatById,
  DEFAULT_DEMO_STATE_ID, DEFAULT_DEMO_DISTRICT_ID,
  DEFAULT_DEMO_BLOCK_ID, DEFAULT_DEMO_PANCHAYAT_ID,
  type IndiaState, type IndiaDistrict, type IndiaBlock,
  type IndiaPanchayat, type LocationSearchResult, type ForecastData,
} from '../services/locationService';

// ─── Represents the currently active location selection ───────────────────────
interface ActiveSelection {
  stateId: string;
  districtId: string | null;
  blockId: string | null;
  panchayatId: string | null;
  // Coordinates to show on map
  lat: number;
  lng: number;
  // For display
  stateName: string;
  districtName: string | null;
  blockName: string | null;
  panchayatName: string | null;
}

const INITIAL_SELECTION: ActiveSelection = {
  stateId: DEFAULT_DEMO_STATE_ID,
  districtId: DEFAULT_DEMO_DISTRICT_ID,
  blockId: DEFAULT_DEMO_BLOCK_ID,
  panchayatId: DEFAULT_DEMO_PANCHAYAT_ID,
  lat: 12.5300,
  lng: 77.4000,
  stateName: 'Karnataka',
  districtName: 'Ramanagara',
  blockName: 'Kanakapura',
  panchayatName: 'Sathanur',
};

// ─── Custom styled select component ───────────────────────────────────────────
function SelectField({
  label, value, placeholder, options, onChange, disabled = false,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: { id: string; name: string }[];
  onChange: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          style={{
            width: '100%', appearance: 'none', WebkitAppearance: 'none',
            padding: '10px 32px 10px 12px',
            background: disabled ? 'var(--card-elevated)' : 'var(--card)',
            border: '1px solid var(--border-theme)',
            borderRadius: '10px', fontSize: '13px', fontWeight: 600,
            color: value ? 'var(--text-primary)' : 'var(--text-muted)',
            outline: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', transition: 'border-color 0.15s',
          }}
          onFocus={e => !disabled && (e.target.style.borderColor = 'var(--primary)')}
          onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
        >
          <option value="">{placeholder}</option>
          {options.map(o => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
        <ChevronDown size={14} color="#94A3B8" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

// ─── Forecast badge ────────────────────────────────────────────────────────────
function ForecastBadge({ forecast }: { forecast: ForecastData }) {
  const riskColor = forecast.riskLevel === 'low' ? 'var(--success)' : forecast.riskLevel === 'high' ? '#DC2626' : '#D97706';
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {[
        { label: 'Monsoon Onset', value: `${forecast.onsetProbability}%`, color: 'var(--success)' },
        { label: 'Dry Spell',     value: `${forecast.drySpellProbability}%`, color: '#D97706' },
        { label: 'Heavy Rain',    value: `${forecast.heavyRainProbability}%`, color: '#DC2626' },
      ].map(item => (
        <div key={item.label} style={{
          flex: 1, minWidth: '80px', padding: '10px 14px',
          background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
          borderRadius: '12px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>{item.label}</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.value}</div>
        </div>
      ))}
      <div style={{
        flex: 1, minWidth: '80px', padding: '10px 14px',
        background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
        borderRadius: '12px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>Risk Level</div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: riskColor, textTransform: 'capitalize', lineHeight: 1 }}>{forecast.riskLevel}</div>
      </div>
    </div>
  );
}

// ─── No forecast banner ────────────────────────────────────────────────────────
function NoForecastBanner({ locationName }: { locationName: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '10px',
      padding: '14px 16px', background: 'var(--card-elevated)',
      border: '1px solid var(--border-theme)', borderRadius: '12px',
    }}>
      <Info size={16} color="#94A3B8" style={{ flexShrink: 0, marginTop: '1px' }} />
      <div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
          Location found — forecast data unavailable
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          MausamX does not yet have monsoon forecast coverage for <strong>{locationName}</strong>.
          Forecast will appear when data is available for this region.
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function MyLocation() {
  // ── Selection state ───────────────────────────────────────────────────────
  const [sel, setSel] = useState<ActiveSelection>(INITIAL_SELECTION);

  // Derived cascading lists
  const states    = getStates();
  const districts = sel.stateId ? getDistricts(sel.stateId) : [];
  const blocks    = sel.districtId ? getBlocks(sel.districtId) : [];
  const panchayats = sel.blockId ? getPanchayats(sel.blockId) : [];
  const blockHasPanchayatData = sel.blockId ? hasPanchayatData(sel.blockId) : true;

  // Forecast for selected location
  const forecast: ForecastData | null = sel.panchayatId
    ? getForecast(sel.panchayatId)
    : sel.blockId
    ? getBlockForecast(sel.blockId)
    : null;

  // ── Cascading change handlers ─────────────────────────────────────────────
  const handleStateChange = (stateId: string) => {
    const state = getStateById(stateId);
    if (!state) return;
    setSel({ stateId, districtId: null, blockId: null, panchayatId: null,
      lat: state.lat, lng: state.lng,
      stateName: state.name, districtName: null, blockName: null, panchayatName: null });
  };

  const handleDistrictChange = (districtId: string) => {
    const district = getDistrictById(districtId);
    if (!district) return;
    setSel(prev => ({ ...prev, districtId, blockId: null, panchayatId: null,
      lat: district.lat, lng: district.lng,
      districtName: district.name, blockName: null, panchayatName: null }));
  };

  const handleBlockChange = (blockId: string) => {
    const block = getBlockById(blockId);
    if (!block) return;
    setSel(prev => ({ ...prev, blockId, panchayatId: null,
      lat: block.lat, lng: block.lng,
      blockName: block.name, panchayatName: null }));
  };

  const handlePanchayatChange = (panchayatId: string) => {
    const p = getPanchayatById(panchayatId);
    if (!p) return;
    setSel(prev => ({ ...prev, panchayatId,
      lat: p.lat, lng: p.lng, panchayatName: p.name }));
  };

  // ── Search ────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setSearchResults(searchLocations(searchQuery));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchSelect = (result: LocationSearchResult) => {
    setSearchQuery('');
    setShowResults(false);

    // Resolve stateId/districtId/blockId from result
    let newStateId = result.stateId ?? sel.stateId;
    let newDistrictId = result.districtId ?? null;
    let newBlockId = result.type === 'block' ? result.id : (result.blockId ?? null);
    let newPanchayatId = result.type === 'panchayat' ? result.id : null;

    if (result.type === 'district') newDistrictId = result.id;

    const stateName = getStateById(newStateId)?.name ?? '';
    const districtName = newDistrictId ? getDistrictById(newDistrictId)?.name ?? null : null;
    const blockName = newBlockId ? getBlockById(newBlockId)?.name ?? null : null;
    const panchayatName = newPanchayatId ? getPanchayatById(newPanchayatId)?.name ?? null : null;

    setSel({
      stateId: newStateId,
      districtId: newDistrictId,
      blockId: newBlockId,
      panchayatId: newPanchayatId,
      lat: result.lat,
      lng: result.lng,
      stateName, districtName, blockName, panchayatName,
    });
  };

  // ── Map zoom for selected tier ─────────────────────────────────────────────
  const mapZoom = sel.panchayatId ? 13 : sel.blockId ? 12 : sel.districtId ? 10 : 7;

  // ── Selected location display label ───────────────────────────────────────
  const primaryLabel = sel.panchayatName ?? sel.blockName ?? sel.districtName ?? sel.stateName;
  const breadcrumb = [sel.blockName && `${sel.blockName} Block`, sel.districtName, sel.stateName]
    .filter(Boolean).join(' · ');

  const typeLabel = sel.panchayatId ? 'Panchayat' : sel.blockId ? 'Block' : sel.districtId ? 'District' : 'State';

  // ── Type colours for search badges ───────────────────────────────────────
  const typeColor: Record<string, string> = {
    panchayat: 'var(--success)', block: 'var(--primary)', district: '#7C3AED', state: '#D97706',
  };

  // ── Fake Location object for the map component ─────────────────────────────
  const mapLocation = {
    id: sel.panchayatId ?? sel.blockId ?? sel.districtId ?? sel.stateId,
    name: primaryLabel,
    type: (sel.panchayatId ? 'panchayat' : sel.blockId ? 'block' : sel.districtId ? 'district' : 'state') as any,
    lat: sel.lat,
    lng: sel.lng,
    onsetProbability: forecast?.onsetProbability ?? 0,
    drySpellProbability: forecast?.drySpellProbability ?? 0,
    heavyRainProbability: forecast?.heavyRainProbability ?? 0,
    confidence: forecast?.confidence ?? 0,
    rainfallAnomaly: 0,
    riskLevel: (forecast?.riskLevel ?? 'moderate') as any,
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '48px' }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <MapPin size={22} color="#0284C7" />
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.4px' }}>
            My Location
          </h1>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, margin: 0, paddingLeft: '32px' }}>
          Select your State → District → Block → Panchayat to receive a hyperlocal monsoon outlook for anywhere in India.
        </p>
      </div>

      {/* ── GLOBAL SEARCH ───────────────────────────────────────────────── */}
      <div ref={searchRef} style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '12px 16px',
          background: 'var(--card)', border: '1px solid var(--border-theme)',
          borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <Search size={16} color="#94A3B8" style={{ flexShrink: 0 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search any Panchayat, Block, District or State in India..."
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: '13px',
              color: 'var(--text-primary)', fontWeight: 500, fontFamily: 'inherit',
              background: 'transparent',
            }}
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setShowResults(false); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <X size={15} color="#94A3B8" />
            </button>
          )}
        </div>

        {/* Search results dropdown */}
        {showResults && searchResults.length > 0 && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
            background: 'var(--card)', border: '1px solid var(--border-theme)',
            borderRadius: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            zIndex: 100, overflow: 'hidden',
          }}>
            {searchResults.map(result => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSearchSelect(result)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 16px', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s',
                  borderBottom: '1px solid #F8FAFC',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--card-elevated)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                  background: `${typeColor[result.type]}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <MapPin size={13} color={typeColor[result.type]} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{result.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {result.displayPath}
                  </div>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: 700, color: typeColor[result.type],
                  background: `${typeColor[result.type]}15`,
                  padding: '2px 8px', borderRadius: '20px', textTransform: 'capitalize', flexShrink: 0,
                }}>
                  {result.type}
                </span>
              </button>
            ))}
          </div>
        )}

        {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
            background: 'var(--card)', border: '1px solid var(--border-theme)',
            borderRadius: '14px', padding: '20px 16px', textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)', zIndex: 100,
          }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>No results for "{searchQuery}"</div>
            <div style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px' }}>Try a different district, block or state name.</div>
          </div>
        )}
      </div>

      {/* ── CASCADING SELECTORS ─────────────────────────────────────────── */}
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border-theme)',
        borderRadius: '16px', padding: '20px',
        marginBottom: '16px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '14px' }}>
          Select Location
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <SelectField
            label="State"
            value={sel.stateId}
            placeholder="Select State"
            options={states}
            onChange={handleStateChange}
          />
          <SelectField
            label="District"
            value={sel.districtId ?? ''}
            placeholder={sel.stateId ? 'Select District' : '— select state first —'}
            options={districts}
            onChange={handleDistrictChange}
            disabled={!sel.stateId || districts.length === 0}
          />
          <SelectField
            label="Block / Taluka"
            value={sel.blockId ?? ''}
            placeholder={sel.districtId ? 'Select Block' : '— select district first —'}
            options={blocks}
            onChange={handleBlockChange}
            disabled={!sel.districtId || blocks.length === 0}
          />
          <SelectField
            label="Panchayat"
            value={sel.panchayatId ?? ''}
            placeholder={
              !sel.blockId ? '— select block first —'
                : !blockHasPanchayatData ? 'Data unavailable'
                : panchayats.length === 0 ? 'No panchayats'
                : 'Select Panchayat'
            }
            options={panchayats}
            onChange={handlePanchayatChange}
            disabled={!sel.blockId || !blockHasPanchayatData || panchayats.length === 0}
          />
        </div>

        {/* Panchayat coverage note */}
        {sel.blockId && !blockHasPanchayatData && (
          <div style={{
            marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 12px', background: '#FFF7ED', border: '1px solid #FED7AA',
            borderRadius: '10px', fontSize: '12px', color: '#92400E', fontWeight: 500,
          }}>
            <AlertCircle size={14} color="#D97706" style={{ flexShrink: 0 }} />
            Panchayat-level data is not yet available for this block. Select the block above to see the forecast summary.
          </div>
        )}

        {/* Quick panchayat tiles for Kanakapura block */}
        {sel.blockId && blockHasPanchayatData && panchayats.length > 0 && (
          <div style={{ marginTop: '14px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Panchayats in {sel.blockName}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {panchayats.map(p => {
                const isSelected = sel.panchayatId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePanchayatChange(p.id)}
                    style={{
                      padding: '7px 14px', borderRadius: '20px', border: 'none',
                      fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                      transition: 'all 0.15s',
                      background: isSelected ? 'var(--primary)' : 'var(--card-elevated)',
                      color: isSelected ? 'var(--card)' : 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}
                  >
                    {isSelected && <Check size={12} />}
                    {p.name}
                    {p.forecast && (
                      <span style={{ fontSize: '10px', fontWeight: 600, opacity: 0.8 }}>
                        {p.forecast.onsetProbability}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── MAP + SELECTED LOCATION ─────────────────────────────────────── */}
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border-theme)',
        borderRadius: '16px', overflow: 'hidden', marginBottom: '16px',
      }}>
        {/* Card header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', borderBottom: '1px solid var(--border-theme)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Selected Location
            </span>
            <span style={{ padding: '2px 8px', borderRadius: '20px', background: '#DCFCE7', color: '#15803D', fontSize: '10px', fontWeight: 800 }}>
              Active
            </span>
          </div>
          <button
            onClick={() => window.open(
              `https://www.openstreetmap.org/?mlat=${sel.lat}&mlon=${sel.lng}#map=${mapZoom}/${sel.lat}/${sel.lng}`,
              '_blank'
            )}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
              borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <ExternalLink size={11} /> Open in OSM
          </button>
        </div>

        {/* Map */}
        <div style={{ height: '280px' }}>
          <LocationMap location={mapLocation} height={280} />
        </div>

        {/* Location info */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  {primaryLabel}
                </span>
                <span style={{
                  padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700,
                  background: `${typeColor[sel.panchayatId ? 'panchayat' : sel.blockId ? 'block' : 'district']}15`,
                  color: typeColor[sel.panchayatId ? 'panchayat' : sel.blockId ? 'block' : 'district'],
                }}>
                  {typeLabel}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{breadcrumb}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {sel.lat.toFixed(4)}°N, {sel.lng.toFixed(4)}°E
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FORECAST SECTION ────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border-theme)',
        borderRadius: '16px', padding: '20px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '14px' }}>
          Monsoon Forecast — {primaryLabel}
        </div>

        {forecast ? (
          <ForecastBadge forecast={forecast} />
        ) : (
          <NoForecastBanner locationName={primaryLabel} />
        )}

        {forecast && (
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Confidence: {forecast.confidence}% · Data: MausamX ML model (Karnataka demo)
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
