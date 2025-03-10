<template>
  <div class="charts-container">
    <h1>Gráficos</h1>
    <template v-if="uniqueAssetCodes.length > 0">
      <div class="charts-container__navigation-buttons">
        <button 
          v-for="code in uniqueAssetCodes" 
          :key="code"
          :class="['charts-container__nav-button', { 'charts-container__nav-button--active': currentAsset === code }]"
          @click="setCurrentAsset(code)"
        >
          {{ code }}
          <span class="charts-container__price-indicator" :class="getPriceChangeClass(code)">
            <!-- ${{ getCurrentPrice(code) }} -->
          </span>
        </button>
      </div>
      
      <div v-if="currentAsset" class="charts-container__chart-card">
        <div class="charts-container__chart-header">
          <h3>{{ currentAsset }}</h3>
          <span class="charts-container__current-price" :class="getPriceChangeClass(currentAsset)">
            <!-- ${{ getCurrentPrice(currentAsset) }} -->
          </span>
        </div>
        <div :id="'tradingview-widget-' + currentAsset" class="charts-container__tradingview-widget"></div>
      </div>
    </template>
    <p v-else class="charts-container__empty-state">No tienes activos registrados</p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
import { useInvestmentStore } from '@/stores/investments';
import { useApi } from '@/composables/useApi';

const investmentStore = useInvestmentStore();
const api = useApi();
const priceHistory = ref({});
const currentAsset = ref('');

// Computed properties
const uniqueAssetCodes = computed(() => {
  return [...new Set(investmentStore.assets.map(asset => asset.code))];
});

// Watch for changes in uniqueAssetCodes
watch(uniqueAssetCodes, (newCodes) => {
  if (newCodes.length === 0) {
    // Clear current asset when no assets remain
    currentAsset.value = '';
  } else if (!newCodes.includes(currentAsset.value)) {
    // If current asset was deleted, switch to the first available asset
    setCurrentAsset(newCodes[0]);
  }
});

// Set current asset
const setCurrentAsset = (code) => {
  currentAsset.value = code;
  // Reinitialize the widget for the new asset
  setTimeout(() => {
    initializeTradingViewWidget(code);
  }, 0);
};

// Fetch price data for a specific asset
const fetchPriceData = async (code) => {
  try {
    await api.fetchData(`http://localhost:8111/${code}`);
    const newPrice = api.data.value.values[0].close;
    
    if (!priceHistory.value[code]) {
      priceHistory.value[code] = [];
    }
    
    priceHistory.value[code].push({
      price: Number(parseFloat(newPrice).toFixed(2)),
      time: new Date()
    });

    if (priceHistory.value[code].length > 60) {
      priceHistory.value[code].shift();
    }
  } catch (err) {
    console.error('Error fetching price data:', err);
  }
};

// Get current price for an asset
const getCurrentPrice = (code) => {
  const history = priceHistory.value[code] || [];
  return history.length > 0 ? history[history.length - 1].price.toFixed(2) : '0.00';
};

// Determine price change class for styling
const getPriceChangeClass = (code) => {
  const history = priceHistory.value[code] || [];
  if (history.length < 2) return '';
  
  const currentPrice = history[history.length - 1].price;
  const previousPrice = history[history.length - 2].price;
  return currentPrice >= previousPrice ? 'charts-container__price-up' : 'charts-container__price-down';
};

// Initialize TradingView widget for an asset
const initializeTradingViewWidget = (code) => {
  const container = document.getElementById(`tradingview-widget-${code}`);
  if (!container) return;

  // Clear any existing content
  container.innerHTML = '';

  // Create and load TradingView widget
  new window.TradingView.widget({
    width: "100%",
    height: "400",
    symbol: code,
    interval: "1",
    timezone: "Etc/UTC",
    theme: "light",
    style: "1",
    locale: "en",
    toolbar_bg: "#f1f3f6",
    enable_publishing: false,
    hide_top_toolbar: true,
    hide_legend: true,
    save_image: false,
    container_id: `tradingview-widget-${code}`
  });
};

// Load TradingView script
const loadTradingViewScript = () => {
  return new Promise((resolve) => {
    if (window.TradingView) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

// Update interval reference
let updateInterval;

onMounted(async () => {
  // Load TradingView script
  await loadTradingViewScript();

  // Set initial asset and fetch data for all assets
  if (uniqueAssetCodes.value.length > 0) {
    setCurrentAsset(uniqueAssetCodes.value[0]);
    uniqueAssetCodes.value.forEach(code => {
      fetchPriceData(code);
    });
  }

  // Set up real-time price updates
  updateInterval = setInterval(() => {
    uniqueAssetCodes.value.forEach(code => {
      fetchPriceData(code);
    });
  }, 60000); // Update every minute
});

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});
</script>

<style scoped>
.charts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.charts-container__navigation-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.charts-container__nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: var(--purple);
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}

.charts-container__nav-button:hover {
  border-color: var(--purple);
  transform: translateY(-1px);
}

.charts-container__nav-button--active {
  background: var(--purple);
  color: white;
  border-color: var(--purple);
}

.charts-container__price-indicator {
  font-size: 0.875rem;
  font-weight: 500;
}

.charts-container__chart-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.charts-container__chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.charts-container__chart-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--purple);
}

.charts-container__current-price {
  font-size: 1.25rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.charts-container__price-up {
  color: #10b981;
}

.charts-container__price-down {
  color: #ef4444;
}

.charts-container__tradingview-widget {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

/* Active state styles for price indicators */
.charts-container__nav-button--active .charts-container__price-up {
  color: #86efac;
}

.charts-container__nav-button--active .charts-container__price-down {
  color: #fca5a5;
}

.charts-container__empty-state {
  text-align: center;
  padding: 40px;
  color: #95a5a6;
  border: 2px dashed #bdc3c7;
  border-radius: 15px;
  margin: 30px 0;
}
</style>
