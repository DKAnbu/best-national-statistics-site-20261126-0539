// National Statistics Portal of Indonesia (Satu Data Statistik Nasional)
// Verified 2023-2025 data compiled from Badan Pusat Statistik (BPS), Bank Indonesia (BI), and World Bank.
// v1.1 update: Revised FY 2024 nominal GDP (BPS BRS No. 17/02/Th. XXVIII, 5 Feb 2025), Oct 2024 Trade (BPS BRS No. 80/11/Th. XXVII, 15 Nov 2024), and 2024 Provincial HDI (BPS IPM 2024).

export const METADATA = {
  country: "Republic of Indonesia",
  country_id: "IDN",
  capital: "Jakarta / Nusantara",
  currency: "Indonesian Rupiah (IDR)",
  official_agency: "Badan Pusat Statistik (BPS - Statistics Indonesia)",
  last_updated: "February 2025",
  sources: [
    { name: "Badan Pusat Statistik (BPS)", role: "National Statistics Agency", release: "Berita Resmi Statistik (BRS) 2024-2025" },
    { name: "Bank Indonesia (BI)", role: "Central Bank", release: "Laporan Perekonomian Indonesia 2024" },
    { name: "World Bank / IMF", role: "Multilateral Economic Monitoring", release: "Indonesia Economic Prospects 2024" }
  ]
};

export const MACRO_KPI = [
  { id: "gdp", label: "Nominal GDP (2024)", value: "Rp 22,139 T", usd: "$1.40 Trillion", change: "+5.03%", changeType: "positive", period: "FY 2024", source: "BPS BRS No. 17/02/Th. XXVIII" },
  { id: "gdp_growth", label: "GDP Growth (Q3 2024)", value: "4.95%", baseline: "5.05% Q2 2024", change: "-0.10% pts", changeType: "neutral", period: "Q3 2024 y-on-y", source: "BPS BRS No. 81/11/Th. XXVII" },
  { id: "inflation", label: "Headline Inflation (CPI)", value: "1.71%", baseline: "Target 2.5±1%", change: "-0.85% yoy", changeType: "positive", period: "Oct 2024 y-on-y", source: "BPS BRS No. 79/11/Th. XXVII" },
  { id: "population", label: "Total Population", value: "281.60 M", baseline: "278.70 M in 2023", change: "+1.04%/yr", changeType: "neutral", period: "Mid-2024 Projected", source: "BPS Sensus & Proyeksi 2020-2035" },
  { id: "unemployment", label: "Open Unemployment Rate", value: "4.91%", baseline: "5.32% in Aug 2023", change: "-0.41% pts", changeType: "positive", period: "August 2024", source: "BPS Ketenagakerjaan Ags 2024" },
  { id: "poverty", label: "National Poverty Rate", value: "9.03%", baseline: "9.36% in Mar 2023", change: "-0.33% pts", changeType: "positive", period: "March 2024", source: "BPS Kemiskinan Maret 2024" },
  { id: "hdi", label: "Human Dev Index (IPM)", value: "75.02", baseline: "74.39 in 2023", change: "+0.63 pts", changeType: "positive", period: "2024 High Category", source: "BPS Indeks Pembangunan Manusia 2024" },
  { id: "trade_balance", label: "Trade Balance Surplus", value: "$2.48 B", baseline: "Surplus 54 months", change: "-$0.75 B", changeType: "neutral", period: "October 2024", source: "BPS Perdagangan Luar Negeri 2024" },
  { id: "foreign_reserves", label: "Foreign Exchange Reserves", value: "$151.2 B", baseline: "$149.9 B in Aug 2024", change: "+$1.3 B", changeType: "positive", period: "End-October 2024", source: "Bank Indonesia Posisi Cadangan Devisa" }
];

export const GDP_TRENDS = [
  { year: 2018, gdp_trillion_idr: 14838.8, growth_pct: 5.17, gdp_per_capita_usd: 3894 },
  { year: 2019, gdp_trillion_idr: 15832.7, growth_pct: 5.02, gdp_per_capita_usd: 4136 },
  { year: 2020, gdp_trillion_idr: 15443.3, growth_pct: -2.07, gdp_per_capita_usd: 3912 },
  { year: 2021, gdp_trillion_idr: 16976.7, growth_pct: 3.70, gdp_per_capita_usd: 4351 },
  { year: 2022, gdp_trillion_idr: 19588.4, growth_pct: 5.31, gdp_per_capita_usd: 4784 },
  { year: 2023, gdp_trillion_idr: 20892.4, growth_pct: 5.05, gdp_per_capita_usd: 4919 },
  { year: 2024, gdp_trillion_idr: 22139.0, growth_pct: 5.03, gdp_per_capita_usd: 4960 }
];

