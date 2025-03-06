<template>
  <div class="fintastical-reviews">
    <h1>Fintastical Reviews</h1>
    <p>
      Hear what our users have to say about their experience with Fintastical:
    </p>
    <div class="reviews">
      <div class="review">
        <h3>John Doe</h3>
        <p>"Fintastical has completely transformed the way I manage my finances. Highly recommended!"</p>
      </div>
      <div class="review">
        <h3>Jane Smith</h3>
        <p>"The platform is incredibly user-friendly, and the support team is always helpful."</p>
      </div>
      <div class="review">
        <h3>Mike Johnson</h3>
        <p>"I love the transparency and the innovative tools Fintastical offers."</p>
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
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
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
</style>
