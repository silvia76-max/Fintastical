<template>
  <div class="charts-view">
    <h1>Visualización de Gráficos</h1>
    <p>Aquí se mostrarán los gráficos de rendimiento.</p>
  </div>
</template>

<script setup>
import GlobalStateChart from "@/components/charts/GlobalStateChart.vue";
console.log("ChartsView.vue y GlobalStateChart");
</script>


<style scoped>
.charts-view {
  padding: 20px;
}
</style>
