import React, { useState, useMemo } from 'react';
import {
  Sprout, Printer, MapPin, CheckCircle2, AlertTriangle,
  MessageSquare, Share2, ArrowRight, Info, ChevronDown,
} from 'lucide-react';
import { useApp } from '../hooks/useApp';
import type { RiskLevel } from '../types';

// ─── Crop data — extensible structure ────────────────────────────────────────
interface CropOption {
  id: string;
  name: string;
  icon: string;
  hasAdvisory: boolean; // only crops with real advisory data
}

const CROPS: CropOption[] = [
  { id: 'ragi',      name: 'Ragi (Finger Millet)',  icon: '🌱', hasAdvisory: true },
  { id: 'rice',      name: 'Rice (Paddy)',          icon: '🌾', hasAdvisory: true },
  { id: 'maize',     name: 'Maize',                 icon: '🌽', hasAdvisory: true },
  { id: 'groundnut', name: 'Groundnut',             icon: '🥜', hasAdvisory: true },
  { id: 'cotton',    name: 'Cotton',                icon: '🏵️', hasAdvisory: false },
  { id: 'sugarcane', name: 'Sugarcane',             icon: '🎋', hasAdvisory: false },
  { id: 'pulses',    name: 'Pulses',                icon: '🫘', hasAdvisory: false },
  { id: 'vegetables',name: 'Vegetables',            icon: '🥬', hasAdvisory: false },
];

interface CropStageOption {
  id: string;
  name: string;
  shortName: string;
}

const STAGES: CropStageOption[] = [
  { id: 'pre-sowing',  name: 'Pre-Sowing / Field Preparation', shortName: 'Pre-Sowing' },
  { id: 'sowing',      name: 'Sowing',                         shortName: 'Sowing' },
  { id: 'vegetative',  name: 'Vegetative Growth',              shortName: 'Vegetative' },
  { id: 'flowering',   name: 'Flowering / Reproductive',       shortName: 'Flowering' },
  { id: 'harvest',     name: 'Harvesting',                     shortName: 'Harvest' },
];

// ─── Dynamic recommendation engine ─────────────────────────────────────────
interface Advisory {
  headline: string;
  explanation: string;
  statusBadge: string;
  statusColor: string;
  statusBg: string;
  statusBorder: string;
  panelBg: string;
  panelBorder: string;
  panelText: string;
  actions: { text: string; type: 'action' | 'caution' }[];
  decisionWindow: string;
  steps: string[];
  riskNote: string;
}

