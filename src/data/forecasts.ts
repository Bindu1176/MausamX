import type { ForecastDay } from '../types';

const generateForecastData = (baseOnset: number, baseDrySpell: number, baseHeavyRain: number): ForecastDay[] => {
  const days: ForecastDay[] = [];
  const startDate = new Date(2026, 8, 27); // Sept 27, 2026

  for (let i = 1; i <= 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const jitter = (Math.sin(i * 0.7) * 8) + (Math.cos(i * 0.3) * 5);
    const decay = i > 14 ? (i - 14) * 0.5 : 0;

    days.push({
      day: i,
      date: date.toISOString().split('T')[0],
      rainfallProbability: Math.max(10, Math.min(95, 65 + jitter - decay + Math.sin(i * 0.5) * 12)),
      rainfallAmount: Math.max(0, Math.round((25 + jitter * 2 - decay) * 10) / 10),
      rainfallAnomaly: Math.round((jitter + 5) * 10) / 10,
      onsetProbability: Math.max(30, Math.min(95, baseOnset + jitter * 0.5 - decay * 0.3)),
      drySpellProbability: Math.max(5, Math.min(70, baseDrySpell - jitter * 0.3 + decay * 0.5)),
      heavyRainProbability: Math.max(5, Math.min(80, baseHeavyRain + jitter * 0.4)),
      temperature: Math.round((28 + Math.sin(i * 0.4) * 3) * 10) / 10,
      humidity: Math.round(72 + Math.sin(i * 0.6) * 12),
      windSpeed: Math.round((12 + Math.cos(i * 0.5) * 5) * 10) / 10,
      confidence: Math.max(45, Math.min(90, 82 - i * 1.1 + Math.sin(i * 0.3) * 4)),
    });
  }
  return days;
};

export const forecastData: ForecastDay[] = generateForecastData(82, 18, 34);

export const forecastKeyDays = [1, 3, 7, 14, 21, 30];

export const getForecastForDay = (day: number) => forecastData.find((f) => f.day === day);

export const getForecastRange = (startDay: number, endDay: number) =>
  forecastData.filter((f) => f.day >= startDay && f.day <= endDay);

export const forecastSummary = {
  horizon: '7–30 Days',
  lastUpdated: '27 September 2026',
  system: 'Prototype / Mock Data',
  location: 'Kanakapura Block',
  district: 'Ramanagara, Karnataka',
};
