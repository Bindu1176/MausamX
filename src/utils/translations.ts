import type { LanguageOption } from '../types';

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

type TranslationKey =
  | 'rainOutlook'
  | 'rainLikely'
  | 'whatShouldIDo'
  | 'prepareField'
  | 'crop'
  | 'risk'
  | 'forecast'
  | 'rainfall'
  | 'advisory'
  | 'monitorRainfall'
  | 'moderateRisk';

const translations: Record<string, Record<TranslationKey, string>> = {
  en: {
    rainOutlook: 'Rain Outlook',
    rainLikely: 'Rain likely during the next 3 days.',
    whatShouldIDo: 'Recommended Action',
    prepareField: 'Prepare field and monitor rainfall before sowing.',
    crop: 'Crop',
    risk: 'Risk',
    forecast: '7-Day Forecast',
    rainfall: 'Rainfall',
    advisory: 'Advisory',
    monitorRainfall: 'Monitor rainfall before sowing',
    moderateRisk: 'Moderate Risk',
  },
  kn: {
    rainOutlook: 'ಮಳೆ ಮುನ್ಸೂಚನೆ',
    rainLikely: 'ಮುಂದಿನ 3 ದಿನಗಳಲ್ಲಿ ಮಳೆ ಬರುವ ಸಾಧ್ಯತೆಯಿದೆ.',
    whatShouldIDo: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ',
    prepareField: 'ಬಿತ್ತನೆ ಮಾಡುವ ಮೊದಲು ಹೊಲವನ್ನು ಸಿದ್ಧಪಡಿಸಿ ಮಳೆಯನ್ನು ಗಮನಿಸಿ.',
    crop: 'ಬೆಳೆ',
    risk: 'ಅಪಾಯ',
    forecast: '7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ',
    rainfall: 'ಮಳೆ',
    advisory: 'ಸಲಹೆ',
    monitorRainfall: 'ಬಿತ್ತನೆ ಮಾಡುವ ಮೊದಲು ಮಳೆಯನ್ನು ಗಮನಿಸಿ',
    moderateRisk: 'ಮಧ್ಯಮ ಅಪಾಯ',
  },
  hi: {
    rainOutlook: 'बारिश का अनुमान',
    rainLikely: 'अगले 3 दिनों में बारिश की संभावना है।',
    whatShouldIDo: 'अनुशंसित कार्य',
    prepareField: 'बुवाई से पहले खेत तैयार करें और बारिश की निगरानी करें।',
    crop: 'फसल',
    risk: 'जोखिम',
    forecast: '7-दिवसीय पूर्वानुमान',
    rainfall: 'वर्षा',
    advisory: 'सलाह',
    monitorRainfall: 'बुवाई से पहले बारिश पर ध्यान दें',
    moderateRisk: 'मध्यम जोखिम',
  },
  ta: {
    rainOutlook: 'மழை முன்னறிவிப்பு',
    rainLikely: 'அடுத்த 3 நாட்களில் மழை பெய்ய வாய்ப்புள்ளது.',
    whatShouldIDo: 'பரிந்துரைக்கப்பட்ட நடவடிக்கை',
    prepareField: 'விதைப்பதற்கு முன் நிலத்தை தயார் செய்து மழையை கவனிக்கவும்.',
    crop: 'பயிர்',
    risk: 'ஆபத்து',
    forecast: '7-நாள் முன்னறிவிப்பு',
    rainfall: 'மழை',
    advisory: 'ஆலோசனை',
    monitorRainfall: 'விதைப்பதற்கு முன் மழையைக் கண்காணிக்கவும்',
    moderateRisk: 'மிதமான ஆபத்து',
  },
  te: {
    rainOutlook: 'వర్షపాత అంచనా',
    rainLikely: 'రాబోయే 3 రోజుల్లో వర్షం పడే అవకాశం ఉంది.',
    whatShouldIDo: 'సిఫార్సు చేసిన చర్య',
    prepareField: 'విత్తనాలు వేయడానికి ముందు పొలాన్ని సిద్ధం చేసి వర్షాన్ని పరిశీలించండి.',
    crop: 'పంట',
    risk: 'ప్రమాదం',
    forecast: '7-రోజుల సూచన',
    rainfall: 'వర్షపాతం',
    advisory: 'సలహా',
    monitorRainfall: 'విత్తడానికి ముందు వర్షాన్ని గమనించండి',
    moderateRisk: 'మధ్యస్థ ప్రమాదం',
  },
};

export const t = (key: TranslationKey, lang: string = 'en'): string => {
  return translations[lang]?.[key] || translations.en[key] || key;
};
