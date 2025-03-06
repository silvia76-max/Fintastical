<template>
  <div>
    <h2>Noticias sobre el mercado de valores</h2>
    <ul>
      <li v-for="articulo in noticias" :key="articulo.url">
        <a :href="articulo.url" target="_blank">{{ articulo.title }}</a>
      </li>
    </ul>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const apikey = '9107e2f197fc42308182c5bc92f503d1';
const busqueda = 'stock%market%nasdaq';
const noticias = ref([]);
const error = ref(null);

const cargarDatos = async () => {
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${busqueda}&apiKey=${apikey}`);
    if (!response.ok) {
      throw new Error('Error al cargar datos');
    }
    const datos = await response.json();
    noticias.value = datos.articles;
  } catch (err) {
    error.value = 'Hubo un problema al cargar las noticias';
    console.error(err);
  }
};

onMounted(cargarDatos);
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}
</style>