<template>
  <div>
    <h2>Últimas noticias sobre el mercado de valores</h2>
    <div class="noticias-container">
      <div class="noticia-card" v-for="articulo in noticias" :key="articulo.url">
        <!-- Imagen a la izquierda -->
        <div class="noticia-image">
          <img v-if="articulo.urlToImage" :src="articulo.urlToImage" alt="Imagen de la noticia" />
        </div>
        
        <!-- Contenido de la noticia a la derecha -->
        <div class="noticia-content">
          <a :href="articulo.url" target="_blank">
            <h2>{{ articulo.title }}</h2>
          </a>
          <p><strong>Autor:</strong> {{ articulo.author || 'Desconocido' }}</p>
          <p><strong>Fecha de publicación:</strong> {{ formatDate(articulo.publishedAt) }}</p>
          <p><strong></strong> {{ articulo.description }}</p>

          <!-- Botón para redirigir al artículo completo -->
          <a :href="articulo.url" target="_blank">
            <button v-if="articulo.content">
              Leer más
            </button>
          </a>
        </div>
      </div>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed} from 'vue';

const apikey = '9107e2f197fc42308182c5bc92f503d1';
const busqueda = 'stock%market%nasdaq';
const noticias = ref([]);
const error = ref(null);

// Función para formatear la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Cambia el formato si lo necesitas
};

// Función para cargar los datos desde la API
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

<style scoped>
/* Estilo de las tarjetas en dos columnas fijas */
.noticias-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Dos columnas fijas */
  gap: 3px; /* Espacio entre las tarjetas en ambas direcciones */
  grid-column-gap: 2px;
  justify-items: center; /* Centra las tarjetas */
  margin: 0 30px; /* Márgenes laterales */
}

.noticia-card {
  display: flex;
  flex-direction: row;
  gap: 15px;
  border: 2px solid #6046B0;
  padding: 15px;
  border-radius: 20px;
  background-color: #2F284C;
  width: 550px; /* Aumento del ancho de las tarjetas */
  box-sizing: border-box;
  overflow: hidden; /* Si el contenido es demasiado grande */
  min-height: 250px; /* Establece una altura mínima */
}

.noticia-image {
  flex-shrink: 0;
  width: 200px; /* Imagen un poco más grande */
  height: 200px; 
  overflow: hidden;
  border-radius: 8px;
}

.noticia-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.noticia-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1px;
}

.noticia-content h2 {
  margin: 0;
  font-size: 25px; /* Tamaño de fuente más grande */
  color: #EDC860;
}

h3 {
  margin: 0;
  font-size: 16px; /* Tamaño de fuente más pequeño */
  font-weight: bold;
}

p {
  margin: 0; /* Elimina el margen entre los párrafos */
  padding: 3px 0; /* Si deseas reducir el espacio interior de los párrafos */
  color: white;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #A8CC9B;
  color: black;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #C86380;
}

.error {
  color: red;
  font-weight: bold;
}
</style>