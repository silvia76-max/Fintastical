<template>
  <div>
    <!-- preloader -->
    <div v-if="loading">
      <Loader />
    </div>

    <!-- main content -->
    <div>
      <h1>Latest Stock Market News</h1>
      <div class="news-container">
        <!-- now using "paginatedNews" -->
        <div class="news-card" v-for="article in paginatedNews" :key="article.url">
          <div class="news-image">
            <img :src="article.urlToImage || backupImage" alt="News Image" @error="handleImageError" />
          </div>
          <div class="news-content">
            <p class="date">{{ formatDate(article.publishedAt) }}</p>
            <a :href="article.url" target="_blank">
              <h2>{{ article.title }}</h2>
            </a>
            <p class="author"><strong>Author:</strong> {{ article.author || 'Unknown' }}</p>
            <p class="article-description">{{ article.description }}</p>
            <a :href="article.url" target="_blank">
              <button v-if="article.content">Read Full Article</button>
            </a>
          </div>
        </div>
      </div>

      <!-- pagination controls -->
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <p>Page <span>{{ currentPage }}</span> of <span>{{ totalPages }}</span></p>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Loader from '@/components/LoaderComp.vue';
import { useApi } from '@/composables/useApi';
import backupImage from '@/assets/img/imagen-news.png';

const apikey = '9107e2f197fc42308182c5bc92f503d1';
const searchQuery = 'stock%market%nasdaq';
const newsPerPage = 9;

const { data, loading, error, fetchData } = useApi();
const news = ref([]);
const currentPage = ref(1);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

onMounted(async () => {
  await fetchData(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apikey}`);
  news.value = data.value?.articles || [];
});

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * newsPerPage;
  const end = start + newsPerPage;
  return news.value.slice(start, end);
});

const totalPages = computed(() => {
  return news.value.length > 0 ? Math.ceil(news.value.length / newsPerPage) : 1;
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const handleImageError = (event) => {
  event.target.src = backupImage;
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 3rem;
}
.news-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  margin: 0 auto;
  max-width: 75%;
}

.news-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.news-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  color: #333;
}

.news-content h2 {
  margin: 0;
  font-size: 2rem;
  color: var(--purple-dark);
  min-height: 9rem;
  border-bottom: 1px solid var(--purple-hover);
}

.news-content .author {
  font-size: 12px;
  color: #76708e;
}

.news-content .author span {
  font-weight: bold;
}

.news-content .date {
  font-size: 14px;
  color: #a8cc9b;
  text-align: right;
}

.article-description {
  min-height: 10rem;
}

button {
  margin-top: auto;
  padding: 10px 20px;
  background-color: var(--purple);
  color: var(--purple-light);
  border: none;
  cursor: pointer;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--purple-light);
  color: var(--purple);
}

.error {
  color: red;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem auto;
  width: fit-content;
  max-width: 90%;
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.pagination button {
  padding: 1.1rem 3.4rem;
  /* border: 1px solid #e0e0e0; */
  border-radius: 8px;
  background-color: var(--purple);
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.pagination button:hover:not(:disabled) {
  background-color: var(--purple-hover);
  border-color: var(--purple);
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.pagination button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.pagination p {
  color: var(--purple-dark);
  font-size: 1.55rem;
  margin: 0 1rem;
  min-width: 100px;
  text-align: center;
}

.pagination p span {
  color: var(--purple);
  font-weight: 600;
  font-family: monospace;
}

/* responsive styles for news container */
@media (max-width: 1024px) {
  .news-container {
    grid-template-columns: repeat(2, 1fr);
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .news-container {
    grid-template-columns: repeat(2, 1fr);
    max-width: 95%;
  }
}

@media (max-width: 480px) {
  .news-container {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
}
</style>
