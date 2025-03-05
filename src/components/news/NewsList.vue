<script setup>
import { ref, onMounted } from 'vue';

const simbolos = ref(['AAPL', 'NVDA', 'TSLA']);
const apikey = '2b69e37d583e41fda6a423e2b07cfdb2';
const intervalo = '1h';
const datos = ref(null);
const error = ref(null);

const cargarDatos = async () => {
    try {
        const response = await fetch(https://api.twelvedata.com/time_series?symbol=${simbolos.value.join(',')}&interval=${intervalo}&apikey=${apikey});
        if (!response.ok) {
            throw new Error('Error al cargar datos');
        }
        datos.value = await response.json();
        console.log(datos.value);
    } catch (err) {
        error.value = Hubo un problema: ${err.message};
        console.error(error.value);
    }
};

onMounted(cargarDatos);
</script>

<template>
  <div>
    <h1>Datos del Mercado</h1>
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
</style>