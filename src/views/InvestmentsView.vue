<template>
  <div class="investments-view">
    <h1>Gestión de Inversiones</h1>
    <p>Aquí se listarán las inversiones del usuario.</p>
    <InvestmentSummary />
    <PersonalCharts />

    <InvestmentList />

  </div>
</template>

<script setup>
import InvestmentList from '@/components/dashboard/investments/InvestmentList.vue';
import InvestmentSummary from '@/components/dashboard/investments/InvestmentSummary.vue';
import PersonalCharts from '@/components/charts/PersonalCharts.vue';



</script>

<style scoped>
.investments-view {
  padding: 20px;
}
</style>