function generateAdvisory(
  onset: number,
  drySpell: number,
  heavyRain: number,
  crop: CropOption,
  stage: CropStageOption,
): Advisory {
  const isPreSowing = stage.id === 'pre-sowing';
  const isSowing = stage.id === 'sowing';
  const isVegetative = stage.id === 'vegetative';
  const isHarvest = stage.id === 'harvest';
  const isFlowering = stage.id === 'flowering';

  // HIGH onset + low dry spell = favorable sowing window
  if (onset >= 70 && drySpell < 30 && (isPreSowing || isSowing)) {
    return {
      headline: `Prepare your field and monitor rainfall persistence before final sowing of ${crop.name.split('(')[0].trim()}.`,
      explanation: `Monsoon onset probability is favorable (${onset}%), but temporary dry gaps are still possible. Confirm that rainfall persists for 3 consecutive days before final sowing to reduce early seed-loss risk.`,
      statusBadge: 'Favorable Sowing Window',
      statusColor: '#15803D', statusBg: '#DCFCE7', statusBorder: '#BBF7D0',
      panelBg: '#F0FDF4', panelBorder: '#BBF7D0', panelText: '#14532D',
      actions: [
        { text: 'Prepare the field — deep plowing, bund repair, and leveling', type: 'action' },
        { text: `Keep certified ${crop.name.split('(')[0].trim()} seeds ready`, type: 'action' },
        { text: 'Check soil moisture — aim for adequate saturation depth', type: 'action' },
        { text: 'Monitor rainfall continuity over the next 3–5 days', type: 'action' },
        { text: 'Avoid final sowing if rainfall stops unexpectedly', type: 'caution' },
      ],
      decisionWindow: 'Next 3–5 days',
      steps: ['Prepare field', 'Monitor rainfall', 'Confirm moisture', 'Proceed with sowing'],
      riskNote: 'Rainfall persistence should be verified before final sowing.',
    };
  }

  // HIGH dry spell risk
  if (drySpell >= 30) {
    if (isPreSowing || isSowing) {
      return {
        headline: `Delay sowing of ${crop.name.split('(')[0].trim()} until rainfall shows persistence.`,
        explanation: `Dry spell risk is elevated (${drySpell}%). Sowing now could result in seed loss if rainfall doesn't continue. Monitor forecasts and prepare to sow quickly when conditions stabilize.`,
        statusBadge: 'Delay Sowing',
        statusColor: '#B45309', statusBg: '#FEF3C7', statusBorder: '#FDE68A',
        panelBg: '#FFFBEB', panelBorder: '#FDE68A', panelText: '#78350F',
        actions: [
          { text: 'Delay sowing until rainfall persists for 3+ days', type: 'caution' },
          { text: 'Keep field ready for quick sowing when conditions improve', type: 'action' },
          { text: 'Consider drought-tolerant seed varieties as a backup', type: 'action' },
          { text: 'Monitor MausamX forecasts daily for updated probabilities', type: 'action' },
        ],
        decisionWindow: 'Next 7–10 days',
        steps: ['Monitor forecasts', 'Wait for rain', 'Confirm moisture', 'Sow quickly'],
        riskNote: 'Dry spell risk is elevated — premature sowing increases seed loss.',
      };
    }
    if (isFlowering || isVegetative) {
      return {
        headline: `Protect ${crop.name.split('(')[0].trim()} from moisture stress — prepare supplementary irrigation.`,
        explanation: `Dry spell probability (${drySpell}%) means your crop may face moisture stress during a critical growth phase. Arrange irrigation and mulching.`,
        statusBadge: 'Moisture Stress Risk',
        statusColor: '#B45309', statusBg: '#FEF3C7', statusBorder: '#FDE68A',
        panelBg: '#FFFBEB', panelBorder: '#FDE68A', panelText: '#78350F',
        actions: [
          { text: 'Arrange supplementary irrigation if possible', type: 'caution' },
          { text: 'Apply mulching to retain soil moisture', type: 'action' },
          { text: 'Monitor plants for signs of wilting or flower drop', type: 'action' },
          { text: 'Avoid heavy fertilizer application during dry conditions', type: 'caution' },
        ],
        decisionWindow: 'Next 5–7 days',
        steps: ['Check irrigation', 'Apply mulching', 'Monitor crop', 'Adjust fertilizer'],
        riskNote: 'Moisture stress during this stage can reduce yield significantly.',
      };
    }
  }

  // HIGH heavy rain risk
  if (heavyRain >= 35) {
    if (isVegetative || isFlowering) {
      return {
        headline: `Ensure field drainage is adequate — heavy rain risk is moderate for ${crop.name.split('(')[0].trim()}.`,
        explanation: `Heavy rain probability (${heavyRain}%) could cause waterlogging. Clear drainage channels and watch for pest activity due to increased humidity.`,
        statusBadge: 'Drainage Advisory',
        statusColor: '#DC2626', statusBg: '#FEE2E2', statusBorder: '#FECACA',
        panelBg: '#FEF2F2', panelBorder: '#FECACA', panelText: '#7F1D1D',
        actions: [
          { text: 'Check and clear all field drainage channels', type: 'caution' },
          { text: 'Monitor plants for signs of waterlogging stress', type: 'action' },
          { text: 'Watch for increased pest activity due to humidity', type: 'action' },
          { text: 'Avoid fertilizer application immediately before heavy rainfall', type: 'caution' },
        ],
        decisionWindow: 'Next 2–3 days',
        steps: ['Clear drainage', 'Monitor waterlogging', 'Check pests', 'Protect crop'],
        riskNote: 'Heavy rain may cause waterlogging — clear drainage channels immediately.',
      };
    }
    if (isHarvest) {
      return {
        headline: `Harvest ${crop.name.split('(')[0].trim()} quickly — heavy rain expected soon.`,
        explanation: `Heavy rain probability (${heavyRain}%) poses a risk to harvested produce. Prioritize early harvesting and arrange proper storage.`,
        statusBadge: 'Harvest Urgently',
        statusColor: '#DC2626', statusBg: '#FEE2E2', statusBorder: '#FECACA',
        panelBg: '#FEF2F2', panelBorder: '#FECACA', panelText: '#7F1D1D',
        actions: [
          { text: 'Harvest mature produce before anticipated heavy rainfall', type: 'caution' },
          { text: 'Arrange proper storage and drying facilities', type: 'action' },
          { text: 'Protect stored produce from moisture and spoilage', type: 'action' },
          { text: 'Plan transportation to market before roads become difficult', type: 'action' },
        ],
        decisionWindow: 'Immediate',
        steps: ['Harvest now', 'Dry produce', 'Arrange storage', 'Transport to market'],
        riskNote: 'Heavy rainfall may damage unharvested and improperly stored produce.',
      };
    }
  }

  // Default: moderate favorable conditions
  return {
    headline: `Conditions are generally favorable for ${crop.name.split('(')[0].trim()} — continue normal operations.`,
    explanation: `Monsoon onset probability is at ${onset}% with moderate conditions. Continue your planned ${stage.shortName.toLowerCase()} activities while monitoring daily forecasts.`,
    statusBadge: 'Normal Operations',
    statusColor: 'var(--primary)', statusBg: 'var(--primary-hover)', statusBorder: '#BAE6FD',
    panelBg: '#F0F9FF', panelBorder: '#BAE6FD', panelText: '#0C4A6E',
    actions: [
      { text: `Continue planned ${stage.shortName.toLowerCase()} activities`, type: 'action' },
      { text: 'Monitor daily MausamX forecasts for any changes', type: 'action' },
      { text: 'Keep field drainage channels maintained', type: 'action' },
      { text: 'Follow standard agronomic practices for the season', type: 'action' },
    ],
    decisionWindow: 'Next 5–7 days',
    steps: ['Continue operations', 'Monitor forecasts', 'Maintain drainage', 'Review weekly'],
    riskNote: 'Conditions are stable — continue monitoring for changes.',
  };
}

