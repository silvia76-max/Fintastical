<template>
  <div class="investments-view">
    <h1>Tu Tablero Personal</h1>
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
