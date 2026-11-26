// View Rendering and Pure Canvas Data Visualizations
import {
  METADATA,
  MACRO_KPI,
  GDP_TRENDS,
  GDP_BY_SECTOR,
  INFLATION_MONTHLY_2024,
  TRADE_DATA,
  DEMOGRAPHICS_PYRAMID,
  PROVINCES_DATA
} from './data.js';

// Formatters
export const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);
export const formatCurrencyIDR = (num) => `Rp ${formatNumber(num)}`;
export const formatPercent = (num) => `${num.toFixed(2)}%`;

// Pure Canvas Charting Engine (Zero external dependencies)
export function drawLineChart(canvas, labels, values, options = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = (options.height || 300) * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = options.height || 300;
  const padding = { top: 30, right: 30, bottom: 45, left: 60 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  ctx.clearRect(0, 0, w, h);

  const minVal = options.min !== undefined ? options.min : Math.min(...values) * 0.95;
  const maxVal = options.max !== undefined ? options.max : Math.max(...values) * 1.05;
  const range = maxVal - minVal || 1;

  // Draw background subtle card canvas glow
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  // Draw grid & Y-axis labels
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';

  const gridSteps = 4;
  for (let i = 0; i <= gridSteps; i++) {
    const val = minVal + (range * i) / gridSteps;
    const y = padding.top + chartH - (chartH * i) / gridSteps;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();
    ctx.fillText(options.formatY ? options.formatY(val) : val.toFixed(1), padding.left - 8, y + 4);
  }

  // Draw line & area fill
  const pts = values.map((v, i) => {
    const x = padding.left + (chartW * i) / (values.length - 1);
    const y = padding.top + chartH - ((v - minVal) / range) * chartH;
    return { x, y, v, label: labels[i] };
  });

  // Area gradient
  const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
  grad.addColorStop(0, options.areaColor || 'rgba(2, 132, 199, 0.25)');
  grad.addColorStop(1, 'rgba(2, 132, 199, 0.0)');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, padding.top + chartH);
  pts.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length - 1].x, padding.top + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  pts.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.strokeStyle = options.lineColor || '#0284c7';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Points & X labels
  ctx.textAlign = 'center';
  pts.forEach((p) => {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = options.lineColor || '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Value on top
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(options.formatVal ? options.formatVal(p.v) : p.v, p.x, p.y - 9);

    // Label below
    ctx.fillStyle = '#64748b';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(p.label, p.x, h - padding.bottom + 18);
  });
}

export function drawBarChart(canvas, labels, values, options = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = (options.height || 300) * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = options.height || 300;
  const padding = { top: 25, right: 25, bottom: 45, left: options.leftPad || 65 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  ctx.clearRect(0, 0, w, h);

  const maxVal = Math.max(...values, 0) * 1.15 || 10;
  const minVal = Math.min(...values, 0);

  // Y-axis grid
  ctx.strokeStyle = '#f1f5f9';
  ctx.fillStyle = '#64748b';
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';

  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const val = (maxVal * i) / steps;
    const y = padding.top + chartH - (chartH * i) / steps;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();
    ctx.fillText(options.formatY ? options.formatY(val) : val.toFixed(1), padding.left - 8, y + 4);
  }

  const barCount = values.length;
  const totalBarSpace = chartW / barCount;
  const barWidth = Math.min(totalBarSpace * 0.65, 45);

  labels.forEach((lbl, i) => {
    const v = values[i];
    const barH = (v / maxVal) * chartH;
    const x = padding.left + i * totalBarSpace + (totalBarSpace - barWidth) / 2;
    const y = padding.top + chartH - barH;

    ctx.fillStyle = options.barColors ? options.barColors[i % options.barColors.length] : '#0284c7';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]) : ctx.rect(x, y, barWidth, barH);
    ctx.fill();

    // Value label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.formatVal ? options.formatVal(v) : v, x + barWidth / 2, y - 6);

    // X label
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText(lbl, x + barWidth / 2, h - padding.bottom + 18);
  });
}

export function drawDonutChart(canvas, items) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 280 * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = 280;
  ctx.clearRect(0, 0, w, h);

  const cx = w * 0.35;
  const cy = h * 0.5;
  const r = Math.min(cx, cy) - 25;
  const innerR = r * 0.6;

  let startAngle = -Math.PI / 2;
  const total = items.reduce((acc, it) => acc + it.share_pct, 0);

  items.forEach((it) => {
    const sliceAngle = (it.share_pct / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = it.color || '#3b82f6';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    startAngle += sliceAngle;
  });

  // Center text
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GDP Sector', cx, cy - 3);
  ctx.fillStyle = '#64748b';
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText('Distribution', cx, cy + 14);

  // Legend on right
  const legendX = cx + r + 30;
  let legendY = 35;
  ctx.textAlign = 'left';
  items.slice(0, 7).forEach((it) => {
    ctx.fillStyle = it.color;
    ctx.fillRect(legendX, legendY - 9, 10, 10);
    ctx.fillStyle = '#1e293b';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(`${it.share_pct}% ${it.sector.split('(')[0].trim()}`, legendX + 16, legendY);
    legendY += 28;
  });
}

