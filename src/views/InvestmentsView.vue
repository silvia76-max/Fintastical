<template>
  <div class="investments-view">
    <h1>Gestión de Inversiones</h1>
    <p>Aquí se listarán las inversiones del usuario.</p>
    <InvestmentList />
  </div>
</template>

<script setup>
import InvestmentList from '@/components/dashboard/investments/InvestmentList.vue';

</script>

<style scoped>
.investments-view {
  padding: 20px;
}
</style>
