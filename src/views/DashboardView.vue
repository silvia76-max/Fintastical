<template>
          <!-- Preloader -->
          <div v-if="loading">
      <Loader />
    </div>
  <div class="investments-view">
    <h1>Your personal dashboard</h1>
    <InvestmentSummary />
    <PersonalCharts />

    <InvestmentList />

  </div>
</template>

<script setup>
import InvestmentList from '@/components/dashboard/investments/InvestmentList.vue';
import InvestmentSummary from '@/components/dashboard/investments/InvestmentSummary.vue';
import PersonalCharts from '@/components/charts/PersonalCharts.vue';
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
