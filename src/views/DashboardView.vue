<template>
  <div>
    <h1>Tu Tablero Personal 📊</h1>
    <p v-if="loading">Cargando datos importantes...</p>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="data">
      <p>Mensajes: {{ data.messages }}</p>
      <p>Tareas: {{ data.tasks }}</p>
    </div>
    <LoaderComp v-if="loading" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import LoaderComp from '@/components/LoaderComp.vue'

const { data, loading, error, fetchData } = useApi()

onMounted(async () => {
  try {
    await fetchData('http://localhost:3000/dashboard') // Endpoint fake
  } catch (err) {
    console.error('Error fetching data:', err)
  }
})
</script>
