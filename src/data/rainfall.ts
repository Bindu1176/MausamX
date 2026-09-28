import type { RainfallData } from '../types';

export const monthlyRainfall: RainfallData[] = [
  { month: 'Jan', actual: 5, predicted: 6, normal: 4, year: 2026 },
  { month: 'Feb', actual: 8, predicted: 7, normal: 6, year: 2026 },
  { month: 'Mar', actual: 12, predicted: 14, normal: 10, year: 2026 },
  { month: 'Apr', actual: 42, predicted: 38, normal: 35, year: 2026 },
  { month: 'May', actual: 110, predicted: 105, normal: 95, year: 2026 },
  { month: 'Jun', actual: 145, predicted: 135, normal: 120, year: 2026 },
  { month: 'Jul', actual: 168, predicted: 160, normal: 150, year: 2026 },
  { month: 'Aug', actual: 155, predicted: 148, normal: 140, year: 2026 },
  { month: 'Sep', actual: 165, predicted: 158, normal: 145, year: 2026 },
  { month: 'Oct', actual: 0, predicted: 130, normal: 125, year: 2026 },
  { month: 'Nov', actual: 0, predicted: 45, normal: 40, year: 2026 },
  { month: 'Dec', actual: 0, predicted: 10, normal: 8, year: 2026 },
];

export const historicalAnnualRainfall = [
  { year: 2016, total: 845, normal: 780 },
  { year: 2017, total: 920, normal: 780 },
  { year: 2018, total: 710, normal: 780 },
  { year: 2019, total: 860, normal: 780 },
  { year: 2020, total: 790, normal: 780 },
  { year: 2021, total: 880, normal: 780 },
  { year: 2022, total: 750, normal: 780 },
  { year: 2023, total: 830, normal: 780 },
  { year: 2024, total: 900, normal: 780 },
  { year: 2025, total: 870, normal: 780 },
  { year: 2026, total: 810, normal: 780 },
];

export const weeklyRainfallTrend = Array.from({ length: 16 }, (_, i) => ({
  week: `W${i + 1}`,
  actual: Math.max(0, Math.round(20 + Math.sin(i * 0.8) * 30 + Math.random() * 15)),
  forecast: Math.max(0, Math.round(22 + Math.sin(i * 0.8) * 28 + Math.random() * 10)),
  normal: Math.round(18 + Math.sin(i * 0.7) * 15),
}));

export const dailyRainfallIntensity = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  light: Math.round(15 + Math.random() * 20),
  moderate: Math.round(8 + Math.random() * 18),
  heavy: Math.round(2 + Math.random() * 12),
  veryHeavy: Math.round(Math.random() * 6),
}));
