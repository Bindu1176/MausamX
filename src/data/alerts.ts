import type { Alert } from '../types';

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    title: 'Heavy Rainfall Risk — Kanakapura',
    message: 'Heavy rainfall probability has increased to 68% during the next 72 hours. Agricultural operations may be affected.',
    location: 'Kanakapura Block, Ramanagara',
    severity: 'high',
    action: 'Check drainage systems and protect harvested produce. Avoid unnecessary field operations during heavy rainfall periods.',
    timestamp: '27 Sep 2026, 14:30 IST',
    isRead: false,
    category: 'Heavy Rainfall',
  },
  {
    id: 'alert-002',
    title: 'Monsoon Onset Update',
    message: 'Monsoon onset probability has increased to 82% for Kanakapura Block. Conditions becoming favorable for sustained rainfall.',
    location: 'Kanakapura Block, Ramanagara',
    severity: 'favorable',
    action: 'Prepare fields for sowing. Monitor rainfall persistence before finalizing sowing decisions.',
    timestamp: '27 Sep 2026, 10:15 IST',
    isRead: false,
    category: 'Monsoon Onset',
  },
  {
    id: 'alert-003',
    title: 'Dry Spell Risk — Magadi',
    message: 'Dry spell probability has risen to 44% for Magadi Block. Extended rainfall gap possible over the next 7–14 days.',
    location: 'Magadi Block, Ramanagara',
    severity: 'advisory',
    action: 'Plan irrigation alternatives. Monitor soil moisture levels. Consider delaying sowing for moisture-sensitive crops.',
    timestamp: '26 Sep 2026, 16:45 IST',
    isRead: true,
    category: 'Dry Spell',
  },
  {
    id: 'alert-004',
    title: 'False Onset Awareness',
    message: 'Initial rainfall has been observed but sustained monsoon establishment is uncertain. False onset risk is at 23%.',
    location: 'Channapatna Block, Ramanagara',
    severity: 'advisory',
    action: 'Monitor rainfall continuity for at least 3–5 days before making sowing decisions based on initial rainfall.',
    timestamp: '26 Sep 2026, 09:00 IST',
    isRead: true,
    category: 'False Onset',
  },
  {
    id: 'alert-005',
    title: 'Forecast Confidence Update',
    message: 'Model confidence for 14-day forecast has improved to 78% following updated climate signal inputs.',
    location: 'Ramanagara District',
    severity: 'information',
    action: 'Review updated forecast details for your specific block and panchayat.',
    timestamp: '25 Sep 2026, 11:30 IST',
    isRead: true,
    category: 'System',
  },
  {
    id: 'alert-006',
    title: 'Crop Advisory — Ragi Sowing Window',
    message: 'Favorable conditions for Ragi sowing are approaching in Kanakapura Block. 7-day outlook indicates adequate rainfall probability.',
    location: 'Kanakapura Block, Ramanagara',
    severity: 'favorable',
    action: 'Prepare seed material and field conditions. Begin sowing when 3–5 day rainfall persistence is confirmed.',
    timestamp: '25 Sep 2026, 08:00 IST',
    isRead: true,
    category: 'Crop Advisory',
  },
  {
    id: 'alert-007',
    title: 'Regional Heavy Rain Warning — Doddaballapur',
    message: 'Heavy rainfall probability elevated to 55% for Doddaballapur Block over the next 48 hours.',
    location: 'Doddaballapur Block, Bangalore Rural',
    severity: 'high',
    action: 'Monitor local conditions. Ensure proper drainage. Avoid low-lying field operations.',
    timestamp: '24 Sep 2026, 15:20 IST',
    isRead: true,
    category: 'Heavy Rainfall',
  },
  {
    id: 'alert-008',
    title: 'Weekly Forecast Summary Available',
    message: 'The weekly probabilistic forecast summary for Ramanagara District is now available for review.',
    location: 'Ramanagara District',
    severity: 'information',
    action: 'Access the Forecasts page for detailed 7–30 day outlook.',
    timestamp: '24 Sep 2026, 07:00 IST',
    isRead: true,
    category: 'System',
  },
];

export const getAlertsBySeverity = (severity: Alert['severity']) =>
  alerts.filter((a) => a.severity === severity);

export const getUnreadAlerts = () => alerts.filter((a) => !a.isRead);

export const getAlertsByLocation = (location: string) =>
  alerts.filter((a) => a.location.toLowerCase().includes(location.toLowerCase()));
