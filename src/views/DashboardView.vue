<template>
  <div>
    <h1>Tu Tablero Personal 📊</h1>
    <LoaderComp v-if="loading" />
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="data">
      <p>Tipo: {{ data.type }}</p>
      <p>Cantidad: {{ data.amount }}</p>
    </div>
    <UserStats />
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { useApi } from '@/composables/useApi.js';
import LoaderComp from '@/components/LoaderComp.vue';
import UserStats from '@/components/dashboard/UserStats.vue';

const { data, loading, error, fetchData } = useApi()

onMounted(async () => {
  try {
    await fetchData('http://localhost:3000/dashboard') // Endpoint fake
  } catch (err) {
    console.error('Error fetching data:', err)
  }
})
</script>
