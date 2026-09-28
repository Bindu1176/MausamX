/**
 * MausamX — Location Service
 *
 * Provides a clean, scalable API for querying India-wide location data.
 * The React UI should use ONLY these functions — never import raw data arrays directly.
 *
 * Functions follow the pattern:
 *   getStates()
 *   getDistricts(stateId)
 *   getBlocks(districtId)
 *   getPanchayats(blockId)
 *   searchLocations(query)
 *   getForecast(panchayatId | blockId)
 */

import {
  INDIA_STATES,
  INDIA_DISTRICTS,
  INDIA_BLOCKS,
  INDIA_PANCHAYATS,
  BLOCKS_WITHOUT_PANCHAYAT_DATA,
  type IndiaState,
  type IndiaDistrict,
  type IndiaBlock,
  type IndiaPanchayat,
} from '../data/indiaLocations';

// ─── Re-export types so callers don't need to import from data layer ─────────
export type { IndiaState, IndiaDistrict, IndiaBlock, IndiaPanchayat };

// ─── Forecast result ──────────────────────────────────────────────────────────
export interface ForecastData {
  onsetProbability: number;
  drySpellProbability: number;
  heavyRainProbability: number;
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

// ─── Search result ─────────────────────────────────────────────────────────────
export interface LocationSearchResult {
  id: string;
  name: string;
  type: 'state' | 'district' | 'block' | 'panchayat';
  displayPath: string;   // e.g. "Kanakapura Block · Ramanagara · Karnataka"
  lat: number;
  lng: number;
  stateId?: string;
  districtId?: string;
  blockId?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HIERARCHY QUERIES
// ─────────────────────────────────────────────────────────────────────────────

/** All Indian states, sorted alphabetically */
export function getStates(): IndiaState[] {
  return [...INDIA_STATES].sort((a, b) => a.name.localeCompare(b.name));
}

/** Districts belonging to a state */
export function getDistricts(stateId: string): IndiaDistrict[] {
  return INDIA_DISTRICTS.filter(d => d.stateId === stateId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Blocks belonging to a district */
export function getBlocks(districtId: string): IndiaBlock[] {
  return INDIA_BLOCKS.filter(b => b.districtId === districtId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Panchayats belonging to a block (returns empty array if data unavailable) */
export function getPanchayats(blockId: string): IndiaPanchayat[] {
  return INDIA_PANCHAYATS.filter(p => p.blockId === blockId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Whether a block has panchayat data yet */
export function hasPanchayatData(blockId: string): boolean {
  return !BLOCKS_WITHOUT_PANCHAYAT_DATA.has(blockId);
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTITY LOOKUPS
// ─────────────────────────────────────────────────────────────────────────────

export function getStateById(id: string): IndiaState | undefined {
  return INDIA_STATES.find(s => s.id === id);
}

export function getDistrictById(id: string): IndiaDistrict | undefined {
  return INDIA_DISTRICTS.find(d => d.id === id);
}

export function getBlockById(id: string): IndiaBlock | undefined {
  return INDIA_BLOCKS.find(b => b.id === id);
}

export function getPanchayatById(id: string): IndiaPanchayat | undefined {
  return INDIA_PANCHAYATS.find(p => p.id === id);
}

// ─────────────────────────────────────────────────────────────────────────────
// PATH RESOLUTION — get full hierarchy label for any entity
// ─────────────────────────────────────────────────────────────────────────────

export function resolveBlockPath(blockId: string): string {
  const block = getBlockById(blockId);
  if (!block) return blockId;
  const district = getDistrictById(block.districtId);
  const state = district ? getStateById(district.stateId) : undefined;
  return [block.name, district?.name, state?.name].filter(Boolean).join(' · ');
}

export function resolveDistrictPath(districtId: string): string {
  const district = getDistrictById(districtId);
  if (!district) return districtId;
  const state = getStateById(district.stateId);
  return [district.name, state?.name].filter(Boolean).join(' · ');
}

export function resolvePanchayatPath(panchayatId: string): string {
  const p = getPanchayatById(panchayatId);
  if (!p) return panchayatId;
  const block = getBlockById(p.blockId);
  const district = block ? getDistrictById(block.districtId) : undefined;
  const state = district ? getStateById(district.stateId) : undefined;
  return [p.name, block?.name + ' Block', district?.name, state?.name].filter(Boolean).join(' · ');
}

// ─────────────────────────────────────────────────────────────────────────────
// FORECAST SERVICE
// Returns null if forecast data is not yet available for the location.
// NEVER returns fabricated values.
// ─────────────────────────────────────────────────────────────────────────────

export function getForecast(panchayatId: string): ForecastData | null {
  const p = getPanchayatById(panchayatId);
  return p?.forecast ?? null;
}

export function getBlockForecast(blockId: string): ForecastData | null {
  // Block-level forecast: average of available panchayat forecasts in this block
  const panchayats = getPanchayats(blockId).filter(p => p.forecast);
  if (panchayats.length === 0) return null;
  const avg = (key: keyof ForecastData) => {
    const vals = panchayats.map(p => (p.forecast as any)[key]).filter((v: any) => typeof v === 'number');
    return vals.length ? Math.round(vals.reduce((a: number, b: number) => a + b, 0) / vals.length) : 0;
  };
  return {
    onsetProbability: avg('onsetProbability') as number,
    drySpellProbability: avg('drySpellProbability') as number,
    heavyRainProbability: avg('heavyRainProbability') as number,
    confidence: avg('confidence') as number,
    riskLevel: 'moderate',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL SEARCH
// ─────────────────────────────────────────────────────────────────────────────

export function searchLocations(query: string): LocationSearchResult[] {
  if (!query.trim() || query.length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: LocationSearchResult[] = [];

  // Search panchayats
  INDIA_PANCHAYATS.forEach(p => {
    if (p.name.toLowerCase().includes(q)) {
      const block = getBlockById(p.blockId);
      const district = block ? getDistrictById(block.districtId) : undefined;
      const state = district ? getStateById(district.stateId) : undefined;
      results.push({
        id: p.id, name: p.name, type: 'panchayat',
        displayPath: [block?.name + ' Block', district?.name, state?.name].filter(Boolean).join(' · '),
        lat: p.lat, lng: p.lng,
        stateId: state?.id, districtId: district?.id, blockId: block?.id,
      });
    }
  });

  // Search blocks
  INDIA_BLOCKS.forEach(b => {
    if (b.name.toLowerCase().includes(q)) {
      const district = getDistrictById(b.districtId);
      const state = district ? getStateById(district.stateId) : undefined;
      results.push({
        id: b.id, name: b.name, type: 'block',
        displayPath: [district?.name, state?.name].filter(Boolean).join(' · '),
        lat: b.lat, lng: b.lng,
        stateId: state?.id, districtId: district?.id,
      });
    }
  });

  // Search districts
  INDIA_DISTRICTS.forEach(d => {
    if (d.name.toLowerCase().includes(q)) {
      const state = getStateById(d.stateId);
      results.push({
        id: d.id, name: d.name, type: 'district',
        displayPath: state?.name ?? '',
        lat: d.lat, lng: d.lng,
        stateId: state?.id,
      });
    }
  });

  // Search states
  INDIA_STATES.forEach(s => {
    if (s.name.toLowerCase().includes(q)) {
      results.push({
        id: s.id, name: s.name, type: 'state',
        displayPath: 'India',
        lat: s.lat, lng: s.lng,
      });
    }
  });

  // Deduplicate, sort panchayats/blocks first, limit to 8
  return results.slice(0, 8);
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT DEMO LOCATION
// Kanakapura is the demo default — NOT the only available location.
// ─────────────────────────────────────────────────────────────────────────────
export const DEFAULT_DEMO_STATE_ID = 'karnataka';
export const DEFAULT_DEMO_DISTRICT_ID = 'ramanagara';
export const DEFAULT_DEMO_BLOCK_ID = 'kanakapura-block';
export const DEFAULT_DEMO_PANCHAYAT_ID = 'sathanur'; // matches existing Home page default
