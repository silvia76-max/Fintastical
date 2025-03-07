<script setup>
import { ref, onMounted } from "vue";
import { defineChartComponent } from "vue-chart-3"; // Importamos el helper de Chart.js
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// Definimos el gráfico de líneas como un componente Vue
const LineChart = defineChartComponent("line"); // Aquí definimos el tipo de gráfico

// Datos reactivos
const stocks = ["AAPL", "META", "TSLA", "NVDA", "AMZN", "GOOGL", "INTC", "AMD", "NFLX", "MSFT"];
const selectedStock = ref("AAPL"); // Acción seleccionada
const chartData = ref({ labels: [], datasets: [] });
const chartOptions = ref({ responsive: true, maintainAspectRatio: false });

const fetchData = async () => {
  try {
    const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${stocks.join(",")}&currency=EUR&interval=1h&apikey=51e94bef2fd14f9ea1fc59727093f250`);
    const data = await response.json();

    console.log("Datos de la API:", data);
    
    // Extraemos los datos de la acción seleccionada
    const stockData = data[selectedStock.value]?.values || [];

    // Formateamos los datos para Chart.js
    chartData.value = {
      labels: stockData.map(item => item.datetime).reverse(), // Fechas
      datasets: [
        {
          label: `Precio de ${selectedStock.value} (€)`,
          data: stockData.map(item => parseFloat(item.close)).reverse(), // Precios
          borderColor: "rgb(75, 192, 192)", // Color de la línea
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo
          tension: 0.3, // Curvatura de la línea
        }
      ]
    };
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
  }
};

// Llamamos a la API cuando el componente se monta
onMounted(fetchData);
</script>

<template>
  <div>
    <!-- Selector para cambiar de acción -->
    <select v-model="selectedStock" @change="fetchData">
      <option v-for="stock in stocks" :key="stock" :value="stock">{{ stock }}</option>
    </select>

    <!-- Gráfico -->
    <div style="height: 400px;">
      <!-- Aseguramos que los datos estén listos antes de renderizar el gráfico -->
      <LineChart v-if="chartData.labels.length" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
