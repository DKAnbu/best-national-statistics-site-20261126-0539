# Satu Data Statistik Indonesia — National Statistics Portal

Official national statistical portal of the Republic of Indonesia. Features certified, evidence-based economic, demographic, trade, and provincial indicators published by Badan Pusat Statistik (BPS), Bank Indonesia, and the Ministry of Finance.

[![Make.fun Competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Make.fun Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/DKAnbu/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Make.fun Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/DKAnbu/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

## Overview & Verified Indicators

- **Official Sovereign Authority:** Republic of Indonesia (IDN)
- **Primary Data Custodian:** Badan Pusat Statistik (BPS - Statistics Indonesia)
- **Monetary & Balance of Payments:** Bank Indonesia (BI)
- **Zero Third-Party Call Policy:** All data, chart engines, styling, and typography run 100% locally from static vanilla ES modules.

### Key National Indicators (2024 Release)
- **Nominal GDP:** Rp 21,950 Trillion (~$1.37 Trillion USD)
- **Real GDP Growth (Q3 2024):** 4.95% y-on-y
- **Headline Inflation (CPI):** 1.71% y-on-y (October 2024)
- **Total Population:** 281.60 Million (BPS Projections)
- **Open Unemployment Rate:** 4.91% (August 2024)
- **National Poverty Rate:** 9.03% (March 2024, lowest post-pandemic)
- **Human Development Index (HDI):** 74.39 (High category)
- **Trade Balance Surplus:** Cumulative $27.4 Billion (54 consecutive months of surplus)
- **Foreign Exchange Reserves:** $151.2 Billion (October 2024)

## Architecture

- `app/index.html`: Semantic entrypoint and accessibility-ready viewport.
- `app/main.js`: Hash-based client router and event handlers.
- `app/views.js`: Modular view layouts and pure HTML5 canvas charting engine.
- `app/data.js`: Verified statistical dataset compiled from official BRS releases.
- `app/style.css`: Responsive design system (Desktop and Mobile viewport optimized).
- `vendor/makefun-frontend.ts`: Verified official make.fun dossier protocol module.
- `main.ts`: Node 22 stdlib dossier builder producing `/output/dossier.json`.

## Local Development & Testing

Run the dev server:
```bash
node serve.ts
```
Visit http://localhost:8080 to test in browser.

Generate submission dossier:
```bash
MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License
MIT License.
