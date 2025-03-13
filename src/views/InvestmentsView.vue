<template>
  <div class="investments-view">
    <h1>Inversiones</h1>
    <InvestmentSummary />
    <InvestmentList />

  </div>
</template>

<script setup>
import InvestmentList from '@/components/dashboard/investments/InvestmentList.vue';
import InvestmentSummary from '@/components/dashboard/investments/InvestmentSummary.vue';

</script>

<style scoped>
.investments-view {
  padding: 20px;
}
</style>
