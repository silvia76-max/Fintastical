<template>
  <div>
    <div v-if="loading">
      <Loader />
    </div>

    <!-- hero -->
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="container">
        <div class="hero__content">
          <div class="hero__text">
            <h1 class="hero__title">The tool for managing your stock market investments</h1>
            <p class="hero__description">
              Check the updated value of your assets. Our platform keeps you informed of market fluctuations so you can react quickly.
            </p>
            <div class="hero__btn-wrap">
              <a href="/auth/login" class="hero__btn scroll-link">Get Started</a>
            </div>
          </div>
          <div class="hero__image">
            <img src="\src\assets\img\hero-app-screens-800.png" alt="App preview" class="hero__app-image" />
          </div>
        </div>
      </div>
    </section>

    <!-- about  -->
    <section id="about" class="about about--purple">
      <h2 class="about__title about__title--white">
        View all your assets in one place,<br>
        track their evolution, and make decisions.
      </h2>
      <div class="about__cards">
        <div class="about__card">
          <h3 class="about__card-title">Tracking</h3>
          <p class="about__card-text">
            Maintain a complete history of all your stock market transactions. Easily add and manage each asset, including stocks, ETFs, cryptocurrencies, and other financial instruments.
          </p>
        </div>
        <div class="about__card">
          <h3 class="about__card-title">Graphics</h3>
          <p class="about__card-text">
            Explore the performance of your investments with detailed charts and analysis tools. Identify trends, compare assets, and fine-tune your investment strategy with clear and precise information.
          </p>
        </div>
        <div class="about__card">
          <h3 class="about__card-title">News</h3>
          <p class="about__card-text">
            Stay updated with the latest financial news. Get real-time market insights and updates to make informed investment decisions.
          </p>
        </div>
      </div>
    </section>

    <!-- optimize -->
    <section id="optimize" class="optimize optimize--light">
      <h2 class="optimize__title">Optimize Your Investment Strategy</h2>
      <p class="optimize__description">
        With Fintastical, managing your investment portfolio has never been easier.<br>
        View all your assets in one place, track their evolution, and make data-driven decisions.
      </p>
    </section>

    <!-- reviews -->
    <section id="reviews" class="reviews reviews--light">
      <Reviews/>
    </section>

    <!-- faq -->
    <section id="faq" class="faq">
      <FAQ />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Reviews from '@/components/home/Reviews.vue';
import FAQ from '@/components/home/FAQ.vue';
import Loader from '@/components/LoaderComp.vue';

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
  width: 0.625rem;
  height: 0.625rem;
  margin: 0.313rem;
  background: black;
  border-radius: 50%;
  display: inline-block;
  animation: jump 1.5s infinite ease-in-out;
}

/* HERO BLOCK */
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

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, #6146b083, #c9647f70);
  z-index: -1;
}

.hero__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.hero__text {
  flex: 1;
  text-align: left;
  max-width: 50%;
}

.hero__title {
  font-size: 7rem;
  color: white;
}

.hero__description {
  font-size: 2rem;
  margin-bottom: 3rem;
}



.hero__btn {
  margin-top: 2rem;
  background: var(--purple);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  transition: background 0.3s;
}

.hero__btn:hover {
  background: var(--purple-hover);
}

.hero__image {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 50%;
  position: relative;
}

.hero__app-image {
  max-width: 80%;
  height: auto;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
}

/* ABOUT BLOCK */
.about {
  padding: 6.25rem 1.25rem;
  text-align: center;
}

.about--purple {
  background: var(--purple);
  color: white;
}

.about__title {
  font-size: 3rem;
  text-align: center;
  color: var(--purple);
}

.about__title--white {
  color: white;
}

.about__cards {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1.25rem;
  flex-wrap: wrap;
}

.about__card {
  background: transparent;
  border: 0.125rem solid var(--purple-light);
  border-radius: 0.625rem;
  padding: 1.25rem;
  padding-top: 3.5rem;
  text-align: center;
  max-width: 40rem;
  height: 25rem;
  color: white;
  margin-top: 2rem;
}

.about__card-title {
  margin-bottom: 0.625rem;
  font-size: 2rem;
  font-family: 'Ginto-Bold';
  color:white;
}

.about__card-text {
  font-size: 1.8rem;
  line-height: 1.5;
}

/* OPTIMIZE BLOCK */
.optimize {
  padding: 6.25rem 1.25rem;
  text-align: center;
}

.optimize--light {
  background: var(--purple-light);
  color: white;
  position: relative;
}

.optimize__title {
  font-size: 3rem;
  color: var(--purple);
}

.optimize__description {
  font-size: 2rem;
  color: var(--purple-dark);
  margin-top: 2rem;
}

/* REVIEWS BLOCK */
.reviews {
  padding: 6.25rem 1.25rem;
  text-align: center;
}

.reviews--light {
  background: var(--purple-light);
  color: white;
}

/* FAQ BLOCK */
.faq {
  padding: 6.25rem 1.25rem;
  text-align: center;
  background: white;
  color: black;
}


.container {
  width: 90%;
  max-width: 1200px;
  margin: auto;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .hero__content {
    flex-direction: column;
    text-align: center;
  }
  .hero__text, .hero__image {
    max-width: 100%;
  }
  .hero__text {
    margin-bottom: 1.25rem;
  }
  .hero__title {
    font-size: 4rem;
  }
  .hero__app-image {
    max-width: 50%;
    z-index: -1;
    position: relative;
  }

  .about--purple {
    position: relative;
    bottom: 22rem;
    z-index: 3;
  }
  .optimize--light {
    position: relative;
    bottom: 22rem;
  }
  .reviews {
    position: relative;
    bottom: 22rem;
  }
  .faq {
    position: relative;
    bottom: 22rem;
    max-height: 95rem;
  }
}

@media (max-width: 768px) {
  .hero {
    height: auto;
    padding: 60px 1.25rem;
  }
  .hero__title {
    font-size: 4rem;
  }
  .hero__btn {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
  .hero__app-image {
    max-width: 60%;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 10.313rem;
  }
  .hero__title {
    font-size: 3rem;
  }
  .hero__btn {
    font-size: 0.8rem;
    padding: 6px 10.125rem;
  }
  .hero__app-image {
    max-width: 50%;
  }
}
</style>
