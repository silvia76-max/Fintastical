<template>
  <div>

    <div v-if="loading">
      <Loader />
    </div>

    <!-- hero -->
    <section class="hero">
      <div class="shadow-overlay"></div>
      <div class="container">
        <div class="row home-content__main">
          <div class="col-hero-text">
            <h1>The tool for managing your stock market investments</h1>
            <p>
              Check the updated value of your assets. Our platform keeps you informed of market fluctuations so you can react quickly.
            </p>
            <div class="home-content__btn-wrap">
              <a href="/auth/login" class="btn-getstarted scroll-link">Get Started</a>
            </div>
          </div>
          <div class="col-hero-image">
            <img src="\src\assets\img\hero-app-screens-800.png" alt="App preview" class="hero-app-image" />
          </div>
        </div>
      </div>
    </section>

    <!-- about  -->
    <section id="about" class="content-section-purple">
      <h2 class="h2white">View all your assets in one place,<br> track their evolution, and make decisions.</h2>
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

    <!-- optimize -->
    <section id="optimize" class="content-section-light">
      <h2>Optimize Your Investment Strategy</h2>
      <p>With Fintastical, managing your investment portfolio has never been easier. <br> View all your assets in one place, track their evolution, and make data-driven decisions.</p>
    </section>


    <!-- reviews -->
    <section id="reviews" class=".content-section-light">
      <Reviews/>
    </section>

    <!-- faq -->
    <section id="faq" class="content-section">
     <FAQ />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Reviews from '@/components/home/Reviews.vue';
import FAQ from '@/components/home/FAQ.vue';
import Loader from '@/components/LoaderComp.vue'

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
  background-image: url('/src/assets/img/home-header.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  z-index: 1; 
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, #6146b083, #c9647f70);
  z-index: -1; 
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
  position: relative;
}
.content-section-light p {
  color: var(--purple-dark);
  margin-top: 2rem;

}
.container {
  width: 90%;
  max-width: 1200px;
  margin: auto;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.col-hero-text {
  flex: 1;
  text-align: left;
  max-width: 50%;
}

.col-hero-text h1 {
  font-size: 7rem;
}

.col-hero-text p {
  font-size: 1.5rem;
  margin-bottom: 3rem;
}

.col-hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 50%;
  position: relative;
}
.hero-app-image {
  max-width: 80%;
  height: auto;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
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
  border: 2px solid var(--purple-light);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  max-width: 40rem;
  height:20rem;
  color: var(--purple-light)
}

.card h3 {
  margin-bottom: 10px;
  font-size: 2rem;
  font-family: 'Ginto-Bold';
}

.card p {
  font-size: 1.5rem;
  line-height: 1.5;
}

h2 {
  color: var(--purple);
  text-align: center;
  font-size: 3rem;
}
.h2white {
  color: white;
  font-size: 3rem;
}
h3 {
  font-family: 'Ginto';
}
h1 {
  font-size: 5rem;
  animation: sparkle 2s infinite;
  color: white;
  /* background: linear-gradient(45deg, var(--purple), var(--purple-light)); */
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}
p {
  font-size: 1.5rem;
}

.btn-getstarted {
  margin-top: 2rem;
  background: var(--purple);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  flex: 1;
}

.btn-getstarted:hover {
  background: var(--purple-hover);
  color: rgb(16, 11, 59);
  color: white;
}

/* responsive */
@media (max-width: 1024px) {
  .row {
    flex-direction: column;
    text-align: center;
  }
  .col-hero-text, .col-hero-image {
    max-width: 100%;
  }
  .col-hero-text {
    margin-bottom: 20px;
  }
  .hero h1 {
    font-size: 4rem;
  }
  .hero h3 {
    font-size: 1.2rem;
  }
  .hero-app-image {
    max-width: 50%;
    z-index: -1;
    position: relative;
  }
  .content-section-purple{
    position: relative;
    bottom: 22rem;
    z-index: 3;

  }
  .content-section-light {
    position: relative;
    bottom: 22rem;
  }
  .fintastical-reviews {
    position: relative;
    bottom: 22rem;
  }
  .content-section {
    position: relative;
    bottom: 22rem;
    max-height: 95rem;
  }

}

@media (max-width: 768px) {
  .hero {
    height: auto;
    padding: 60px 20px;
  }
  .hero h1 {
    font-size: 4rem;
  }
  .hero h3 {
    font-size: 1rem;
  }
  .btn {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
  .hero-app-image {
    max-width: 60%;
  }
  
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 15px;
  }
  .hero h1 {
    font-size: 3rem;
  }
  .hero h3 {
    font-size: 0.9rem;
  }
  .btn {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
  .hero-app-image {
    max-width: 50%;
  }
}

</style>
