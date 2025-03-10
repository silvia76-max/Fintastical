<template>
  <div class="fintastical-reviews">
    <h1>Fintastical Reviews</h1>
    <p>
      Hear what our users have to say about their experience with Fintastical:
    </p>
    <div class="reviews">
      <div class="review">
        <div class="review-content">
          <h3>Manuela Serrano</h3>
          <div class="stars">
            <div class="star-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i> <!-- 4/5 stars -->
            </div>
          </div>
          <p>"Fintastical has completely transformed the way I manage my finances. Highly recommended!"</p>
        </div>
        <img src="/public/Manuela-.webp" alt="mujer dando una opinion">
      </div>
      <div class="review">
        <div class="review-content">
          <h3>Joel Zaratain</h3>
          <div class="stars">
            <div class="star-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i> <!-- 3/5 stars -->
              <i class="far fa-star"></i>
            </div>
          </div>
          <p>"The platform is incredibly user-friendly, and the support team is always helpful."</p>
        </div>
        <img src="/public/Joel.webp" alt="hombre dando una opinion">
      </div>
      <div class="review">
        <div class="review-content">
          <h3>Lorena Garrido</h3>
          <div class="stars">
            <div class="star-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i> <!-- 5/5 stars -->
            </div>
          </div>
          <p>"I love the transparency and the innovative tools Fintastical offers."</p>
        </div>
        <img src="/public/Lorena.webp" alt="mujer dando una opinion">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FintasticalReviews'
}
</script>

<style scoped>
.fintastical-reviews {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #2F284C;
  text-align: center;
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  text-align: center;
}

.reviews {
  margin-top: 30px;
}

.review {
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.review img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-left: 20px;
}

.review-content {
  flex: 1;
}

.review h3 {
  color: #2F284C;
  margin-bottom: 10px;
}

.review p {
  font-size: 16px;
  line-height: 1.5;
  color: #555;
  text-align: left;
}

.stars {
  margin-bottom: 10px;
}

.star-rating {
  display: flex;
  color: #ffd700; /* Color dorado para las estrellas */
}

.star-rating i {
  margin-right: 5px; /* Espacio entre las estrellas */
}

.star-rating .fas {
  color: #ffd700; /* Estrellas llenas */
}

.star-rating .far {
  color: #e0e0e0; /* Estrellas vacías */
}
</style>
