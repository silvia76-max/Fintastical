<template>
          <!-- Preloader -->
          <div v-if="loading">
      <Loader />
    </div>
  <div class="investments-view">
    <h1>Your personal dashboard</h1>
    <InvestmentSummary />
 <PersonalCharts />



  </div>
</template>

<script setup>

import PersonalCharts from '@/components/charts/PersonalCharts.vue'; 
import InvestmentSummary from '@/components/dashboard/investments/InvestmentSummary.vue';
import Loader from '@/components/LoaderComp.vue'



</script>

<style scoped>
.investments-view {
  padding: 20px;
}
h1{
  color: var(--purple-dark);
  text-align: center;
  }
</style>
