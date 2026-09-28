import type { RiskLevel, AlertSeverity } from '../types';

export const riskColors: Record<RiskLevel, string> = {
  low: '#2E9B63',
  moderate: '#F2B84B',
  high: '#E45757',
};

export const riskBgColors: Record<RiskLevel, string> = {
  low: 'bg-success/10',
  moderate: 'bg-warning/10',
  high: 'bg-danger/10',
};

export const riskTextColors: Record<RiskLevel, string> = {
  low: 'text-[#2E9B63]',
  moderate: 'text-[#F2B84B]',
  high: 'text-[#E45757]',
};

export const riskBorderColors: Record<RiskLevel, string> = {
  low: 'border-[#2E9B63]',
  moderate: 'border-[#F2B84B]',
  high: 'border-[#E45757]',
};

export const severityColors: Record<AlertSeverity, string> = {
  high: '#E45757',
  advisory: '#F2B84B',
  information: '#1976D2',
  favorable: '#2E9B63',
};

export const severityBgClasses: Record<AlertSeverity, string> = {
  high: 'bg-danger/10',
  advisory: 'bg-warning/10',
  information: 'bg-primary/10',
  favorable: 'bg-success/10',
};

export const severityTextClasses: Record<AlertSeverity, string> = {
  high: 'text-[#E45757]',
  advisory: 'text-[#F2B84B]',
  information: 'text-[#1976D2]',
  favorable: 'text-[#2E9B63]',
};

export const severityIcons: Record<AlertSeverity, string> = {
  high: '🔴',
  advisory: '🟡',
  information: '🔵',
  favorable: '🟢',
};

export const riskLabels: Record<RiskLevel, string> = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk',
};

export const formatProbability = (value: number): string => `${Math.round(value)}%`;

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const getRiskLevel = (probability: number): RiskLevel => {
  if (probability >= 60) return 'high';
  if (probability >= 30) return 'moderate';
  return 'low';
};

export const getOnsetStatus = (probability: number): string => {
  if (probability >= 75) return 'Favorable';
  if (probability >= 50) return 'Moderate';
  return 'Unfavorable';
};

export const getConfidenceLabel = (confidence: number): string => {
  if (confidence >= 80) return 'High';
  if (confidence >= 65) return 'Medium–High';
  if (confidence >= 50) return 'Medium';
  return 'Low';
};