export function drawDemographicPyramid(canvas, pyramidData) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 360 * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = 360;
  const pad = { top: 30, right: 30, bottom: 30, left: 30 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const cx = pad.left + chartW / 2;

  ctx.clearRect(0, 0, w, h);

  const maxPop = 14; // in millions
  const rowCount = pyramidData.length;
  const rowH = chartH / rowCount;
  const halfW = (chartW - 70) / 2;

  // Header Legend
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#0284c7';
  ctx.fillText('◄ Male Population (M)', cx - 40, pad.top - 12);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ec4899';
  ctx.fillText('Female Population (M) ►', cx + 40, pad.top - 12);

  pyramidData.forEach((d, i) => {
    const y = pad.top + i * rowH;
    const bH = rowH * 0.72;

    // Male bar (left)
    const mW = (d.male_m / maxPop) * halfW;
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(cx - 30 - mW, y, mW, bH);

    // Female bar (right)
    const fW = (d.female_m / maxPop) * halfW;
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(cx + 30, y, fW, bH);

    // Age text in center
    ctx.fillStyle = '#475569';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d.age, cx, y + bH * 0.75);
  });
}

// VIEW 1: Overview
export function renderOverview() {
  const kpisHtml = MACRO_KPI.map((kpi) => `
    <div class="kpi-card">
      <div class="kpi-card-header">
        <span class="kpi-title">${kpi.label}</span>
        <span class="badge-tag ${kpi.changeType === 'positive' ? 'pos' : kpi.changeType === 'negative' ? 'neg' : 'neu'}">${kpi.change}</span>
      </div>
      <div class="kpi-value">${kpi.value}</div>
      <div class="kpi-sub">${kpi.baseline || kpi.usd || ''} • ${kpi.period}</div>
      <div class="kpi-source">${kpi.source}</div>
    </div>
  `).join('');

  return `
    <div class="page-banner">
      <div class="banner-content">
        <h2>Satu Data Statistik Republik Indonesia</h2>
        <p>Official national statistical portal presenting certified, evidence-based economic, demographic, and regional indicators published by Badan Pusat Statistik (BPS) and Bank Indonesia.</p>
      </div>
      <div class="banner-badge">
        <strong>Official Data Release:</strong> ${METADATA.last_updated}<br>
        <strong>Sovereign State:</strong> ${METADATA.country} (${METADATA.country_id})
      </div>
    </div>

    <div class="kpi-grid">
      ${kpisHtml}
    </div>

    <div class="grid-2">
      <div class="section-card">
        <div class="section-header">
          <div>
            <h3>GDP Economic Growth Trajectory (2018–2024)</h3>
            <p>Annual real GDP growth rate (y-on-y % change) • Source: BPS BRS</p>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="canvas-overview-gdp" class="stat-canvas"></canvas>
        </div>
      </div>

      <div class="section-card">
        <div class="section-header">
          <div>
            <h3>Gross Domestic Product by Industrial Origin</h3>
            <p>Percentage contribution to total GDP (Q3 2024) • Source: BPS</p>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="canvas-overview-sectors" class="stat-canvas"></canvas>
        </div>
      </div>
    </div>

    <div class="section-card">
      <div class="section-header">
        <div>
          <h3>Monthly Headline Inflation Trend (Jan–Oct 2024)</h3>
          <p>Year-on-year consumer price index inflation rate (%) within Bank Indonesia target 2.5 ± 1%</p>
        </div>
      </div>
      <div class="chart-container">
        <canvas id="canvas-overview-inflation" class="stat-canvas"></canvas>
      </div>
    </div>
  `;
}

