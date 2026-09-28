import type { ModelMetric, CalibrationPoint, ConfusionMatrix } from '../types';

export const modelMetrics: ModelMetric[] = [
  { name: 'Precision', value: 0.79, description: 'Proportion of predicted positive events that were observed', category: 'Classification' },
  { name: 'Recall', value: 0.83, description: 'Proportion of observed events that were correctly predicted', category: 'Classification' },
  { name: 'F1 Score', value: 0.81, description: 'Harmonic mean of precision and recall', category: 'Classification' },
  { name: 'ROC-AUC', value: 0.86, description: 'Area under the Receiver Operating Characteristic curve', category: 'Probabilistic' },
  { name: 'Brier Score', value: 0.18, description: 'Mean squared difference between predicted probability and observed outcome (lower is better)', category: 'Probabilistic' },
  { name: 'Calibration Error', value: 0.07, description: 'Average absolute difference between predicted and observed frequency (lower is better)', category: 'Calibration' },
];

export const calibrationData: CalibrationPoint[] = [
  { predicted: 0.1, observed: 0.08 },
  { predicted: 0.2, observed: 0.18 },
  { predicted: 0.3, observed: 0.27 },
  { predicted: 0.4, observed: 0.38 },
  { predicted: 0.5, observed: 0.47 },
  { predicted: 0.6, observed: 0.58 },
  { predicted: 0.7, observed: 0.72 },
  { predicted: 0.8, observed: 0.78 },
  { predicted: 0.9, observed: 0.92 },
];

export const confusionMatrix: ConfusionMatrix = {
  truePositive: 156,
  falsePositive: 42,
  trueNegative: 234,
  falseNegative: 32,
};

export const probabilityDistribution = Array.from({ length: 10 }, (_, i) => ({
  range: `${i * 10}–${(i + 1) * 10}%`,
  predicted: Math.round(20 + Math.sin(i * 0.8) * 15 + Math.random() * 10),
  observed: Math.round(18 + Math.sin(i * 0.8) * 14 + Math.random() * 8),
}));

export const historicalVsPredicted = [
  { year: '2018', historical: 710, predicted: 735, normal: 780 },
  { year: '2019', historical: 860, predicted: 840, normal: 780 },
  { year: '2020', historical: 790, predicted: 810, normal: 780 },
  { year: '2021', historical: 880, predicted: 855, normal: 780 },
  { year: '2022', historical: 750, predicted: 770, normal: 780 },
  { year: '2023', historical: 830, predicted: 815, normal: 780 },
  { year: '2024', historical: 900, predicted: 875, normal: 780 },
  { year: '2025', historical: 870, predicted: 850, normal: 780 },
];

export const modelDetails = {
  models: ['XGBoost', 'Random Forest', 'LSTM'],
  features: ['ENSO (ONI/RONI)', 'IOD', 'MJO Phase & Amplitude', 'Rainfall Lag Features', 'Temperature Anomalies', 'Humidity Gradients', 'Pressure Patterns', 'Wind Components', 'Historical Monsoon Dates'],
  validationPeriod: '2018–2025 (Demonstration)',
  spatialResolution: 'Block / Panchayat Level',
  temporalResolution: '7–30 Day Probabilistic Forecast',
  note: 'Prototype / Historical Validation Demonstration — metrics are based on simulated evaluation data.',
};
