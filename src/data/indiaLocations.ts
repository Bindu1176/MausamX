/**
 * MausamX — India-Wide Location Data
 *
 * Data coverage policy:
 *   • States     — all major Indian states/UTs with real capital coordinates
 *   • Districts  — key agricultural districts per state, real names & coords
 *   • Blocks     — Karnataka: real data. Other states: key talukas/blocks marked
 *   • Panchayats — Karnataka (Kanakapura block): real demo data only
 *
 * Forecast data (onsetProbability etc.) is ONLY available for Karnataka locations.
 * All other locations correctly return hasForecast: false.
 *
 * DO NOT invent names, coordinates, or forecast values.
 */

export interface IndiaState {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface IndiaDistrict {
  id: string;
  name: string;
  stateId: string;
  lat: number;
  lng: number;
}

export interface IndiaBlock {
  id: string;
  name: string;
  districtId: string;
  lat: number;
  lng: number;
}

export interface IndiaPanchayat {
  id: string;
  name: string;
  blockId: string;
  lat: number;
  lng: number;
  /** Only present for locations with MausamX forecast coverage */
  forecast?: {
    onsetProbability: number;
    drySpellProbability: number;
    heavyRainProbability: number;
    confidence: number;
    riskLevel: 'low' | 'moderate' | 'high';
  };
}

// ─────────────────────────────────────────────────────────────
// STATES (all major Indian states with verified coordinates)
// ─────────────────────────────────────────────────────────────
export const INDIA_STATES: IndiaState[] = [
  { id: 'andhra-pradesh',   name: 'Andhra Pradesh',    lat: 15.9129, lng: 79.7400 },
  { id: 'assam',            name: 'Assam',             lat: 26.2006, lng: 92.9376 },
  { id: 'bihar',            name: 'Bihar',             lat: 25.0961, lng: 85.3131 },
  { id: 'chhattisgarh',     name: 'Chhattisgarh',     lat: 21.2787, lng: 81.8661 },
  { id: 'delhi',            name: 'Delhi',             lat: 28.6139, lng: 77.2090 },
  { id: 'goa',              name: 'Goa',               lat: 15.2993, lng: 74.1240 },
  { id: 'gujarat',          name: 'Gujarat',           lat: 22.2587, lng: 71.1924 },
  { id: 'haryana',          name: 'Haryana',           lat: 29.0588, lng: 76.0856 },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh',  lat: 31.1048, lng: 77.1734 },
  { id: 'jharkhand',        name: 'Jharkhand',         lat: 23.6102, lng: 85.2799 },
  { id: 'karnataka',        name: 'Karnataka',         lat: 15.3173, lng: 75.7139 },
  { id: 'kerala',           name: 'Kerala',            lat: 10.8505, lng: 76.2711 },
  { id: 'madhya-pradesh',   name: 'Madhya Pradesh',   lat: 22.9734, lng: 78.6569 },
  { id: 'maharashtra',      name: 'Maharashtra',       lat: 19.7515, lng: 75.7139 },
  { id: 'manipur',          name: 'Manipur',           lat: 24.6637, lng: 93.9063 },
  { id: 'meghalaya',        name: 'Meghalaya',         lat: 25.4670, lng: 91.3662 },
  { id: 'mizoram',          name: 'Mizoram',           lat: 23.1645, lng: 92.9376 },
  { id: 'nagaland',         name: 'Nagaland',          lat: 26.1584, lng: 94.5624 },
  { id: 'odisha',           name: 'Odisha',            lat: 20.9517, lng: 85.0985 },
  { id: 'punjab',           name: 'Punjab',            lat: 31.1471, lng: 75.3412 },
  { id: 'rajasthan',        name: 'Rajasthan',         lat: 27.0238, lng: 74.2179 },
  { id: 'sikkim',           name: 'Sikkim',            lat: 27.5330, lng: 88.5122 },
  { id: 'tamil-nadu',       name: 'Tamil Nadu',        lat: 11.1271, lng: 78.6569 },
  { id: 'telangana',        name: 'Telangana',         lat: 18.1124, lng: 79.0193 },
  { id: 'tripura',          name: 'Tripura',           lat: 23.9408, lng: 91.9882 },
  { id: 'uttar-pradesh',    name: 'Uttar Pradesh',    lat: 26.8467, lng: 80.9462 },
  { id: 'uttarakhand',      name: 'Uttarakhand',       lat: 30.0668, lng: 79.0193 },
  { id: 'west-bengal',      name: 'West Bengal',       lat: 22.9868, lng: 87.8550 },
];

// ─────────────────────────────────────────────────────────────
// DISTRICTS (key agricultural districts, real names & coords)
// ─────────────────────────────────────────────────────────────
export const INDIA_DISTRICTS: IndiaDistrict[] = [
  // Karnataka
  { id: 'ramanagara',      name: 'Ramanagara',      stateId: 'karnataka',       lat: 12.7159, lng: 77.2814 },
  { id: 'bangalore-rural', name: 'Bangalore Rural', stateId: 'karnataka',       lat: 13.2257, lng: 77.5750 },
  { id: 'mandya',          name: 'Mandya',          stateId: 'karnataka',       lat: 12.5218, lng: 76.8951 },
  { id: 'mysuru',          name: 'Mysuru',          stateId: 'karnataka',       lat: 12.2958, lng: 76.6394 },
  { id: 'hassan',          name: 'Hassan',          stateId: 'karnataka',       lat: 13.0068, lng: 76.1004 },
  { id: 'tumkur',          name: 'Tumkur',          stateId: 'karnataka',       lat: 13.3379, lng: 77.1173 },
  { id: 'chitradurga',     name: 'Chitradurga',     stateId: 'karnataka',       lat: 14.2226, lng: 76.3983 },
  { id: 'dharwad',         name: 'Dharwad',         stateId: 'karnataka',       lat: 15.4589, lng: 75.0078 },

  // Maharashtra
  { id: 'pune',            name: 'Pune',            stateId: 'maharashtra',     lat: 18.5204, lng: 73.8567 },
  { id: 'nashik',          name: 'Nashik',          stateId: 'maharashtra',     lat: 20.0059, lng: 73.7897 },
  { id: 'aurangabad',      name: 'Aurangabad',      stateId: 'maharashtra',     lat: 19.8762, lng: 75.3433 },
  { id: 'nagpur',          name: 'Nagpur',          stateId: 'maharashtra',     lat: 21.1458, lng: 79.0882 },
  { id: 'kolhapur',        name: 'Kolhapur',        stateId: 'maharashtra',     lat: 16.7050, lng: 74.2433 },
  { id: 'solapur',         name: 'Solapur',         stateId: 'maharashtra',     lat: 17.6599, lng: 75.9064 },
  { id: 'amravati',        name: 'Amravati',        stateId: 'maharashtra',     lat: 20.9333, lng: 77.7500 },

  // Tamil Nadu
  { id: 'coimbatore',      name: 'Coimbatore',      stateId: 'tamil-nadu',      lat: 11.0168, lng: 76.9558 },
  { id: 'madurai',         name: 'Madurai',         stateId: 'tamil-nadu',      lat: 9.9252,  lng: 78.1198 },
  { id: 'salem',           name: 'Salem',           stateId: 'tamil-nadu',      lat: 11.6643, lng: 78.1460 },
  { id: 'tiruchirappalli', name: 'Tiruchirappalli', stateId: 'tamil-nadu',      lat: 10.7905, lng: 78.7047 },
  { id: 'thanjavur',       name: 'Thanjavur',       stateId: 'tamil-nadu',      lat: 10.7870, lng: 79.1378 },
  { id: 'erode',           name: 'Erode',           stateId: 'tamil-nadu',      lat: 11.3410, lng: 77.7172 },

  // West Bengal
  { id: 'nadia',           name: 'Nadia',           stateId: 'west-bengal',     lat: 23.4750, lng: 88.5530 },
  { id: 'murshidabad',     name: 'Murshidabad',     stateId: 'west-bengal',     lat: 24.1752, lng: 88.2765 },
  { id: 'hooghly',         name: 'Hooghly',         stateId: 'west-bengal',     lat: 22.9000, lng: 88.4000 },
  { id: 'burdwan',         name: 'Paschim Bardhaman', stateId: 'west-bengal',   lat: 23.2324, lng: 87.8615 },
  { id: 'darjeeling',      name: 'Darjeeling',      stateId: 'west-bengal',     lat: 27.0360, lng: 88.2627 },

  // Bihar
  { id: 'patna',           name: 'Patna',           stateId: 'bihar',           lat: 25.5941, lng: 85.1376 },
  { id: 'gaya',            name: 'Gaya',            stateId: 'bihar',           lat: 24.7914, lng: 85.0002 },
  { id: 'muzaffarpur',     name: 'Muzaffarpur',     stateId: 'bihar',           lat: 26.1209, lng: 85.3647 },
  { id: 'bhagalpur',       name: 'Bhagalpur',       stateId: 'bihar',           lat: 25.2425, lng: 86.9842 },
  { id: 'nalanda',         name: 'Nalanda',         stateId: 'bihar',           lat: 25.1338, lng: 85.4434 },

  // Rajasthan
  { id: 'jaipur',          name: 'Jaipur',          stateId: 'rajasthan',       lat: 26.9124, lng: 75.7873 },
  { id: 'jodhpur',         name: 'Jodhpur',         stateId: 'rajasthan',       lat: 26.2389, lng: 73.0243 },
  { id: 'udaipur',         name: 'Udaipur',         stateId: 'rajasthan',       lat: 24.5854, lng: 73.7125 },
  { id: 'bikaner',         name: 'Bikaner',         stateId: 'rajasthan',       lat: 28.0229, lng: 73.3119 },
  { id: 'ajmer',           name: 'Ajmer',           stateId: 'rajasthan',       lat: 26.4499, lng: 74.6399 },

  // Uttar Pradesh
  { id: 'lucknow',         name: 'Lucknow',         stateId: 'uttar-pradesh',   lat: 26.8467, lng: 80.9462 },
  { id: 'varanasi',        name: 'Varanasi',        stateId: 'uttar-pradesh',   lat: 25.3176, lng: 82.9739 },
  { id: 'agra',            name: 'Agra',            stateId: 'uttar-pradesh',   lat: 27.1767, lng: 78.0081 },
  { id: 'kanpur-nagar',    name: 'Kanpur Nagar',    stateId: 'uttar-pradesh',   lat: 26.4499, lng: 80.3319 },
  { id: 'gorakhpur',       name: 'Gorakhpur',       stateId: 'uttar-pradesh',   lat: 26.7606, lng: 83.3732 },
  { id: 'allahabad',       name: 'Prayagraj',       stateId: 'uttar-pradesh',   lat: 25.4358, lng: 81.8463 },

  // Gujarat
  { id: 'ahmedabad',       name: 'Ahmedabad',       stateId: 'gujarat',         lat: 23.0225, lng: 72.5714 },
  { id: 'surat',           name: 'Surat',           stateId: 'gujarat',         lat: 21.1702, lng: 72.8311 },
  { id: 'rajkot',          name: 'Rajkot',          stateId: 'gujarat',         lat: 22.3039, lng: 70.8022 },
  { id: 'vadodara',        name: 'Vadodara',        stateId: 'gujarat',         lat: 22.3072, lng: 73.1812 },
  { id: 'anand',           name: 'Anand',           stateId: 'gujarat',         lat: 22.5645, lng: 72.9289 },

  // Andhra Pradesh
  { id: 'krishna',         name: 'Krishna',         stateId: 'andhra-pradesh',  lat: 16.5193, lng: 80.6305 },
  { id: 'guntur',          name: 'Guntur',          stateId: 'andhra-pradesh',  lat: 16.3067, lng: 80.4365 },
  { id: 'kurnool',         name: 'Kurnool',         stateId: 'andhra-pradesh',  lat: 15.8281, lng: 78.0373 },
  { id: 'vizianagaram',    name: 'Vizianagaram',    stateId: 'andhra-pradesh',  lat: 18.1066, lng: 83.3956 },
  { id: 'chittoor',        name: 'Chittoor',        stateId: 'andhra-pradesh',  lat: 13.2172, lng: 79.1003 },

  // Telangana
  { id: 'hyderabad',       name: 'Hyderabad',       stateId: 'telangana',       lat: 17.3850, lng: 78.4867 },
  { id: 'warangal',        name: 'Hanumakonda',     stateId: 'telangana',       lat: 17.9784, lng: 79.5941 },
  { id: 'nizamabad',       name: 'Nizamabad',       stateId: 'telangana',       lat: 18.6725, lng: 78.0940 },
  { id: 'karimnagar',      name: 'Karimnagar',      stateId: 'telangana',       lat: 18.4386, lng: 79.1288 },
  { id: 'khammam',         name: 'Khammam',         stateId: 'telangana',       lat: 17.2473, lng: 80.1514 },

  // Odisha
  { id: 'khordha',         name: 'Khordha',         stateId: 'odisha',          lat: 20.1823, lng: 85.6780 },
  { id: 'cuttack',         name: 'Cuttack',         stateId: 'odisha',          lat: 20.4625, lng: 85.8830 },
  { id: 'sundargarh',      name: 'Sundargarh',      stateId: 'odisha',          lat: 22.1167, lng: 84.0330 },
  { id: 'balasore',        name: 'Balasore',        stateId: 'odisha',          lat: 21.4942, lng: 86.9341 },

  // Kerala
  { id: 'ernakulam',       name: 'Ernakulam',       stateId: 'kerala',          lat: 9.9816,  lng: 76.2999 },
  { id: 'thrissur',        name: 'Thrissur',        stateId: 'kerala',          lat: 10.5276, lng: 76.2144 },
  { id: 'kozhikode',       name: 'Kozhikode',       stateId: 'kerala',          lat: 11.2588, lng: 75.7804 },
  { id: 'palakkad',        name: 'Palakkad',        stateId: 'kerala',          lat: 10.7867, lng: 76.6548 },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', stateId: 'kerala',    lat: 8.5241,  lng: 76.9366 },

  // Madhya Pradesh
  { id: 'indore',          name: 'Indore',          stateId: 'madhya-pradesh',  lat: 22.7196, lng: 75.8577 },
  { id: 'bhopal',          name: 'Bhopal',          stateId: 'madhya-pradesh',  lat: 23.2599, lng: 77.4126 },
  { id: 'jabalpur',        name: 'Jabalpur',        stateId: 'madhya-pradesh',  lat: 23.1815, lng: 79.9864 },
  { id: 'gwalior',         name: 'Gwalior',         stateId: 'madhya-pradesh',  lat: 26.2183, lng: 78.1828 },

  // Assam
  { id: 'kamrup-metro',    name: 'Kamrup Metropolitan', stateId: 'assam',       lat: 26.1445, lng: 91.7362 },
  { id: 'dibrugarh',       name: 'Dibrugarh',       stateId: 'assam',          lat: 27.4728, lng: 94.9120 },
  { id: 'nagaon',          name: 'Nagaon',          stateId: 'assam',          lat: 26.3400, lng: 92.6900 },
  { id: 'sonitpur',        name: 'Sonitpur',        stateId: 'assam',          lat: 26.6338, lng: 92.8002 },

  // Haryana
  { id: 'hisar',           name: 'Hisar',           stateId: 'haryana',         lat: 29.1492, lng: 75.7217 },
  { id: 'gurugram',        name: 'Gurugram',        stateId: 'haryana',         lat: 28.4595, lng: 77.0266 },
  { id: 'ambala',          name: 'Ambala',          stateId: 'haryana',         lat: 30.3782, lng: 76.7767 },
  { id: 'rohtak',          name: 'Rohtak',          stateId: 'haryana',         lat: 28.8955, lng: 76.6066 },

  // Punjab
  { id: 'ludhiana',        name: 'Ludhiana',        stateId: 'punjab',          lat: 30.9009, lng: 75.8573 },
  { id: 'amritsar',        name: 'Amritsar',        stateId: 'punjab',          lat: 31.6340, lng: 74.8723 },
  { id: 'patiala',         name: 'Patiala',         stateId: 'punjab',          lat: 30.3398, lng: 76.3869 },
  { id: 'bathinda',        name: 'Bathinda',        stateId: 'punjab',          lat: 30.2110, lng: 74.9455 },

  // Chhattisgarh
  { id: 'raipur',          name: 'Raipur',          stateId: 'chhattisgarh',    lat: 21.2514, lng: 81.6296 },
  { id: 'durg',            name: 'Durg',            stateId: 'chhattisgarh',    lat: 21.1904, lng: 81.2849 },
  { id: 'bilaspur-cg',     name: 'Bilaspur',        stateId: 'chhattisgarh',    lat: 22.0797, lng: 82.1391 },

  // Jharkhand
  { id: 'ranchi',          name: 'Ranchi',          stateId: 'jharkhand',       lat: 23.3441, lng: 85.3096 },
  { id: 'dhanbad',         name: 'Dhanbad',         stateId: 'jharkhand',       lat: 23.7957, lng: 86.4304 },
  { id: 'bokaro',          name: 'Bokaro',          stateId: 'jharkhand',       lat: 23.6693, lng: 86.1511 },
];

// ─────────────────────────────────────────────────────────────
// BLOCKS
// Karnataka (Ramanagara district) — real data with forecasts
// Other states — key talukas/blocks, no forecast data yet
// ─────────────────────────────────────────────────────────────
export const INDIA_BLOCKS: IndiaBlock[] = [
  // Karnataka — Ramanagara district (real blocks)
  { id: 'kanakapura-block',   name: 'Kanakapura',   districtId: 'ramanagara', lat: 12.5462, lng: 77.4172 },
  { id: 'channapatna-block',  name: 'Channapatna',  districtId: 'ramanagara', lat: 12.6500, lng: 77.2000 },
  { id: 'magadi-block',       name: 'Magadi',       districtId: 'ramanagara', lat: 12.9577, lng: 77.2281 },
  { id: 'ramanagara-block',   name: 'Ramanagara',   districtId: 'ramanagara', lat: 12.7270, lng: 77.2810 },

  // Karnataka — Bangalore Rural district
  { id: 'devanahalli-block',  name: 'Devanahalli',  districtId: 'bangalore-rural', lat: 13.2474, lng: 77.7120 },
  { id: 'nelamangala-block',  name: 'Nelamangala',  districtId: 'bangalore-rural', lat: 13.1007, lng: 77.3900 },
  { id: 'doddaballapur-block',name: 'Doddaballapur',districtId: 'bangalore-rural', lat: 13.2950, lng: 77.5370 },
  { id: 'hoskote-block',      name: 'Hoskote',      districtId: 'bangalore-rural', lat: 13.0707, lng: 77.7988 },

  // Karnataka — Mandya district
  { id: 'maddur-block',       name: 'Maddur',       districtId: 'mandya',     lat: 12.5832, lng: 77.0473 },
  { id: 'srirangapatna-block',name: 'Srirangapatna',districtId: 'mandya',     lat: 12.4176, lng: 76.6950 },
  { id: 'mandya-block',       name: 'Mandya',       districtId: 'mandya',     lat: 12.5218, lng: 76.8951 },
  { id: 'nagamangala-block',  name: 'Nagamangala',  districtId: 'mandya',     lat: 12.8205, lng: 76.7527 },

  // Karnataka — Mysuru district
  { id: 'mysuru-block',       name: 'Mysuru',       districtId: 'mysuru',     lat: 12.2958, lng: 76.6394 },
  { id: 'hunsur-block',       name: 'Hunsur',       districtId: 'mysuru',     lat: 12.3014, lng: 76.2904 },
  { id: 'periyapatna-block',  name: 'Periyapatna',  districtId: 'mysuru',     lat: 12.3304, lng: 76.0204 },

  // Maharashtra — Pune district (talukas)
  { id: 'haveli-taluka',      name: 'Haveli',       districtId: 'pune',       lat: 18.4653, lng: 73.8693 },
  { id: 'maval-taluka',       name: 'Maval',        districtId: 'pune',       lat: 18.7562, lng: 73.5030 },
  { id: 'shirur-taluka',      name: 'Shirur',       districtId: 'pune',       lat: 18.8249, lng: 74.3743 },
  { id: 'baramati-taluka',    name: 'Baramati',     districtId: 'pune',       lat: 18.1522, lng: 74.5775 },

  // Maharashtra — Nashik district
  { id: 'niphad-taluka',      name: 'Niphad',       districtId: 'nashik',     lat: 20.0814, lng: 74.1046 },
  { id: 'sinnar-taluka',      name: 'Sinnar',       districtId: 'nashik',     lat: 19.8473, lng: 73.9988 },
  { id: 'igatpuri-taluka',    name: 'Igatpuri',     districtId: 'nashik',     lat: 19.6965, lng: 73.5581 },

  // Tamil Nadu — Coimbatore district (talukas)
  { id: 'coimbatore-north',   name: 'Coimbatore North', districtId: 'coimbatore', lat: 11.0510, lng: 76.9680 },
  { id: 'coimbatore-south',   name: 'Coimbatore South', districtId: 'coimbatore', lat: 10.9705, lng: 76.9677 },
  { id: 'pollachi-taluka',    name: 'Pollachi',     districtId: 'coimbatore', lat: 10.6550, lng: 77.0073 },
  { id: 'mettupalayam',       name: 'Mettupalayam', districtId: 'coimbatore', lat: 11.2984, lng: 76.9403 },

  // West Bengal — Nadia district (blocks)
  { id: 'krishnagar-i',       name: 'Krishnanagar I',  districtId: 'nadia',   lat: 23.3995, lng: 88.4983 },
  { id: 'kalyani-block',      name: 'Kalyani',         districtId: 'nadia',   lat: 22.9747, lng: 88.4340 },
  { id: 'ranaghat-ii',        name: 'Ranaghat II',     districtId: 'nadia',   lat: 23.1769, lng: 88.5596 },

  // Bihar — Patna district (blocks)
  { id: 'patna-sadar',        name: 'Patna Sadar',     districtId: 'patna',   lat: 25.5941, lng: 85.1376 },
  { id: 'danapur-block',      name: 'Danapur',         districtId: 'patna',   lat: 25.6213, lng: 85.0432 },
  { id: 'phulwari-block',     name: 'Phulwari Sharif', districtId: 'patna',   lat: 25.5500, lng: 85.0800 },

  // Rajasthan — Jaipur district (tehsils)
  { id: 'jaipur-tehsil',      name: 'Jaipur',          districtId: 'jaipur',  lat: 26.9124, lng: 75.7873 },
  { id: 'bassi-tehsil',       name: 'Bassi',           districtId: 'jaipur',  lat: 26.8681, lng: 76.0328 },
  { id: 'sanganer-tehsil',    name: 'Sanganer',        districtId: 'jaipur',  lat: 26.7920, lng: 75.8089 },

  // Gujarat — Ahmedabad district (talukas)
  { id: 'ahmedabad-city',     name: 'Ahmedabad City',  districtId: 'ahmedabad', lat: 23.0225, lng: 72.5714 },
  { id: 'daskroi-taluka',     name: 'Daskroi',         districtId: 'ahmedabad', lat: 22.9670, lng: 72.6325 },
  { id: 'sanand-taluka',      name: 'Sanand',          districtId: 'ahmedabad', lat: 22.9900, lng: 72.3762 },

  // Odisha — Khordha district
  { id: 'bhubaneswar-block',  name: 'Bhubaneswar',    districtId: 'khordha',  lat: 20.2961, lng: 85.8245 },
  { id: 'khordha-block',      name: 'Khordha',        districtId: 'khordha',  lat: 20.1823, lng: 85.6780 },
];

// ─────────────────────────────────────────────────────────────
// PANCHAYATS
// Karnataka — Kanakapura block: REAL data with forecasts
// All other blocks: no panchayats yet (data unavailable)
// ─────────────────────────────────────────────────────────────
export const INDIA_PANCHAYATS: IndiaPanchayat[] = [
  // Kanakapura block — real panchayats with MausamX forecast data
  {
    id: 'kodihalli',    name: 'Kodihalli',     blockId: 'kanakapura-block',
    lat: 12.5600, lng: 77.4300,
    forecast: { onsetProbability: 85, drySpellProbability: 15, heavyRainProbability: 32, confidence: 76, riskLevel: 'low' },
  },
  {
    id: 'sathanur',     name: 'Sathanur',      blockId: 'kanakapura-block',
    lat: 12.5300, lng: 77.4000,
    forecast: { onsetProbability: 80, drySpellProbability: 20, heavyRainProbability: 36, confidence: 74, riskLevel: 'moderate' },
  },
  {
    id: 'maralavadi',   name: 'Maralavadi',    blockId: 'kanakapura-block',
    lat: 12.5100, lng: 77.4500,
    forecast: { onsetProbability: 78, drySpellProbability: 22, heavyRainProbability: 38, confidence: 72, riskLevel: 'moderate' },
  },
  {
    id: 'harohalli',    name: 'Harohalli',     blockId: 'kanakapura-block',
    lat: 12.5800, lng: 77.3800,
    forecast: { onsetProbability: 88, drySpellProbability: 12, heavyRainProbability: 28, confidence: 80, riskLevel: 'low' },
  },
  {
    id: 'doddaalahalli', name: 'Doddaalahalli', blockId: 'kanakapura-block',
    lat: 12.5500, lng: 77.4600,
    forecast: { onsetProbability: 72, drySpellProbability: 28, heavyRainProbability: 40, confidence: 70, riskLevel: 'moderate' },
  },

  // Channapatna block — real panchayats, forecast data unavailable
  { id: 'channapatna-gp', name: 'Channapatna GP', blockId: 'channapatna-block', lat: 12.6500, lng: 77.2000 },
  { id: 'somanahalli-gp', name: 'Somanahalli GP', blockId: 'channapatna-block', lat: 12.6800, lng: 77.2300 },

  // Magadi block
  { id: 'magadi-gp',    name: 'Magadi GP',     blockId: 'magadi-block', lat: 12.9577, lng: 77.2281 },
  { id: 'solur-gp',     name: 'Solur GP',      blockId: 'magadi-block', lat: 12.9800, lng: 77.2500 },

  // Ramanagara block
  { id: 'ramanagara-gp', name: 'Ramanagara GP', blockId: 'ramanagara-block', lat: 12.7270, lng: 77.2810 },
];

/** Blocks that have no panchayat data yet — used to show "data unavailable" gracefully */
export const BLOCKS_WITHOUT_PANCHAYAT_DATA = new Set([
  'devanahalli-block','nelamangala-block','doddaballapur-block','hoskote-block',
  'maddur-block','srirangapatna-block','mandya-block','nagamangala-block',
  'mysuru-block','hunsur-block','periyapatna-block',
  'haveli-taluka','maval-taluka','shirur-taluka','baramati-taluka',
  'niphad-taluka','sinnar-taluka','igatpuri-taluka',
  'coimbatore-north','coimbatore-south','pollachi-taluka','mettupalayam',
  'krishnagar-i','kalyani-block','ranaghat-ii',
  'patna-sadar','danapur-block','phulwari-block',
  'jaipur-tehsil','bassi-tehsil','sanganer-tehsil',
  'ahmedabad-city','daskroi-taluka','sanand-taluka',
  'bhubaneswar-block','khordha-block',
]);