export const GDP_BY_SECTOR = [
  { sector: "Manufacturing (Industri Pengolahan)", share_pct: 18.67, growth_pct: 4.64, color: "#2563eb" },
  { sector: "Agriculture, Forestry, Fisheries", share_pct: 12.48, growth_pct: 1.45, color: "#16a34a" },
  { sector: "Wholesale & Retail Trade", share_pct: 12.94, growth_pct: 4.82, color: "#d97706" },
  { sector: "Construction (Konstruksi)", share_pct: 9.92, growth_pct: 6.85, color: "#7c3aed" },
  { sector: "Mining & Quarrying (Pertambangan)", share_pct: 10.15, growth_pct: 6.42, color: "#ea580c" },
  { sector: "Transportation & Storage", share_pct: 5.86, growth_pct: 8.64, color: "#0891b2" },
  { sector: "Information & Communication", share_pct: 4.25, growth_pct: 7.95, color: "#4f46e5" },
  { sector: "Financial & Insurance Services", share_pct: 4.10, growth_pct: 5.88, color: "#059669" },
  { sector: "Others / Public Services", share_pct: 21.63, growth_pct: 5.12, color: "#64748b" }
];

export const INFLATION_MONTHLY_2024 = [
  { month: "Jan 2024", yoy: 2.57, mom: 0.04 },
  { month: "Feb 2024", yoy: 2.75, mom: 0.37 },
  { month: "Mar 2024", yoy: 3.05, mom: 0.52 },
  { month: "Apr 2024", yoy: 3.00, mom: 0.25 },
  { month: "May 2024", yoy: 2.84, mom: -0.03 },
  { month: "Jun 2024", yoy: 2.51, mom: -0.08 },
  { month: "Jul 2024", yoy: 2.13, mom: -0.18 },
  { month: "Aug 2024", yoy: 2.12, mom: -0.03 },
  { month: "Sep 2024", yoy: 1.84, mom: -0.12 },
  { month: "Oct 2024", yoy: 1.71, mom: 0.08 }
];

export const TRADE_DATA = {
  summary: { total_export_usd_b: 217.24, total_import_usd_b: 192.81, surplus_usd_b: 24.43, period: "Cumulative Jan-Oct 2024" },
  major_exports: [
    { commodity: "Coal & Solid Mineral Fuels", value_usd_b: 34.6, share_pct: 15.9 },
    { commodity: "Palm Oil & Derivatives (CPO)", value_usd_b: 21.4, share_pct: 9.9 },
    { commodity: "Iron & Steel (Ferronickel, etc.)", value_usd_b: 24.8, share_pct: 11.4 },
    { commodity: "Electrical Machinery & Electronics", value_usd_b: 14.1, share_pct: 6.5 },
    { commodity: "Automotive Vehicles & Parts", value_usd_b: 9.8, share_pct: 4.5 },
    { commodity: "Textiles & Footwear", value_usd_b: 12.3, share_pct: 5.7 }
  ],
  trade_partners: [
    { country: "China", export_usd_b: 54.2, import_usd_b: 52.8, balance_usd_b: 1.4 },
    { country: "United States", export_usd_b: 22.4, import_usd_b: 9.2, balance_usd_b: 13.2 },
    { country: "Japan", export_usd_b: 17.8, import_usd_b: 14.5, balance_usd_b: 3.3 },
    { country: "India", export_usd_b: 18.2, import_usd_b: 6.1, balance_usd_b: 12.1 },
    { country: "ASEAN (Collective)", export_usd_b: 46.5, import_usd_b: 41.2, balance_usd_b: 5.3 },
    { country: "European Union", export_usd_b: 15.6, import_usd_b: 12.8, balance_usd_b: 2.8 }
  ]
};

export const DEMOGRAPHICS_PYRAMID = [
  { age: "0-4", male_m: 11.2, female_m: 10.7 },
  { age: "5-9", male_m: 11.6, female_m: 11.1 },
  { age: "10-14", male_m: 11.8, female_m: 11.3 },
  { age: "15-19", male_m: 11.5, female_m: 11.0 },
  { age: "20-24", male_m: 11.3, female_m: 10.9 },
  { age: "25-29", male_m: 11.1, female_m: 10.8 },
  { age: "30-34", male_m: 10.8, female_m: 10.6 },
  { age: "35-39", male_m: 10.3, female_m: 10.2 },
  { age: "40-44", male_m: 9.7, female_m: 9.6 },
  { age: "45-49", male_m: 8.8, female_m: 8.9 },
  { age: "50-54", male_m: 7.9, female_m: 8.1 },
  { age: "55-59", male_m: 6.7, female_m: 7.0 },
  { age: "60-64", male_m: 5.3, female_m: 5.7 },
  { age: "65-69", male_m: 3.8, female_m: 4.2 },
  { age: "70+", male_m: 4.2, female_m: 5.2 }
];

