<script setup>
import { ref, onMounted } from 'vue';

const simbolos = ref(['AAPL', 'NVDA', 'TSLA']);
const apikey = ' 67c830edc82645.34643739';
const intervalo = '1h';
const datos = ref(null);
const error = ref(null);

const cargarDatos = async () => {
    try {
        const response = await fetch("https://eodhd.com/api/news?s=AAPL.US&offset=0&limit=10&api_token=67c830edc82645.34643739&fmt=json");
        if (!response.ok) {
            throw new Error('Error al cargar datos');
        }
        datos.value = await response.json();
        console.log(datos.value);
    } catch (err) {
        error.value = `Hubo un problema: ${err.message}`;
        console.error(error.value);
    }
};

onMounted(cargarDatos);
</script>

<template>
  <div>
    <h1>Noticias financieras</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <pre v-else-if="datos">{{ datos }}</pre>
    <p v-else>Cargando datos...</p>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

.blog-view {
  padding: 20px;
}
</style>