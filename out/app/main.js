// Client Application Router and Interactivity
import {
  drawLineChart,
  drawBarChart,
  drawDonutChart,
  drawDemographicPyramid,
  formatNumber,
  formatCurrencyIDR,
  renderOverview,
  renderEconomy,
  renderDemographics,
  renderTrade,
  renderProvinces
} from './views.js';

import {
  GDP_TRENDS,
  GDP_BY_SECTOR,
  INFLATION_MONTHLY_2024,
  DEMOGRAPHICS_PYRAMID,
  PROVINCES_DATA
} from './data.js';

let currentSortField = 'population';
let currentSortAsc = false;
let currentSearch = '';
let currentRegion = 'All Regions';

// Setup routing
const routes = {
  '/': { render: renderOverview, title: 'National Overview' },
  '/economy': { render: renderEconomy, title: 'Economic Accounts' },
  '/demographics': { render: renderDemographics, title: 'Demographics & HDI' },
  '/trade': { render: renderTrade, title: 'Trade & Balance of Payments' },
  '/provinces': { render: renderProvinces, title: '38 Regional Provinces' }
};

function navigate() {
  const hash = window.location.hash.slice(1) || '/';
  const cleanHash = hash.startsWith('/') ? hash : '/' + hash;
  const route = routes[cleanHash] || routes['/'];

  // Update page title dynamically
  document.title = `${route.title} — Satu Data Statistik Republik Indonesia`;

  // Update navigation links active state
  document.querySelectorAll('nav.main-nav a').forEach((a) => {
    const target = a.getAttribute('href').replace('#', '');
    if (target === cleanHash) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  const root = document.getElementById('app-root');
  if (!root) return;
  root.innerHTML = route.render();
  window.scrollTo(0, 0);

  // Initialize view specific components
  if (cleanHash === '/') {
    initOverviewCharts();
  } else if (cleanHash === '/economy') {
    initEconomyCharts();
  } else if (cleanHash === '/demographics') {
    initDemographicCharts();
  } else if (cleanHash === '/provinces') {
    initProvincesTable();
  }
}

function initOverviewCharts() {
  const gdpCanvas = document.getElementById('canvas-overview-gdp');
  if (gdpCanvas) {
    const labels = GDP_TRENDS.map((g) => g.year.toString());
    const values = GDP_TRENDS.map((g) => g.growth_pct);
    drawLineChart(gdpCanvas, labels, values, {
      lineColor: '#0284c7',
      formatVal: (v) => `${v}%`,
      formatY: (v) => `${v.toFixed(1)}%`
    });
  }

  const sectorCanvas = document.getElementById('canvas-overview-sectors');
  if (sectorCanvas) {
    drawDonutChart(sectorCanvas, GDP_BY_SECTOR);
  }

  const inflCanvas = document.getElementById('canvas-overview-inflation');
  if (inflCanvas) {
    const labels = INFLATION_MONTHLY_2024.map((m) => m.month.split(' ')[0]);
    const values = INFLATION_MONTHLY_2024.map((m) => m.yoy);
    drawLineChart(inflCanvas, labels, values, {
      lineColor: '#e11d48',
      areaColor: 'rgba(225, 29, 72, 0.15)',
      formatVal: (v) => `${v}%`,
      formatY: (v) => `${v.toFixed(1)}%`
    });
  }
}

function initEconomyCharts() {
  const nomCanvas = document.getElementById('canvas-econ-nominal');
  if (nomCanvas) {
    const labels = GDP_TRENDS.map((g) => g.year.toString());
    const values = GDP_TRENDS.map((g) => g.gdp_trillion_idr);
    drawBarChart(nomCanvas, labels, values, {
      barColors: ['#38bdf8', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#0369a1', '#0284c7'],
      formatVal: (v) => `${v.toFixed(0)} T`,
      formatY: (v) => `${v.toFixed(0)} T`
    });
  }
}

function initDemographicCharts() {
  const pyrCanvas = document.getElementById('canvas-demo-pyramid');
  if (pyrCanvas) {
    drawDemographicPyramid(pyrCanvas, DEMOGRAPHICS_PYRAMID);
  }
}

function initProvincesTable() {
  const tbody = document.getElementById('provinces-tbody');
  const searchInput = document.getElementById('prov-search');
  const regionSelect = document.getElementById('prov-region-filter');
  const resetBtn = document.getElementById('prov-reset-btn');
  const countLabel = document.getElementById('prov-count-label');

  function renderRows() {
    let list = [...PROVINCES_DATA];

    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
    }

    if (currentRegion !== 'All Regions') {
      list = list.filter((p) => p.region === currentRegion);
    }

    list.sort((a, b) => {
      let valA = a[currentSortField];
      let valB = b[currentSortField];
      if (typeof valA === 'string') {
        return currentSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return currentSortAsc ? valA - valB : valB - valA;
    });

    if (countLabel) {
      countLabel.textContent = `Showing ${list.length} of ${PROVINCES_DATA.length} provinces`;
    }

    if (!tbody) return;
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding:2rem;color:var(--text-muted);">No provinces match the query "${currentSearch}".</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((p) => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td><span class="badge-tag neu">${p.region}</span></td>
        <td>${p.capital}</td>
        <td class="text-right"><strong>${formatNumber(p.population)}</strong></td>
        <td class="text-right">${formatCurrencyIDR(p.gdp_per_capita_idr)}</td>
        <td class="text-right"><span class="badge-tag ${p.hdi >= 75 ? 'pos' : p.hdi >= 70 ? 'neu' : 'neg'}">${p.hdi.toFixed(2)}</span></td>
        <td class="text-right">${p.poverty_pct.toFixed(2)}%</td>
        <td class="text-right">${p.unemployment_pct.toFixed(2)}%</td>
      </tr>
    `).join('');
  }

  // Setup table header sort click handlers
  document.querySelectorAll('#provinces-table th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const field = th.getAttribute('data-sort');
      if (currentSortField === field) {
        currentSortAsc = !currentSortAsc;
      } else {
        currentSortField = field;
        currentSortAsc = field === 'name' || field === 'capital';
      }
      renderRows();
    });
  });

  if (searchInput) {
    searchInput.value = currentSearch;
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderRows();
    });
  }

  if (regionSelect) {
    regionSelect.value = currentRegion;
    regionSelect.addEventListener('change', (e) => {
      currentRegion = e.target.value;
      renderRows();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentSearch = '';
      currentRegion = 'All Regions';
      currentSortField = 'population';
      currentSortAsc = false;
      if (searchInput) searchInput.value = '';
      if (regionSelect) regionSelect.value = 'All Regions';
      renderRows();
    });
  }

  renderRows();
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  navigate();
  window.addEventListener('hashchange', navigate);
  window.addEventListener('resize', () => {
    // Re-render chart canvases on window resize for crisp responsive redraw
    const hash = window.location.hash.slice(1) || '/';
    const cleanHash = hash.startsWith('/') ? hash : '/' + hash;
    if (cleanHash === '/') initOverviewCharts();
    else if (cleanHash === '/economy') initEconomyCharts();
    else if (cleanHash === '/demographics') initDemographicCharts();
  });
});
