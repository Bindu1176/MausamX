import type { ClimateSignal, RegionalCondition } from '../types';

export const climateSignals: ClimateSignal[] = [
  {
    id: 'enso',
    name: 'El Niño–Southern Oscillation',
    abbreviation: 'ENSO (ONI / RONI)',
    status: 'Neutral',
    value: -0.3,
    description: 'Large-scale Pacific Ocean-atmosphere climate signal that influences global rainfall patterns including the Indian monsoon.',
    impact: 'Neutral ENSO conditions suggest near-normal monsoon behaviour for peninsular India.',
    category: 'global',
  },
  {
    id: 'iod',
    name: 'Indian Ocean Dipole',
    abbreviation: 'IOD',
    status: 'Positive',
    value: 0.6,
    description: 'Temperature gradient across the Indian Ocean affecting moisture transport to the Indian subcontinent.',
    impact: 'Positive IOD is generally associated with enhanced rainfall over India, particularly the southern peninsula.',
    category: 'global',
  },
  {
    id: 'mjo',
    name: 'Madden-Julian Oscillation',
    abbreviation: 'MJO',
    status: 'Phase 4 — Active',
    value: 1.2,
    description: 'Intraseasonal oscillation of tropical convection that propagates eastward, modulating monsoon activity in 30–60 day cycles.',
    impact: 'MJO Phase 4 with amplitude 1.2 indicates enhanced convective activity over the Indian subcontinent.',
    category: 'global',
  },
  {
    id: 'rainfall',
    name: 'Rainfall',
    abbreviation: 'Regional Rainfall',
    status: 'Above Normal',
    value: 112,
    description: 'Current rainfall accumulation relative to the long-period average for the region.',
    impact: 'Cumulative rainfall is 12% above the long-period average for this period.',
    category: 'regional',
  },
  {
    id: 'temperature',
    name: 'Surface Temperature',
    abbreviation: 'Temperature',
    status: 'Normal',
    value: 28.4,
    description: 'Mean surface temperature in the region.',
    impact: 'Temperature conditions are near normal for this time of the season.',
    category: 'regional',
  },
  {
    id: 'humidity',
    name: 'Relative Humidity',
    abbreviation: 'Humidity',
    status: 'Above Normal',
    value: 78,
    description: 'Relative humidity levels in the lower troposphere.',
    impact: 'Elevated humidity supports continued precipitation potential.',
    category: 'regional',
  },
];

export const regionalConditions: RegionalCondition[] = [
  { parameter: 'Rainfall (7-day)', value: '82.4', unit: 'mm', status: 'Above Normal', trend: 'rising' },
  { parameter: 'Temperature', value: '28.4', unit: '°C', status: 'Normal', trend: 'stable' },
  { parameter: 'Relative Humidity', value: '78', unit: '%', status: 'Above Normal', trend: 'rising' },
  { parameter: 'Sea Level Pressure', value: '1008.2', unit: 'hPa', status: 'Normal', trend: 'falling' },
  { parameter: 'Wind Speed', value: '12.6', unit: 'km/h', status: 'Normal', trend: 'stable' },
  { parameter: 'Cloud Cover', value: '72', unit: '%', status: 'Above Normal', trend: 'rising' },
];

export const globalSignals = climateSignals.filter((s) => s.category === 'global');
export const regionalSignals = climateSignals.filter((s) => s.category === 'regional');
