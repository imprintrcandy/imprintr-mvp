
export const PH_REGIONS = [
  "NCR",
  "CAR",
  "Ilocos Region",
  "Cagayan Valley", 
  "Central Luzon",
  "CALABARZON",
  "MIMAROPA",
  "Bicol Region",
  "Western Visayas",
  "Central Visayas",
  "Eastern Visayas",
  "Zamboanga Peninsula",
  "Northern Mindanao",
  "Davao Region",
  "SOCCSKSARGEN",
  "Caraga",
  "Bangsamoro"
] as const;

export const REGION_PROVINCES: Record<string, string[]> = {
  "NCR": [
    "Metro Manila"
  ],
  "CAR": [
    "Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province"
  ],
  "Ilocos Region": [
    "Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"
  ],
  "Cagayan Valley": [
    "Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"
  ],
  "Central Luzon": [
    "Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"
  ],
  "CALABARZON": [
    "Batangas", "Cavite", "Laguna", "Quezon", "Rizal"
  ],
  "MIMAROPA": [
    "Marinduque", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Romblon"
  ],
  "Bicol Region": [
    "Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"
  ],
  "Western Visayas": [
    "Aklan", "Antique", "Capiz", "Guimaras", "Iloilo", "Negros Occidental"
  ],
  "Central Visayas": [
    "Bohol", "Cebu", "Negros Oriental", "Siquijor"
  ],
  "Eastern Visayas": [
    "Biliran", "Eastern Samar", "Leyte", "Northern Samar", "Samar", "Southern Leyte"
  ],
  "Zamboanga Peninsula": [
    "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"
  ],
  "Northern Mindanao": [
    "Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental"
  ],
  "Davao Region": [
    "Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental"
  ],
  "SOCCSKSARGEN": [
    "Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat"
  ],
  "Caraga": [
    "Agusan del Norte", "Agusan del Sur", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur"
  ],
  "Bangsamoro": [
    "Basilan", "Lanao del Sur", "Maguindanao del Norte", "Maguindanao del Sur", "Sulu", "Tawi-Tawi"
  ]
};

export type PhilippinesRegion = typeof PH_REGIONS[number];
