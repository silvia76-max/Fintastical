<template>
  <div>
    <h2>Últimas noticias sobre el mercado de valores</h2>
    <div class="noticias-container">
      <!-- 👇 Aquí ahora usamos "noticiasPaginadas" -->
      <div class="noticia-card" v-for="articulo in noticiasPaginadas" :key="articulo.url">          
        <p> {{ formatDate(articulo.publishedAt) }}</p>
        <div class="noticia-image">
          <img v-if="articulo.urlToImage" :src="articulo.urlToImage" alt="Imagen de la noticia" />
        </div>
        
        <div class="noticia-content">
          <a :href="articulo.url" target="_blank">
            <h2>{{ articulo.title }}</h2>
          </a>
          <p><strong>Autor:</strong>{{ articulo.author || 'Desconocido' }}</p>

          <p>{{ articulo.description }}</p>

          <a :href="articulo.url" target="_blank">
            <button v-if="articulo.content">Leer noticia completa</button>
          </a>
        </div>
      </div>
    </div>

    <!-- Controles de paginación -->
    <div class="paginacion">
      <button @click="paginaAnterior" :disabled="paginaActual === 1">Anterior</button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button @click="siguientePagina" :disabled="paginaActual >= totalPaginas">Siguiente</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const apikey = '9107e2f197fc42308182c5bc92f503d1';
const busqueda = 'stock%market%nasdaq';
const noticias = ref([]);
const error = ref(null);
const paginaActual = ref(1);
const noticiasPorPagina = 9; // ✅ Ahora 9 noticias por página

// Función para formatear la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
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

// Computed para obtener las noticias paginadas ✅
const noticiasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * noticiasPorPagina;
  const fin = inicio + noticiasPorPagina;
  return noticias.value.slice(inicio, fin);
});

// Computed para calcular el total de páginas ✅
const totalPaginas = computed(() => {
  return noticias.value.length > 0 ? Math.ceil(noticias.value.length / noticiasPorPagina) : 1;
});

// Función para ir a la página anterior ✅
const paginaAnterior = () => {
  if (paginaActual.value > 1) {
    paginaActual.value--;
  }
};

// Función para ir a la siguiente página ✅
const siguientePagina = () => {
  if (paginaActual.value < totalPaginas.value) {
    paginaActual.value++;
  }
};

onMounted(cargarDatos);
</script>


<style scoped>
/* Estilo de las tarjetas en tres columnas */

.noticias-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tres columnas */
  gap: 20px; /* Espacio entre las tarjetas en ambas direcciones */
  justify-items: center; /* Centra las tarjetas */
  margin: 0 30px; /* Márgenes laterales */
}

.noticia-card {
  display: flex;
  flex-direction: column; /* Coloca la imagen arriba, el contenido debajo */
  gap: 15px;
  padding: 15px;
  border-radius: 20px;
  box-shadow: #2F284C 0px 2px 2px;
  background-color: #DFDAEE;
  width: 100%;
  max-width: 550px; /* Aumento del ancho de las tarjetas */
  box-sizing: border-box;
  overflow: hidden;
  min-height: 300px; /* Establece una altura mínima */
}

.noticia-image {
  width: 100%;
  height: 200px; /* Tamaño fijo para las imágenes */
  overflow: hidden;
  border-radius: 12px; /* Esquinas redondeadas en las imágenes */
}

.noticia-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.noticia-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  color: #2F284C;
}

.noticia-content h2 {
  margin: 0;
  font-size: 18px;
  color: #2F284C;
}

.noticia-content .author {
  font-size: 12px; /* Autor más pequeño */
  color: #76708E;
}

.noticia-content .author span {
  font-weight: bold;
}

.noticia-content .date {
  font-size: 14px;
  color: #A8CC9B;
  text-align: right; /* Alineamos la fecha a la derecha */
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #A8CC9B;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  align-self: center; /* Alineamos el botón hacia la izquierda */
  box-shadow: #A396D7 0px 2px 2px;
}

button:hover {
  background-color: #C86380;
}

.error {
  color: red;
  font-weight: bold;
}

.paginacion {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.paginacion button {
  padding: 10px;
  background-color: #6046B0;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.paginacion button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>