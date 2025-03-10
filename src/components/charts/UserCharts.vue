<template>
    <div class="personal-charts">
      <h1>Gráficos de tus Inversiones</h1>
      <div v-if="uniqueAssets.length > 0">
        <!-- Generamos los gráficos para cada activo único -->
        <div v-for="(symbol, index) in uniqueAssets" :key="index" class="chart-container">
          <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright">
              <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                <span class="blue-text">Track all markets on TradingView</span>
              </a>
            </div>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js" async>
              {
                "symbols": [
                  [
                    "NASDAQ:{{ symbol }}|1D"
                  ]
                ],
                "chartOnly": false,
                "width": "100%",
                "height": "100%",
                "locale": "en",
                "colorTheme": "light",
                "autosize": true,
                "showVolume": false,
                "showMA": false,
                "hideDateRanges": false,
                "hideMarketStatus": false,
                "hideSymbolLogo": false,
                "scalePosition": "right",
                "scaleMode": "Normal",
                "fontFamily": "Arial, sans-serif",
                "fontSize": "10",
                "noTimeScale": false,
                "valuesTracking": "1",
                "changeMode": "price-and-percent",
                "chartType": "area",
                "maLineColor": "#2962FF",
                "maLineWidth": 1,
                "maLength": 9,
                "headerFontSize": "medium",
                "lineWidth": 2,
                "lineType": 0,
                "dateRanges": [
                  "1d|1",
                  "1m|30",
                  "3m|60",
                  "12m|1D",
                  "60m|1W",
                  "all|1M"
                ]
              }
            </script>
          </div>
        </div>
      </div>
      <p v-else>No tienes activos con gráficos disponibles.</p>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { useInvestmentStore } from '../stores/investmentStore'; // Asegúrate de que esta ruta sea correcta
  
  export default defineComponent({
    name: 'PersonalCharts',
    computed: {
      // Obtener todos los activos del usuario desde el store
      userAssets() {
        const investmentStore = useInvestmentStore();
        return investmentStore.assets; // Asegúrate de que 'assets' esté correctamente estructurado en el store
      },
      // Filtrar activos para evitar duplicados
      uniqueAssets() {
        const assetsSet = new Set();
        return this.userAssets.filter(asset => {
          if (!assetsSet.has(asset.code)) {
            assetsSet.add(asset.code);
            return true;
          }
          return false;
        });
      }
    }
  });
  </script>
  
  <style scoped>
  .personal-charts {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .chart-container {
    margin-bottom: 40px;
  }
  
  .tradingview-widget-container {
    position: relative;
    width: 100%;
    height: 400px;
  }
  
  .tradingview-widget-copyright {
    font-size: 12px;
    color: #6a6a6a;
  }
  
  .blue-text {
    color: #2962ff;
  }
  </style>
  