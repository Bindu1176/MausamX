// ============================================================
// MausamX Type Definitions
// ============================================================

export interface Location {
  id: string;
  name: string;
  type: 'state' | 'district' | 'block' | 'panchayat';
  parentId?: string;
  lat: number;
  lng: number;
  onsetProbability: number;
  drySpellProbability: number;
  heavyRainProbability: number;
  confidence: number;
  rainfallAnomaly: number;
  riskLevel: RiskLevel;
}

export type RiskLevel = 'low' | 'moderate' | 'high';

export interface ForecastDay {
  day: number;
  date: string;
  rainfallProbability: number;
  rainfallAmount: number;
  rainfallAnomaly: number;
  onsetProbability: number;
  drySpellProbability: number;
  heavyRainProbability: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  confidence: number;
}

export interface ClimateSignal {
  id: string;
  name: string;
  abbreviation: string;
  status: string;
  value: number;
  description: string;
  impact: string;
  category: 'global' | 'regional';
}

export interface CropAdvisory {
  id: string;
  crop: CropType;
  cropStage: CropStage;
  location: string;
  advisory: string;
  actions: string[];
  riskLevel: RiskLevel;
  confidence: number;
  onsetProbability: number;
  drySpellProbability: number;
  heavyRainProbability: number;
}

export type CropType = 'rice' | 'ragi' | 'maize' | 'groundnut' | 'pulses' | 'vegetables';
export type CropStage = 'pre-sowing' | 'sowing' | 'vegetative' | 'flowering' | 'harvest';

export interface Alert {
  id: string;
  title: string;
  message: string;
  location: string;
  severity: AlertSeverity;
  action: string;
  timestamp: string;
  isRead: boolean;
  category: string;
}

export type AlertSeverity = 'high' | 'advisory' | 'information' | 'favorable';

export interface ModelMetric {
  name: string;
  value: number;
  description: string;
  category: string;
}

export interface RainfallData {
  month: string;
  actual: number;
  predicted: number;
  normal: number;
  year: number;
}

export interface RegionalCondition {
  parameter: string;
  value: string;
  unit: string;
  status: string;
  trend: 'rising' | 'falling' | 'stable';
}

export interface OfficerBlock {
  id: string;
  name: string;
  district: string;
  onsetProbability: number;
  drySpellProbability: number;
  heavyRainProbability: number;
  riskLevel: RiskLevel;
  advisoryStatus: string;
  farmerCount: number;
  alertCount: number;
}

export interface SearchResult {
  id: string;
  title: string;
  category: 'location' | 'crop' | 'forecast' | 'advisory' | 'alert';
  description: string;
  link: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'alert' | 'update' | 'advisory';
}

export type Language = 'en' | 'kn' | 'hi' | 'ta' | 'te';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export interface CalibrationPoint {
  predicted: number;
  observed: number;
}

export interface ConfusionMatrix {
  truePositive: number;
  falsePositive: number;
  trueNegative: number;
  falseNegative: number;
}