// VIEW 2: Economy
export function renderEconomy() {
  const gdpRows = GDP_TRENDS.map((g) => `
    <tr>
      <td><strong>${g.year}</strong></td>
      <td class="text-right">Rp ${formatNumber(g.gdp_trillion_idr)} T</td>
      <td class="text-right"><span class="badge-tag ${g.growth_pct >= 0 ? 'pos' : 'neg'}">${g.growth_pct > 0 ? '+' : ''}${g.growth_pct}%</span></td>
      <td class="text-right">$${formatNumber(g.gdp_per_capita_usd)}</td>
    </tr>
  `).join('');

  const sectorRows = GDP_BY_SECTOR.map((s) => `
    <tr>
      <td><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${s.color};margin-right:8px;"></span>${s.sector}</td>
      <td class="text-right"><strong>${s.share_pct}%</strong></td>
      <td class="text-right"><span class="badge-tag pos">+${s.growth_pct}%</span></td>
    </tr>
  `).join('');

  return `
    <div class="page-banner">
      <div class="banner-content">
        <h2>National Economic & Fiscal Accounts</h2>
        <p>Comprehensive monitoring of national output, industrial sector performance, inflation stability, and historical gross domestic product evolution.</p>
      </div>
      <div class="banner-badge">
        <strong>Q3 2024 GDP:</strong> Rp 5,638.9 Trillion<br>
        <strong>Growth Q3-2024 (yoy):</strong> 4.95%
      </div>
    </div>

    <div class="section-card">
      <div class="section-header">
        <div>
          <h3>Historical Nominal GDP (Trillion IDR)</h3>
          <p>Annual nominal economic output at current prices • Source: BPS Indonesia</p>
        </div>
      </div>
      <div class="chart-container">
        <canvas id="canvas-econ-nominal" class="stat-canvas"></canvas>
      </div>
    </div>

    <div class="grid-2">
      <div class="section-card">
        <div class="section-header">
          <div>
            <h3>Economic Growth & Per Capita GDP</h3>
            <p>Annual historical performance 2018–2024</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Year</th>
                <th class="text-right">Nominal GDP</th>
                <th class="text-right">Real Growth</th>
                <th class="text-right">GDP Per Capita (USD)</th>
              </tr>
            </thead>
            <tbody>
              ${gdpRows}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-card">
        <div class="section-header">
          <div>
            <h3>GDP Structure by Economic Activity</h3>
            <p>Contribution share and sector expansion rates</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Industrial Sector</th>
                <th class="text-right">Share of GDP</th>
                <th class="text-right">Annual Growth</th>
              </tr>
            </thead>
            <tbody>
              ${sectorRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// VIEW 3: Demographics
export function renderDemographics() {
  return `
    <div class="page-banner">
      <div class="banner-content">
        <h2>Demographics, Population Structure & Human Capital</h2>
        <p>Socio-demographic profiles, age group distribution, labor market workforce metrics, and Human Development Index (HDI) advancement.</p>
      </div>
      <div class="banner-badge">
        <strong>Total Population:</strong> 281.60 Million<br>
        <strong>National HDI:</strong> 75.02 (High Category)
      </div>
    </div>

    <div class="grid-2">
      <div class="section-card">
        <div class="section-header">
          <div>
            <h3>National Population Age Pyramid (2024)</h3>
            <p>Distribution by 5-year age cohorts (BPS Population Projections)</p>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="canvas-demo-pyramid" class="stat-canvas" style="height:360px;"></canvas>
        </div>
      </div>

      <div class="section-card">
        <div class="section-header">
          <div>
            <h3>Socio-Economic Development Key Indicators</h3>
            <p>Poverty, employment, and human development progress (2020-2024)</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Indicator</th>
                <th>2020</th>
                <th>2022</th>
                <th>2024</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Human Development Index (HDI)</strong></td>
                <td>71.94</td>
                <td>73.77</td>
                <td><strong>75.02</strong></td>
                <td><span class="badge-tag pos">High Status</span></td>
              </tr>
              <tr>
                <td><strong>Poverty Rate (%)</strong></td>
                <td>10.19%</td>
                <td>9.57%</td>
                <td><strong>9.03%</strong></td>
                <td><span class="badge-tag pos">Lowest Post-Pandemic</span></td>
              </tr>
              <tr>
                <td><strong>Open Unemployment Rate (%)</strong></td>
                <td>7.07%</td>
                <td>5.86%</td>
                <td><strong>4.91%</strong></td>
                <td><span class="badge-tag pos">-2.16% pts reduction</span></td>
              </tr>
              <tr>
                <td><strong>Gini Ratio (Inequality)</strong></td>
                <td>0.385</td>
                <td>0.381</td>
                <td><strong>0.379</strong></td>
                <td><span class="badge-tag pos">Moderate Inequality</span></td>
              </tr>
              <tr>
                <td><strong>Labor Force Participation (TPAK)</strong></td>
                <td>67.77%</td>
                <td>68.63%</td>
                <td><strong>70.15%</strong></td>
                <td><span class="badge-tag neu">152.11 M Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// VIEW 4: Trade & International
export function renderTrade() {
  const exportRows = TRADE_DATA.major_exports.map((e) => `
    <tr>
      <td><strong>${e.commodity}</strong></td>
      <td class="text-right">$${e.value_usd_b.toFixed(1)} B</td>
      <td class="text-right"><span class="badge-tag neu">${e.share_pct}%</span></td>
    </tr>
  `).join('');

  const partnerRows = TRADE_DATA.trade_partners.map((p) => `
    <tr>
      <td><strong>${p.country}</strong></td>
      <td class="text-right">$${p.export_usd_b.toFixed(1)} B</td>
      <td class="text-right">$${p.import_usd_b.toFixed(1)} B</td>
      <td class="text-right"><span class="badge-tag ${p.balance_usd_b >= 0 ? 'pos' : 'neg'}">${p.balance_usd_b >= 0 ? '+' : ''}$${p.balance_usd_b.toFixed(1)} B</span></td>
    </tr>
  `).join('');

  return `
    <div class="page-banner">
      <div class="banner-content">
        <h2>International Trade & Balance of Payments</h2>
        <p>Bilateral trading flows, top non-oil & gas export commodities, strategic trade partners, and 54 consecutive months of trade balance surpluses.</p>
      </div>
      <div class="banner-badge">
        <strong>Cumulative 2024 Surplus:</strong> $${TRADE_DATA.summary.surplus_usd_b} Billion<br>
        <strong>Surplus Duration:</strong> 54 Consecutive Months
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-title">Total Exports (Jan-Oct 2024)</div>
        <div class="kpi-value">$${TRADE_DATA.summary.total_export_usd_b} B</div>
        <div class="kpi-sub">FOB value • Source: BPS International Trade</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Total Imports (Jan-Oct 2024)</div>
        <div class="kpi-value">$${TRADE_DATA.summary.total_import_usd_b} B</div>
        <div class="kpi-sub">CIF value • Source: BPS International Trade</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Net Trade Surplus</div>
        <div class="kpi-value" style="color:var(--accent-green);">$+${TRADE_DATA.summary.surplus_usd_b} B</div>
        <div class="kpi-sub">54 Consecutive Months in Surplus</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="section-card">
        <div class="section-header">
          <div>
            <h3>Top Non-Oil & Gas Export Commodities</h3>
            <p>Value in Billion USD and export share (2024)</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Commodity</th>
                <th class="text-right">Export Value</th>
                <th class="text-right">Share (%)</th>
              </tr>
            </thead>
            <tbody>
              ${exportRows}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-card">
        <div class="section-header">
          <div>
            <h3>Major Bilateral Trading Partners</h3>
            <p>Exports, imports, and net trade balance (Billion USD)</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Partner Country/Region</th>
                <th class="text-right">Export</th>
                <th class="text-right">Import</th>
                <th class="text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              ${partnerRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// VIEW 5: Regional & 38 Provinces Table (Interactive Sort & Filter)
export function renderProvinces() {
  const regions = ["All Regions", "Sumatra", "Java", "Bali & Nusa Tenggara", "Kalimantan", "Sulawesi", "Maluku & Papua"];
  const regionOptions = regions.map((r) => `<option value="${r}">${r}</option>`).join('');

  return `
    <div class="page-banner">
      <div class="banner-content">
        <h2>Regional Statistics: 38 Provinces of Indonesia</h2>
        <p>Interactive statistical explorer across all 38 Indonesian provinces. Search by province name, filter by geographic island group, and sort by population, GDP per capita, HDI, poverty, or unemployment rates.</p>
      </div>
      <div class="banner-badge">
        <strong>Provinces Listed:</strong> 38 Official Provinces<br>
        <strong>Source:</strong> BPS Provinsi & BRS 2024
      </div>
    </div>

    <div class="section-card">
      <div class="controls-bar">
        <input type="text" id="prov-search" class="filter-input" placeholder="🔍 Search province or capital..." />
        <select id="prov-region-filter" class="filter-select">
          ${regionOptions}
        </select>
        <button id="prov-reset-btn" class="btn btn-outline">Reset Filter</button>
        <span id="prov-count-label" style="margin-left:auto;font-size:0.85rem;color:var(--text-muted);font-weight:600;">Showing 38 of 38 provinces</span>
      </div>

      <div class="table-responsive">
        <table class="data-table" id="provinces-table">
          <thead>
            <tr>
              <th data-sort="name">Province Name ↕</th>
              <th data-sort="region">Region ↕</th>
              <th data-sort="capital">Capital ↕</th>
              <th class="text-right" data-sort="population">Population ↕</th>
              <th class="text-right" data-sort="gdp_per_capita_idr">GDP / Cap (IDR) ↕</th>
              <th class="text-right" data-sort="hdi">HDI (IPM) ↕</th>
              <th class="text-right" data-sort="poverty_pct">Poverty (%) ↕</th>
              <th class="text-right" data-sort="unemployment_pct">Unemployment (%) ↕</th>
            </tr>
          </thead>
          <tbody id="provinces-tbody">
            <!-- Dynamic rows populated by main.js -->
          </tbody>
        </table>
      </div>
    </div>
  `;
}
