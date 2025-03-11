<template>
  <div>
    <!-- Preloader -->
    <div v-if="loading" class="preloader">
      <div class="dots-jump">
        <div></div>
        <div></div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="shadow-overlay"></div>
      <div class="home-content">
        <h1>The tool for managing your<br> stock market investments.</h1>
        <h3>
          Check the updated value of your assets. Our platform keeps you informed of market fluctuations so you can react quickly.
        </h3>
        <div class="home-content__btn-wrap">
          <a href="#about" class="btn btn--primary scroll-link">Saber más</a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="content-section-purple">
      <h2>View all your assets in one place, track their evolution, and make decisions.</h2>
    <div class="cards-container">
      <div class="card">
        <h3>Tracking</h3>
        <p>Maintain a complete history of all your stock market transactions. Easily add and manage each asset, including stocks, ETFs, cryptocurrencies, and other financial instruments.</p>
      </div>
      <div class="card">
        <h3>Graphics</h3>
        <p>Explore the performance of your investments with detailed charts and analysis tools. Identify trends, compare assets, and fine-tune your investment strategy with clear and precise information.</p>
      </div>
      <div class="card">
        <h3>News</h3>
        <p>Stay updated with the latest financial news. Get real-time market insights and updates to make informed investment decisions.</p>
      </div>
    </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="content-section">
      <h2>Loaded With Features You Would Absolutely Love.</h2>
      <p>Explore powerful features that make our app unique.</p>
    </section>


    <!-- Pricing Section -->
    <section id="pricing" class=".content-section-light">
      <Reviews/>
    </section>

    <!-- Download Section -->
    <section id="download" class="content-section">
     <FAQ />
      <div class="download-buttons">
        <a href="#0" class="btn btn--primary">App Store</a>
        <a href="#0" class="btn btn--primary">Play Store</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Reviews from '@/components/home/Reviews.vue';
import FAQ from '@/components/home/FAQ.vue';

const loading = ref(true);

onMounted(async () => {
  setTimeout(() => loading.value = false, 1000);
  
  await nextTick();
  document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = anchor.getAttribute('href').substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });
});
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  z-index: 9999;
}
.dots-jump div {
  width: 10px; height: 10px;
  margin: 5px;
  background: black;
  border-radius: 50%;
  display: inline-block;
  animation: jump 1.5s infinite ease-in-out;
}
.hero {
  height: 100vh;
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  color: white;
  text-align: center;
  position: relative;
}
.home-content {
  text-align: center;
}
.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  color: white;
  text-decoration: none;
  transition: background 0.3s;
}
.btn:hover {
  background: rgba(255, 255, 255, 0.5);
}
.content-section {
  padding: 100px 20px;
  text-align: center;
  background: white;
  color: black;
}
.content-section-purple {
  padding: 100px 20px;
  text-align: center;
  background: var(--purple);
  color: white;
}

.content-section-light {
  padding: 100px 20px;
  text-align: center;
  background: var(--purple-light);
  color: white;
}

.download-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.cards-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.card {
  background: transparent;
  border: 2px solid white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  max-width: 300px;
  color: white;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.card p {
  font-size: 1rem;
  line-height: 1.5;
}

</style>