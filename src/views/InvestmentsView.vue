<template>
  <div class="investments-view">
    <h1>Gestión de Inversiones</h1>
    <p>Aquí se listarán las inversiones del usuario.</p>
    <InvestmentSummary />
    <InvestmentList />
    <!-- <AlertHistory /> -->
  </div>
</template>

<script setup>
import InvestmentList from '@/components/dashboard/investments/InvestmentList.vue';
import InvestmentSummary from '@/components/dashboard/investments/InvestmentSummary.vue';
import AlertHistory from '@/components/dashboard/investments/AlertHistory.vue';


</script>

<style scoped>
.investments-view {
  padding: 20px;
}
</style>
