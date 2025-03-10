<template>
    <div class="charts-container">
      <div v-for="code in uniqueAssetCodes" :key="code" class="chart-card">
        <div class="chart-header">
          <h3>{{ code }}</h3>
          <span class="current-price" :class="getPriceChangeClass(code)">
            ${{ getCurrentPrice(code) }}
          </span>
        </div>
        <div :id="'tradingview-widget-' + code" class="tradingview-widget"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted, ref, computed } from 'vue';
  import { useInvestmentStore } from '@/stores/investments';
  import { useApi } from '@/composables/useApi';
  
  const investmentStore = useInvestmentStore();
  const api = useApi();
  const priceHistory = ref({});
  
  // Get unique asset codes
  const uniqueAssetCodes = computed(() => {
    return [...new Set(investmentStore.assets.map(asset => asset.code))];
  });
  
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
    return currentPrice >= previousPrice ? 'price-up' : 'price-down';
  };
  
  // Initialize TradingView widget for an asset
  const initializeTradingViewWidget = (code) => {
    const container = document.getElementById(`tradingview-widget-${code}`);
    if (!container) return;
  
    // Clear any existing content
    container.innerHTML = '';
  
    // Create and load TradingView widget
    new TradingView.widget({
      "width": "100%",
      "height": "400",
      "symbol": code,
      "interval": "1",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": true,
      "save_image": false,
      "container_id": `tradingview-widget-${code}`
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
  
    // Initialize widgets and fetch initial data
    uniqueAssetCodes.value.forEach(code => {
      initializeTradingViewWidget(code);
      fetchPriceData(code);
    });
  
    // Set up real-time price updates
    updateInterval = setInterval(() => {
      uniqueAssetCodes.value.forEach(code => {
        fetchPriceData(code);
      });
    }, 60000); // Update every minute
  });
  
  onUnmounted(() => {
    clearInterval(updateInterval);
  });
  </script>
  
  <style scoped>
  .charts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }
  
  .chart-card {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .chart-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--purple);
  }
  
  .current-price {
    font-size: 1.125rem;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .price-up {
    color: #10b981;
  }
  
  .price-down {
    color: #ef4444;
  }
  
  .tradingview-widget {
    height: 400px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  </style>