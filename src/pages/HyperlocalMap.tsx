import React, { useState } from 'react';
import { Layers, MapPin, ZoomIn, ZoomOut, AlertTriangle, CloudRain, SunMedium, CloudLightning } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { locations, getChildLocations } from '../data/locations';
import { riskColors, riskLabels } from '../utils';

type MapLayer = 'onset' | 'drySpell' | 'heavyRain' | 'overall';

export default function HyperlocalMap() {
  const { selectedLocation, setSelectedLocationId, forecastRange, setForecastRange } = useApp();
  const [activeLayer, setActiveLayer] = useState<MapLayer>('overall');

  // Helper to determine risk level based on layer and probability
  const getLayerColor = (loc: typeof locations[0]) => {
    let prob = 0;
    if (activeLayer === 'onset') prob = 100 - loc.onsetProbability; // High prob of onset = Low risk
    if (activeLayer === 'drySpell') prob = loc.drySpellProbability;
    if (activeLayer === 'heavyRain') prob = loc.heavyRainProbability;
    if (activeLayer === 'overall') prob = Math.max(100 - loc.onsetProbability, loc.drySpellProbability, loc.heavyRainProbability);

    if (prob >= 60) return riskColors.high;
    if (prob >= 30) return riskColors.moderate;
    return riskColors.low;
  };

  // Mock map generation (using HTML/SVG to simulate regions since real GeoJSON isn't available)
  const renderMockMap = () => {
    const blocks = getChildLocations('ramanagara'); // Show Ramanagara blocks for demo
    
    return (
      <div className="relative w-full h-full bg-[var(--border-theme)]/30 overflow-hidden flex items-center justify-center">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#CBD5E0 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Mock Map Shapes (SVG) */}
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl drop-shadow-xl z-10" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(100, 50)">
            {/* Kanakapura (Large central) */}
            <path 
              d="M300,100 L450,120 L500,250 L420,380 L280,350 L200,220 Z" 
              fill={getLayerColor(blocks.find(b => b.id === 'kanakapura') || blocks[0])}
              fillOpacity="0.8"
              stroke="var(--card)"
              strokeWidth="3"
              className="map-region transition-all duration-300 hover:fill-opacity-100 cursor-pointer"
              onClick={() => setSelectedLocationId('kanakapura')}
            />
            {selectedLocation.id === 'kanakapura' && (
              <circle cx="340" cy="230" r="8" fill="var(--text-primary)" stroke="var(--card)" strokeWidth="2" className="animate-pulse" />
            )}
            <text x="340" y="250" fill="var(--card)" fontSize="14" fontWeight="bold" textAnchor="middle" style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Kanakapura</text>

            {/* Channapatna (West) */}
            <path 
              d="M200,220 L280,350 L200,480 L80,420 L50,280 L120,180 Z" 
              fill={getLayerColor(blocks.find(b => b.id === 'channapatna') || blocks[1])}
              fillOpacity="0.8"
              stroke="var(--card)"
              strokeWidth="3"
              className="map-region transition-all duration-300 hover:fill-opacity-100 cursor-pointer"
              onClick={() => setSelectedLocationId('channapatna')}
            />
            {selectedLocation.id === 'channapatna' && (
              <circle cx="160" cy="330" r="8" fill="var(--text-primary)" stroke="var(--card)" strokeWidth="2" className="animate-pulse" />
            )}
            <text x="160" y="350" fill="var(--card)" fontSize="14" fontWeight="bold" textAnchor="middle" style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Channapatna</text>

            {/* Magadi (North) */}
            <path 
              d="M120,180 L200,220 L300,100 L250,20 L100,50 Z" 
              fill={getLayerColor(blocks.find(b => b.id === 'magadi') || blocks[2])}
              fillOpacity="0.8"
              stroke="var(--card)"
              strokeWidth="3"
              className="map-region transition-all duration-300 hover:fill-opacity-100 cursor-pointer"
              onClick={() => setSelectedLocationId('magadi')}
            />
            {selectedLocation.id === 'magadi' && (
              <circle cx="200" cy="110" r="8" fill="var(--text-primary)" stroke="var(--card)" strokeWidth="2" className="animate-pulse" />
            )}
            <text x="200" y="130" fill="var(--card)" fontSize="14" fontWeight="bold" textAnchor="middle" style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Magadi</text>
            
            {/* Ramanagara Block (Central-West) */}
            <path 
              d="M280,350 L420,380 L350,520 L200,480 Z" 
              fill={getLayerColor(blocks.find(b => b.id === 'ramanagara-block') || blocks[3])}
              fillOpacity="0.8"
              stroke="var(--card)"
              strokeWidth="3"
              className="map-region transition-all duration-300 hover:fill-opacity-100 cursor-pointer"
              onClick={() => setSelectedLocationId('ramanagara-block')}
            />
            {selectedLocation.id === 'ramanagara-block' && (
              <circle cx="310" cy="440" r="8" fill="var(--text-primary)" stroke="var(--card)" strokeWidth="2" className="animate-pulse" />
            )}
            <text x="310" y="460" fill="var(--card)" fontSize="14" fontWeight="bold" textAnchor="middle" style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Ramanagara</text>
          </g>
        </svg>

        {/* Map Controls */}
        <div className="absolute right-6 bottom-6 flex flex-col gap-2 z-20">
          <button className="w-10 h-10 bg-card rounded-lg border border-[var(--border-theme)] shadow-sm flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--card-elevated)]">
            <ZoomIn size={18} />
          </button>
          <button className="w-10 h-10 bg-card rounded-lg border border-[var(--border-theme)] shadow-sm flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--card-elevated)]">
            <ZoomOut size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-112px)] flex flex-col lg:flex-row gap-6 animate-fade-in-up">
      
      {/* Map Area */}
      <div className="flex-1 bg-card rounded-2xl border border-[var(--border-theme)] shadow-sm overflow-hidden flex flex-col relative">
        <div className="p-4 border-b border-[var(--border-theme)] flex flex-wrap items-center justify-between gap-4 z-20 bg-card">
          <div>
            <h2 className="text-[18px] font-bold text-[var(--text-primary)]">Hyperlocal Risk Map</h2>
            <p className="text-[var(--text-muted)] text-[12px]">From region-level signals to Block-level intelligence.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-[var(--card-elevated)] border border-[var(--border-theme)] rounded-lg p-1 flex text-[12px] font-medium">
              <button 
                onClick={() => setForecastRange(7)}
                className={`px-3 py-1.5 rounded-md transition-colors ${forecastRange === 7 ? 'bg-card shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                7 Days
              </button>
              <button 
                onClick={() => setForecastRange(14)}
                className={`px-3 py-1.5 rounded-md transition-colors ${forecastRange === 14 ? 'bg-card shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                14 Days
              </button>
              <button 
                onClick={() => setForecastRange(30)}
                className={`px-3 py-1.5 rounded-md transition-colors ${forecastRange === 30 ? 'bg-card shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                30 Days
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 bg-card border border-[var(--border-theme)] rounded-lg text-[13px] font-medium text-[var(--text-primary)] hover:bg-[var(--card-elevated)]">
                <Layers size={16} className="text-[#1976D2]" />
                Layer: {activeLayer === 'overall' ? 'Overall Risk' : activeLayer === 'onset' ? 'Monsoon Onset' : activeLayer === 'drySpell' ? 'Dry Spell' : 'Heavy Rain'}
              </button>
              
              <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-[var(--border-theme)] rounded-lg shadow-lg overflow-hidden hidden group-hover:block z-50">
                <button onClick={() => setActiveLayer('overall')} className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[var(--card-elevated)] flex items-center gap-2">
                  <AlertTriangle size={14} className="text-[var(--text-muted)]" /> Overall Risk
                </button>
                <button onClick={() => setActiveLayer('onset')} className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[var(--card-elevated)] flex items-center gap-2">
                  <CloudRain size={14} className="text-[#1976D2]" /> Monsoon Onset
                </button>
                <button onClick={() => setActiveLayer('drySpell')} className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[var(--card-elevated)] flex items-center gap-2">
                  <SunMedium size={14} className="text-[#F2B84B]" /> Dry Spell
                </button>
                <button onClick={() => setActiveLayer('heavyRain')} className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[var(--card-elevated)] flex items-center gap-2">
                  <CloudLightning size={14} className="text-[#E45757]" /> Heavy Rain
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          {renderMockMap()}
          
          {/* Legend */}
          <div className="absolute left-6 bottom-6 bg-card/90 backdrop-blur-sm border border-[var(--border-theme)] rounded-lg p-3 z-20 shadow-sm">
            <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Risk Level</div>
            <div className="space-y-2 text-[12px] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: riskColors.low }}></span> Low
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: riskColors.moderate }}></span> Moderate
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: riskColors.high }}></span> High
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Location Panel */}
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
        <div className="bg-card rounded-2xl border border-[var(--border-theme)] shadow-sm p-5 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-[20px] font-bold text-[var(--text-primary)] uppercase tracking-tight">{selectedLocation.name} {selectedLocation.type.toUpperCase()}</h3>
            <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-muted)] mt-1">
              <MapPin size={14} />
              Ramanagara, Karnataka
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-b border-[var(--border-theme)] pb-4">
              <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Monsoon Onset</div>
              <div className="flex items-end gap-2">
                <span className="text-[28px] font-bold text-[var(--text-primary)] leading-none">{selectedLocation.onsetProbability}%</span>
                <span className={`text-[12px] font-semibold mb-1 ${selectedLocation.onsetProbability >= 70 ? 'text-[#2E9B63]' : 'text-[#F2B84B]'}`}>
                  {selectedLocation.onsetProbability >= 70 ? 'Favorable' : 'Monitor'}
                </span>
              </div>
            </div>

            <div className="border-b border-[var(--border-theme)] pb-4">
              <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Dry Spell</div>
              <div className="flex items-end gap-2">
                <span className="text-[28px] font-bold text-[var(--text-primary)] leading-none">{selectedLocation.drySpellProbability}%</span>
                <span className={`text-[12px] font-semibold mb-1 ${selectedLocation.drySpellProbability > 30 ? 'text-[#F2B84B]' : 'text-[#2E9B63]'}`}>
                  {selectedLocation.drySpellProbability > 30 ? 'Elevated' : 'Low'}
                </span>
              </div>
            </div>

            <div className="border-b border-[var(--border-theme)] pb-4">
              <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Heavy Rain</div>
              <div className="flex items-end gap-2">
                <span className="text-[28px] font-bold text-[var(--text-primary)] leading-none">{selectedLocation.heavyRainProbability}%</span>
                <span className={`text-[12px] font-semibold mb-1 ${selectedLocation.heavyRainProbability > 30 ? 'text-[#E45757]' : 'text-[#2E9B63]'}`}>
                  {selectedLocation.heavyRainProbability > 30 ? 'Moderate' : 'Low'}
                </span>
              </div>
            </div>
            
            <div className="border-b border-[var(--border-theme)] pb-4">
              <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Rainfall Anomaly</div>
              <div className="flex items-end gap-2">
                <span className="text-[28px] font-bold text-[var(--text-primary)] leading-none">{selectedLocation.rainfallAnomaly > 0 ? '+' : ''}{selectedLocation.rainfallAnomaly}%</span>
              </div>
            </div>

            <div className="pb-4">
              <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Confidence</div>
              <div className="flex items-end gap-2">
                <span className="text-[28px] font-bold text-[var(--text-primary)] leading-none">{selectedLocation.confidence}%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-2 p-3 bg-[#1976D2]/5 rounded-lg border border-[#1976D2]/20">
             <div className="text-[11px] font-semibold text-[#1976D2] uppercase tracking-wider mb-1">Key Observation</div>
             <p className="text-[12px] text-[var(--text-primary)] leading-relaxed">
               {selectedLocation.heavyRainProbability > 40 
                 ? "High probability of heavy rainfall. Drainage and crop protection measures advised."
                 : selectedLocation.drySpellProbability > 40
                 ? "Elevated risk of prolonged dry spell. Irrigation planning recommended."
                 : "Rainfall conditions indicate a favorable probability of monsoon establishment over the selected forecast window."}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
