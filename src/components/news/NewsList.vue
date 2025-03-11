<template>
  <div>
    <h2>Latest Stock Market News</h2>
    <div class="news-container">
      <!-- 👇 Now using "paginatedNews" -->
      <div class="news-card" v-for="article in paginatedNews" :key="article.url">          
        <p> {{ formatDate(article.publishedAt) }}</p>
        <div class="news-image">
          <img v-if="article.urlToImage" :src="article.urlToImage" alt="News Image" />
        </div>
        
        <div class="news-content">
          <a :href="article.url" target="_blank">
            <h2>{{ article.title }}</h2>
          </a>
          <p><strong>Author:</strong> {{ article.author || 'Unknown' }}</p>

          <p>{{ article.description }}</p>

          <a :href="article.url" target="_blank">
            <button v-if="article.content">Read Full Article</button>
          </a>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const apikey = '9107e2f197fc42308182c5bc92f503d1';
const searchQuery = 'stock%market%nasdaq';
const news = ref([]);
const error = ref(null);
const currentPage = ref(1);
const newsPerPage = 9; // ✅ Now 9 news articles per page

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Function to fetch data from the API
const fetchData = async () => {
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apikey}`);
    if (!response.ok) {
      throw new Error('Error loading data');
    }
    const data = await response.json();
    news.value = data.articles;
  } catch (err) {
    error.value = 'There was a problem loading the news';
    console.error(err);
  }
};

// Computed property to get paginated news ✅
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * newsPerPage;
  const end = start + newsPerPage;
  return news.value.slice(start, end);
});

// Computed property to calculate total pages ✅
const totalPages = computed(() => {
  return news.value.length > 0 ? Math.ceil(news.value.length / newsPerPage) : 1;
});

// Function to go to the previous page ✅
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Function to go to the next page ✅
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(fetchData);
</script>

<style scoped>
/* Style for news cards in three columns */

.news-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  margin: 0 30px;
}

.news-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  border-radius: 20px;
  box-shadow: #2F284C 0px 2px 2px;
  background-color: #DFDAEE;
  width: 100%;
  max-width: 550px;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 300px;
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
  color: #2F284C;
}

.news-content h2 {
  margin: 0;
  font-size: 18px;
  color: #2F284C;
}

.news-content .author {
  font-size: 12px;
  color: #76708E;
}

.news-content .author span {
  font-weight: bold;
}

.news-content .date {
  font-size: 14px;
  color: #A8CC9B;
  text-align: right;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #A8CC9B;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  align-self: center;
  box-shadow: #A396D7 0px 2px 2px;
}

button:hover {
  background-color: #C86380;
}

.error {
  color: red;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  padding: 10px;
  background-color: #6046B0;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>