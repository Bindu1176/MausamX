import type { CropAdvisory, CropType, CropStage } from '../types';

export const cropOptions: { value: CropType; label: string; icon: string }[] = [
  { value: 'rice', label: 'Rice (Paddy)', icon: '🌾' },
  { value: 'ragi', label: 'Ragi (Finger Millet)', icon: '🌱' },
  { value: 'maize', label: 'Maize', icon: '🌽' },
  { value: 'groundnut', label: 'Groundnut', icon: '🥜' },
  { value: 'pulses', label: 'Pulses', icon: '🫘' },
  { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
];

export const cropStages: { value: CropStage; label: string }[] = [
  { value: 'pre-sowing', label: 'Pre-Sowing' },
  { value: 'sowing', label: 'Sowing' },
  { value: 'vegetative', label: 'Vegetative' },
  { value: 'flowering', label: 'Flowering' },
  { value: 'harvest', label: 'Harvest' },
];

export const advisories: CropAdvisory[] = [
  {
    id: 'adv-001',
    crop: 'ragi',
    cropStage: 'pre-sowing',
    location: 'Kanakapura',
    advisory: 'Conditions are becoming favorable for sowing over the next 7 days. Monitor rainfall persistence before final sowing decision.',
    actions: [
      'Prepare field and ensure proper leveling',
      'Check soil moisture levels — aim for adequate saturation',
      'Keep seed material ready for planting',
      'Monitor rainfall continuity over 3–5 days before sowing',
      'Consult local extension officer for seed variety recommendations',
    ],
    riskLevel: 'moderate',
    confidence: 78,
    onsetProbability: 82,
    drySpellProbability: 18,
    heavyRainProbability: 34,
  },
  {
    id: 'adv-002',
    crop: 'rice',
    cropStage: 'sowing',
    location: 'Kanakapura',
    advisory: 'Monsoon onset probability is favorable. Ensure nursery preparation is complete. Transplanting may be considered within the next 10–14 days.',
    actions: [
      'Complete nursery bed preparation',
      'Ensure adequate water supply for transplanting',
      'Apply basal dose of fertilizer before transplanting',
      'Monitor weather updates for rainfall continuity',
      'Plan transplanting during a period of steady rainfall',
    ],
    riskLevel: 'low',
    confidence: 80,
    onsetProbability: 82,
    drySpellProbability: 18,
    heavyRainProbability: 34,
  },
  {
    id: 'adv-003',
    crop: 'maize',
    cropStage: 'vegetative',
    location: 'Kanakapura',
    advisory: 'Moderate heavy rain risk. Ensure field drainage is adequate. Monitor for signs of waterlogging stress.',
    actions: [
      'Check and clear field drainage channels',
      'Monitor plants for signs of waterlogging stress',
      'Apply nitrogen top-dressing if not already done',
      'Watch for increased pest activity due to humidity',
      'Avoid fertilizer application immediately before heavy rainfall',
    ],
    riskLevel: 'moderate',
    confidence: 72,
    onsetProbability: 82,
    drySpellProbability: 18,
    heavyRainProbability: 34,
  },
  {
    id: 'adv-004',
    crop: 'groundnut',
    cropStage: 'flowering',
    location: 'Channapatna',
    advisory: 'Dry spell risk is elevated. Ensure irrigation planning is in place. Flowering stage is sensitive to moisture stress.',
    actions: [
      'Prepare irrigation alternatives if possible',
      'Apply mulching to retain soil moisture',
      'Monitor flower drop — indicator of moisture stress',
      'Avoid heavy fertilizer application during dry conditions',
      'Plan protective irrigation during the critical flowering window',
    ],
    riskLevel: 'moderate',
    confidence: 68,
    onsetProbability: 68,
    drySpellProbability: 31,
    heavyRainProbability: 42,
  },
  {
    id: 'adv-005',
    crop: 'pulses',
    cropStage: 'pre-sowing',
    location: 'Magadi',
    advisory: 'Monsoon onset probability is below average. Consider delaying sowing until onset indicators improve.',
    actions: [
      'Delay sowing until rainfall shows persistence',
      'Monitor MausamX forecasts for updated onset probability',
      'Prepare alternative crop options if onset is significantly delayed',
      'Consider drought-tolerant varieties if delays continue',
      'Maintain field readiness for quick sowing when conditions improve',
    ],
    riskLevel: 'high',
    confidence: 65,
    onsetProbability: 54,
    drySpellProbability: 44,
    heavyRainProbability: 28,
  },
  {
    id: 'adv-006',
    crop: 'vegetables',
    cropStage: 'harvest',
    location: 'Kanakapura',
    advisory: 'Heavy rainfall probability is moderate. Protect harvested produce from moisture damage. Prioritize early harvesting where possible.',
    actions: [
      'Harvest mature produce before anticipated heavy rainfall',
      'Arrange proper storage and drying facilities',
      'Protect stored produce from moisture and spoilage',
      'Plan transportation to market before roads become difficult',
      'Monitor weather alerts for sudden rainfall changes',
    ],
    riskLevel: 'moderate',
    confidence: 74,
    onsetProbability: 82,
    drySpellProbability: 18,
    heavyRainProbability: 34,
  },
];

export const getAdvisoryByCrop = (crop: CropType) =>
  advisories.filter((a) => a.crop === crop);

export const getAdvisoryByLocation = (location: string) =>
  advisories.filter((a) => a.location === location);

export const getAdvisoryByCropAndStage = (crop: CropType, stage: CropStage) =>
  advisories.filter((a) => a.crop === crop && a.cropStage === stage);

export const advisoryRules = [
  { condition: 'Possible delayed onset', recommendation: 'Consider delaying sowing until onset indicators stabilize' },
  { condition: 'Dry spell risk elevated', recommendation: 'Prepare irrigation alternatives and apply mulching' },
  { condition: 'Heavy rain risk elevated', recommendation: 'Check drainage and protect harvested produce' },
  { condition: 'Favorable onset probability', recommendation: 'Prepare fields and monitor sowing conditions' },
  { condition: 'False onset risk moderate', recommendation: 'Monitor rainfall persistence — avoid premature sowing' },
  { condition: 'Low confidence forecast', recommendation: 'Defer major decisions and check updated forecasts' },
];