export const PROVINCES_DATA = [
  { code: "11", name: "Aceh", region: "Sumatra", capital: "Banda Aceh", population: 5511000, gdp_per_capita_idr: 40250000, hdi: 75.36, poverty_pct: 14.45, unemployment_pct: 5.75 },
  { code: "12", name: "Sumatera Utara", region: "Sumatra", capital: "Medan", population: 15471000, gdp_per_capita_idr: 66820000, hdi: 75.76, poverty_pct: 7.99, unemployment_pct: 5.89 },
  { code: "13", name: "Sumatera Barat", region: "Sumatra", capital: "Padang", population: 5750000, gdp_per_capita_idr: 54100000, hdi: 76.43, poverty_pct: 5.95, unemployment_pct: 5.90 },
  { code: "14", name: "Riau", region: "Sumatra", capital: "Pekanbaru", population: 6642000, gdp_per_capita_idr: 149200000, hdi: 75.67, poverty_pct: 6.67, unemployment_pct: 4.23 },
  { code: "15", name: "Jambi", region: "Sumatra", capital: "Jambi", population: 3678000, gdp_per_capita_idr: 77950000, hdi: 74.36, poverty_pct: 7.58, unemployment_pct: 4.51 },
  { code: "16", name: "Sumatera Selatan", region: "Sumatra", capital: "Palembang", population: 8855000, gdp_per_capita_idr: 68400000, hdi: 73.84, poverty_pct: 11.78, unemployment_pct: 4.11 },
  { code: "17", name: "Bengkulu", region: "Sumatra", capital: "Bengkulu", population: 2060000, gdp_per_capita_idr: 48900000, hdi: 74.91, poverty_pct: 14.04, unemployment_pct: 3.42 },
  { code: "18", name: "Lampung", region: "Sumatra", capital: "Bandar Lampung", population: 9314000, gdp_per_capita_idr: 49750000, hdi: 73.13, poverty_pct: 11.11, unemployment_pct: 4.23 },
  { code: "19", name: "Kep. Bangka Belitung", region: "Sumatra", capital: "Pangkal Pinang", population: 1517000, gdp_per_capita_idr: 65120000, hdi: 74.55, poverty_pct: 4.67, unemployment_pct: 4.56 },
  { code: "21", name: "Kepulauan Riau", region: "Sumatra", capital: "Tanjung Pinang", population: 2179000, gdp_per_capita_idr: 151400000, hdi: 79.89, poverty_pct: 5.37, unemployment_pct: 6.80 },
  { code: "31", name: "DKI Jakarta", region: "Java", capital: "Jakarta", population: 10672000, gdp_per_capita_idr: 322400000, hdi: 84.15, poverty_pct: 4.30, unemployment_pct: 6.21 },
  { code: "32", name: "Jawa Barat", region: "Java", capital: "Bandung", population: 50345000, gdp_per_capita_idr: 52140000, hdi: 74.92, poverty_pct: 7.21, unemployment_pct: 6.75 },
  { code: "33", name: "Jawa Tengah", region: "Java", capital: "Semarang", population: 37540000, gdp_per_capita_idr: 44250000, hdi: 73.87, poverty_pct: 10.47, unemployment_pct: 4.78 },
  { code: "34", name: "DI Yogyakarta", region: "Java", capital: "Yogyakarta", population: 3762000, gdp_per_capita_idr: 47850000, hdi: 81.62, poverty_pct: 10.83, unemployment_pct: 3.48 },
  { code: "35", name: "Jawa Timur", region: "Java", capital: "Surabaya", population: 41416000, gdp_per_capita_idr: 74580000, hdi: 75.35, poverty_pct: 9.79, unemployment_pct: 4.19 },
  { code: "36", name: "Banten", region: "Java", capital: "Serang", population: 12423000, gdp_per_capita_idr: 67100000, hdi: 76.35, poverty_pct: 5.84, unemployment_pct: 7.02 },
  { code: "51", name: "Bali", region: "Bali & Nusa Tenggara", capital: "Denpasar", population: 4414000, gdp_per_capita_idr: 62450000, hdi: 78.63, poverty_pct: 4.00, unemployment_pct: 2.69 },
  { code: "52", name: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara", capital: "Mataram", population: 5560000, gdp_per_capita_idr: 31200000, hdi: 73.10, poverty_pct: 12.91, unemployment_pct: 3.30 },
  { code: "53", name: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", capital: "Kupang", population: 5541000, gdp_per_capita_idr: 23150000, hdi: 69.14, poverty_pct: 19.48, unemployment_pct: 3.14 },
  { code: "61", name: "Kalimantan Barat", region: "Kalimantan", capital: "Pontianak", population: 5545000, gdp_per_capita_idr: 51200000, hdi: 71.19, poverty_pct: 6.71, unemployment_pct: 5.05 },
  { code: "62", name: "Kalimantan Tengah", region: "Kalimantan", capital: "Palangka Raya", population: 2773000, gdp_per_capita_idr: 76800000, hdi: 74.28, poverty_pct: 5.17, unemployment_pct: 4.10 },
  { code: "63", name: "Kalimantan Selatan", region: "Kalimantan", capital: "Banjarmasin", population: 4230000, gdp_per_capita_idr: 64150000, hdi: 75.19, poverty_pct: 4.11, unemployment_pct: 3.81 },
  { code: "64", name: "Kalimantan Timur", region: "Kalimantan", capital: "Samarinda", population: 4007000, gdp_per_capita_idr: 215400000, hdi: 78.79, poverty_pct: 5.78, unemployment_pct: 5.14 },
  { code: "65", name: "Kalimantan Utara", region: "Kalimantan", capital: "Tanjung Selor", population: 746000, gdp_per_capita_idr: 182100000, hdi: 73.41, poverty_pct: 6.32, unemployment_pct: 4.01 },
  { code: "71", name: "Sulawesi Utara", region: "Sulawesi", capital: "Manado", population: 2681000, gdp_per_capita_idr: 64200000, hdi: 75.68, poverty_pct: 7.00, unemployment_pct: 6.10 },
  { code: "72", name: "Sulawesi Tengah", region: "Sulawesi", capital: "Palu", population: 3122000, gdp_per_capita_idr: 104500000, hdi: 72.24, poverty_pct: 11.77, unemployment_pct: 3.15 },
  { code: "73", name: "Sulawesi Selatan", region: "Sulawesi", capital: "Makassar", population: 9362000, gdp_per_capita_idr: 71400000, hdi: 75.18, poverty_pct: 8.06, unemployment_pct: 4.98 },
  { code: "74", name: "Sulawesi Tenggara", region: "Sulawesi", capital: "Kendari", population: 2755000, gdp_per_capita_idr: 68900000, hdi: 73.62, poverty_pct: 11.20, unemployment_pct: 3.15 },
  { code: "75", name: "Gorontalo", region: "Sulawesi", capital: "Gorontalo", population: 1225000, gdp_per_capita_idr: 44800000, hdi: 72.01, poverty_pct: 14.57, unemployment_pct: 3.06 },
  { code: "76", name: "Sulawesi Barat", region: "Sulawesi", capital: "Mamuju", population: 1481000, gdp_per_capita_idr: 41200000, hdi: 70.46, poverty_pct: 11.21, unemployment_pct: 3.02 },
  { code: "81", name: "Maluku", region: "Maluku & Papua", capital: "Ambon", population: 1920000, gdp_per_capita_idr: 32400000, hdi: 73.40, poverty_pct: 16.05, unemployment_pct: 6.08 },
  { code: "82", name: "Maluku Utara", region: "Maluku & Papua", capital: "Sofifi", population: 1353000, gdp_per_capita_idr: 89400000, hdi: 71.84, poverty_pct: 6.32, unemployment_pct: 4.31 },
  { code: "91", name: "Papua", region: "Maluku & Papua", capital: "Jayapura", population: 1075000, gdp_per_capita_idr: 96100000, hdi: 73.83, poverty_pct: 26.03, unemployment_pct: 3.25 },
  { code: "92", name: "Papua Barat", region: "Maluku & Papua", capital: "Manokwari", population: 569000, gdp_per_capita_idr: 120500000, hdi: 67.69, poverty_pct: 20.49, unemployment_pct: 5.38 },
  { code: "93", name: "Papua Selatan", region: "Maluku & Papua", capital: "Merauke", population: 538000, gdp_per_capita_idr: 48900000, hdi: 68.86, poverty_pct: 24.38, unemployment_pct: 2.85 },
  { code: "94", name: "Papua Tengah", region: "Maluku & Papua", capital: "Nabire", population: 1452000, gdp_per_capita_idr: 45200000, hdi: 60.25, poverty_pct: 31.02, unemployment_pct: 2.10 },
  { code: "95", name: "Papua Pegunungan", region: "Maluku & Papua", capital: "Jayawijaya", population: 1461000, gdp_per_capita_idr: 31400000, hdi: 54.43, poverty_pct: 32.98, unemployment_pct: 1.82 },
  { code: "96", name: "Papua Barat Daya", region: "Maluku & Papua", capital: "Sorong", population: 622000, gdp_per_capita_idr: 78500000, hdi: 69.65, poverty_pct: 18.13, unemployment_pct: 5.92 }
];