// ─── Custom select component ─────────────────────────────────────────────────
function SelectControl({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: { id: string; name: string; disabled?: boolean }[];
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px',
      }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%', appearance: 'none', WebkitAppearance: 'none',
            padding: '10px 34px 10px 12px',
            background: 'var(--card)', border: '1px solid var(--border-theme)', borderRadius: '10px',
            fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)',
            outline: 'none', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
          onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
        >
          {options.map(o => (
            <option key={o.id} value={o.id} disabled={o.disabled}>{o.name}</option>
          ))}
        </select>
        <ChevronDown size={14} color="#94A3B8" style={{
          position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function Advisory() {
  const { selectedLocation } = useApp();

  const [selectedCropId, setSelectedCropId] = useState('ragi');
  const [selectedStageId, setSelectedStageId] = useState('pre-sowing');

  const crop = CROPS.find(c => c.id === selectedCropId) ?? CROPS[0];
  const stage = STAGES.find(s => s.id === selectedStageId) ?? STAGES[0];

  // Check if forecast data exists for this location
  const hasForecast = selectedLocation.onsetProbability > 0 || selectedLocation.confidence > 0;

  const advisory = useMemo(() => {
    if (!hasForecast || !crop.hasAdvisory) return null;
    return generateAdvisory(
      selectedLocation.onsetProbability,
      selectedLocation.drySpellProbability,
      selectedLocation.heavyRainProbability,
      crop, stage,
    );
  }, [selectedLocation, crop, stage, hasForecast]);

  // Share text
  const shareText = advisory
    ? `*MausamX CROP ADVISORY*\n📍 ${selectedLocation.name}\n🌱 ${crop.name} · ${stage.shortName}\n\n*${advisory.statusBadge}*\n${advisory.headline}\n\n*Checklist:*\n${advisory.actions.map(a => `${a.type === 'caution' ? '⚠️' : '✓'} ${a.text}`).join('\n')}`
    : '';

  // Onset/dry-spell/heavy-rain colors
  const onsetColor = selectedLocation.onsetProbability >= 70 ? 'var(--success)' : selectedLocation.onsetProbability >= 50 ? '#D97706' : '#DC2626';
  const dryColor = selectedLocation.drySpellProbability > 30 ? '#D97706' : 'var(--success)';
  const heavyColor = selectedLocation.heavyRainProbability > 35 ? '#DC2626' : selectedLocation.heavyRainProbability > 25 ? '#D97706' : 'var(--success)';
  const onsetLabel = selectedLocation.onsetProbability >= 70 ? 'Likely' : selectedLocation.onsetProbability >= 50 ? 'Moderate' : 'Uncertain';
  const dryLabel = selectedLocation.drySpellProbability > 30 ? 'Elevated' : 'Low Risk';
  const heavyLabel = selectedLocation.heavyRainProbability > 35 ? 'High Risk' : selectedLocation.heavyRainProbability > 25 ? 'Moderate' : 'Low Risk';

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '48px' }}>

      {/* ── 1. PAGE HEADER ──────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        marginBottom: '20px', gap: '16px', flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Sprout size={22} color="#16A34A" />
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.4px' }}>
              Crop Advisory
            </h1>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, margin: 0, paddingLeft: '32px' }}>
            Location-specific farming guidance based on the MausamX monsoon outlook.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            marginTop: '8px', paddingLeft: '32px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600,
          }}>
            <MapPin size={13} color="#0284C7" />
            <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{selectedLocation.name}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span>Ramanagara · Karnataka</span>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '9px 16px', borderRadius: '10px',
            background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
            color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 700,
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <Printer size={14} /> Print Advisory
        </button>
      </div>

      {/* ── 2. CROP & STAGE SELECTION ───────────────────────────────────── */}
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border-theme)', borderRadius: '16px',
        padding: '20px', marginBottom: '16px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '14px' }}>
          Your Crop
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <SelectControl
            label="Crop"
            value={selectedCropId}
            options={CROPS.map(c => ({ id: c.id, name: `${c.icon} ${c.name}`, disabled: false }))}
            onChange={setSelectedCropId}
          />
          <SelectControl
            label="Crop Stage"
            value={selectedStageId}
            options={STAGES.map(s => ({ id: s.id, name: s.name }))}
            onChange={setSelectedStageId}
          />
          <div>
            <label style={{
              display: 'block', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px',
            }}>Location</label>
            <div style={{
              padding: '10px 12px', background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
              borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <MapPin size={13} color="#0284C7" />
              {selectedLocation.name}
            </div>
          </div>
        </div>

        {/* Crop not available notice */}
        {!crop.hasAdvisory && (
          <div style={{
            marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 12px', background: '#FFF7ED', border: '1px solid #FED7AA',
            borderRadius: '10px', fontSize: '12px', color: '#92400E', fontWeight: 500,
          }}>
            <Info size={14} color="#D97706" style={{ flexShrink: 0 }} />
            Detailed advisory data for {crop.name} is not yet available. Select a supported crop to see recommendations.
          </div>
        )}
      </div>

      {/* No forecast state */}
      {!hasForecast && (
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border-theme)', borderRadius: '16px',
          padding: '40px 20px', textAlign: 'center', marginBottom: '16px',
        }}>
          <Info size={32} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Forecast data unavailable for {selectedLocation.name}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto' }}>
            MausamX does not yet have monsoon forecast coverage for this location.
            Advisory recommendations will appear when forecast data becomes available.
          </div>
        </div>
      )}

      {/* ── 3–9: Main advisory content (only when forecast exists) ────── */}
      {hasForecast && advisory && (
        <>
          {/* ── 3. MONSOON OUTLOOK ──────────────────────────────────────── */}
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border-theme)', borderRadius: '16px',
            padding: '20px', marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Monsoon Outlook
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
                For your selected location and crop period
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {[
                { label: 'Monsoon Onset', value: `${selectedLocation.onsetProbability}%`, sub: onsetLabel, color: onsetColor },
                { label: 'Dry Spell', value: `${selectedLocation.drySpellProbability}%`, sub: dryLabel, color: dryColor },
                { label: 'Heavy Rain', value: `${selectedLocation.heavyRainProbability}%`, sub: heavyLabel, color: heavyColor },
                { label: 'Rainfall Trend', value: selectedLocation.onsetProbability >= 60 ? 'Favorable' : 'Watch', sub: selectedLocation.onsetProbability >= 60 ? 'Good conditions' : 'Monitor closely', color: selectedLocation.onsetProbability >= 60 ? 'var(--success)' : '#D97706' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '14px', background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
                  borderRadius: '12px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: item.color, lineHeight: 1, marginBottom: '4px' }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: item.color }}>
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. RECOMMENDED ACTION (visual focus) ────────────────────── */}
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border-theme)', borderRadius: '16px',
            padding: '24px', marginBottom: '16px',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sprout size={18} color="#16A34A" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Recommended Action
                </span>
              </div>
              <span style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800,
                color: advisory.statusColor, background: advisory.statusBg,
                border: `1px solid ${advisory.statusBorder}`,
              }}>
                {advisory.statusBadge}
              </span>
            </div>

            {/* Main recommendation panel */}
            <div style={{
              padding: '20px', borderRadius: '14px',
              background: advisory.panelBg, border: `1px solid ${advisory.panelBorder}`,
              marginBottom: '20px',
            }}>
              <p style={{
                fontSize: '16px', fontWeight: 800, color: advisory.panelText,
                lineHeight: 1.5, margin: 0,
              }}>
                {advisory.headline}
              </p>
            </div>

            {/* ── 5. WHY THIS RECOMMENDATION ───────────────────────────── */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Why this recommendation?
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                {advisory.explanation}
              </p>
            </div>

            {/* ── 6. ACTION CHECKLIST ───────────────────────────────────── */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                What you should do
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {advisory.actions.map((action, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 14px', borderRadius: '10px',
                    background: action.type === 'caution' ? '#FFFBEB' : 'var(--card-elevated)',
                    border: `1px solid ${action.type === 'caution' ? '#FDE68A' : '#E2E8F0'}`,
                  }}>
                    {action.type === 'caution' ? (
                      <AlertTriangle size={15} color="#D97706" style={{ flexShrink: 0 }} />
                    ) : (
                      <CheckCircle2 size={15} color="#16A34A" style={{ flexShrink: 0 }} />
                    )}
                    <span style={{
                      fontSize: '13px', fontWeight: action.type === 'caution' ? 700 : 500,
                      color: action.type === 'caution' ? '#92400E' : 'var(--text-primary)',
                    }}>
                      {action.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 7. DECISION WINDOW ───────────────────────────────────── */}
            <div style={{
              padding: '16px', background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
              borderRadius: '12px',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Decision Window
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)' }}>
                  {advisory.decisionWindow}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                {advisory.steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <span style={{
                      padding: '6px 12px', borderRadius: '8px',
                      background: i === 0 ? 'var(--primary)' : 'var(--card)',
                      color: i === 0 ? 'var(--card)' : 'var(--text-secondary)',
                      border: i === 0 ? 'none' : '1px solid var(--border-theme)',
                      fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap',
                    }}>
                      {step}
                    </span>
                    {i < advisory.steps.length - 1 && (
                      <ArrowRight size={13} color="#CBD5E1" style={{ flexShrink: 0 }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ── 8. RISK NOTE ────────────────────────────────────────────── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 16px', background: '#FFFBEB', border: '1px solid #FDE68A',
            borderRadius: '12px', marginBottom: '16px',
          }}>
            <AlertTriangle size={15} color="#D97706" style={{ flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#92400E' }}>Keep monitoring — </span>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#92400E' }}>{advisory.riskNote}</span>
            </div>
          </div>

          {/* ── 9. SHARE ───────────────────────────────────────────────── */}
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border-theme)', borderRadius: '16px',
            padding: '20px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '14px' }}>
              Share this Advisory
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank')}
                style={{
                  flex: 1, minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '11px 16px', borderRadius: '10px',
                  background: 'var(--success)', border: 'none', color: 'var(--card)',
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                <MessageSquare size={15} /> WhatsApp
              </button>
              <button
                onClick={() => window.open(`sms:?body=${encodeURIComponent(shareText)}`, '_blank')}
                style={{
                  flex: 1, minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '11px 16px', borderRadius: '10px',
                  background: 'var(--text-primary)', border: 'none', color: 'var(--card)',
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                <Share2 size={15} /> SMS
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  flex: 1, minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '11px 16px', borderRadius: '10px',
                  background: 'var(--card-elevated)', border: '1px solid var(--border-theme)', color: 'var(--text-secondary)',
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                }}
              >
                <Printer size={15} /> Print
              </button>
            </div>
          </div>
        </>
      )}

      {/* Footer note */}
      <div style={{
        textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '20px', fontWeight: 500,
      }}>
        Advisories are decision-support recommendations based on MausamX forecast probabilities, not absolute instructions.
      </div>
    </div>
  );
}
